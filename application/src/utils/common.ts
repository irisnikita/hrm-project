// Libraries
import { get } from 'lodash';

/**
 * Generate avatar label from customer name
 * @param {string} customerName
 * @returns {string}
 */
export function getAvatarLabel(customerName: string): string {
  if (customerName === '******') {
    return '';
  }

  if (customerName) {
    const tempt = customerName.split(' ');

    if (tempt.length > 1) {
      return `${get(tempt, '[0][0]', '')}${get(tempt, '[1][0]', '')}`.toUpperCase();
    }
    return customerName[0]?.toUpperCase() || '';
  }
  return '';
}
