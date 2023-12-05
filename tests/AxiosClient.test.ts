import axios from "axios";
import AxiosClient from "../src/AxiosClient.ts";
import ResilientDB from "../src/ResilientDB.ts";

test('AxiosClient initializes', () => {
  const client = new AxiosClient(axios.create());
});

test('ResilientDB with AxiosClient', async () => {
  const client = new ResilientDB("http://localhost:8000", new AxiosClient());

  const transactions = await client.getAllTransactions(); // make a request and see if it works
  expect(transactions !== undefined);
});

test('ResilientDB with AxiosClient and mutation', async () => {
  const client = new ResilientDB("http://localhost:8000", new AxiosClient());

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
