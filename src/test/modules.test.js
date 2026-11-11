import { describe, test, expect, toBeInstanceOf } from "vitest";
import Modules from "../model/Modules.class.js";
import Module from "../model/Module.class.js";

import {
  getDBModules,
} from "../services/api.js";



test("getDBModules", async () => {
  const res = await getDBModules();

  expect(res).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        cliteral: "Didáctica de la educación infantil",
        code: "0011",
        courseId: "39",
        id: "Yk99N7Po2Cg",
        vliteral: "Didàctica de l'educación infantil",
      }),
    ]),
  );
});
