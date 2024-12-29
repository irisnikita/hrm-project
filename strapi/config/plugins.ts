export default ({ env }) => ({
  email: {
    config: {
      provider: "strapi-provider-email-resend",
      providerOptions: {
        apiKey: env("RESEND_API_KEY"), // Required
      },
      settings: {
        defaultFrom: "hi@sadlifes.com",
        defaultReplyTo: "hi@sadlifes.com",
      },
    },
  },
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "30d",
      },
    },
  },
  upload: {
    config: {
      providerOptions: {
        sizeLimit: 10 * 1024 * 1024,
      },
    },
  },
});
