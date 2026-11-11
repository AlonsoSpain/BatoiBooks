import { describe, test, expect } from "vitest";
import Module from "../model/Module.class";


describe("Module", () => {
  test("Crear exitosamente un modulo", () => {
      const module1 = new Module(
      "CV0006",
      "Sol",
      "Solet",
      "58"
    );

    expect(module1.code).toBe("CV0006");
    expect(module1.cliteral).toBe("Sol");
    expect(module1.vliteral).toBe("Solet");
    expect(module1.courseId).toBe("58");
  });
});
