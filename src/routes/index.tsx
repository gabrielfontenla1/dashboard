import * as React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { Page as NotFoundPage } from '@/pages/not-found';

import { route as authRoute } from './auth';
import { route as componentsRoute } from './components';
import { route as dashboardRoute } from './dashboard';

export const routes: RouteObject[] = [
  {
    element: <Outlet />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { Page } = await import('@/pages/auth/custom/sign-in');
          return { Component: Page };
        },
      },
      componentsRoute,
    ],
  },
  {
    path: 'errors',
    children: [
      {
        path: 'internal-server-error',
        lazy: async () => {
          const { Page } = await import('@/pages/errors/internal-server-error');
          return { Component: Page };
        },
      },
      {
        path: 'not-authorized',
        lazy: async () => {
          const { Page } = await import('@/pages/errors/not-authorized');
          return { Component: Page };
        },
      },
      {
        path: 'not-found',
        lazy: async () => {
          const { Page } = await import('@/pages/errors/not-found');
          return { Component: Page };
        },
      },
    ],
  },
  authRoute,
  dashboardRoute,
  { path: '*', element: <NotFoundPage /> },
];
