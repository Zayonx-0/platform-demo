const test = require("node:test");
const assert = require("node:assert/strict");
const { createServer } = require("../src/app");

test("root contains service name", () => assert.equal("platform-demo", "platform-demo"));
test("health is healthy", () => assert.equal("ok", "ok"));

test("GET /version returns service and version", async () => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));

  try {
    const { port } = server.address();
    const response = await fetch(`http://127.0.0.1:${port}/version`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { service: "platform-demo", version: "1.0.0" });
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
