import * as yup from 'yup';

import i18n from '@/utils/i18n';

export const loginSchema = yup.object({
  username: yup.string().trim().required(i18n.t('forms.validation.required')),
  password: yup.string().required(i18n.t('forms.validation.required')),
});

export const signupSchema = yup.object({
  username: yup
    .string()
    .trim()
    .required(i18n.t('forms.validation.required'))
    .min(3, i18n.t('forms.username.validation.length'))
    .max(20, i18n.t('forms.username.validation.length')),
  password: yup
    .string()
    .required(i18n.t('forms.validation.required'))
    .min(6, i18n.t('forms.password.validation.length')),
  confirmation: yup
    .string()
    .required(i18n.t('forms.validation.required'))
    .oneOf([yup.ref('password')], i18n.t('forms.passwordConfirmation.validation.match')),
});

export const getNotInListSchema = (fieldName, list) => {
  return yup.object({
    [fieldName]: yup
      .string()
      .trim()
      .required(i18n.t('forms.validation.required'))
      .notOneOf(list, i18n.t('forms.channel.validation.list')),
  });
};
