export interface NetworkClient {
  request<TReturn extends object>(options: {
    url: string,
  } & (
      | {
        method: 'GET',
      }
      | {
        method: 'POST',
        body: object
      }
    )): Promise<TReturn>
}

export type RetriveTransaction = {
  id: string;
  version: string;
  amount: number; // integer
  uri: string;
  type: string;
  publicKey: string;
  operation: string;
  metadata?: string | null;
  asset: string;
}

export type CommitTransaction = {
  id: string;
}

export type PrepareAsset = {
  operation: string;
  amount: number;
  signerPublicKey: string;
  signerPrivateKey: string;
  recipientPublicKey: string;
  asset: string;
}

export type UpdateAsset = {
  id: string;
  operation?: string | null;
  amount?: number | null; // int
  signerPublicKey: string;
  signerPrivateKey: string;
  recipientPublicKey?: string | null;
  asset?: string | null;
}

export type FilterKeys = {
  ownerPublicKey?: string | null;
  recipientPublicKey?: string | null;
}

export type Keys = {
  publicKey: string
  privateKey: string
}