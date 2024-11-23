module.exports = {
  routes: [
    {
      method: "POST",
      path: "/qr-codes/bulk-create",
      handler: "qr-code.bulkCreate",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/qr-codes/use-qr-code",
      handler: "qr-code.useQrCode",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
