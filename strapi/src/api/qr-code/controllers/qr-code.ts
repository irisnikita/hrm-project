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
      const { qrCodeId, zaloUserId } = ctx.request.body || {};

      const updatedData = await strapi
        .service("api::qr-code.qr-code")
        .useQrCode({ qrCodeId, zaloUserId });

      return {
        data: updatedData,
        meta: {},
      };
    },
  })
);
