import { randomUUID } from "crypto";
import { test, expect } from "vitest";
import Poll from "./poll";

test("Deve criar um bolão válido", async () => {
  const ownerId = randomUUID();
  const poll = Poll.create({
    code: "123124",
    title: "Bolão do Alan",
    ownerId,
  });
  expect(poll).toBeTruthy();
  expect(poll.title).toBe("Bolão do Alan");
});
