<template>
  <AuthForm
    type="login"
    :title="$t('auth.login.title')"
    :description="$t('auth.login.description')"
    :buttonText="$t('auth.login.button')"
    :footerMessage="$t('auth.login.footer_message')"
    :footerLinkText="$t('auth.login.footer_link')"
    footerLinkUrl="signup"
  />
</template>

