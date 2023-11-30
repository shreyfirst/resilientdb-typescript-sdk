import { FilterKeys, NetworkClient, PrepareAsset, RetrieveTransaction, UpdateAsset } from "./types.js";

/**
 * See https://github.com/ResilientApp/ResilientDB-GraphQL/blob/main/app.py
 */
class ResilientDB {
  uri: string;
  client: NetworkClient;

  constructor(uri: string, client: NetworkClient) {
    this.uri = uri;
    this.client = client;
  }

  // Queries

  // : Promise<RetrieveTransaction>
  async getTransactions() {

  }

  // filter: {
  //   ownerPublicKey: ${ownerPublicKey}
  //   recipientPublicKey: ${recipientPublicKey}
  // }
  async getFilteredTransactions(filter?: FilterKeys): Promise<RetrieveTransaction[]> {
    const transactions = await this.client.request<RetrieveTransaction[]>({
      url: `${this.uri}/graphql`,
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        query: `
        query {
          getFilteredTransactions(
            filter: {
              ownerPublicKey: null,
              recipientPublicKey: null
            }
          ) {
            id
            version
            amount
            metadata
            operation
            asset
            publicKey
            uri
            type
          }
        }        
        `
      }
    });

    return transactions;
  }

  // Mutations

  // : Promise<CommitTransaction>
  async postTransaction(transaction: PrepareAsset) {
  
  }

  // : Promise<RetrieveTransaction>
  async updateTransaction(transaction: UpdateAsset) {

  }

  // : Promise<RetrieveTransaction[]>
  async updateMultipleTransaction(transactions: UpdateAsset[]) {
    
  }

  // : Promise<Keys>
  async generateKeys() {

  }
}

export default ResilientDB;