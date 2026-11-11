import {
  beforeAll,
  afterAll,
  afterEach,
  beforeEach,
} from "vitest";

import { server } from "./mocks/server.js";
import { resetMockData } from "./mocks/handlers.js";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

beforeEach(() => {
  resetMockData();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});