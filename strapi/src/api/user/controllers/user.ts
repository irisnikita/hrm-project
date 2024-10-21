/**
 * A set of functions called "actions" for `user`
 */

import { yup } from "@strapi/utils";

const checkUserNameSchema = yup.object().shape({
  username: yup.string().required(),
});

const registerUserSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email("Invalid email").required(),
  password: yup.string().required(),
  organizations: yup
    .array()
    .of(yup.number().positive("Organization ID must be a positive number")) // Validate that each organization ID is a positive number
    .min(1, "At least one organization is required") // Require at least one organization
    .required("Organizations are required"),

  role: yup
    .number()
    .positive("Role ID must be a positive number") // Validate that role is a positive number
    .required("Role is required"),
});

export default {
  checkUsername: async (ctx, next) => {
    try {
      await checkUserNameSchema.validate(ctx.request.body);

      const isExist = await strapi
        .service("api::user.user")
        .checkUsername(ctx.request.body.username);

      ctx.body = {
        data: {
          available: !isExist,
        },
        meta: {},
      };
    } catch (error) {
      ctx.badRequest(error.message);
    }
  },
  registerUser: async (ctx, next) => {
    try {
      const { body } = ctx.request || {};

      await registerUserSchema.validate(body);

      const registerUser = await strapi
        .service("api::user.user")
        .registerUser(body);

      ctx.body = {
        data: registerUser,
        meta: {},
      };
    } catch (error) {
      ctx.badRequest(error.message);
    }
  },
};
