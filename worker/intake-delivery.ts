export type DeliveryRecord = {
  digest: string;
  status: "pending" | "delivered" | "uncertain";
};
type DeliveryDeps = {
  digest: string;
  read: () => Promise<DeliveryRecord | undefined>;
  write: (record: DeliveryRecord) => Promise<void>;
  send: () => Promise<Response>;
};
const unknown = {
  status: 503,
  body: {
    ok: false,
    uncertain: true,
    error:
      "Delivery could not be confirmed. To avoid a duplicate, please use the booking link below and mention your inquiry.",
  },
};
export async function deliverOnce({ digest, read, write, send }: DeliveryDeps) {
  const existing = await read();
  if (existing) {
    if (existing.digest !== digest)
      return {
        status: 409,
        body: {
          ok: false,
          uncertain: true,
          error:
            "This inquiry has already been submitted with different details. Please use the booking link below.",
        },
      };
    return existing.status === "delivered"
      ? { status: 200, body: { ok: true, preview: false } }
      : unknown;
  }
  // Persist before network I/O. A restart or ambiguous response never blindly re-sends.
  await write({ digest, status: "pending" });
  try {
    const result = await send();
    if (!result.ok) {
      await write({ digest, status: "uncertain" });
      return unknown;
    }
    await write({ digest, status: "delivered" });
    return { status: 200, body: { ok: true, preview: false } };
  } catch {
    await write({ digest, status: "uncertain" });
    return unknown;
  }
}
