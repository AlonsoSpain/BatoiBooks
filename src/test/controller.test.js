// @vitest-environment jsdom

import { beforeEach, describe, expect, test, vi } from "vitest";
import Controller from "../controller/index.js";

describe("Controller", () => {
  let controller;

  beforeEach(() => {
    controller = new Controller();

    controller.view.init = vi.fn();
    controller.view.mostrarLibros = vi.fn();
    controller.view.selectModulos = vi.fn();
    controller.view.mostrarMensaje = vi.fn();
    controller.view.limpiarFormulario = vi.fn();
    controller.view.setEliminarHandler = vi.fn();
    controller.view.setGuardarHandler = vi.fn();

    controller.books.populate = vi.fn();
    controller.books.getData = vi.fn(() => [{ id: 1 }]);
    controller.books.addBook = vi.fn();
    controller.books.removeBook = vi.fn();

    controller.modules.populate = vi.fn();
    controller.modules.getData = vi.fn(() => [{ code: "0011" }]);
  });

  test("la inicialización carga los datos y actualiza la vista", async () => {
    await controller.init();

    expect(controller.view.init).toHaveBeenCalled();
    expect(controller.books.populate).toHaveBeenCalled();
    expect(controller.modules.populate).toHaveBeenCalled();
    expect(controller.view.mostrarLibros).toHaveBeenCalledWith([{ id: 1 }]);
    expect(controller.view.selectModulos).toHaveBeenCalledWith([
      { code: "0011" },
    ]);
  });

  test("al añadir un libro guarda, actualiza y limpia el formulario", async () => {
    const data = {
      publisher: "Apunts",
      price: 12,
      pages: 25,
    };

    await controller.handleSubmitBook(data);

    expect(controller.books.addBook).toHaveBeenCalledWith(data);
    expect(controller.view.limpiarFormulario).toHaveBeenCalled();
    expect(controller.view.mostrarMensaje).toHaveBeenCalledWith(
      expect.any(String),
      "info",
    );
  });

  test("si falla el alta muestra un error", async () => {
    controller.books.addBook.mockRejectedValue(new Error("Error"));

    await controller.handleSubmitBook({});

    expect(controller.view.mostrarMensaje).toHaveBeenCalledWith(
      expect.any(String),
      "error",
    );
    expect(controller.view.mostrarMensaje).not.toHaveBeenCalledWith(
      expect.any(String),
      "info",
    );
  });

  test("al eliminar actualiza el listado", async () => {
    await controller.handleRemoveBook("10");

    expect(controller.books.removeBook).toHaveBeenCalledWith("10");
    expect(controller.view.mostrarLibros).toHaveBeenCalled();
  });

  test("si falla la eliminación muestra un error", async () => {
    controller.books.removeBook.mockRejectedValue(new Error("Error"));

    await controller.handleRemoveBook("999");

    expect(controller.view.mostrarMensaje).toHaveBeenCalledWith(
      expect.any(String),
      "error",
    );
  });
});