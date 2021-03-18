const ROUTE_AUTH_ROOT = '/auth'
const ROUTE_AUTH_SIGNUP = ROUTE_AUTH_ROOT + '/signup'
const ROUTE_AUTH_SIGNIN = ROUTE_AUTH_ROOT + '/signin'
const ROUTE_HOME_ROOT = '/home'
const ROUTE_DASHBOARD_ROOT = '/dashboard'

interface AllRoutes {
  Auth: {
    root: string,
    signUp: {
      root: string,
      confirm: string,
      confirmEmail: string,
      confirmGoogle: string,
    }
    signIn: string,
    resetPassword: {
      root: string,
      confirm: string,
    },
  },
  Dashboard: {
    root: string,
    profile: string,
    settings: string,
    users: string,
    tags: string,
    products: string,
    warehouse: string,
  }
}

export const AllRoutesStr: AllRoutes = {
  Auth: {
    root: ROUTE_AUTH_ROOT,
    signIn: ROUTE_AUTH_SIGNIN,
    signUp: {
      root: ROUTE_AUTH_SIGNUP,
      confirm: ROUTE_AUTH_SIGNUP + '/confirm',
      confirmEmail: ROUTE_AUTH_SIGNUP + '/confirm-email',
      confirmGoogle: ROUTE_AUTH_SIGNUP + '/confirm-google'
    },
    resetPassword: {
      root: ROUTE_AUTH_ROOT + '/reset-password',
      confirm: ROUTE_AUTH_ROOT + '/reset-password/confirm'
    }
  },
  Dashboard: {
    root: ROUTE_DASHBOARD_ROOT,
    profile: ROUTE_DASHBOARD_ROOT + '/profile',
    settings: ROUTE_DASHBOARD_ROOT + '/settings',
    users: ROUTE_DASHBOARD_ROOT + '/users',
    tags: ROUTE_DASHBOARD_ROOT + '/product/tags',
    products: ROUTE_DASHBOARD_ROOT + '/products/all',
    warehouse: ROUTE_DASHBOARD_ROOT + '/warehouses'
  }
}