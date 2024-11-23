/**
 * qr-code service
 */

import { factories } from "@strapi/strapi";

// Constants
import { QR_CODE_STATUS } from "../../../constants";

type BulkCreateArgs = {
  data: any[];
};

export default factories.createCoreService(
  "api::qr-code.qr-code",
  ({ strapi }) => ({
    bulkCreate: async (bodyData: BulkCreateArgs) => {
      try {
        // Bulk Create
        const results = await strapi.db
          .query("api::qr-code.qr-code")
          .createMany({
            data: bodyData.data?.map((data: any) => ({
              ...data,
              publishedAt: new Date(),
              product: "1",
            })),
            populate: true,
          });

        const { ids } = results || {};

        // Insert into relation table qr_codes_product_links
        if (ids) {
          await strapi.db.connection.raw(
            `INSERT INTO qr_codes_product_links (qr_code_id, product_id) VALUES ${ids
              .map((id: any) => `(${id}, ${bodyData.data[0].product})`)
              .join(", ")}`
          );
        }

        return results;
      } catch (error) {
        throw new Error(error);
      }
    },
    useQrCode: async ({ qrCodeId, zaloUserId }) => {
      try {
        // Get Point data from qrCodeId
        const point = await strapi.db.query("api::qr-code.qr-code").findOne({
          where: { qrCodeId },
          populate: true,
        });

        // If Point is not active (Used, expired, inactive)
        if (point.status !== QR_CODE_STATUS.ACTIVE) {
          return null;
        }

        // Update the QR code status to USED
        await strapi.db.query("api::qr-code.qr-code").update({
          where: { qrCodeId },
          data: { status: QR_CODE_STATUS.USED },
        });

        // Retrieve user points associated with the given zaloUserId
        const userPoint = await strapi.db
          .query("api::user-point.user-point")
          .findOne({ where: { zaloUserId }, populate: true });

        if (!userPoint) {
          // If no user points exist, create a new user point entry
          await strapi.db.query("api::user-point.user-point").create({
            data: {
              zaloUserId,
              totalPoints: point?.points || 0,
              publishedAt: new Date(),
            },
          });
        } else {
          // If user points exist, update the total points
          const currentTotalPoints = userPoint?.totalPoints || 0;
          await strapi.db.query("api::user-point.user-point").update({
            where: { zaloUserId },
            data: {
              totalPoints: +currentTotalPoints + +point?.points,
            },
          });
        }

        return point;
      } catch (error) {}
    },
  })
);
