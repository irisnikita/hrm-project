export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  "strapi::cors",
  {
    name: "global::logger",
    config: {
      endpointIncludes: ["/api"],
    },
  },
];
