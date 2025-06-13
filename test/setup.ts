import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(() => {
  cleanup();
});

/* This setup runs once before each test file

 *Runs in the same context as test files.  Anything declared globally in 
 these files, such as global variables or mock implementations, will be available 
 to the tests.
  
 *Ideal for setting up polyfills, global mocks, or other global objects that need to be available for all test files.
*/
