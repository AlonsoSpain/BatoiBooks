// @vitest-environment jsdom

import { beforeEach, describe, expect, test, vi } from "vitest";
import View from "../view/index.js";

describe("View", () => {
  let view;

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    view = new View();
    view.init();
  });

  test("muestra los módulos en el desplegable", () => {
    view.selectModulos([
      { code: "0011" },
      { code: "0020" },
    ]);

    const options = [...document.querySelectorAll("#moduleSelect option")];

    expect(options).toHaveLength(3);
    expect(options[1].value).toBe("0011");
    expect(options[2].textContent).toBe("0020");
  });

  test("muestra las tarjetas de libros", () => {
    view.mostrarLibros([
      {
        id: 1,
        moduleCode: "5025",
        publisher: "Apunts",
        pages: 25,
        status: "good",
        photo: "",
        soldDate: "2023-02-01",
        comments: "Sin uso",
        price: 12,
      },
    ]);

    expect(document.querySelectorAll(".card")).toHaveLength(1);
    expect(document.querySelector(".card").textContent).toContain("Apunts");
    expect(document.querySelector(".card").textContent).toContain("12 €");
  });

  test("no duplica las tarjetas al actualizar", () => {
    const books = [
      {
        id: 1,
        moduleCode: "5025",
        publisher: "Apunts",
        pages: 25,
        status: "good",
        photo: "",
        soldDate: "",
        comments: "",
        price: 12,
      },
    ];

    view.mostrarLibros(books);
    view.mostrarLibros(books);

    expect(document.querySelectorAll(".card")).toHaveLength(1);
  });

  test("el callback recibe los datos con los tipos correctos", () => {
    const callback = vi.fn();

    view.setGuardarHandler(callback);

    document.querySelector("#moduleSelect").value = "";
    document.querySelector("#editorial").value = "Apunts";
    document.querySelector("#precio").value = "12";
    document.querySelector("#paginas").value = "25";
    document.querySelector("#status").value = "good";

    document.querySelector("#bookForm").dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    );

    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({
        publisher: "Apunts",
        price: 12,
        pages: 25,
      }),
    );
  });

  test("el callback de eliminar recibe la ID", () => {
    const callback = vi.fn();

    view.setEliminarHandler(callback);
    document.querySelector("#id-eliminar").value = "10";
    document.querySelector("#btn-eliminar").click();

    expect(callback).toHaveBeenCalledWith("10");
  });

  test("una eliminación sin ID muestra un error", () => {
    const callback = vi.fn();

    view.setEliminarHandler(callback);
    document.querySelector("#btn-eliminar").click();

    expect(callback).not.toHaveBeenCalled();
    expect(document.querySelector("#messages").textContent)
      .toContain("obligatoria");
  });

  test("los mensajes informativos desaparecen después de tres segundos", () => {
    vi.useFakeTimers();

    view.mostrarMensaje("Correcto", "info");

    expect(document.querySelector(".alert")).not.toBeNull();

    vi.advanceTimersByTime(3000);

    expect(document.querySelector(".alert")).toBeNull();

    vi.useRealTimers();
  });

  test("los mensajes de error permanecen", () => {
    vi.useFakeTimers();

    view.mostrarMensaje("Error", "error");
    vi.advanceTimersByTime(3000);

    expect(document.querySelector(".alert")).not.toBeNull();

    vi.useRealTimers();
  });
});