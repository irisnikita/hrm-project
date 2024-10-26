export default {
  routes: [
    {
      method: "POST",
      path: "/auth/validate-token",
      handler: "auth.validateToken",
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};
