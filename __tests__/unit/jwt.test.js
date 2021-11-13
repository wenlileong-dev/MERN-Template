const { authUser } = require("../../controllers/authUser");

const mockRequest = (token) => {
  return { cookies: { token: token } };
};

const mockResponse = () => {
  const res = {};
  res.clearCookie = jest.fn();
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("test jwt token", () => {
  test("empty token", async () => {
    const req = mockRequest("");
    const res = mockResponse();
    const next = jest.fn();
    await authUser(req, res, next);
    expect(res.json).toHaveBeenCalledWith({
      status: 401,
      errorMsg: "Access denied...No token provided...",
    });
  });

  test("invalid token", async () => {
    const req = mockRequest("invalidtoken");
    const res = mockResponse();
    const next = jest.fn();
    await authUser(req, res, next);
    expect(res.json).toHaveBeenCalledWith({
      status: 400,
      errorMsg: "Access denied...Invalied token",
    });
  });
});
