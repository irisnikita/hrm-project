module.exports = {
  async sendEmail({ to, subject, text, html }) {
    await strapi.plugins["email"].services.email.send({
      to,
      subject,
      text,
      html,
    });
  },
};
