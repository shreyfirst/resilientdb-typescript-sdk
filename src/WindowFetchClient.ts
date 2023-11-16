import { NetworkClient } from "./types";

class WindowFetchClient implements NetworkClient {
  constructor() {
    if (!window?.fetch)
      throw new Error("Can't find fetch! Did you try to use this outside of the browser?");
  }

  // TODO: add error throwing
  request<TReturn>({ url, method, body }: { url: string; method: "GET" | "POST"; body: object; }): Promise<TReturn> {
    return window.fetch(url, {
      method,
      body: JSON.stringify(body)
    }).then(res => res.json());
  }
}

export default WindowFetchClient;