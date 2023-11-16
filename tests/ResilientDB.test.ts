/**
 * @jest-environment node
 */

import NodeFetchClient from '../src/NodeFetchClient';
import ResilientDB from '../src/ResilientDB';

test('ResilientDB instance initializes', () => {
  const client = new ResilientDB("", new NodeFetchClient());
});