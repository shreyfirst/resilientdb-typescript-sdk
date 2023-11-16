/**
 * @jest-environment jsdom
 */

import WindowFetchClient from "../src/WindowFetchClient";

test('FetchNetworkClient initializes', () => {
  // const client = new FetchNetworkClient();
});

test('FetchNetworkClient throws if window.fetch unavailable', () => {
  expect(new WindowFetchClient()).toThrow(Error);
});