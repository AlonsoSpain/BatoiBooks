import { describe, test, expect, toBeInstanceOf } from "vitest";
// import Users from "./model/Users.class.js";

import Books from "../model/Books.class.js";
import Users from "../model/Users.class.js";

import {
  getDBUsers,
  getDBUser,
} from "../services/api.js";

/*
describe("Users", () => {
  test("Populate carga todos los usuarios", () => {
    const users = new Users();
    users.populate(datos.users);

    expect(users.getData()).toHaveLength(datos.users.length);
  });

  test("Populate crea siempre instancias de usuarios", () => {
    const users = new Users();
    users.populate(datos.users);

    users.getData().forEach((user) => {
      expect(user).toBeInstanceOf(User);
    });
  });
});

describe("addUser", () => {
  const newUser = new User(0, "Alex", "alex@gmail.com", 1234);

  test("retorna el usuario creado", () => {
    const users = new Users();
    users.populate(datos.users);

    const user = users.addUser(newUser);

    expect(user).toBeInstanceOf(User);
    expect(user.nick).toBe("Alex");
    expect(user.email).toBe("alex@gmail.com");
    expect(user.password).toBe(1234);
  });

  test("añade un nuevo libro a la colección", () => {
    const users = new Users();
    users.populate(datos.users);

    let previousLength = users.getData().length;

    users.addUser(newUser);

    expect(users.getData()).toHaveLength(previousLength + 1);
  });
});

describe("removeUser", () => {
  const users = new Users();
  users.populate(datos.users);

  test("elimina el elemento correspondiente", () => {
    users.removeUser(2);

    expect(users.getData().find((user) => user.id == 2)).toBeUndefined();
  });

  test("lanza un error si el usuario no existe", () => {
    expect(() => users.removeUser(999)).toThrow("El usuario no existe");
  });
});

describe("changeUser", () => {
  const users = new Users();
  users.populate(datos.users);

  test("modifica el usuario indicado", () => {
    const userModified = {
      id: 2,
      email: "nuevo@correo.com",
      nick: "ana2",
      password: "1234",
    };

    users.changeUser(userModified);

    const userFound = users.getData().find((user) => user.id == 2);
    expect(userFound.email).toBe("nuevo@correo.com");
    expect(userFound.nick).toBe("ana2");
  });

  test("retorna el usuario modificado", () => {
    const userModified = {
      id: 2,
      email: "nuevo@correo.com",
      nick: "ana2",
      password: "1234",
    };

    const result = users.changeUser(userModified);

    expect(result).toBe(userModified);
  });
});

// Inherited methods:

describe("getUserById", () => {
  const users = new Users();
  users.populate(datos.users);

  test("devuelve el usuario con id 2", () => {
    const user = users.getUserById(2);
    expect(user.nick).toBe("Ignasi");
    expect(user.email).toBe("ignasi.gomis.mullor@gmail.com");
  });

  test("lanza error con un id que no existe", () => {
    expect(() => users.getUserById(99999)).toThrow("El usuario no existe");
  });
});

describe("getUserIndexById", () => {
  const users = new Users();
  users.populate(datos.users);

  test("devuelve el índice del usuario con id 3", () => {
    const index = users.getUserIndexById(3);
    expect(datos.users[index].nick).toBe("Juan");
  });

  test("lanza error con un id que no existe", () => {
    expect(() => users.getUserIndexById(99999)).toThrow("El usuario no existe");
  });
});

describe("getUserByNickName", () => {
  const users = new Users();
  users.populate(datos.users);

  test("devuelve el usuario 'Ignasi'", () => {
    const user = users.getUserByNickName("Ignasi");
    expect(user.id).toBe(2);
  });

  test("lanza error con un nick que no existe", () => {
    expect(() => users.getUserByNickName("no-existe")).toThrow(
      "El usuario no existe",
    );
  });
});
*/

/* Test asynchronous instructions like a virtual db using MWN */
test("getDBUsers", async () => {
  const res = await getDBUsers();

  expect(res).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        email: "ignasi.gomis.mullor@gmail.com",
        id: "2",
        nick: "Ignasi",
        password: "1234",
      }),
    ]),
  );
});


test("getDBUser", async () => {
  const res = await getDBUser(2);

  expect(res).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        email: "ignasi.gomis.mullor@gmail.com",
        id: "2",
        nick: "Ignasi",
        password: "1234",
      }),
    ]),
  );
});


test("addDBUser", async () => {
  const user = {
    email: "alonso.test@gmail.com",
    nick: "Alonso",
    password: "123456",
  };

  const users = new Users();

  await users.addUser(user);

  const usersAvailables = await getDBUsers();

  expect(usersAvailables).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        email: "alonso.test@gmail.com",
        nick: "Alonso",
        password: "123456",
      }),
    ]),
  );
});


test("removeUser", async () => {
  const userId = "1";

  const users = new Users();

  const res = await users.removeUser(userId);
  
  const usersAvailable = await getDBUsers();

  expect(usersAvailable).not.toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: userId,
      }),
    ]),
  );
});


test("changeUser", async () => {
  const userReceived = {
    id: "2",
    email: "ignasi.gomis.mullor@gmail.com",
    nick: "IgnasiModificado",
    password: "1234",
  };

  const users = new Users();

  await users.changeUser(userReceived);

  const usersAvailable = await getDBUsers();

  expect(usersAvailable).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: "2",
        email: "ignasi.gomis.mullor@gmail.com",
        nick: "IgnasiModificado",
        password: "1234",
      }),
    ]),
  );
});

test("changeUserPassword", async () => {
  const userId = "2";
  const newPassword = "5678";

  const users = new Users();

  await users.changeUserPassword(userId, newPassword);

  const usersAvailable = await getDBUsers();

  expect(usersAvailable).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: "2",
        email: "ignasi.gomis.mullor@gmail.com",
        nick: "Ignasi",
        password: "5678",
      }),
    ]),
  );
});

