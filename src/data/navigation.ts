import { AppWindow, Zap, MousePointerClick, FolderOpen, Settings2, LayoutPanelTop, Library, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const mainNavItems: NavItem[] = [
  { id: 'favorites', label: 'Favorites', icon: Star },
  { id: 'apps', label: 'Connectors', icon: AppWindow },
  { id: 'logic', label: 'Logic', icon: Zap },
  { id: 'interaction', label: 'Interaction', icon: MousePointerClick },
  { id: 'files', label: 'Files', icon: FolderOpen },
  { id: 'advanced', label: 'Advanced', icon: Settings2 },
];

export const bottomNavItems: NavItem[] = [
  { id: 'templates', label: 'Templates', icon: LayoutPanelTop },
  { id: 'library', label: 'Library', icon: Library },
];