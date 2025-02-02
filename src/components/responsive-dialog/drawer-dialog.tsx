'use client';

import * as React from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';

interface DrawerDialogProps {
  classNameDialogContent?: string;
  dialogTitle?: string;
  dialogDescription?: string;
  children?: React.ReactNode;
  cancelButtonLabel?: string | React.ReactNode;
  dialogButtonLabel?: string | React.ReactNode;
  variantButton?:
    | 'default'
    | 'destructive'
    | 'link'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined;
}

export default function DrawerDialog({
  dialogTitle,
  dialogDescription = '',
  variantButton = 'default',
  dialogButtonLabel = 'Nuevo',
  classNameDialogContent = 'sm:max-w-[425px]',
  cancelButtonLabel = 'Cancel',
  children,
}: DrawerDialogProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen} modal>
        <DialogTrigger asChild>
          <Button variant={variantButton}>{dialogButtonLabel}</Button>
        </DialogTrigger>
        <DialogContent className={classNameDialogContent}>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={variantButton}>{dialogButtonLabel}</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="text-left">
          <DrawerTitle>{dialogTitle}</DrawerTitle>
          <DrawerDescription>{dialogDescription}</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="max-h-[60vh] overflow-auto p-4">
          {children}
        </ScrollArea>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{cancelButtonLabel}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
