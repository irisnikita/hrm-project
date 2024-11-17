/**
 * qr-code service
 */

import { factories } from "@strapi/strapi";

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
  })
);
