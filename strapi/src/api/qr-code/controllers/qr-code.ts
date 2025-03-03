/**
 * qr-code controller
 */

import { factories } from "@strapi/strapi";
import { yup } from "@strapi/utils";
import { parseJson } from "../../../utils";

const useQrCodeSchema = yup.object().shape({
  qrCodeId: yup.string().required(),
  zaloUserId: yup.string().required(),
});

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
      try {
        // await useQrCodeSchema.validate(ctx.request.body);
        const dataBody = ctx.request.body;
        const { qrCodeId, zaloUserId, userId } = parseJson(dataBody);

        const updatedData = await strapi
          .service("api::qr-code.qr-code")
          .useQrCode({
            qrCodeId,
            zaloUserId,
            userId,
          });

        return {
          data: updatedData,
          meta: {},
        };
      } catch (error) {
        ctx.badRequest(error.message);
      }
    },
  })
);
