import { describe, test, expect, toBeInstanceOf } from "vitest";
import Modules from "../model/Modules.class.js";
import datos from "../services/datos.js";
import Module from "../model/Module.class.js";

describe("Modules", () => {
  test("Populate carga todos los usuarios", () => {
    const modules = new Modules();
    modules.populate(datos.modules);

    expect(modules.getData()).toHaveLength(datos.modules.length);

  });

  test("Populate crea siempre instancias de usuarios", () => {
    const modules = new Modules();
    modules.populate(datos.modules);

    modules.getData().forEach((module) => {
      expect(module).toBeInstanceOf(Module);
    });
  });
});


// Inherited methods:

describe("getModuleByCode", () => {
    const modules = new Modules();
    modules.populate(datos.modules);

  test("devuelve el módulo con código 0011", () => {
    const result = modules.getModuleByCode("0011");
    expect(result[0].cliteral).toBe("Didáctica de la educación infantil");
    expect(result[0].courseId).toBe("39");
  });
 
  test("lanza error con un código que no existe", () => {
    expect(() => modules.getModuleByCode("9999")).toThrow(
      "El modulo no existe"
    );
  });
});
