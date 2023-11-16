import { NetworkClient, Transaction } from "./types";

class ResilientDB {
  uri: string;
  client: NetworkClient;

  constructor(uri: string, client: NetworkClient) {
    this.uri = uri;
    this.client = client;
  }

  async getTransactions(): Promise<Transaction[]> {
    const transactions = await this.client.request<Transaction[]>({
      url: `${this.uri}/transactions`,
      method: "GET"
    });

    return transactions;
  }
}

export default ResilientDB;