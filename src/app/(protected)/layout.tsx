import '@/styles/globals.css';

import { PropsWithChildren } from 'react';

import Providers from '../provider';

import CustomBreadcrumb from '@/components/breadcrumb-app/breadcrumb';
import { LanguageSwitcher } from '@/components/navbar/language-switcher';
import { HeaderLoadingBar } from '@/components/progressbar/header-loading-bar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

const ProtectedLayout = async ({ children }: PropsWithChildren) => {
  return (
    <Providers>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <HeaderLoadingBar />
          <header className="sticky flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <CustomBreadcrumb />
              </div>
              <div className="flex items-center gap-2 px-4">
                <ThemeSwitcher className="" />
                <LanguageSwitcher />
              </div>
            </div>
          </header>
          <div className="container flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </Providers>
  );
};

export default ProtectedLayout;
