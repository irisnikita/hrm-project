export default {
  routes: [
    // {
    //  method: 'GET',
    //  path: '/log',
    //  handler: 'log.exampleAction',
    //  config: {
    //    policies: [],
    //    middlewares: [],
    //  },
    // },
    {
      method: 'GET',
      path: '/log',
      handler: 'log.getLogs',
      config: {
        policies: [],
        middlewares: [],
      }
    }
  ],
};
