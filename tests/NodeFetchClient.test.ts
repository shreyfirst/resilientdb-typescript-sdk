import NodeFetchClient from "../src/NodeFetchClient.ts";

test('NodeFetchClient initializes', () => {
  const client = new NodeFetchClient();
  client.request({
    "url": "/",
    "method": "GET",
    "body": {}
  });
});

export { };
