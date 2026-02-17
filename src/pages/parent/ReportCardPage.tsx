import { Download, Printer } from "lucide-react";
import { students, getStudentGrades, subjects, terms } from "@/lib/mock-data";
import logo from "@/assets/logo.jpeg";

const student = students[0];
const sGrades = getStudentGrades(student.id).filter((g) => g.status === "approved");

export default function ReportCardPage() {
  const getGrade = (marks: number) =>
    marks >= 90 ? "A+" : marks >= 80 ? "A" : marks >= 70 ? "B" : marks >= 60 ? "C" : marks >= 50 ? "D" : "F";

  const getRemark = (marks: number) =>
    marks >= 80 ? "Excellent" : marks >= 70 ? "Very Good" : marks >= 60 ? "Good" : marks >= 50 ? "Fair" : "Needs Improvement";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-heading font-bold">Report Card</h2>
          <p className="text-sm text-muted-foreground">Academic performance summary</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>

      {/* Report Card Preview */}
      <div className="bg-card rounded-xl border border-border p-6 md:p-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center border-b-2 border-primary pb-5 mb-5">
          <img src={logo} alt="Logo" className="w-16 h-16 rounded-full object-cover mx-auto mb-2" />
          <h3 className="text-lg font-heading font-bold text-primary">BLUE SKY SCHOOL</h3>
          <p className="text-xs text-muted-foreground italic">Excellent Legacy</p>
          <p className="text-sm font-medium mt-2">Student Report Card</p>
        </div>

        {/* Student Info */}
        <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
          <div><span className="text-muted-foreground">Name:</span> <span className="font-medium">{student.name}</span></div>
          <div><span className="text-muted-foreground">Student ID:</span> <span className="font-medium">{student.id}</span></div>
          <div><span className="text-muted-foreground">Class:</span> <span className="font-medium">{student.class}</span></div>
          <div><span className="text-muted-foreground">Academic Year:</span> <span className="font-medium">2025-2026</span></div>
        </div>

        {/* Grades Table */}
        {terms.map((term) => {
          const termGrades = sGrades.filter((g) => g.term === term);
          if (termGrades.length === 0) return null;
          const termAvg = Math.round(termGrades.reduce((s, g) => s + g.marks, 0) / termGrades.length);
          return (
            <div key={term} className="mb-5">
              <h4 className="text-sm font-heading font-semibold mb-2 text-primary">{term}</h4>
              <table className="w-full text-sm border border-border">
                <thead>
                  <tr className="bg-primary/5">
                    <th className="text-left px-3 py-2 border border-border font-medium">Subject</th>
                    <th className="text-center px-3 py-2 border border-border font-medium">Marks</th>
                    <th className="text-center px-3 py-2 border border-border font-medium">Grade</th>
                    <th className="text-left px-3 py-2 border border-border font-medium">Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {termGrades.map((g) => (
                    <tr key={g.id}>
                      <td className="px-3 py-2 border border-border">{g.subject}</td>
                      <td className="px-3 py-2 border border-border text-center font-medium">{g.marks}/{g.maxMarks}</td>
                      <td className="px-3 py-2 border border-border text-center font-bold">{getGrade(g.marks)}</td>
                      <td className="px-3 py-2 border border-border text-muted-foreground">{getRemark(g.marks)}</td>
                    </tr>
                  ))}
                  <tr className="bg-muted/50 font-medium">
                    <td className="px-3 py-2 border border-border">Term Average</td>
                    <td className="px-3 py-2 border border-border text-center">{termAvg}%</td>
                    <td className="px-3 py-2 border border-border text-center font-bold">{getGrade(termAvg)}</td>
                    <td className="px-3 py-2 border border-border text-muted-foreground">{getRemark(termAvg)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}

        <div className="border-t border-border pt-4 mt-4 text-center text-xs text-muted-foreground">
          <p>This is an official document of Blue Sky School</p>
          <p className="mt-1">Generated on {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
