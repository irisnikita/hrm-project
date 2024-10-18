import userController from "./user";

const mockCtx = {
  request: {
    body: {},
  },
  body: null,
  badRequest: jest.fn(),
};

const mockNext = jest.fn();

describe("user controller", () => {
  describe("checkUsername", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return true if username is available", async () => {
      mockCtx.request.body = { username: "test@gmail.com" };
      const mockCheckUsername = jest.fn().mockResolvedValue(false);

      (global.strapi.service as jest.Mock).mockReturnValue({
        checkUsername: mockCheckUsername,
      });

      await userController.checkUsername(mockCtx, mockNext);

      expect(global.strapi.service).toHaveBeenCalledWith("api::user.user");
      expect(mockCheckUsername).toHaveBeenCalledWith("test@gmail.com");
      expect(mockCtx.body).toEqual({
        data: {
          available: true,
        },
        meta: {},
      });
    });

    it("should return false if username is not available", async () => {
      mockCtx.request.body = { username: "test@gmail.com" };
      const mockCheckUsername = jest.fn().mockResolvedValue(true);

      (global.strapi.service as jest.Mock).mockReturnValue({
        checkUsername: mockCheckUsername,
      });

      await userController.checkUsername(mockCtx, mockNext);

      expect(global.strapi.service).toHaveBeenCalledWith("api::user.user");
      expect(mockCheckUsername).toHaveBeenCalledWith("test@gmail.com");
      expect(mockCtx.body).toEqual({
        data: {
          available: false,
        },
        meta: {},
      });
    });

    it("should call ctx.badRequest if username is missing", async () => {
      mockCtx.request.body = { username: "" };
      await userController.checkUsername(mockCtx, mockNext);

      expect(mockCtx.badRequest).toHaveBeenCalledWith(
        "username is a required field"
      );
    });
  });
});
