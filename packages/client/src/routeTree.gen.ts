/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as UserSettingsImport } from './routes/user.settings'
import { Route as UserLogoutImport } from './routes/user.logout'
import { Route as UserLoginImport } from './routes/user.login'
import { Route as LocationCreateImport } from './routes/location.create'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UserSettingsRoute = UserSettingsImport.update({
  path: '/user/settings',
  getParentRoute: () => rootRoute,
} as any)

const UserLogoutRoute = UserLogoutImport.update({
  path: '/user/logout',
  getParentRoute: () => rootRoute,
} as any)

const UserLoginRoute = UserLoginImport.update({
  path: '/user/login',
  getParentRoute: () => rootRoute,
} as any)

const LocationCreateRoute = LocationCreateImport.update({
  path: '/location/create',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/location/create': {
      id: '/location/create'
      path: '/location/create'
      fullPath: '/location/create'
      preLoaderRoute: typeof LocationCreateImport
      parentRoute: typeof rootRoute
    }
    '/user/login': {
      id: '/user/login'
      path: '/user/login'
      fullPath: '/user/login'
      preLoaderRoute: typeof UserLoginImport
      parentRoute: typeof rootRoute
    }
    '/user/logout': {
      id: '/user/logout'
      path: '/user/logout'
      fullPath: '/user/logout'
      preLoaderRoute: typeof UserLogoutImport
      parentRoute: typeof rootRoute
    }
    '/user/settings': {
      id: '/user/settings'
      path: '/user/settings'
      fullPath: '/user/settings'
      preLoaderRoute: typeof UserSettingsImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  LocationCreateRoute,
  UserLoginRoute,
  UserLogoutRoute,
  UserSettingsRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/location/create",
        "/user/login",
        "/user/logout",
        "/user/settings"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/location/create": {
      "filePath": "location.create.tsx"
    },
    "/user/login": {
      "filePath": "user.login.tsx"
    },
    "/user/logout": {
      "filePath": "user.logout.tsx"
    },
    "/user/settings": {
      "filePath": "user.settings.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
