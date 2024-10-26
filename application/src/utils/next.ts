/**
 * Creates a route matcher function that checks if a given request matches any of the
 * given URL patterns.
 *
 * @param {string[]} patterns - The URL patterns to match against. Each pattern can be
 * a string or a regex pattern. If a string, it will be matched exactly. If a regex
 * pattern, it will be matched as a regex.
 * @returns {(req: any) => boolean} A function that takes a request object and returns a
 * boolean indicating whether the request matches any of the given patterns.
 */
export const createRouteMatcher =
  (patterns: string[]): ((req: any) => boolean) =>
  (req: any) => {
    const path = req?.nextUrl?.pathname;

    return patterns.some(pattern => new RegExp(`^${pattern}$`).test(path));
  };
