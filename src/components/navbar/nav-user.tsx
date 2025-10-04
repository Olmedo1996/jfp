'use client';

import { useEffect, useState } from 'react';
import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();

  // Manejar errores de sesión automáticamente
  useEffect(() => {
    if (session?.error) {
      console.log('Session error detected:', session.error);

      // Errores que requieren logout inmediato
      const criticalErrors = [
        'RefreshAccessTokenError',
        'MaxRefreshAttemptsReached',
        'TokenExpiredTooLong',
        'TokenDecodingError',
      ];

      if (criticalErrors.includes(session.error)) {
        console.log('Critical session error, forcing logout...');
        signOut({
          callbackUrl: '/login?expired=true',
          redirect: true,
        });
      }
    }
  }, [session?.error]);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      // NextAuth se encarga de limpiar todo automáticamente
      await signOut({
        callbackUrl: '/login',
        redirect: true,
      });
    } catch (error) {
      console.error('Error durante el logout:', error);
    } finally {
      setIsLoading(false);
      setIsDropdownOpen(false);
    }
  };

  const getUserInitials = () => {
    return (
      session?.user?.name
        ?.split(' ')
        ?.map((n) => n[0])
        ?.join('')
        ?.toUpperCase() || 'U'
    );
  };

  // Si hay error crítico, mostrar estado de carga
  if (
    session?.error &&
    [
      'RefreshAccessTokenError',
      'MaxRefreshAttemptsReached',
      'TokenExpiredTooLong',
    ].includes(session.error)
  ) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" disabled>
            <div className="flex items-center gap-2">
              <div className="bg-muted size-8 animate-pulse rounded-lg" />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="text-muted-foreground">
                  Cerrando sesión...
                </span>
              </div>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu
          open={isDropdownOpen}
          onOpenChange={setIsDropdownOpen}
          modal={false}
        >
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage
                  src={user.avatar}
                  alt={session?.user?.name ?? ''}
                />
                <AvatarFallback className="rounded-lg">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {session?.user?.name}
                </span>
                <span className="truncate text-xs">{session?.user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {session?.user?.name}
                  </span>
                  <span className="truncate text-xs">
                    {session?.user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck className="text-muted-foreground mr-2 size-5" />
                Cuenta
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="text-muted-foreground mr-2 size-5" />
                Notificaciones
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <LogOut className="text-muted-foreground mr-2 size-5" />
                  Cerrar sesión
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    ¿Estás seguro que deseas salir?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Tu sesión será cerrada y necesitarás volver a iniciar sesión
                    para acceder.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsDropdownOpen(false)}>
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isLoading ? 'Cerrando sesión...' : 'Cerrar sesión'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
