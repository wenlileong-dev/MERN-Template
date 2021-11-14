const supertest = require("supertest");
const app = require("../../index");

describe("secret route testing", function () {
  jest.setTimeout(10000);
  let registerInputInvalid = {
    email: "test123",
    password: "1234qwer",
  };
  let registerInputValid = { email: "test1@mail.com", password: "1234Qwer" };
  let loginInputInvalid1 = { email: "test1@mail.com", password: "1234Qwer" };
  let loginInputInvalid2 = { email: "test@mail.com", password: "1234qwer" };
  let loginInputValid = { email: "test@mail.com", password: "1234Qwer" };
  test("register with invalid input", async function () {
    const loginres = await supertest(app)
      .post("/api/user/register")
      .send(registerInputInvalid);
    expect(loginres.body.status).toBe(400);
  });

  test("register with valid input", async function () {
    const registerres = await supertest(app)
      .post("/api/user/register")
      .send(registerInputValid);
    let token = registerres.body.token;
    expect(registerres.body.status).toBe(200);
    await supertest(app)
      .delete("/api/user/deleteUser")
      .set("Cookie", [`token=${token}`]);
  });

  test("login with not registered email", async function () {
    const registerres = await supertest(app)
      .post("/api/user/login")
      .send(loginInputInvalid1);
    expect(registerres.body.status).toBe(400);
    expect(registerres.body.errorMsg).toBe("email not found");
  });
  test("login with incorrect password", async function () {
    const registerres = await supertest(app)
      .post("/api/user/login")
      .send(loginInputInvalid2);
    expect(registerres.body.status).toBe(400);
    expect(registerres.body.errorMsg).toBe("email and password is not match");
  });
  test("login with valid input", async function () {
    const registerres = await supertest(app)
      .post("/api/user/login")
      .send(loginInputValid);
    expect(registerres.body.status).toBe(200);
  });
});
