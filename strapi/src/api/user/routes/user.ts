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
    {
      method: "POST",
      path: "/users/register",
      handler: "user.registerUser",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/users/by-field/:field/:value",
      handler: "user.getByField",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
