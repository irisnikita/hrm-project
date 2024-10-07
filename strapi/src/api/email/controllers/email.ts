module.exports = {
  async send(ctx) {
    console.log("🚀 ~ send ~ ctx:", ctx);
    try {
      const { to, subject, text, html } = ctx.request.body;

      await strapi
        .service("api::email.email")
        .sendEmail({ to, subject, text, html });

      ctx.send({ message: "Email sent successfully" });
    } catch (err) {
      ctx.send({ error: "Failed to send email", details: err });
    }
  },
};
