import User from "./User.class";

export default class Users {
  #data;

  constructor() {
    this.#data = [];
  }

  // We use User class as template to replace their properties with the properties of objects we're passing it.
  populate(array) {
    this.#data = array.map(
      (user) => new User(user.id, user.nick, user.email, user.password),
    );
  }


  // We create an array with ids and we extracts numbers with spread.
  addUser(user) {

    const userId = Math.max(...(this.#data.map(user => user.id))) + 1;

    let userCreated = new User(userId,user.nick,user.email,user.password);

    this.#data.push(userCreated);

    return userCreated;
  }

  removeUser(id) {
    let index = this.#data.findIndex((user) => user.id == id);

    if (index != -1) {
      this.#data.splice(index, 1);
    } else {
      throw new Error("El usuario no existe");
    }
  }

  changeUser(userReceived) {
    let userIndex = this.#data.findIndex((user) => user.id === userReceived.id);

    if (userIndex != -1) {
      this.#data.splice(userIndex, 1, userReceived);
      return userReceived;
    } else {
      throw new Error("El usuario no existe");
    }
  }

  toString() {
    let res = [];

    this.#data.forEach((user) => {
      res += `${user.toString()} \n\n `;
    });

    return res;
  }

  getUserById(userId) {
    const existence = this.#data.find((user) => user.id == userId);

    if (!existence) {
      throw new Error("El usuario no existe");
    }
    return existence;
  }

  getUserIndexById(userId) {
    const index = this.#data.findIndex((user) => user.id == userId);

    if (index < 0) {
      throw new Error("El usuario no existe");
    }
    return index;
  }

  getUserByNickName(nick) {
    const existence = this.#data.find((user) => user.nick == nick);

    if (!existence) {
      throw new Error("El usuario no existe");
    }

    return existence;
  }


  getData(){
    return this.#data;
  }
}
