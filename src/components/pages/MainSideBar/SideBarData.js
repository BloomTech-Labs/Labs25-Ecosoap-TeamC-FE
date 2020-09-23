import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const NavBarData = [
  {
    title: 'Admin Dashboard',
    path: '/dashboard',
    icon: <FaIcons.FaCircle />,
    cName: 'nav-text',
  },
  {
    title: 'Map Management',
    path: '/map-management',
    icon: <FaIcons.FaRegMap />,
    cName: 'nav-text',
  },
  {
    title: 'Type Management',
    path: '/types',
    icon: <IoIcons.IoMdSettings />,
    cName: 'nav-text',
  },
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
    title: 'Log Out',
    path: '/login',
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
