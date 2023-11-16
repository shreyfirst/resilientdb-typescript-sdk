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

// TODO: check
export type Transaction {
  amount: number
}