import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Role } from "@/lib/mock-data";
import { GraduationCap, Users, BookOpen, Mail, Lock, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.jpeg";

export default function LoginPage() {
  const [selected, setSelected] = useState<Role | null>(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // JUSTE LE TEMPS DE VALIDATION DU FRONT

  const { role } = useAuth();

  if (!role) {
    navigate("/");
    return null;
  }

  const handleLogin = () => {
    if (role == "teacher") {
      navigate("/teacher")
    }else {
      navigate("/director")
    }
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
          <h2 className="text-lg font-heading font-semibold mb-1">Connexion</h2>
          <p className="text-sm text-muted-foreground mb-5">Veuillez renseigner vos identifiants</p>
          <form onSubmit={handleLogin} className="animate-in fade-in slide-in-from-right-4 duration-300">
            
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg font-medium text-sm transition-all bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
              >
                Se Connecter
              </button>
            </div>
          </form>
          
        </div>
        </div>
    </div>
  );
}
