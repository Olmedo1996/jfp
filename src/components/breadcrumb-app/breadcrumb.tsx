'use client';

import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link, usePathname } from '@/lib/i18n';

const CustomBreadcrumb = () => {
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter(Boolean);

  const mapPathSegment: Record<string, string> = {
    edit: 'Editar',
    new: 'Nuevo',
    tutors: 'Tutores',
    businesses: 'Empresas',
    activities: 'Actividades',
    attendances: 'Asistencias',
  };

  const nonClickableSegments = ['edit', 'new'];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/');
          const isLast = index === pathSegments.length - 1;
          const isLastANumber = !isNaN(parseInt(segment));
          const isClickable =
            !nonClickableSegments.includes(segment) &&
            !isLastANumber &&
            !isLast;

          if (isLast) {
            return (
              <BreadcrumbItem key={href}>
                <BreadcrumbPage>
                  {isLastANumber
                    ? 'Detalle' // Cambia esto al texto que quieras mostrar en lugar del ID
                    : mapPathSegment[segment] || segment}
                </BreadcrumbPage>
              </BreadcrumbItem>
            );
          } else {
            return (
              <React.Fragment key={href}>
                <BreadcrumbItem>
                  {isClickable ? (
                    <BreadcrumbLink asChild={true}>
                      <Link href={href}>
                        {mapPathSegment[segment] || segment}
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <span>{mapPathSegment[segment] || segment}</span>
                  )}
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
