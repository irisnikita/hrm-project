export const parseJson = (data: string | Record<string, unknown>) => {
  try {
    if (typeof data === "object") {
      return data;
    }

    return JSON.parse(data);
  } catch (e) {
    return null;
  }
};
