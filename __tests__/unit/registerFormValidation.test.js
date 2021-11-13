const { userValidator } = require("../../validation/userValidator");
require("./../../models/db");

const mockRequest = (email, password) => {
  return { body: { email: email, password: password } };
};

const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("register user form validation", () => {
  jest.setTimeout(10000);

  test("empty form - no email and password", async () => {
    const req = mockRequest("", "");
    const res = mockResponse();
    const next = jest.fn();
    await userValidator(req, res, next);
    let errorMsg = ["email is required", "password is required"];
    expect(res.json).toHaveBeenCalledWith({ status: 400, errorMsg: errorMsg });
  });

  test("invalid email format", async () => {
    const req = mockRequest("1234Qwer", "1234Qwer");
    const res = mockResponse();
    const next = jest.fn();
    await userValidator(req, res, next);
    let errorMsg = ["email is not valid"];
    expect(res.json).toHaveBeenCalledWith({ status: 400, errorMsg: errorMsg });
  });

  test("duplicated email", async () => {
    const req = mockRequest("test@mail.com", "1234Qwer");
    const res = mockResponse();
    const next = jest.fn();
    await userValidator(req, res, next);
    let errorMsg = ["email is registered"];
    expect(res.json).toHaveBeenCalledWith({ status: 400, errorMsg: errorMsg });
  });

  test("password with just numbers", async () => {
    const req = mockRequest("test1@mail.com", "1234567");
    const res = mockResponse();
    const next = jest.fn();
    await userValidator(req, res, next);
    let errorMsg = ["password is not strong"];
    expect(res.json).toHaveBeenCalledWith({ status: 400, errorMsg: errorMsg });
  });

  test("valid email and password", async () => {
    const req = mockRequest("test1@mail.com", "1234Qwer");
    const res = mockResponse();
    const next = jest.fn();
    await userValidator(req, res, next);
    let errorMsg = ["password is not strong"];
    expect(next).toHaveBeenCalled();
  });
});
