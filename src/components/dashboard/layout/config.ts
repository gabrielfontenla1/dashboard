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
        { key: 'overview', title: 'Home', href: paths.dashboard.overview, icon: 'house' },
        // { key: 'analytics', title: 'Analytics', href: paths.dashboard.analytics, icon: 'chart-pie' },
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
        // { key: 'calendar', title: 'Calendar', href: paths.dashboard.calendar, icon: 'calendar-check' },
        // { key: 'service-rooms', title: 'Bookings', href: paths.dashboard.serviceRooms, icon: 'bed' },
        {
          key: 'customers',
          title: 'Customers',
          href: paths.dashboard.customers.list,
          icon: 'users',
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
