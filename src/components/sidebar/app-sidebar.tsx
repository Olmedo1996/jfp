'use client';

import * as React from 'react';
import {
  Apple,
  BookOpen,
  Bot,
  Briefcase,
  CalendarPlus,
  Settings2,
  SquareTerminal,
  Users,
} from 'lucide-react';

import JfpIcon from '../custom-icon/jfp-icon';

import { NavMain } from '@/components/navbar/nav-main';
import { NavProjects } from '@/components/navbar/nav-projects';
import { NavUser } from '@/components/navbar/nav-user';
import { TeamSwitcher } from '@/components/navbar/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import * as m from '@/paraglide/messages';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // This is sample data.
  const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg',
    },
    teams: [
      {
        name: 'JFP',
        logo: JfpIcon,
        plan: 'Jóvenes en formación profesional',
      },
    ],
    navMain: [
      {
        title: 'Playground',
        url: '#',
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: 'History',
            url: '#',
          },
          {
            title: 'Starred',
            url: '#',
          },
          {
            title: 'Settings',
            url: '#',
          },
        ],
      },
      {
        title: 'Models',
        url: '#',
        icon: Bot,
        items: [
          {
            title: 'Genesis',
            url: '#',
          },
          {
            title: 'Explorer',
            url: '#',
          },
          {
            title: 'Quantum',
            url: '#',
          },
        ],
      },
      {
        title: 'Documentation',
        url: '#',
        icon: BookOpen,
        items: [
          {
            title: 'Introduction',
            url: '#',
          },
          {
            title: 'Get Started',
            url: '#',
          },
          {
            title: 'Tutorials',
            url: '#',
          },
          {
            title: 'Changelog',
            url: '#',
          },
        ],
      },
      {
        title: 'Settings',
        url: '#',
        icon: Settings2,
        items: [
          {
            title: 'General',
            url: '#',
          },
          {
            title: 'Team',
            url: '#',
          },
          {
            title: 'Billing',
            url: '#',
          },
          {
            title: 'Limits',
            url: '#',
          },
        ],
      },
    ],
    projects: [
      {
        name: m.beneficiaries(),
        url: '/beneficiaries',
        icon: Users,
      },
      {
        name: m.tutors(),
        url: '/tutors',
        icon: Apple,
      },
      {
        name: m.businesses(),
        url: '/businesses',
        icon: Briefcase,
      },
      {
        name: m.activities(),
        url: '#',
        icon: CalendarPlus,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
