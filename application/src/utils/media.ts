export const getMediaUrl = (url: string) => {
  return `${process.env.NEXT_PUBLIC_MEDIA_URL}${url}`;
};
