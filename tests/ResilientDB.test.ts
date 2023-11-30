import NodeFetchClient from '../src/NodeFetchClient.ts';
import ResilientDB from '../src/ResilientDB.ts';

test('ResilientDB instance initializes', () => {
  const client = new ResilientDB("http://localhost:8000", new NodeFetchClient());
});

test('getFilteredTransactions', async () => {
  const client = new ResilientDB("http://localhost:8000", new NodeFetchClient());

  const transactions = await client.getFilteredTransactions();
  console.log(JSON.stringify(transactions, null, 2));
});