import { describe, test, expect } from "vitest";
import Module from "../model/Module.class";
import User from "../model/User.class";

describe("Module", () => {
  test("Crear exitosamente un usuario", () => {
    const user1 = new User(6, "Alex", "alex@gmail.com", 1234);

    expect(user1.id).toBe(6);
    expect(user1.nick).toBe("Alex");
    expect(user1.email).toBe("alex@gmail.com");
    expect(user1.password).toBe(1234);
  });
});
