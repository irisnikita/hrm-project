require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "hrm-strapi-service",
      script: "yarn",
      args: "start",
      exec_mode: "fork",
      watch: false,
    },
  ],
};
