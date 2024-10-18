/**
 * A set of functions called "actions" for `user`
 */

import { yup } from "@strapi/utils";

const schema = yup.object().shape({
  username: yup.string().required(),
});

export default {
  checkUsername: async (ctx, next) => {
    try {
      await schema.validate(ctx.request.body);

      const isExist = await strapi
        .service("api::user.user")
        .checkUsername(ctx.request.body.username);

      ctx.body = {
        data: {
          available: !isExist,
        },
        meta: {},
      };
    } catch (error) {
      ctx.badRequest(error.message);
    }
  },
};
