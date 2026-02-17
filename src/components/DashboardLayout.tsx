import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Role } from "@/lib/mock-data";
import {
  LayoutDashboard, BookOpen, ClipboardCheck, Search, BarChart3,
  FileText, TrendingUp, Download, LogOut, Menu, X, Users, Book
} from "lucide-react";
import logo from "@/assets/logo.jpeg";
import { useState } from "react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const navByRole: Record<Role, NavItem[]> = {
  teacher: [
    { label: "Dashboard", path: "/teacher", icon: LayoutDashboard },
    { label: "Gestion des Cotes", path: "/teacher/grades", icon: BookOpen },
    { label: "Gestion des élèves", path: "/teacher/students", icon: Users },
    { label: "Gestion des Cours", path: "/teacher/courses", icon: Book },
  ],
  director: [
    { label: "Vue d'ensemble", path: "/director", icon: BarChart3 },
    { label: "Gérer les Enseignants", path: "/director/validation", icon: Users },
    { label: "Eleves", path: "/director/students", icon: Search },
  ],
  parent: [
    { label: "Dashboard", path: "/parent", icon: LayoutDashboard },
    { label: "Performances", path: "/parent/performance", icon: TrendingUp },
    { label: "Cotes et Bulletins", path: "/parent/report", icon: Download },
  ],
};

const roleLabels: Record<Role, string> = { teacher: "Enseigant", director: "Directeur", parent: "Parent" };

export default function DashboardLayout() {
  const { role, userName, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!role) {
    navigate("/");
    return null;
  }

  const items = navByRole[role];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sidebarContent = (
    <>
      <div className="p-5 flex items-center gap-3 border-b border-sidebar-border">
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full object-cover border-2 border-sidebar-primary/30" />
        <div className="min-w-0">
          <div className="text-sm font-heading font-bold text-sidebar-primary-foreground truncate">Blue Sky School</div>
          <div className="text-[10px] text-sidebar-muted italic">Excellent Legacy</div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`
            }
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-8 h-8 rounded-full bg-sidebar-primary/20 flex items-center justify-center text-xs font-bold text-sidebar-primary-foreground">
            {userName.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-medium text-sidebar-foreground truncate">{userName}</div>
            <div className="text-[10px] text-sidebar-muted">{roleLabels[role]}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          <span>Deconnexion</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex w-full">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col sidebar-gradient fixed inset-y-0 left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-60 flex flex-col sidebar-gradient animate-slide-in">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 md:ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur border-b border-border px-4 md:px-6 h-14 flex items-center gap-3">
          <button onClick={() => setMobileOpen(true)} className="md:hidden p-1.5 rounded-lg hover:bg-muted">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-base font-heading font-semibold text-foreground">Portail {roleLabels[role]}</h1>
        </header>

        <main className="flex-1 p-4 md:p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
