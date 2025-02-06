/**
 * user service
 */

// Libraries
import bcrypt from "bcryptjs";

// Constants
import { MAP_ROLE_TYPE } from "../../../constants";

// Utils
import { logger, parseJson } from "../../../utils";

export default () => ({
  async checkUsername(username: string) {
    try {
      const exitingUser = await strapi
        .query("plugin::users-permissions.user")
        .findOne({
          where: {
            username,
          },
          select: ["username", "email"],
        });

      logger.info("Check username is available or not", {
        action: this.checkUsername.name,
        exitingUser,
      });

      return !!exitingUser;
    } catch (err) {
      throw new Error(err);
    }
  },
  async createUser(registerInfo: any) {
    try {
      const { username, organizations, role } = parseJson(registerInfo) || {};

      // Check if username is available
      const isUsernameAvailable = await this.checkUsername(username);

      // Check if username is available
      if (isUsernameAvailable) {
        throw "Username already taken";
      }

      // Hash password
      registerInfo.password = await bcrypt.hash(registerInfo.password, 10);

      const user = await strapi.query("plugin::users-permissions.user").create({
        data: registerInfo,
      });

      await strapi.query("api::organization-role.organization-role").create({
        data: {
          user: user.id,
          organization: organizations?.[0],
          role: MAP_ROLE_TYPE[role],
          publishedAt: new Date(),
        },
      });

      return user;
    } catch (error) {
      throw new Error(error);
    }
  },
  async findByField(field, value) {
    // Join user points table
    const data = await strapi.entityService.findMany(
      "plugin::users-permissions.user",
      {
        filters: { [field]: value },
        fields: ["fullName", "email", "userId", "id", "firstName", "lastName"],
        populate: ["userPoint"],
      }
    );

    return data;
  },
});
