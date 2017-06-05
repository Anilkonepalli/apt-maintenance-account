'use strict';

export const MODULE = {
  ACCOUNT: { name: 'accounts', isAdmin: false },
  USER: { name: 'users', isAdmin: true },
  FLAT: { name: 'flats', isAdmin: true },
  RESIDENT: { name: 'residents', isAdmin: true },
  ROLE: { name: 'roles', isAdmin: true },
  PERMISSION: { name: 'permissions', isAdmin: true },
  FLAT_RESIDENT: { name: 'flats-residents', isAdmin: true },
  USER_ROLE: { name: 'users-roles', isAdmin: true },
  ROLE_PERMISSION: { name: 'roles-permissions', isAdmin: true }
};

/*
export const MODULE = {
  ACCOUNT: 'accounts',
  USER: 'users',
  FLAT: 'flats',
  RESIDENT: 'residents',
  ROLE: 'roles',
  PERMISSION: 'permissions',
  FLAT_RESIDENT: 'flats-residents',
  USER_ROLE: 'users-roles',
  ROLE_PERMISSION: 'roles-permissions'
};
*/
