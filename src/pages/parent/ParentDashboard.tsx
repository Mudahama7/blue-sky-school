import { BookOpen, TrendingUp, Award, Calendar } from "lucide-react";
import { students, getStudentGrades, getStudentTermResults } from "@/lib/mock-data";

const student = students[0]; // Mock: first student for parent view
const sGrades = getStudentGrades(student.id).filter((g) => g.status === "approved");
const termResults = getStudentTermResults(student.id);
const avg = sGrades.length ? Math.round(sGrades.reduce((s, g) => s + g.marks, 0) / sGrades.length) : 0;

const stats = [
  { label: "Overall Average", value: `${avg}%`, icon: TrendingUp, color: "bg-primary/10 text-primary" },
  { label: "Subjects", value: new Set(sGrades.map((g) => g.subject)).size, icon: BookOpen, color: "bg-accent/20 text-accent-foreground" },
  { label: "Best Score", value: `${Math.max(...sGrades.map((g) => g.marks), 0)}%`, icon: Award, color: "bg-success/10 text-success" },
  { label: "Terms", value: termResults.length, icon: Calendar, color: "bg-info/10 text-info" },
];

export default function ParentDashboard() {
  // Get latest term grades
  const latestGrades = sGrades.filter((g) => g.term === "Term 3");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <img src={student.avatar} alt={student.name} className="w-14 h-14 rounded-full border-2 border-primary/20" />
        <div>
          <h2 className="text-xl font-heading font-bold">{student.name}</h2>
          <p className="text-sm text-muted-foreground">{student.class} · {student.id}</p>
        </div>
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
        <h3 className="font-heading font-semibold mb-3">Latest Grades (Term 3)</h3>
        {latestGrades.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No approved grades for this term yet</p>
        ) : (
          <div className="space-y-2">
            {latestGrades.map((g) => (
              <div key={g.id} className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0">
                <span className="text-sm font-medium">{g.subject}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${g.marks}%` }} />
                  </div>
                  <span className={`text-sm font-bold w-10 text-right ${g.marks >= 70 ? "text-success" : g.marks >= 50 ? "text-primary" : "text-destructive"}`}>{g.marks}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
