/**
 * redemption service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::redemption.redemption",
  ({ strapi }) => ({
    async redeemCode(data) {
      const { userId, giftId } = data || {};

      // Get gift info
      const gift = await strapi.entityService.findOne(
        "api::gift.gift",
        giftId,
        {
          fields: ["pointsRequired"],
        }
      );

      // Get user info
      const userInfo = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userId,
        {
          populate: ["userPoint"],
        }
      );

      const availablePoints =
        +(userInfo.userPoint?.totalPoints || 0) -
        parseInt(`${userInfo.userPoint?.usedPoints || 0}`);

      // Check if user has enough points
      if (availablePoints < +gift.pointsRequired) {
        throw new Error("User does not have enough points");
      }

      // Update user points
      await strapi.entityService.update(
        "api::user-point.user-point",
        userInfo.userPoint.id,
        {
          data: {
            usedPoints:
              parseInt(userInfo.userPoint.usedPoints) + gift.pointsRequired,
          },
        }
      );

      // Create redemption
      const redemption = await strapi.entityService.create(
        "api::redemption.redemption",
        {
          data: {
            user: userId,
            gift: giftId,
            redeemedAt: new Date(),
            publishedAt: new Date(),
            pointsUsed: gift.pointsRequired,
            status: "pending",
          },
        }
      );

      return redemption;
    },
    async findByField({
      field,
      value,
      populate = "gift,user",
      pagination,
    }: {
      field: string;
      value: string;
      populate?: any | any[];
      pagination?: {
        page?: number;
        pageSize?: number;
      };
    }) {
      const formattedPopulate = Array.isArray(populate)
        ? populate
        : populate.split(",");

      const paginationData = await strapi.entityService.findPage(
        "api::redemption.redemption",
        {
          filters: { [field]: value },
          populate: formattedPopulate,
          ...pagination,
          // page: pagination?.page || 1,
          // pageSize: pagination?.pageSize || 10,
        }
      );

      return paginationData;
    },
  })
);
