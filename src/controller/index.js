import View from "../view";
import Books from "../model/Books.class";
import Modules from "../model/Modules.class";
import Cart from "../model/Cart.class";

export default class Controller {
  constructor() {
    this.view = new View();
    this.books = new Books();
    this.modules = new Modules();
    this.cart = new Cart();
  }

  async init() {
    this.view.init();
    await this.actualizarCatalogo();

    // User Actions: Send form, add, edit, delete

    this.view.setSubmitHandler((data) => {
      this.handleSubmitBook(data);
    });

    // From view call a function from controler is not correct, view don't need to know controller
    // This function doesn't wait for a click, it runs once during by all the life of the app
    this.view.setBookActionHandler((action, id) => {
      if (action === "cart") {
        this.handleAddToCart(id);
      } else if (action === "edit") {
        this.handleEditBook(id);
      } else if (action === "delete") {
        this.handleRemoveBook(id);
      }
    });

    this.cart.populate();
  }

  async actualizarCatalogo() {
    await this.books.populate();
    await this.modules.populate();

    this.view.mostrarLibros(this.books.getData());
    this.view.selectModulos(this.modules.getData());
  }

  // Just add it to the cart created
  handleAddToCart(id) {
    try {
      const book = this.books.getBookById(id);

      this.cart.addItem(book);
      this.view.mostrarMensaje("Libro añadido al carrito", "info");
    } catch (err) {
      this.view.mostrarMensaje("El libro ya está en el carrito", "error");
    }
  }
  // Alert before delete:
  async handleRemoveBook(id) {
    try {
      const book = this.books.getBookById(id);

      const confirmado = confirm(
        `¿Quieres eliminar el libro ${book.id} del módulo ${book.moduleCode}?`,
      );

      if (!confirmado) {
        return;
      }

      console.log(id);
      await this.books.removeBook(id);
      const texto = "Libro eliminado con exito";
      await this.actualizarCatalogo();
      this.view.mostrarMensaje(texto, "info");
    } catch (err) {
      console.log("error");
      const texto = "Ha habido un error al eliminar el libro";
      this.view.mostrarMensaje(texto, "error");
    }
  }

  // If not exists to edit so we'll add it.
  async handleSubmitBook(data) {
    try {
      if (data.id) {
        await this.books.changeBook(data);
        this.view.mostrarMensaje("Libro modificado con éxito", "info");
      } else {
        await this.books.addBook(data);
        this.view.mostrarMensaje("Libro añadido con éxito", "info");
      }

      await this.actualizarCatalogo();
      this.view.limpiarFormulario();
    } catch (err) {
      this.view.mostrarMensaje("No se ha podido guardar el libro", "error");
    }
  }

  handleEditBook(id) {
    try {
      const book = this.books.getBookById(id);
      this.view.prepareEdit(book);
    } catch (err) {
      this.view.mostrarMensaje("No se ha encontrado el libro", "error");
    }
  }
}
