import { describe, test, expect, toBeInstanceOf } from "vitest";
// import Users from "./model/Users.class.js";

import Users from "../model/Users.class.js";

import {
  getDBUsers,
  getDBUser,
} from "../services/api.js";


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



describe("Users.getUserById", () => {
  test("obtiene un usuario sin ejecutar populate previamente", async () => {
    const users = new Users();

    const user = await users.getUserById(2);

    expect(user.nick).toBe("Ignasi");
    expect(user.email).toBe("ignasi.gomis.mullor@gmail.com");
  });

  test("rechaza la promesa si el usuario no existe", async () => {
    const users = new Users();

    await expect(users.getUserById(999)).rejects.toThrow(
      "El usuario no existe",
    );
  });
});