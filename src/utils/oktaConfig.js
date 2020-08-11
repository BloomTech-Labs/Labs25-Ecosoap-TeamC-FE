const issuer = process.env.REACT_APP_OKTA_ISSUER_URI;

const config = {
  issuer: process.env.REACT_APP_OKTA_ISSUER_URI,
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: process.env.REACT_APP_CLIENT_ID,
  pkce: true,
  scopes: ['openid', 'email', 'profile'],
  // add your custom logo to your signing/register widget here.
  logo: 'path-to-your-logo',
  brandName: 'Eco-Soap Bank',
};

export { config };
