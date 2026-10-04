import { describe, test, expect } from "vitest";
import Book from "../model/Book.class";


describe("Book", () => {
  test("Crear exitosamente un libro", () => {
    const book = new Book(12, 10, 10, "Genius", 20.55, 30, "good");

    expect(book.id).toBe(12);
    expect(book.userId).toBe(10);
    expect(book.moduleCode).toBe(10);
    expect(book.publisher).toBe("Genius");
    expect(book.price).toBe(20.55);
    expect(book.pages).toBe(30);
    expect(book.status).toBe("good");
    expect(book.photo).toBe("");
    expect(book.comments).toBe("");
    expect(book.soldDate).toBe("");
  });

  

});
