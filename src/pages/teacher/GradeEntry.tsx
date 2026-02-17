import { useState } from "react";
import { classes, subjects, terms, students, grades, Grade } from "@/lib/mock-data";
import { Save, Send, Filter } from "lucide-react";

export default function GradeEntry() {
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedTerm, setSelectedTerm] = useState(terms[0]);
  const [localGrades, setLocalGrades] = useState<Record<string, number>>({});
  const [submittedMsg, setSubmittedMsg] = useState<string | null>(null);

  const classStudents = students.filter((s) => s.class === selectedClass);
  const existingGrades = grades.filter(
    (g) => g.class === selectedClass && g.subject === selectedSubject && g.term === selectedTerm
  );

  const getGradeForStudent = (studentId: string) => {
    if (localGrades[studentId] !== undefined) return localGrades[studentId];
    const existing = existingGrades.find((g) => g.studentId === studentId);
    return existing ? existing.marks : 0;
  };

  const getStatus = (studentId: string) => {
    const existing = existingGrades.find((g) => g.studentId === studentId);
    return existing?.status || "draft";
  };

  const handleChange = (studentId: string, value: string) => {
    const num = Math.min(100, Math.max(0, parseInt(value) || 0));
    setLocalGrades((prev) => ({ ...prev, [studentId]: num }));
  };

  const handleAction = (action: "draft" | "submit") => {
    setSubmittedMsg(action === "draft" ? "Grades saved as draft" : "Grades submitted for approval");
    setTimeout(() => setSubmittedMsg(null), 3000);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-heading font-bold">Grade Entry</h2>
          <p className="text-sm text-muted-foreground">Enter and manage student marks</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleAction("draft")} className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border border-border hover:bg-muted transition-colors">
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <button onClick={() => handleAction("submit")} className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <Send className="w-4 h-4" /> Submit
          </button>
        </div>
      </div>

      {submittedMsg && (
        <div className="bg-success/10 text-success border border-success/20 rounded-lg px-4 py-2.5 text-sm font-medium animate-fade-in">
          {submittedMsg}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 bg-card rounded-xl border border-border p-4">
        <Filter className="w-4 h-4 text-muted-foreground" />
        {[
          { label: "Class", value: selectedClass, options: classes, onChange: setSelectedClass },
          { label: "Subject", value: selectedSubject, options: subjects, onChange: setSelectedSubject },
          { label: "Term", value: selectedTerm, options: terms, onChange: setSelectedTerm },
        ].map((f) => (
          <select
            key={f.label}
            value={f.value}
            onChange={(e) => f.onChange(e.target.value)}
            className="bg-muted border border-border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          >
            {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
      </div>

      {/* Grade Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Roll</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Student Name</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Marks / 100</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Grade</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {classStudents.map((s) => {
                const marks = getGradeForStudent(s.id);
                const grade = marks >= 90 ? "A+" : marks >= 80 ? "A" : marks >= 70 ? "B" : marks >= 60 ? "C" : "D";
                const status = getStatus(s.id);
                return (
                  <tr key={s.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground">{s.rollNo}</td>
                    <td className="px-4 py-3 font-medium">{s.name}</td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={getGradeForStudent(s.id)}
                        onChange={(e) => handleChange(s.id, e.target.value)}
                        className="w-20 text-center bg-muted/50 border border-border rounded-md px-2 py-1 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block w-8 text-center font-bold text-xs ${
                        marks >= 80 ? "text-success" : marks >= 60 ? "text-primary" : "text-destructive"
                      }`}>{grade}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        status === "approved" ? "bg-success/10 text-success" :
                        status === "submitted" ? "bg-accent/20 text-accent-foreground" :
                        "bg-muted text-muted-foreground"
                      }`}>{status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
