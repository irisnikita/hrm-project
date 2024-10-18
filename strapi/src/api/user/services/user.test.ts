// Services
import userService from "./user";

describe("user service", () => {
  let service: ReturnType<typeof userService>;

  beforeEach(() => {
    jest.clearAllMocks();
    service = userService();
  });

  describe("checkUsername", () => {
    it("should return true if username is available", async () => {
      const mockUser = {
        username: "test",
        email: "test@gmail.com",
      };
      const mockQuery = {
        findOne: jest.fn().mockResolvedValue(mockUser),
      };

      (global.strapi.query as jest.Mock).mockReturnValue(mockQuery);

      const result = await service.checkUsername("test");

      expect(result).toBe(true);
      expect(global.strapi.query).toHaveBeenCalledWith(
        "plugin::users-permissions.user"
      );
      expect(mockQuery.findOne).toHaveBeenCalledWith({
        where: {
          username: "test",
        },
        select: ["username", "email"],
      });
    });

    it("should return false if username is not available", async () => {
      const mockQuery = {
        findOne: jest.fn().mockResolvedValue(null),
      };

      (global.strapi.query as jest.Mock).mockReturnValue(mockQuery);

      const result = await service.checkUsername("nonExistingUser");

      expect(result).toBe(false);
      expect(global.strapi.query).toHaveBeenCalledWith(
        "plugin::users-permissions.user"
      );
      expect(mockQuery.findOne).toHaveBeenCalledWith({
        where: {
          username: "nonExistingUser",
        },
        select: ["username", "email"],
      });
    });

    it("should throw an error if query fails", async () => {
      const mockError = new Error("Database query failed");
      const mockQuery = {
        findOne: jest.fn().mockRejectedValue(mockError),
      };

      (global.strapi.query as jest.Mock).mockReturnValue(mockQuery);

      await expect(service.checkUsername("nonExistingUser")).rejects.toThrow(
        "Database query failed"
      );
      expect(global.strapi.query).toHaveBeenCalledWith(
        "plugin::users-permissions.user"
      );
    });
  });
});
