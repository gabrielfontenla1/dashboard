export const paths = {
  home: '/',
  auth: {
    custom: {
      signIn: '/auth/custom/sign-in',
      signUp: '/auth/custom/sign-up',
      resetPassword: '/auth/custom/reset-password',
    },
    samples: {
      signIn: { centered: '/auth/samples/sign-in/centered', split: '/auth/samples/sign-in/split' },
      signUp: { centered: '/auth/samples/sign-up/centered', split: '/auth/samples/sign-up/split' },
      updatePassword: {
        centered: '/auth/samples/update-password/centered',
        split: '/auth/samples/update-password/split',
      },
      resetPassword: { centered: '/auth/samples/reset-password/centered', split: '/auth/samples/reset-password/split' },
      verifyCode: { centered: '/auth/samples/verify-code/centered', split: '/auth/samples/verify-code/split' },
    },
  },
  dashboard: {
    overview: '/dashboard',
    settings: {
      account: '/dashboard/settings/account',
      billing: '/dashboard/settings/billing',
      integrations: '/dashboard/settings/integrations',
      notifications: '/dashboard/settings/notifications',
      security: '/dashboard/settings/security',
      team: '/dashboard/settings/team',
    },
    analytics: '/dashboard/analytics',
    calendar: '/dashboard/calendar',
    serviceRooms: '/dashboard/service-rooms',
    chat: {
      base: '/dashboard/chat',
      compose: '/dashboard/chat/compose',
      thread: (threadType: string, threadId: string) => `/dashboard/chat/${threadType}/${threadId}`,
    },
    fileStorage: '/dashboard/file-storage',
    customers: {
      list: '/dashboard/customers',
      create: '/dashboard/customers/create',
      details: (customerId: string) => `/dashboard/customers/${customerId}`,
    },
  },
  pdf: { invoice: (invoiceId: string) => `/pdf/invoices/${invoiceId}` },
  components: {
    index: '/components',
    buttons: '/components/buttons',
    charts: '/components/charts',
    colors: '/components/colors',
    detailLists: '/components/detail-lists',
    forms: '/components/forms',
    gridLists: '/components/grid-lists',
    groupedLists: '/components/grouped-lists',
    inputs: '/components/inputs',
    modals: '/components/modals',
    quickStats: '/components/quick-stats',
    tables: '/components/tables',
    typography: '/components/typography',
  },
  notAuthorized: '/errors/not-authorized',
  notFound: '/errors/not-found',
  internalServerError: '/errors/internal-server-error',
  docs: 'https://material-kit-pro-react-docs.devias.io',
  purchase: 'https://mui.com/store/items/devias-kit-pro',
} as const;
