import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Map from '../Map/Map';

import 'semantic-ui-css/semantic.min.css';
import './AdminDashboard.css';

const AdminDashboard = () => {
  // Establishing States below
  const [userInfo, setUserInfo] = useState(null);

  // Using Okta NPM to establish that a user is logged in throughout the app usage.
  const { authState, authService } = useOktaAuth();
  const [memoAuthService] = useMemo(() => [authService], []);

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        // if user is authenticated we can use the authService to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
        if (isSubscribed) {
          setUserInfo(info);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [memoAuthService]);

  return (
    <>
      <Map />
    </>
  );
};

export default AdminDashboard;
