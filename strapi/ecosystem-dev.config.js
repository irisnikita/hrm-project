require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "hrm-strapi-service-dev",
      script: "yarn",
      args: "develop",
      exec_mode: "fork",
      watch: true,
    },
  ],
};
