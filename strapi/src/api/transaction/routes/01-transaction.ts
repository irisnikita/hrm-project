module.exports = {
  routes: [
    {
      method: "GET",
      path: "/transactions/count",
      handler: "transaction.countTransactions",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
