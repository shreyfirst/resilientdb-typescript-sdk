import fetch from "node-fetch";
import { NetworkClient } from "./types.js";


class NodeFetchClient implements NetworkClient {
  constructor() {}

  // TODO: add error throwing
  request<TReturn>({ url, method, body }: { url: string; method: "GET" | "POST"; body: object; }): Promise<TReturn> {
    return fetch(url, {
      method,
      body: JSON.stringify(body)
    }).then((res: any) => res.json()) as Promise<TReturn>;
  }
}

export default NodeFetchClient;