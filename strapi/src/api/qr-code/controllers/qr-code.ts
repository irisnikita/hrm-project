/**
 * qr-code controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::qr-code.qr-code",
  ({ strapi }) => ({
    bulkCreate: async (ctx) => {
      try {
        const bodyData = ctx.request.body;

        const createdData = await strapi
          .service("api::qr-code.qr-code")
          .bulkCreate(bodyData);

        ctx.body = {
          data: !!createdData,
          meta: {},
        };
      } catch (error) {
        ctx.badRequest(error.message);
      }
    },
    useQrCode: async (ctx) => {
      // const body = ctx.request.body;
      // console.log("🚀 ~ useQrCode: ~ ctx:", body);

      const updatedData = await strapi
        .service("api::qr-code.qr-code")
        .useQrCode("133");

      console.log({ updatedData });

      return {
        data: true,
        meta: {},
      };
    },
  })
);
