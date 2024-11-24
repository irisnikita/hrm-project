/**
 * transaction controller
 */

import { factories } from "@strapi/strapi";
import { yup } from "@strapi/utils";

const countTransactionsSchema = yup.object().shape({
  zaloUserId: yup.string().required(),
});

export default factories.createCoreController(
  "api::transaction.transaction",
  ({ strapi }) => ({
    countTransactions: async (ctx) => {
      try {
        const queryParams = ctx.query;

        await countTransactionsSchema.validate(queryParams);

        const count = await strapi
          .service("api::transaction.transaction")
          .countTransactions(queryParams);

        console.log("count", count);

        ctx.body = {
          data: count,
          meta: {},
        };
      } catch (error) {
        ctx.badRequest(error.message);
      }
    },
  })
);
