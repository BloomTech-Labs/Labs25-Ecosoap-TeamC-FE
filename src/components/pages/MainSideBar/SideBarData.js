import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const NavBarData = [
  {
    title: 'Create New User',
    path: '/create-user',
    icon: <IoIcons.IoMdAddCircle />,
    cName: 'nav-text',
  },
  {
    title: 'Manage Users',
    path: '/users',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text',
  },
  {
    title: 'Map Management',
    path: '/manage-waypoints',
    icon: <FaIcons.FaRegMap />,
    cName: 'nav-text',
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <IoIcons.IoMdSettings />,
    cName: 'nav-text',
  },
  {
    title: 'Log Out',
    path: '/logout',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'logout-text',
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text',
  },
];
