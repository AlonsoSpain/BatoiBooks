import { describe, test, expect } from "vitest";
import Books from "../model/Books.class.js";
import datos from "../services/datos.js";
import Book from "../model/Book.class.js";

describe("Populate", () => {
  test("Populate carga todos los libros", () => {
    const books = new Books();
    books.populate(datos.books);

    expect(books.getData()).toHaveLength(datos.books.length);
  });

  test("Populate crea siempre instancias de Book", () => {
    const books = new Books();
    books.populate(datos.books);

    books.getData().forEach((book) => {
      expect(book).toBeInstanceOf(Book);
    });
  });
});

// We use 0 to maintain the params order before the id assign in the method addBook
describe("addBook", () => {
  const newBook = new Book(0, 10, 11, "Genius", 20.55, 30, "good");

  test("retorna el libro creado", () => {
    const books = new Books();
    books.populate(datos.books);

    const book = books.addBook(newBook);

    expect(book).toBeInstanceOf(Book);
    expect(book.userId).toBe(10);
  });

  test("añade un nuevo libro a la colección", () => {
    const books = new Books();
    books.populate(datos.books);

    let previousLength = books.getData().length;

    books.addBook(newBook);

    expect(books.getData()).toHaveLength(previousLength + 1);
  });
});

describe("removeBook", () => {
  const books = new Books();
  books.populate(datos.books);

  test("elimina el elemento correspondiente", () => {
    books.removeBook(1);

    expect(books.getData().find((book) => book.id == 1)).toBeUndefined();
  });

  test("lanza un error si el libro no existe", () => {
    expect(() => books.removeBook(999)).toThrow("El libro no existe");
  });
});

describe("changeBook", () => {
  const books = new Books();
  books.populate(datos.books);

  test("modifica el libro indicado", () => {
    const bookModified = {
      id: 1,
      userId: 3,
      moduleCode: 20262026,
      publisher: "America",
      price: 777,
      pages: 60,
      status: "good",
      photo: "",
      comments: "",
      soldDate: "",
    };

    books.changeBook(bookModified);

    const bookFound = books.getData().find((book) => book.id == 1);
    expect(bookFound.userId).toBe(3);
    expect(bookFound.moduleCode).toBe(20262026);
  });

  test("retorna el libro modificado", () => {
    const bookModified = {
      id: 1,
      userId: 3,
      moduleCode: 20262026,
      publisher: "America",
      price: 777,
      pages: 60,
      status: "good",
      photo: "",
      comments: "",
      soldDate: "",
    };
    const result = books.changeBook(bookModified);

    expect(result).toBe(bookModified);
  });
});

// Inherited methods:

describe("getBookById", () => {
  const books = new Books();
  books.populate(datos.books);

  test("devuelve el libro con id 1", () => {
    const book = books.getBookById(1);
    expect(book.userId).toBe(2);
    expect(book.moduleCode).toBe("5025");
    expect(book.publisher).toBe("Apunts");
    expect(book.price).toBe(12);
  });

  test("lanza error con un id que no existe", () => {
    expect(() => books.getBookById(99999)).toThrow("El libro no existe");
  });
});

describe("getBookIndexById", () => {
  const books = new Books();
  books.populate(datos.books);

  test("devuelve el índice del libro con id 6", () => {
    const index = books.getBookIndexById(6);
    expect(datos.books[index].id).toBe(6);
  });

  test("lanza error con un id que no existe", () => {
    expect(() => books.getBookIndexById(99999)).toThrow("El libro no existe");
  });
});

describe("bookExists", () => {
  const books = new Books();
  books.populate(datos.books);

  test("devuelve true para userId 2 y moduleCode 5025", () => {
    expect(books.bookExists(2, "5025")).toBe(true);
  });

  test("devuelve false para una combinación que no existe", () => {
    expect(books.bookExists(2, "0000")).toBe(false);
  });
});

describe("booksFromUser", () => {
  const books = new Books();
  books.populate(datos.books);

  test("devuelve solo libros del userId 3", () => {
    const result = books.booksFromUser(3);
    expect(result.every((book) => book.userId === 3)).toBe(true);
    expect(result.some((book) => book.id === 6)).toBe(true);
  });
});

describe("booksFromModule", () => {
  const books = new Books();
  books.populate(datos.books);

  test("devuelve solo libros del módulo 5025", () => {
    const result = books.booksFromModule("5025");
    expect(result.every((book) => book.moduleCode === "5025")).toBe(true);
  });
});

describe("booksCheeperThan", () => {
  const books = new Books();
  books.populate(datos.books);

  test("devuelve solo libros con precio <= 75", () => {
    const result = books.booksCheeperThan(75);
    expect(result.every((book) => book.price <= 75)).toBe(true);
  });
});

describe("booksWithStatus", () => {
  test("devuelve solo libros con status 'new'", () => {
    const books = new Books();
    books.populate(datos.books);

    const result = books.booksWithStatus("new");
    expect(result.every((book) => book.status === "new")).toBe(true);
    expect(result.some((book) => book.id === 6)).toBe(true);
  });
});

describe("averagePriceOfBooks", () => {
  const books = new Books();
  books.populate(datos.books);

  test("calcula la media de precios de todos los libros", () => {
    expect(books.averagePriceOfBooks()).toBe("26.17 €");
  });
});

describe("booksOfTypeNotes", () => {
  test("devuelve solo libros de la editorial Apunts", () => {
    const books = new Books();
    books.populate(datos.books);

    const result = books.booksOfTypeNotes();
    expect(result.every((book) => book.publisher === "Apunts")).toBe(true);
    expect(result.some((book) => book.id === 1)).toBe(true);
  });
});

describe("booksNotSold", () => {
  test("devuelve solo libros sin fecha de venta", () => {
    const books = new Books();
    books.populate(datos.books);

    const result = books.booksNotSold();
    expect(result.every((book) => book.soldDate === "")).toBe(true);
    expect(result.some((book) => book.id === 6)).toBe(true); // el libro 6 no está vendido
    expect(result.some((book) => book.id === 1)).toBe(false); // el libro 1 sí está vendido
  });
});

describe("incrementPriceOfbooks", () => {
  test("incrementa el precio sin mutar el array original", () => {
    const books = new Books();
    books.populate(datos.books);

    const originalPrice = books.getBookById(1).price;
    const result = books.incrementPriceOfbooks(10);
    const incrementedBook = result.find((book) => book.id === 1);

    expect(incrementedBook.price).toBeCloseTo(originalPrice * 1.1);
    expect(books.getBookById(1).price).toBe(originalPrice); // el original no cambia
  });
});
