module.exports =  {
  routes: [
    {
      method: 'POST',
      path: '/qr-codes/bulk-create',
      handler: 'qr-code.bulkCreate',
      config: {
        policies: [],
        middlewares: [],
      }
    }
  ]
}