import { useState } from "react";
import { getPendingGrades } from "@/lib/mock-data";
import { Check, X } from "lucide-react";

export default function ValidationPage() {
  const [pending, setPending] = useState(getPendingGrades());
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  const handleAction = (id: string, action: "approve" | "reject") => {
    setPending((prev) => prev.filter((g) => g.id !== id));
    setActionMsg(action === "approve" ? "Grade approved" : "Grade rejected");
    setTimeout(() => setActionMsg(null), 2000);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-heading font-bold">Grade Validation</h2>
        <p className="text-sm text-muted-foreground">{pending.length} grades awaiting approval</p>
      </div>

      {actionMsg && (
        <div className="bg-success/10 text-success border border-success/20 rounded-lg px-4 py-2.5 text-sm font-medium animate-fade-in">
          {actionMsg}
        </div>
      )}

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Student</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Class</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Subject</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Marks</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Teacher</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10 text-muted-foreground">No pending grades</td></tr>
              ) : pending.map((g) => (
                <tr key={g.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{g.studentName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{g.class}</td>
                  <td className="px-4 py-3">{g.subject}</td>
                  <td className="px-4 py-3 text-center font-medium">{g.marks}/{g.maxMarks}</td>
                  <td className="px-4 py-3 text-muted-foreground">{g.teacherName}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1.5">
                      <button onClick={() => handleAction(g.id, "approve")} className="p-1.5 rounded-md bg-success/10 text-success hover:bg-success/20 transition-colors">
                        <Check className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleAction(g.id, "reject")} className="p-1.5 rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
