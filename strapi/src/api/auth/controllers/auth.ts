/**
 * A set of functions called "actions" for `auth`
 */

export default {
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }
  validateToken: async (ctx) => {
    try {
      const data = await strapi.service("api::auth.auth").validateToken(ctx);

      ctx.body = {
        data,
        meta: {},
      };
    } catch (error) {
      throw new Error(error);
    }
  },
};
