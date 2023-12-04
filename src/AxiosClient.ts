import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { NetworkClient } from "./types.js";

/**
 * Write Me
 */
class AxiosClient implements NetworkClient {
  instance: AxiosInstance;

  constructor(options?: CreateAxiosDefaults);
  constructor(client: AxiosInstance);
  constructor(optionsOrClient?: AxiosInstance | CreateAxiosDefaults) {
    if (typeof optionsOrClient === "function")
      this.instance = optionsOrClient as AxiosInstance;
    else
      this.instance = axios.create(optionsOrClient as CreateAxiosDefaults);
  }

  // TODO: add error throwing
  async request<TReturn>({ url, method, body, headers }:
    {
      url: string; method: "GET" | "POST"; body: string | object; headers?: Record<string, string>
    }): Promise<TReturn> {

    switch (method) {
      case "GET":
        return (await this.instance.get(url, {
          headers: headers
        })).data;
      case "POST":
        return (await this.instance.post(url, body, {
          headers: headers
        })).data;
    }
  }
}

export default AxiosClient;