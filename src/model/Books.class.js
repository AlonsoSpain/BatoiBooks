import Book from "./Book.class.js";


export default class Books {
  #data;

  constructor() {
    this.#data = [];
  }

  populate(array) {
    this.#data = array.map(
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

  addBook(book) {
    const bookId = Math.max(...this.#data.map((book) => book.id)) + 1;

    let bookCreated = new Book(bookId, book.userId, book.moduleCode, book.publisher, book.price, book.pages, book.status, book.photo, book.comments, book.soldDate);

    this.#data.push(bookCreated);

    return bookCreated;
  }

  removeBook(bookReceived) {
    let index = this.#data.findIndex((book) => book.id == bookReceived);

    if (index != -1) {
      this.#data.splice(index, 1);
    } else {
      throw new Error("El libro no existe");
    }
  }

  changeBook(bookReceived) {
    let bookIndex = this.#data.findIndex((book) => book.id === bookReceived.id);

    if (bookIndex != -1) {
      this.#data.splice(bookIndex, 1, bookReceived);
      return bookReceived;
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

  incrementPriceOfbooks(percentage) {
    const existences = this.#data.map((book) => {
      return { ...book, price: book.price + book.price * (percentage / 100) };
    });
    return existences;
  }

  getData(){
    return this.#data;
  }
}
