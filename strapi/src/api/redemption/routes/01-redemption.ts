module.exports = {
  routes: [
    {
      method: "POST",
      path: "/redemptions/redeem",
      handler: "redemption.redeemCode",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/redemptions/by-field/:field/:value",
      handler: "redemption.findByField",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
