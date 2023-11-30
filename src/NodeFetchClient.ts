import fetch, { RequestInit } from "node-fetch";
import { NetworkClient } from "./types.js";


class NodeFetchClient implements NetworkClient {
  commonOptions: Partial<RequestInit>

  constructor(commonOptions: Partial<RequestInit> = {}) {
    this.commonOptions = commonOptions;
  }

  // TODO: add error throwing
  request<TReturn>({ url, method, body, headers }:
    {
      url: string; method: "GET" | "POST"; body: string | object; headers?: Record<string, string>
    }): Promise<TReturn> {
    const { headers: commonHeaders, ...restOfCommonOptions } = this.commonOptions;

    return fetch(url, {
      method,
      headers: {
        ...commonHeaders,
        ...headers,
      },
      body: JSON.stringify(body),
      ...this.commonOptions
    }).then((res: any) => res.json()) as Promise<TReturn>;
  }
}

export default NodeFetchClient;