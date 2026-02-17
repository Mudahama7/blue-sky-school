import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Role } from "@/lib/mock-data";
import { GraduationCap, Users, BookOpen } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const roles: { role: Role; label: string; description: string; icon: React.ElementType; path: string }[] = [
  { role: "teacher", label: "Enseignant", description: "Pour la gestion de cotes des eleves", icon: BookOpen, path: "/login" },
  { role: "director", label: "Directeur", description: "Pour la gestion de scolarité", icon: GraduationCap, path: "/login" },
  { role: "parent", label: "Parent", description: "Pour le suivi de son enfant", icon: Users, path: "/parentLogin" },
];

export default function HomePage() {
  const [selected, setSelected] = useState<Role | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!selected) return;
    login(selected);
    navigate(roles.find((r) => r.role === selected)!.path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Blue Sky School" className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg border-4 border-primary/20" />
          <h1 className="text-2xl font-heading font-bold text-foreground">Blue Sky School</h1>
          <p className="text-sm text-muted-foreground italic mt-1">Excellent Legacy</p>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h2 className="text-lg font-heading font-semibold mb-1">Bienvenu !</h2>
          <p className="text-sm text-muted-foreground mb-5">Veuillez selectionner votre Profil</p>

          <div className="space-y-3">
            {roles.map(({ role, label, description, icon: Icon }) => (
              <button
                key={role}
                onClick={() => setSelected(role)}
                className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all text-left
                  ${selected === role
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-border hover:border-primary/40 hover:bg-muted/50"
                  }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${selected === role ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-sm text-foreground">{label}</div>
                  <div className="text-xs text-muted-foreground">{description}</div>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleLogin}
            disabled={!selected}
            className="w-full mt-6 py-3 rounded-lg font-medium text-sm transition-all
              bg-primary text-primary-foreground hover:bg-primary/90
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
