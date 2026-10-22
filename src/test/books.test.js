import { describe, test, expect } from "vitest";
import Books from "../model/Books.class.js";

import {
  getDBBooks,
  getDBBook,
} from "../services/api.js";

test("getDBBooks", async () => {
  const res = await getDBBooks();

  expect(res).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        comments: "",
        id: "1",
        moduleCode: "5025",
        pages: 25,
        photo: "",
        price: 12,
        publisher: "Apunts",
        soldDate: "2023-02-01",
        status: "good",
        userId: 2,
      }),
    ]),
  );
});

test("getDBBook", async () => {
  const res = await getDBBook(1);

  expect(res).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        comments: "",
        id: "1",
        moduleCode: "5025",
        pages: 25,
        photo: "",
        price: 12,
        publisher: "Apunts",
        soldDate: "2023-02-01",
        status: "good",
        userId: 2,
      }),
    ]),
  );
});

test("addDBBook", async () => {
  const book = {
    userId: 2,
    moduleCode: "5025",
    publisher: "Apunts",
    price: 12,
    pages: 25,
    status: "good",
    photo: "",
    comments: "",
    soldDate: "2023-02-01",
  };

  const books = new Books();

  await books.addBook(book);

  const booksAvailables = await getDBBooks();

  expect(booksAvailables).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        comments: "",
        moduleCode: "5025",
        pages: 25,
        photo: "",
        price: 12,
        publisher: "Apunts",
        soldDate: "2023-02-01",
        status: "good",
        userId: 2,
      }),
    ]),
  );
});

test("changeBook", async () => {
  const bookReceived = {
    id: "1",
    userId: 2,
    moduleCode: "5025",
    publisher: "Apunts",
    price: 20,
    pages: 25,
    status: "good",
    photo: "",
    comments: "",
    soldDate: "2023-02-01",
  };

  const books = new Books();

  await books.changeBook(bookReceived);

  const booksAvailable = await getDBBooks();

  expect(booksAvailable).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: "1",
        userId: 2,
        moduleCode: "5025",
        publisher: "Apunts",
        price: 20,
        pages: 25,
        status: "good",
        photo: "",
        comments: "",
        soldDate: "2023-02-01",
      }),
    ]),
  );
});


test("removeBook", async () => {
  const bookId = "10";

  const books = new Books();

  const res = await books.removeBook(bookId);
  
  const booksAvailable = await getDBBooks();

  expect(booksAvailable).not.toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: bookId,
      }),
    ]),
  );
});
