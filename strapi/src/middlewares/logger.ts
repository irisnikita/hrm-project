/**
 * `logging` middleware
 */

// Libraries
import { Strapi } from "@strapi/strapi";

// Utils
import { logger } from "../utils";

const excludeEndpoints = ["/log", "/admin"];

export default (config, { strapi: _ }: { strapi: Strapi }) => {
  return async (ctx, next) => {
    const { request, response } = ctx;
    const { method, url, body: requestBody } = request || {};
    const { status, body: responseBody } = response || {};
    const { endpointIncludes } = config || {};
    const time = Date.now();

    // Ignore logs
    const isExclude = excludeEndpoints.some((endpoint) =>
      request.url.includes(endpoint)
    );
    const isInclude = endpointIncludes.some((endpoint) =>
      request.url.includes(endpoint)
    );

    if (isExclude || !isInclude) return next();

    logger.info(`Request: ${method} - ${url}`, {
      action: "request",
      body: requestBody,
    });

    await next();

    const latency = Date.now() - time;

    logger.info(`Response: ${status} - (${latency}ms)`, {
      action: "response",
      status,
      latency,
      body: responseBody,
    });
  };
};
