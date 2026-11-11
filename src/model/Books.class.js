import Book from "./Book.class.js";
import {
  getDBBooks,
  addDBBook,
  removeDBBook,
  changeDBBook,
} from "../services/api";

export default class Books {
  #data;

  constructor() {
    this.#data = [];
  }

  async populate() {
    const books = await getDBBooks();

    this.#data = books.map(
      (book) =>
        new Book(
          book.id,
          book.userId,
          book.moduleCode,
          book.publisher,
          book.price,
          book.pages,
          book.status,
          book.photo,
          book.comments,
          book.soldDate,
        ),
    );
  }

  async addBook(book) {
    const books = await getDBBooks();

    const idBook = Math.max(...books.map((b) => b.id)) + 1;

    let bookCreated = new Book(
      idBook,
      book.userId,
      book.moduleCode,
      book.publisher,
      book.price,
      book.pages,
      book.status,
      book.photo,
      book.comments,
      book.soldDate,
    );

    const res = await addDBBook(bookCreated);

    this.populate();
  }

  async removeBook(bookId) {
    let books = await getDBBooks();

    // To know if the user book id sent actually exists
    let index = books.findIndex((book) => book.id == bookId);

    if (index != -1) {
      const res = await removeDBBook(bookId);
      this.populate();
    } else {
      throw new Error("El libro no existe");
    }
        this.populate();
  }

  async changeBook(bookReceived) {
    let books = await getDBBooks();

    let bookIndex = books.findIndex((book) => book.id === bookReceived.id);

    if (bookIndex != -1) {
      const res = await changeDBBook(bookReceived);
      this.populate();
    } else {
      throw new Error("El libro no existe");
    }
  }

  toString() {
    let res = [];

    this.#data.forEach((book) => {
      res += `${book.toString()} \n\n `;
    });

    return res;
  }

  // From functions.js

  getBookById(bookId) {
    const book = this.#data.find((book) => book.id == bookId);
    if (!book) {
      throw new Error("El libro no existe");
    }
    return book;
  }

  getBookIndexById(bookId) {
    const index = this.#data.findIndex((book) => book.id == bookId);
    if (index === -1) {
      throw new Error("El libro no existe");
    }
    return index;
  }

  bookExists(userId, moduleCode) {
    const existence = this.#data.find((book) => {
      if (book.userId == userId && book.moduleCode == moduleCode) {
        return true;
      }
    });

    if (existence) {
      return true;
    } else {
      return false;
    }
  }

  booksFromUser(userId) {
    const existences = this.#data.filter((book) => book.userId == userId);
    return existences;
  }

  booksFromModule(moduleCode) {
    const existences = this.#data.filter(
      (book) => book.moduleCode == moduleCode,
    );
    return existences;
  }

  booksCheeperThan(price) {
    const existences = this.#data.filter((book) => book.price <= price);
    return existences;
  }

  booksWithStatus(status) {
    const existences = this.#data.filter((book) => book.status == status);
    return existences;
  }

  averagePriceOfBooks() {
    const precios =
      this.#data.reduce((count, book) => {
        return count + book.price;
      }, 0) / this.#data.length;

    return precios.toFixed(2) + " €";
  }

  booksOfTypeNotes() {
    const existences = this.#data.filter((book) => book.publisher == "Apunts");
    return existences;
  }

  booksNotSold() {
    const existences = this.#data.filter((book) => book.soldDate == "");
    return existences;
  }

  getData() {
    return this.#data;
  }
}
