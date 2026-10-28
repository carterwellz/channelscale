import { createServer } from "node:http";
let received = [];
createServer(async (req, res) => {
  if (req.url === "/count") { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify({ count: received.length, last: received.at(-1) })); return; }
  let body = ""; for await (const chunk of req) body += chunk;
  received.push(JSON.parse(body));
  res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify({ ok: true }));
}).listen(3214, "127.0.0.1", () => console.log("Local test receiver ready on 3214; no external delivery."));
