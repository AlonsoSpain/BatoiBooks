export default class Cart {
  #data;

  constructor() {
    this.#data = [];
  }

  populate() {
    // De momento no hace nada
  }

  getBookById(bookId) {
    const book = this.#data.find((book) => book.id == bookId);

    if (!book) {
      return {};
    }

    return book;
  }

  addItem(book) {
    const exists = this.#data.some((item) => item.id == book.id);

    if (exists) {
      throw new Error("El libro ya está en el carrito");
    }

    // Needs to save a copy of the book to avoid mutations of the book object.
    const copy = { ...book };
    this.#data.push(copy);
  }

  removeItem(bookId) {
    const index = this.#data.findIndex((book) => book.id == bookId);

    if (index === -1) {
      throw new Error("El libro no está en el carrito");
    }

    // slice = cut a part without modify original array. = books.slice(start,end)
    // splice = modify original array, delete, insert or replace. = books.splice(start,quantity)
    this.#data.splice(index, 1);
  }

  toString() {
    return this.#data
      .map((book) => book.toString())
      .join("\n\n");
  }

  getData() {
    return this.#data;
  }
}