import NodeFetchClient from '../src/NodeFetchClient.ts';
import ResilientDB from '../src/ResilientDB.ts';

test('ResilientDB instance initializes', () => {
  const client = new ResilientDB("http://localhost:8000", new NodeFetchClient());
});

test('postTransaction: 1 transaction', async () => {
  const client = new ResilientDB("http://localhost:8000", new NodeFetchClient());

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

test('getAllTransactions', async () => {
  const client = new ResilientDB("http://localhost:8000", new NodeFetchClient());

  const transactions = await client.getAllTransactions();
  expect(transactions !== undefined)
});