export default {
  routes: [
    // {
    //  method: 'GET',
    //  path: '/user',
    //  handler: 'user.exampleAction',
    //  config: {
    //    policies: [],
    //    middlewares: [],
    //  },
    // },
    {
      method: "POST",
      path: "/users/check-username",
      handler: "user.checkUsername",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
