import { useState } from "react";
import { students, getStudentGrades } from "@/lib/mock-data";
import { Search, ChevronRight } from "lucide-react";

export default function StudentDirectory() {
  const [search, setSearch] = useState("");

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-heading font-bold">Student Directory</h2>
        <p className="text-sm text-muted-foreground">Search and view student records</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.slice(0, 12).map((s) => {
          const sGrades = getStudentGrades(s.id).filter((g) => g.status === "approved");
          const avg = sGrades.length ? Math.round(sGrades.reduce((sum, g) => sum + g.marks, 0) / sGrades.length) : 0;
          return (
            <div key={s.id} className="bg-card rounded-xl border border-border p-4 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-center gap-3">
                <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-full" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.class} · {s.id}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Average</span>
                <span className={`text-sm font-bold ${avg >= 70 ? "text-success" : avg >= 50 ? "text-primary" : "text-destructive"}`}>{avg}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
