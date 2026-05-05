"use client";
import * as React from "react";
import { Drawer as VaulDrawer } from "vaul";
import styles from "./Drawer.module.css";

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
}

export function Drawer({ open, onOpenChange, children, title }: DrawerProps) {
  return (
    <VaulDrawer.Root direction="right" open={open} onOpenChange={onOpenChange}>
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className={styles.overlay} />
        <VaulDrawer.Content className={styles.content}>
          <div className={styles.handle} />
          <div className={styles.inner}>
            <div className={styles.header}>
              {title && <VaulDrawer.Title className={styles.title}>{title}</VaulDrawer.Title>}
            </div>
            <div className={styles.body}>
              {children}
            </div>
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}
