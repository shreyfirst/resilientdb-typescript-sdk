import FetchClient from "../src/FetchClient.ts";
import ResilientDB from "../src/ResilientDB.ts";

test('NodeFetchClient initializes', () => {
  const client = new FetchClient();
});

test('ResilientDB with NodeFetchClient', async () => {
  const client = new ResilientDB("http://localhost:8000", new FetchClient());

  const transactions = await client.getAllTransactions(); // make a request and see if it works
  expect(transactions !== undefined);
});

test('ResilientDB with NodeFetchClient and mutation', async () => {
  const client = new ResilientDB("http://localhost:8000", new FetchClient());

  const senderPair = ResilientDB.generateKeys();
  const receiverPair = ResilientDB.generateKeys();
  const transaction = await client.postTransaction({
    operation: 'CREATE',
    amount: 5,
    signerPublicKey: senderPair.publicKey,
    signerPrivateKey: senderPair.privateKey,
    recipientPublicKey: receiverPair.publicKey,
    asset: {}
  });
  
  expect(transaction.id.length > 0);
});


export { };
