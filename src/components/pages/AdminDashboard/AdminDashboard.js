import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';

// import RenderHomePage from './RenderHomePage';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
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

  const SideBar = () => {};

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {userInfo && (
        <div>
          <h1>{userInfo.email}</h1>
          <h1>{userInfo.email}</h1>

          {console.log(userInfo)}
          <button
            className="logout-button"
            type="primary"
            onClick={() => authService.logout()}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
