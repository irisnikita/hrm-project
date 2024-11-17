/**
 * qr-code controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::qr-code.qr-code', ({strapi}) => ({
  bulkCreate: async (ctx) => {
    try {
      console.log("hello");
    } catch (error) {
      
    }
  }
}));
