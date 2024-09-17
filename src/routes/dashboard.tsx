import * as React from 'react';
import { Outlet } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import { Layout as ChatLayout } from '@/components/dashboard/chat/layout';
import { Layout as DashboardLayout } from '@/components/dashboard/layout/layout';
import { Layout as MailLayout } from '@/components/dashboard/mail/layout';
import { Layout as SettingsLayout } from '@/components/dashboard/settings/layout';

export const route: RouteObject = {
  path: 'dashboard',
  element: (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
  children: [
    {
      index: true,
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/overview');
        return { Component: Page };
      },
    },
    {
      path: 'analytics',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/analytics');
        return { Component: Page };
      },
    },
    {
      path: 'blank',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/blank');
        return { Component: Page };
      },
    },
    {
      path: 'calendar',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/calendar');
        return { Component: Page };
      },
    },
    {
      path: 'chat',
      element: (
        <ChatLayout>
          <Outlet />
        </ChatLayout>
      ),
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/chat/blank');
            return { Component: Page };
          },
        },
        {
          path: 'compose',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/chat/compose');
            return { Component: Page };
          },
        },
        {
          path: ':threadType/:threadId',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/chat/thread');
            return { Component: Page };
          },
        },
      ],
    },
    {
      path: 'file-storage',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/file-storage');
        return { Component: Page };
      },
    },
    {
      path: 'i18n',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/i18n');
        return { Component: Page };
      },
    },
    {
      path: 'mail',
      element: (
        <MailLayout>
          <Outlet />
        </MailLayout>
      ),
      children: [
        {
          path: ':labelId',
          children: [
            {
              index: true,
              lazy: async () => {
                const { Page } = await import('@/pages/dashboard/mail/threads');
                return { Component: Page };
              },
            },
            {
              path: ':threadId',
              lazy: async () => {
                const { Page } = await import('@/pages/dashboard/mail/thread');
                return { Component: Page };
              },
            },
          ],
        },
      ],
    },
    {
      path: 'settings',
      element: (
        <SettingsLayout>
          <Outlet />
        </SettingsLayout>
      ),
      children: [
        {
          path: 'account',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/account');
            return { Component: Page };
          },
        },
        {
          path: 'notifications',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/notifications');
            return { Component: Page };
          },
        },
        {
          path: 'security',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/security');
            return { Component: Page };
          },
        },
      ],
    },
  ],
};
