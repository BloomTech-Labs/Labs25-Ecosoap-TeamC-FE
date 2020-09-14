import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import MainSideBarComp from '../MainSideBar/MainSideBarComp';

import Map from '../Map/Map';
import logo from '../../../media/eco-soap-logo.png';
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
    <div className="dashboard-layout">
      <div className="topTab">
        <img id="eco-soap-bank" src={logo} alt="eco-soap bank logo" />
        <h1>Admin Dashboard</h1>
      </div>

      <section className="dashboardSection">
        <div className="leftTab">
          <Map className="eco-soap-map" />
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

          <button className="button" type="primary">
            <Link to="/manage-waypoints" className="links">
              Map Management
            </Link>
          </button>

          <button
            className="button"
            type="primary"
            onClick={() => authService.logout()}
          >
            {/* NEED TO ADD LINK TO="" */}
            <Link className="links">Log out</Link>
          </button>
        </div>
      </section>
      <MainSideBarComp />
    </div>
  );
};

export default AdminDashboard;
