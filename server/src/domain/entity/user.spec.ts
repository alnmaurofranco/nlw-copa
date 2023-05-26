import { randomUUID } from "crypto";
import { test, expect } from "vitest";
import User from "./user";

test("Deve criar um usuário válido", async () => {
  const id = randomUUID();
  const user = User.create(
    {
      name: "John Doe",
      email: "johndoe-example@example.com",
    },
    id
  );
  expect(user).toBeTruthy();
  expect(user).toBeDefined();
  expect(user.id).toBe(id);
});
