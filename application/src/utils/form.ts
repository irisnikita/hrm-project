'use client';

// Libraries
import { Rule } from 'antd/es/form';

// Types
import { UploadProps } from '@/components/ui';

export const createFormValidation = (t: any) => {
  return {
    required: (fieldName: string): Rule => ({
      required: true,
      message: t('formValidation.required', { fieldName }),
    }),

    max: (max: number = 255, fieldName: string): Rule => ({
      max,
      message: t('formValidation.max', { fieldName, max }),
    }),

    min: (min: number = 8, fieldName: string): Rule => ({
      min,
      message: t('formValidation.min', { fieldName, min }),
    }),

    email: (): Rule => ({
      type: 'email',
      message: t('formValidation.email'),
    }),

    url: (): Rule => ({
      type: 'url',
      message: t('formValidation.url'),
    }),

    number: (): Rule => ({
      type: 'number',
      message: t('formValidation.number'),
    }),

    passwordStrength: (): Rule => ({
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message: t('formValidation.passwordStrength'),
    }),

    basePasswordStrength: (): Rule => ({
      pattern: /^.{8,}$/,
      message: t('formValidation.basePasswordStrength'),
    }),

    confirmPassword: ({ getFieldValue }) => ({
      validator: (rule, value) => {
        if (value && value !== getFieldValue('password')) {
          return Promise.reject(t('formValidation.passwordsNotMatch'));
        }
        return Promise.resolve();
      },
    }),
  };
};

export const createValidateMessages = (t: any) => {
  return {
    default: t('default'),
    required: t('required'),
    enum: t('enum'),
    whitespace: t('whitespace'),
    date: {
      format: t('date.format'),
      parse: t('date.parse'),
      invalid: t('date.invalid'),
    },
    types: {
      string: t('types.string'),
      method: t('types.method'),
      array: t('types.array'),
      object: t('types.object'),
      number: t('types.number'),
      date: t('types.date'),
      boolean: t('types.boolean'),
      integer: t('types.integer'),
      float: t('types.float'),
      regexp: t('types.regexp'),
      email: t('types.email'),
      url: t('types.url'),
      hex: t('types.hex'),
    },
    string: {
      len: t('string.len'),
      min: t('string.min'),
      max: t('string.max'),
      range: t('string.range'),
    },
    number: {
      len: t('number.len'),
      min: t('number.min'),
      max: t('number.max'),
      range: t('number.range'),
    },
    array: {
      len: t('array.len'),
      min: t('array.min'),
      max: t('array.max'),
      range: t('array.range'),
    },
    pattern: {
      mismatch: t('pattern.mismatch'),
    },
  };
};

/**
 * Extracts the file list from an upload event.
 *
 * @param {any} event - The upload event object or an array of files.
 * @returns {any[] | undefined} An array of files if the event is an array or contains a fileList property, undefined otherwise.
 */
export const getUploadValueFromEvent = (event: any): any[] | undefined => {
  if (Array.isArray(event)) {
    return event;
  }

  return event?.fileList;
};

/**
 * Creates an onChange handler for file uploads that validates file size and updates the form accordingly.
 *
 * @param {any} form - The form instance to update.
 * @param {string} fieldName - The name of the form field to update.
 * @param {number} maxSizeMB - The maximum allowed file size in megabytes.
 * @returns {UploadProps['onChange']} A function that handles the onChange event for file uploads.
 */
export const handleUploadChange = (
  form: any,
  fieldName: string,
  maxSizeMB: number,
): UploadProps['onChange'] => {
  return info => {
    const { file, fileList } = info;

    if (file.status !== 'uploading') {
      const isValid = file.size && file.size / 1024 / 1024 < maxSizeMB;

      if (isValid) {
        form.setFieldsValue({ [fieldName]: fileList });
      } else {
        form.setFieldsValue({ [fieldName]: [] });
      }
    }
  };
};

export const formatLabelToSlug = (label: string): string => {
  return label
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing whitespace
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars (except hyphens)
    .replace(/\-\-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '') // Trim hyphens from start of text
    .replace(/-+$/, ''); // Trim hyphens from end of text
};
