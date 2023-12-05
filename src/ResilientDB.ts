import Base58 from "bs58";
import nacl from "tweetnacl";
import { CommitTransaction, FilterKeys, NetworkClient, PrepareAsset, RetrieveTransaction, UpdateAsset, WithData } from "./types.js";

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

  async getTransaction(requestId: string): Promise<RetrieveTransaction> {
    const result = await this.client.request<WithData<{
      getTransaction: RetrieveTransaction
    }>>({
      url: `${this.uri}/graphql`,
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        query: `
        query {
          getTransaction(
            filter: {
              id: ${requestId}
            }
          ) {
            id
            version
            amount
            uri
            type
            publicKey
            operation
            metadata
            asset
          }
        }        
        `
      }
    });

    if (result.errors && result.errors.length > 0)
      throw result.errors;

    return result.data.getTransaction;
  }

  async getAllTransactions(): Promise<RetrieveTransaction[]> {
    return this.getFilteredTransactions();
  }

  async getFilteredTransactions(filter?: FilterKeys): Promise<RetrieveTransaction[]> {
    const result = await this.client.request<WithData<{
      getFilteredTransactions: RetrieveTransaction[]
    }>>({
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
              ownerPublicKey: ${filter?.ownerPublicKey || null},
              recipientPublicKey: ${filter?.recipientPublicKey || null}
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

    if (result.errors && result.errors.length > 0)
      throw result.errors;

    return result.data.getFilteredTransactions;
  }

  // Mutations

  async postTransaction(transaction: PrepareAsset): Promise<CommitTransaction> {
    const result = await this.client.request<WithData<{
      postTransaction: CommitTransaction
    }>>({
      url: `${this.uri}/graphql`,
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        query: `
        mutation {
          postTransaction(data: {
            operation: "${transaction.operation}",
            amount: ${transaction.amount},
            signerPublicKey: "${transaction.signerPublicKey}",
            signerPrivateKey: "${transaction.signerPrivateKey}",
            recipientPublicKey: "${transaction.recipientPublicKey}",
            asset: """{"data": ${JSON.stringify(transaction.asset)}}"""
          }) {
            id  
          }
        }        
        `
      }
    });

    if (result.errors && result.errors.length > 0)
      throw result.errors;

    return result.data.postTransaction;
  }

  async updateTransaction(transaction: UpdateAsset): Promise<RetrieveTransaction> {
    const result = await this.client.request<WithData<{
      updateTransaction: RetrieveTransaction
    }>>({
      url: `${this.uri}/graphql`,
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        query: `
          mutation {
            updateTransaction(data: {
              id: "${transaction.id}",
              operation: "${transaction.operation}",
              amount: ${transaction.amount},
              signerPublicKey: "${transaction.signerPublicKey}",
              signerPrivateKey: "${transaction.signerPrivateKey}",
              recipientPublicKey: "${transaction.recipientPublicKey}",
              asset: """{"data": ${JSON.stringify(transaction.asset)}}"""
            }) {
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
  
    if (result.errors && result.errors.length > 0)
      throw result.errors;
  
    return result.data.updateTransaction;
  }
  
  

  async updateMultipleTransaction(transactions: UpdateAsset[]): Promise<RetrieveTransaction[]> {
    const transactionData = transactions.map(record => `
      {
        id: "${record.id}",
        operation: "${record.operation}",
        amount: ${record.amount},
        signerPublicKey: "${record.signerPublicKey}",
        signerPrivateKey: "${record.signerPrivateKey}",
        recipientPublicKey: "${record.recipientPublicKey}",
        asset: ${JSON.stringify(record.asset)}
      }
    `).join(',');
  
    const result = await this.client.request<WithData<{
      updateMultipleTransaction: RetrieveTransaction[]
    }>>({
      url: `${this.uri}/graphql`,
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        query: `
          mutation {
            updateMultipleTransaction(data: [${transactionData}]) {
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
  
    if (result.errors && result.errors.length > 0)
      throw result.errors;
  
    return result.data.updateMultipleTransaction;
  }
  

  // : Promise<Keys>
  static generateKeys() {
    var keyPair = nacl.sign.keyPair();
    var pk = Base58.encode(keyPair.publicKey);
    var sk = Base58.encode(keyPair.secretKey.slice(0, 32));
    return { publicKey: pk, privateKey: sk };
  }
}

export default ResilientDB;