/**
 * A set of functions called "actions" for `log`
 */

export default {
  getLogs: async (ctx, next) => {
    try {
      const logs = await strapi.service("api::log.log").getLogs();

      ctx.send(logs);
    } catch (err) {
      ctx.send(err);
    }
  },
};
