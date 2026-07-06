//workspaces/MVP_Proyectos_Informaticos/frontend/src/components/common/Header.tsx

import type { FC, MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, PartyPopper, Building2, FileText, CalendarDays } from 'lucide-react';
import { headerStyles, navLinkHoverBg } from '../../styles/components/header_styles';

const navItems = [
  { path: '/', label: 'Inicio', icon: Home },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/eventos', label: 'Eventos', icon: PartyPopper },
  { path: '/proveedores', label: 'Proveedores', icon: Building2 },
  { path: '/contratos', label: 'Contratos', icon: FileText },
  { path: '/calendario', label: 'Calendario', icon: CalendarDays },
];

const Header: FC = () => {
  const location = useLocation();

  return (
    <header style={headerStyles.header}>
      <div style={headerStyles.container}>
        <div style={headerStyles.logoContainer}>
          <img src="/logo-prisma.png" alt="Prisma" style={headerStyles.logoImage} />
          <h1 style={headerStyles.title}>PRISMA</h1>
        </div>

        <nav style={headerStyles.nav}>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  ...headerStyles.navLink,
                  ...(isActive ? headerStyles.activeNavLink : {}),
                }}
                onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = navLinkHoverBg;
                }}
                onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <IconComponent size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;