import React, { createContext, useContext, useState, ReactNode } from "react";
import { Role } from "@/lib/mock-data";

interface AuthContextType {
  role: Role | null;
  userName: string;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  role: null,
  userName: "",
  login: () => {},
  logout: () => {},
});

const roleNames: Record<Role, string> = {
  teacher: "Mr. Adebayo",
  director: "Dr. Mensah",
  parent: "Mrs. Okafor",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const userName = role ? roleNames[role] : "";

  const login = (r: Role) => setRole(r);
  const logout = () => setRole(null);

  return (
    <AuthContext.Provider value={{ role, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
