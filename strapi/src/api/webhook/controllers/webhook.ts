/**
 * A set of functions called "actions" for `webhook`
 */

// Utils
import { logger } from "../../../utils";

export default {
  handleWebhook: async (ctx) => {
    try {
      const body = ctx.request.body;
      const query = ctx.request.query;

      logger.info("Handle webhook", {
        body,
        query,
      });

      return ctx.send({ message: "Webhook handled successfully" });
    } catch (error) {
      throw new Error(error);
    }
  },
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }
};
