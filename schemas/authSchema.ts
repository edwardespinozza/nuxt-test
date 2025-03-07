import * as v from 'valibot';

export function getAuthSchema() {
  const { t } = useI18n();

  return v.object({
    email: v.pipe(
      v.string(),
      v.nonEmpty(t('auth.errors.email_is_required')),
      v.email(t('auth.errors.please_enter_a_valid_email_address'))
    ),
    password: v.pipe(
      v.string(),
      v.nonEmpty(t('auth.errors.password_is_required')),
      v.minLength(8, t('auth.errors.please_enter_a_password_with_at_least_8_characters'))
    ),
  });
}