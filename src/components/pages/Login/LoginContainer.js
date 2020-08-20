import React, { useEffect } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import './login.css';
import logo from '../../../media/eco-soap-logo.png';

import { config } from '../../../utils/oktaConfig';

const LoginContainer = () => {
  useEffect(() => {
    const {
      pkce,
      issuer,
      clientId,
      redirectUri,
      scopes,
      logo,
      brandName,
    } = config;
    // destructure your config so that you can pass it into the required fields in your widget.

    const widget = new OktaSignIn({
      baseUrl: issuer ? issuer.split('/oauth2')[0] : '',
      clientId,
      redirectUri,
      registration: {
        // there is more we can do to handle some errors here.
      },
      features: { registration: false },
      // turning this feature on allows your widget to use Okta for user registration
      logo,
      brandName,
      colors: {
        brand: '#3BB54A',
      },
      i18n: {
        en: {
          'primaryauth.title': 'Welcome to Eco-Soap Bank Administration Login',
          // change title for your app
        },
      },
      authParams: {
        pkce,
        issuer,
        display: 'page',
        scopes,
      },
    });

    widget.renderEl(
      { el: '#sign-in-widget' },
      () => {
        /**
         * In this flow, the success handler will not be called because we redirect
         * to the Okta org for the authentication workflow.
         */
      },
      err => {
        throw err;
      }
    );
  }, []);

  return (
    <div id="login-page">
      <img id="eco-soap-logo" src={logo} alt="eco-soap bank logo" />
      <div id="sign-in-widget" />
    </div>
  );
};

export default LoginContainer;
