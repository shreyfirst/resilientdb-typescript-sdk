import fetch from "node-fetch";
import { NetworkClient } from "./types";


class NodeFetchClient implements NetworkClient {
  constructor() {}

  // TODO: add error throwing
  request<TReturn>({ url, method, body }: { url: string; method: "GET" | "POST"; body: object; }): Promise<TReturn> {
    return fetch(url, {
      method,
      body: JSON.stringify(body)
    }).then(res => res.json()) as Promise<TReturn>;
  }
}

export default NodeFetchClient;