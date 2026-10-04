import Module from "./Module.class.js";

import {
  getBookById,
  getBookIndexById,
  bookExists,
  booksFromUser,
  booksFromModule,
  booksCheeperThan,
  booksWithStatus,
  averagePriceOfBooks,
  booksOfTypeNotes,
  booksNotSold,
  incrementPriceOfbooks,
  getUserById,
  getUserIndexById,
  getUserByNickName,
  getModuleByCode,
} from "../functions.js";

export default class Modules {
  #data;

  constructor() {
    this.#data = [];
  }

  populate(array) {
    this.#data = array.map(
      (module) =>
        new Module(
          module.code,
          module.cliteral,
          module.vliteral,
          module.courseId,
        ),
    );
  }

  toString() {
    let res = [];

    this.#data.forEach((module) => {
      res += `${module.toString()} \n\n `;
    });

    return res;
  }

  getModuleByCode(moduleCode) {
    const existence = this.#data.filter((module) => module.code == moduleCode);

    if (existence.length === 0) {
      throw new Error("El modulo no existe");
    }

    return existence;
  }

    getData(){
    return this.#data;
  }
}
