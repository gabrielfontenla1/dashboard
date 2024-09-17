import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

// NOTE: We did not use React Components for Icons, because
//  you may one to get the config from the server.

// NOTE: First level elements are groups.

export interface LayoutConfig {
  navItems: NavItemConfig[];
}

export const layoutConfig = {
  navItems: [
    {
      key: 'metrics',
      title: 'Metrics',
      items: [
        { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'house' },
        { key: 'analytics', title: 'Analytics', href: paths.dashboard.analytics, icon: 'chart-pie' },
      ],
    },
    {
      key: 'general',
      title: 'General',
      items: [
        {
          key: 'chat',
          title: 'Chat',
          href: paths.dashboard.chat.base,
          icon: 'chats-circle',
          matcher: { type: 'startsWith', href: '/dashboard/chat' },
        },
        { key: 'prompt-pdf', title: 'Prompt PDF', href: paths.dashboard.fileStorage, icon: 'upload' },
        { key: 'calendar', title: 'Calendar', href: paths.dashboard.calendar, icon: 'calendar-check' },
        {
          key: 'customers',
          title: 'Customers',
          href: paths.dashboard.customers.list,
          icon: 'users',
          items: [
            { key: 'customers', title: 'List customers', href: paths.dashboard.customers.list },
            { key: 'customers:create', title: 'Create customer', href: paths.dashboard.customers.create },
            { key: 'customers:details', title: 'Customer details', href: paths.dashboard.customers.details('1') },
          ],
        },
      ],
    },
    {
      key: 'settings',
      title: 'Settings',
      items: [
        {
          key: 'settings',
          title: 'Settings',
          href: paths.dashboard.settings.account,
          icon: 'gear',
          matcher: { type: 'startsWith', href: '/dashboard/settings' },
        },
      ],
    },
  ],
} satisfies LayoutConfig;
