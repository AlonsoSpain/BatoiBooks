import { describe, expect, test } from 'vitest'
import data from '../services/datos.js'

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

describe('Ficheros creados', () => {


  test('Existe data en datos.js y contiene 6 libros', () => {
    expect(data.books.length).toBe(6)
  }); 

})

describe("getBookById", () => {

  test("devuelve el libro con id 1", () => {
    const book = getBookById(data.books, 1);
    expect(book.userId).toBe(2);
    expect(book.moduleCode).toBe("5025");
    expect(book.publisher).toBe("Apunts");
    expect(book.price).toBe(12);
  });
 
  test("lanza error con un id que no existe", () => {
    expect(() => getBookById(data.books, 99999)).toThrow("El libro no existe");
  });

});

describe("getBookIndexById", () => {

  test("devuelve el índice del libro con id 6", () => {
    const index = getBookIndexById(data.books, 6);
    expect(data.books[index].id).toBe(6);
  });
 
  test("lanza error con un id que no existe", () => {
    expect(() => getBookIndexById(data.books, 99999)).toThrow(
      "El libro no existe"
    );
  });

});


describe("bookExists", () => {

  test("devuelve true para userId 2 y moduleCode 5025", () => {
    expect(bookExists(data.books, 2, "5025")).toBe(true);
  });
 
  test("devuelve false para una combinación que no existe", () => {
    expect(bookExists(data.books, 2, "0000")).toBe(false);
  });

});


describe("booksFromUser", () => {

  test("devuelve solo libros del userId 3", () => {
    const result = booksFromUser(data.books, 3);
    expect(result.every((book) => book.userId === 3)).toBe(true);
    expect(result.some((book) => book.id === 6)).toBe(true);
  });

});


describe("booksFromModule", () => {
  test("devuelve solo libros del módulo 5025", () => {
    const result = booksFromModule(data.books, "5025");
    expect(result.every((book) => book.moduleCode === "5025")).toBe(true);
  });
});

describe("booksCheeperThan", () => {
  test("devuelve solo libros con precio <= 75", () => {
    const result = booksCheeperThan(data.books, 75);
    expect(result.every((book) => book.price <= 75)).toBe(true);
  });
});

describe("booksWithStatus", () => {
  test("devuelve solo libros con status 'new'", () => {
    const result = booksWithStatus(data.books, "new");
    expect(result.every((book) => book.status === "new")).toBe(true);
    expect(result.some((book) => book.id === 6)).toBe(true);
  });
});

describe("averagePriceOfBooks", () => {
  test("calcula la media de precios de todos los libros", () => {
    expect(averagePriceOfBooks(data.books)).toBe("26.17 €");
  });
});


describe("booksOfTypeNotes", () => {
  test("devuelve solo libros de la editorial Apunts", () => {
    const result = booksOfTypeNotes(data.books);
    expect(result.every((book) => book.publisher === "Apunts")).toBe(true);
    expect(result.some((book) => book.id === 1)).toBe(true);
  });
});

describe("booksNotSold", () => {
  test("devuelve solo libros sin fecha de venta", () => {
    const result = booksNotSold(data.books);
    expect(result.every((book) => book.soldDate === "")).toBe(true);
    expect(result.some((book) => book.id === 6)).toBe(true); // el libro 6 no está vendido
    expect(result.some((book) => book.id === 1)).toBe(false); // el libro 1 sí está vendido
  });
});

describe("incrementPriceOfbooks", () => {
  test("incrementa el precio sin mutar el array original", () => {
    const originalPrice = getBookById(data.books, 1).price;
    const result = incrementPriceOfbooks(data.books, 10);
    const incrementedBook = result.find((book) => book.id === 1);
 
    expect(incrementedBook.price).toBeCloseTo(originalPrice * 1.1);
    expect(getBookById(data.books, 1).price).toBe(originalPrice); // el original no cambia
  });
});

describe("getUserById", () => {
  test("devuelve el usuario con id 2", () => {
    const user = getUserById(data.users, 2);
    expect(user.nick).toBe("Ignasi");
    expect(user.email).toBe("ignasi.gomis.mullor@gmail.com");
  });
 
  test("lanza error con un id que no existe", () => {
    expect(() => getUserById(data.users, 99999)).toThrow("El usuario no existe");
  });
});

describe("getUserIndexById", () => {
  test("devuelve el índice del usuario con id 3", () => {
    const index = getUserIndexById(data.users, 3);
    expect(data.users[index].nick).toBe("Juan");
  });
 
  test("lanza error con un id que no existe", () => {
    expect(() => getUserIndexById(data.users, 99999)).toThrow(
      "El usuario no existe"
    );
  });
});

describe("getUserByNickName", () => {
  test("devuelve el usuario 'Ignasi'", () => {
    const user = getUserByNickName(data.users, "Ignasi");
    expect(user.id).toBe(2);
  });
 
  test("lanza error con un nick que no existe", () => {
    expect(() => getUserByNickName(data.users, "no-existe")).toThrow(
      "El usuario no existe"
    );
  });
});



describe("getModuleByCode", () => {
  test("devuelve el módulo con código 0011", () => {
    const result = getModuleByCode(data.modules, "0011");
    expect(result[0].cliteral).toBe("Didáctica de la educación infantil");
    expect(result[0].courseId).toBe("39");
  });
 
  test("lanza error con un código que no existe", () => {
    expect(() => getModuleByCode(data.modules, "9999")).toThrow(
      "El modulo no existe"
    );
  });
});
