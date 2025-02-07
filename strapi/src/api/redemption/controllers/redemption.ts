/**
 * redemption controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::redemption.redemption",
  ({ strapi }) => ({
    async redeemCode(ctx) {
      try {
        const bodyData = ctx.request.body;

        const redemption = await strapi
          .service("api::redemption.redemption")
          .redeemCode(bodyData);

        ctx.body = redemption;
      } catch (error) {
        ctx.badRequest(error.message);
      }
    },
    async findByField(ctx) {
      try {
        const { field, value } = ctx.params;
        const { populate, pagination } = ctx.query;
        console.log({ populate, pagination });

        // Join user points table
        const { pagination: paginationMeta, results } = await strapi
          .service("api::redemption.redemption")
          .findByField({
            field,
            value,
            populate,
            pagination,
          });

        return {
          data: results,
          meta: {
            pagination: paginationMeta,
          },
        };
      } catch (error) {
        ctx.badRequest(error.message);
      }
    },
  })
);
