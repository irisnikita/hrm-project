export const QR_CODE_STATUS = {
  ACTIVE: 1,
  INACTIVE: 0,
  EXPIRED: 2,
  USED: 3,
};

export const QR_CODE_STATUS_OPTIONS = [
  { key: QR_CODE_STATUS.ACTIVE, label: 'qrCode.status.active', tagColor: 'success' },
  { key: QR_CODE_STATUS.INACTIVE, label: 'qrCode.status.inactive', tagColor: '' },
  { key: QR_CODE_STATUS.EXPIRED, label: 'qrCode.status.expired', tagColor: 'warning' },
  { key: QR_CODE_STATUS.USED, label: 'qrCode.status.used', tagColor: 'error' },
];
