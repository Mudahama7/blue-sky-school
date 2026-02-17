import { BarChart3, Users, TrendingUp, Award } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { getSchoolAverage, getTopStudents, getSubjectAverages, students, grades, classes } from "@/lib/mock-data";

const COLORS = ["hsl(207,74%,53%)", "hsl(48,89%,56%)", "hsl(142,71%,45%)", "hsl(262,52%,47%)", "hsl(0,72%,51%)", "hsl(207,74%,40%)", "hsl(48,89%,40%)"];

export default function DirectorOverview() {
  const schoolAvg = getSchoolAverage();
  const topStudents = getTopStudents(5);
  const subjectData = getSubjectAverages(classes[0]);

  const classDistribution = classes.map((c) => ({
    name: c,
    students: students.filter((s) => s.class === c).length,
  }));

  const statusData = [
    { name: "Approved", value: grades.filter((g) => g.status === "approved").length },
    { name: "Submitted", value: grades.filter((g) => g.status === "submitted").length },
    { name: "Draft", value: grades.filter((g) => g.status === "draft").length },
  ];

  const stats = [
    { label: "School Average", value: `${schoolAvg}%`, icon: BarChart3, color: "bg-primary/10 text-primary" },
    { label: "Total Students", value: students.length, icon: Users, color: "bg-accent/20 text-accent-foreground" },
    { label: "Pass Rate", value: `${Math.round(grades.filter((g) => g.marks >= 50 && g.status === "approved").length / (grades.filter((g) => g.status === "approved").length || 1) * 100)}%`, icon: TrendingUp, color: "bg-success/10 text-success" },
    { label: "Top Score", value: `${Math.max(...grades.map((g) => g.marks))}%`, icon: Award, color: "bg-info/10 text-info" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold">School Overview</h2>
        <p className="text-sm text-muted-foreground">Performance analytics & insights</p>
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

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Subject Performance */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-heading font-semibold mb-4">Subject Performance ({classes[0]})</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={subjectData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,90%)" />
              <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="average" fill="hsl(207,74%,53%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Grade Status */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-heading font-semibold mb-4">Grade Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {statusData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Students */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-heading font-semibold mb-3">Top Performing Students</h3>
        <div className="space-y-2">
          {topStudents.map((s, i) => (
            <div key={s.id} className="flex items-center gap-3 py-2.5 border-b border-border/50 last:border-0">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                i === 0 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
              }`}>#{i + 1}</div>
              <div className="flex-1">
                <span className="text-sm font-medium">{s.name}</span>
                <span className="text-xs text-muted-foreground ml-2">{s.class}</span>
              </div>
              <div className="text-sm font-bold text-primary">{s.average}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
