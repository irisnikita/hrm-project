/**
 * transaction service
 */

import { factories } from "@strapi/strapi";

type CountTransactionsBody = {
  zaloUserId: string;
};

export default factories.createCoreService(
  "api::transaction.transaction",
  ({ strapi }) => ({
    countTransactions: async ({ zaloUserId }: CountTransactionsBody) => {
      try {
        const count = await strapi.db
          .query("api::transaction.transaction")
          .count({
            where: { zaloUserId },
          });

        return count;
      } catch (error) {
        throw new Error(error);
      }
    },
  })
);
