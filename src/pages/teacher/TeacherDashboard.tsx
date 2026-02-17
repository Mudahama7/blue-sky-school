import { Users, BookOpen, ClipboardCheck, TrendingUp } from "lucide-react";
import { students, grades, classes, subjects } from "@/lib/mock-data";

const stats = [
  { label: "Nombre d'élèves", value: students.length, icon: Users, color: "bg-primary/10 text-primary" },
  { label: "matières", value: subjects.length, icon: BookOpen, color: "bg-accent/20 text-accent-foreground" },
  { label: "Cotes enregistrées", value: grades.filter((g) => g.teacherName === "Mr. Adebayo").length, icon: ClipboardCheck, color: "bg-success/10 text-success" },
  { label: "La cote moyenne", value: Math.round(grades.filter((g) => g.teacherName === "Mr. Adebayo" && g.status === "approved").reduce((s, g) => s + g.marks, 0) / (grades.filter((g) => g.teacherName === "Mr. Adebayo" && g.status === "approved").length || 1)), icon: TrendingUp, color: "bg-info/10 text-info" },
];

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold">Bon retour, Mr. Adebayo</h2>
        <p className="text-sm text-muted-foreground">Voici votre aprerçu pédagogique</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon className="w-4 h-4" />
            </div>
            <div className="text-2xl font-heading font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-heading font-semibold mb-3">Recents enregistrements</h3>
        <div className="space-y-3">
          {grades.filter((g) => g.teacherName === "Mr. Adebayo").slice(0, 5).map((g) => (
            <div key={g.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <div>
                <span className="text-sm font-medium">{g.studentName}</span>
                <span className="text-xs text-muted-foreground ml-2">{g.subject} · {g.class}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{g.marks}/{g.maxMarks}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  g.status === "approved" ? "bg-success/10 text-success" :
                  g.status === "submitted" ? "bg-accent/20 text-accent-foreground" :
                  "bg-muted text-muted-foreground"
                }`}>{g.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
