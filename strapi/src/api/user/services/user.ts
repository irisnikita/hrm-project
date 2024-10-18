/**
 * user service
 */

// Utils
import { logger } from "../../../utils";

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
});
