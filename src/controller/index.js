import View from "../view";
import Books from "../model/Books.class";
import Modules from "../model/Modules.class";

export default class Controller {
  constructor() {
    this.view = new View();
    this.books = new Books();
    this.modules = new Modules();
  }

  async init() {
    this.view.init();
    await this.actualizarCatalogo();

    // This is the function that we passed to use that id.
    this.view.setEliminarHandler((id) => this.eliminarLibro(id));
    this.view.setGuardarHandler((id) => this.guardarLibro(id));
  }

  async actualizarCatalogo() {
    await this.books.populate();
    await this.modules.populate();
    this.view.mostrarLibros(this.books.getData());
    this.view.selectModulos(this.modules.getData());
  }

  handleSubmitBook() {}

  // d7w1Uw2D9PQ
  async eliminarLibro(id) {
    try {
      console.log(id);
      await this.books.removeBook(id);
      const texto = "Libro eliminado con exito";
      this.view.mostrarMensaje(texto, "success");
    } catch (err) {
      console.log("error");
      const texto = "Ha habido un error al eliminar el libro";
      this.view.mostrarMensaje(texto, "error");
    }
  }

  async guardarLibro(data) {
    try {
      await this.books.addBook(data);
      const texto = "Libro añdido con exito";
      this.view.mostrarMensaje(texto, "success");
    } catch (err) {
      console.log("error");
      const texto = "Ha habido un error al añadir el libro";
      this.view.mostrarMensaje(texto, "error");
    }
  }
}
