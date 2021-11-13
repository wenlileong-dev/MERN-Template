const supertest = require("supertest");
const app = require("../../index");
const supertestRequest = supertest(app);

describe("secret route testing", function () {
  jest.setTimeout(10000);

  test("without login", async function () {
    const res = await supertestRequest.get("/api");
    expect(res.body.status).toBe(401);
  });

  test("with login", async function () {
    //login
    let loginInput = {
      email: "test@mail.com",
      password: "1234Qwer",
    };
    const loginres = await supertestRequest
      .post("/api/user/login")
      .send(loginInput);
    expect(loginres.body.status).toBe(200);
    let token = loginres.body.token;

    //go to secret route successfully
    const res = await supertestRequest
      .get("/api")
      .set("Cookie", [`token=${token}`]);
    expect(res.body.status).toBe(200);
  });
});
