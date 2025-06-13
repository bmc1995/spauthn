import { describe, expect, it } from "vitest";
import { generateUUID } from "../generateUUID";

describe("generateUUID()", () => {
  it("generates a UUID (8-4-4-4-12)", () => {
    const id = generateUUID();
    const sections = id.split("-");

    expect(sections[2][0]).toEqual("4");
    expect(id.length).toEqual(36);
  });
});
