require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "hrm-strapi-service-dev",
      script: "yarn",
      args: "dev",
      exec_mode: "fork",
      watch: true,
    },
  ],
};
