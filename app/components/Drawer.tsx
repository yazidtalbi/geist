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
          <div className={styles.header}>
            <div className={styles.handle} />
            {title && <VaulDrawer.Title className={styles.title}>{title}</VaulDrawer.Title>}
            <button className={styles.closeBtn} onClick={() => onOpenChange(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          <div className={styles.body}>
            {children}
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}
