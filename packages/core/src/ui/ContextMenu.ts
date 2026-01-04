/**
 * ContextMenu - Right-click context menu for shape operations
 */

import { icons } from './icons';
import type { I18n } from '../i18n';

export interface MenuItemConfig {
  id: string;
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  divider?: boolean;
  action?: () => void;
}

export interface ContextMenuOptions {
  items: MenuItemConfig[];
  i18n?: I18n;
}

/**
 * ContextMenu - Floating context menu
 */
export class ContextMenu {
  private menu: HTMLElement | null = null;
  private items: MenuItemConfig[] = [];
  private boundHide: (e: MouseEvent) => void;

  constructor(options?: Partial<ContextMenuOptions>) {
    this.items = options?.items || [];
    this.boundHide = this.handleOutsideClick.bind(this);
  }

  /**
   * Show context menu at position
   */
  show(x: number, y: number, items?: MenuItemConfig[]): void {
    this.hide();
    
    if (items) {
      this.items = items;
    }
    
    this.menu = this.createMenu();
    document.body.appendChild(this.menu);
    
    // Position menu
    this.positionMenu(x, y);
    
    // Add click outside listener
    setTimeout(() => {
      document.addEventListener('click', this.boundHide);
      document.addEventListener('contextmenu', this.boundHide);
    }, 0);
  }

  /**
   * Hide context menu
   */
  hide(): void {
    if (this.menu) {
      this.menu.remove();
      this.menu = null;
    }
    document.removeEventListener('click', this.boundHide);
    document.removeEventListener('contextmenu', this.boundHide);
  }

  /**
   * Check if menu is visible
   */
  isVisible(): boolean {
    return this.menu !== null;
  }

  /**
   * Set menu items
   */
  setItems(items: MenuItemConfig[]): void {
    this.items = items;
  }

  /**
   * Create menu element
   */
  private createMenu(): HTMLElement {
    const menu = document.createElement('div');
    menu.className = 'ie-context-menu';
    
    this.items.forEach(item => {
      if (item.divider) {
        const divider = document.createElement('div');
        divider.className = 'ie-context-menu-divider';
        menu.appendChild(divider);
      } else {
        const menuItem = document.createElement('div');
        menuItem.className = `ie-context-menu-item${item.disabled ? ' disabled' : ''}`;
        menuItem.dataset.id = item.id;
        
        menuItem.innerHTML = `
          ${item.icon ? `<span class="ie-context-menu-icon">${item.icon}</span>` : ''}
          <span class="ie-context-menu-label">${item.label}</span>
          ${item.shortcut ? `<span class="ie-context-menu-shortcut">${item.shortcut}</span>` : ''}
        `;
        
        if (!item.disabled && item.action) {
          menuItem.addEventListener('click', (e) => {
            e.stopPropagation();
            item.action!();
            this.hide();
          });
        }
        
        menu.appendChild(menuItem);
      }
    });
    
    return menu;
  }

  /**
   * Position menu to stay within viewport
   */
  private positionMenu(x: number, y: number): void {
    if (!this.menu) return;
    
    const menuRect = this.menu.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Adjust horizontal position
    if (x + menuRect.width > viewportWidth) {
      x = viewportWidth - menuRect.width - 5;
    }
    
    // Adjust vertical position
    if (y + menuRect.height > viewportHeight) {
      y = viewportHeight - menuRect.height - 5;
    }
    
    this.menu.style.left = `${Math.max(5, x)}px`;
    this.menu.style.top = `${Math.max(5, y)}px`;
  }

  /**
   * Handle click outside menu
   */
  private handleOutsideClick(e: MouseEvent): void {
    if (this.menu && !this.menu.contains(e.target as Node)) {
      this.hide();
    }
  }

  /**
   * Destroy context menu
   */
  destroy(): void {
    this.hide();
    this.items = [];
  }
}

/**
 * Create default shape context menu items
 */
export function createShapeMenuItems(handlers: {
  copy?: () => void;
  paste?: () => void;
  duplicate?: () => void;
  delete?: () => void;
  bringToFront?: () => void;
  bringForward?: () => void;
  sendBackward?: () => void;
  sendToBack?: () => void;
}, i18n?: I18n): MenuItemConfig[] {
  const t = i18n?.t.bind(i18n) || ((key: string) => key);
  
  const items: MenuItemConfig[] = [];
  
  if (handlers.copy) {
    items.push({
      id: 'copy',
      label: t('context.copy' as any),
      icon: icons.copy,
      shortcut: 'Ctrl+C',
      action: handlers.copy,
    });
  }
  
  if (handlers.paste) {
    items.push({
      id: 'paste',
      label: t('context.paste' as any),
      icon: icons.paste,
      shortcut: 'Ctrl+V',
      action: handlers.paste,
    });
  }
  
  if (handlers.duplicate) {
    items.push({
      id: 'duplicate',
      label: t('context.duplicate' as any),
      icon: icons.copy,
      shortcut: 'Ctrl+D',
      action: handlers.duplicate,
    });
  }
  
  if (handlers.delete) {
    items.push({
      id: 'delete',
      label: t('context.delete' as any),
      icon: icons.trash,
      shortcut: 'Del',
      action: handlers.delete,
    });
  }
  
  // Add divider before layer operations
  if (items.length > 0 && (handlers.bringToFront || handlers.sendToBack)) {
    items.push({ id: 'divider1', label: '', divider: true });
  }
  
  if (handlers.bringToFront) {
    items.push({
      id: 'bringToFront',
      label: t('context.bringToFront' as any),
      icon: icons.layers,
      action: handlers.bringToFront,
    });
  }
  
  if (handlers.bringForward) {
    items.push({
      id: 'bringForward',
      label: t('context.bringForward' as any),
      action: handlers.bringForward,
    });
  }
  
  if (handlers.sendBackward) {
    items.push({
      id: 'sendBackward',
      label: t('context.sendBackward' as any),
      action: handlers.sendBackward,
    });
  }
  
  if (handlers.sendToBack) {
    items.push({
      id: 'sendToBack',
      label: t('context.sendToBack' as any),
      icon: icons.layers,
      action: handlers.sendToBack,
    });
  }
  
  return items;
}
