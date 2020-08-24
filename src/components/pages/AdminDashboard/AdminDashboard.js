import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

// import RenderHomePage from './RenderHomePage';
import map from '../../../media/hub-map.png';
import logo from '../../../media/eco-soap-logo.png';
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

  console.log(userInfo);

  return (
    <div className="dashboard-layout">
      <div className="topTab">
        <img id="eco-soap-bank" src={logo} alt="eco-soap bank logo" />
        <h1>Admin Dashboard</h1>
      </div>

      <section className="dashboardSection">
        <div className="leftTab">
          <img id="eco-soap-map" src={map} alt="eco-soap bank map" />
        </div>

        <div className="rightTab">
          <button className="button" type="primary">
            <Link to="/create-user" className="links">
              Create New User
            </Link>
          </button>

          <button className="button" type="primary">
            <Link to="/users" className="links">
              Manage Users
            </Link>
          </button>

          <button
            className="button"
            type="primary"
            onClick={() => authService.logout()}
          >
            <Link className="links">Log out</Link>
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
