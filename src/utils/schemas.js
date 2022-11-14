import * as yup from 'yup';

import i18n from '@/utils/i18n';

export const loginSchema = yup.object({
  username: yup
    .string()
    .min(3, i18n.t('forms.login.username.validation.min'))
    .max(20, i18n.t('forms.login.username.validation.max'))
    .required(i18n.t('forms.login.username.validation.required'))
    .matches(
      /^[a-zA-Z0-9]+$/,
      i18n.t('forms.login.username.validation.required'),
    ),
  password: yup
    .string()
    .required(i18n.t('forms.login.password.validation.required'))
    .min(6, i18n.t('forms.login.password.validation.min')),
});

export const signupSchema = yup.object({
  username: yup
    .string()
    .required(i18n.t('forms.signup.username.validation.required'))
    .min(3, i18n.t('forms.signup.username.validation.min'))
    .max(20, i18n.t('forms.signup.username.validation.max'))
    .matches(
      /^[a-zA-Z0-9]+$/,
      i18n.t('forms.signup.username.validation.characters'),
    ),
  password: yup
    .string()
    .required(i18n.t('forms.signup.password.validation.required'))
    .min(6, i18n.t('forms.signup.password.validation.min')),
  confirmation: yup
    .string()
    .required(i18n.t('forms.signup.confirmation.validation.required'))
    .oneOf(
      [yup.ref('password')],
      i18n.t('forms.signup.confirmation.validation.match'),
    ),
});

export const getNewChannelSchema = (fieldName, list) => {
  return yup.object({
    [fieldName]: yup
      .string()
      .trim()
      .required(i18n.t('forms.modals.add.validation.required'))
      .max(20, i18n.t('forms.modals.add.validation.max'))
      .notOneOf(list, i18n.t('forms.modals.add.validation.exists')),
  });
};
