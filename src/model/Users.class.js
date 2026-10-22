import User from "./User.class";

import {
  getDBUsers,
  addDBUser,
  removeDBUser,
  changeDBUser,
  changeDBUserPassword,
} from "../services/api";

export default class Users {
  #data;

  constructor() {
    this.#data = [];
  }

  async populate() {
    const res = await getDBUsers();

    if (res != undefined) {
      this.#data = res.map(
        (user) => new User(user.id, user.nick, user.email, user.password),
      );
    }
  }

  async addUser(user) {
    const users = await getDBUsers();

    const userId = Math.max(...users.map((u) => u.id)) + 1;

    let userCreated = new User(userId, user.nick, user.email, user.password);

    const res = await addDBUser(userCreated);

    this.populate();
  }

  async removeUser(userId) {
    // Check here first if the user exists.
    let users = await getDBUsers();

    let index = users.findIndex((user) => user.id == userId);

    if (index != -1) {
      const res = await removeDBUser(userId);
      this.populate();
    } else {
      throw new Error("El usuario no existe");
    }

    this.populate();
  }

  async changeUser(userReceived) {
    let users = await getDBUsers();

    let userIndex = users.findIndex((user) => user.id === userReceived.id);

    if (userIndex != -1) {
      const res = await changeDBUser(userReceived);
      this.populate();
    } else {
      throw new Error("El usuario no existe");
    }
  }

  async changeUserPassword(userId, password) {
    let users = await getDBUsers();

    let userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex != -1) {
      const res = await changeDBUserPassword(userId, password);
      this.populate();
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

  getData() {
    return this.#data;
  }
}
