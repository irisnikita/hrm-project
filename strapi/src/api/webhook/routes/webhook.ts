export default {
  routes: [
    {
      method: "GET",
      path: "/webhook",
      handler: "webhook.handleWebhook",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
