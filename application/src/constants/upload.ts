export const MAX_FILE_SIZE = {
  ALL: 10,
  IMAGE: 10,
  VIDEO: 10,
};

export const ALLOWED_FILE_TYPES = {
  ALL: {
    value: '*',
    label: 'All',
  },
  IMAGE: {
    value: 'image/*',
    label: 'png, jpg, jpeg, gif, webp',
  },
  VIDEO: {
    value: 'video/*',
    label: 'mp4, mov, avi, mkv',
  },
};
