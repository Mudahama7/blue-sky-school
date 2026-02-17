import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { students, getStudentGrades, getStudentTermResults, subjects } from "@/lib/mock-data";

const student = students[0];
const termResults = getStudentTermResults(student.id);
const sGrades = getStudentGrades(student.id).filter((g) => g.status === "approved");

const subjectPerformance = subjects.map((sub) => {
  const subG = sGrades.filter((g) => g.subject === sub);
  return { subject: sub, average: subG.length ? Math.round(subG.reduce((s, g) => s + g.marks, 0) / subG.length) : 0 };
});

export default function PerformancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold">Performance Analysis</h2>
        <p className="text-sm text-muted-foreground">Track progress across terms and subjects</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-heading font-semibold mb-4">Term Progress</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={termResults}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210,20%,90%)" />
              <XAxis dataKey="term" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="average" stroke="hsl(207,74%,53%)" strokeWidth={3} dot={{ fill: "hsl(207,74%,53%)", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="font-heading font-semibold mb-4">Subject Strengths</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={subjectPerformance}>
              <PolarGrid stroke="hsl(210,20%,90%)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar dataKey="average" stroke="hsl(207,74%,53%)" fill="hsl(207,74%,53%)" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="font-heading font-semibold mb-3">Term Summary</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {termResults.map((t) => (
            <div key={t.term} className="bg-muted/50 rounded-lg p-4 text-center">
              <div className="text-sm text-muted-foreground mb-1">{t.term}</div>
              <div className="text-3xl font-heading font-bold text-primary">{t.average}%</div>
              <div className="text-xs text-muted-foreground mt-1">Rank #{t.rank}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
