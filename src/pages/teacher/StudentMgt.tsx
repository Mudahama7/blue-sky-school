import { useState } from "react";
import { Plus, Search, Edit2, Trash2, MoreVertical, UserPlus, Filter, Download } from "lucide-react";
import { students as initialStudents } from "@/lib/mock-data";

export default function StudentManagement() {
  const [students, setStudents] = useState(initialStudents);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="p-2 space-y-6 animate-in fade-in duration-700">
      {/* ACTION BAR */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-card border border-border p-6 rounded-[2.5rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Rechercher un élève par nom ou matricule..." 
            className="w-full pl-12 pr-4 py-3 bg-muted/50 border border-border rounded-2xl focus:ring-2 focus:ring-primary outline-none font-medium"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-105 transition-all">
            <UserPlus className="w-5 h-5" /> Ajouter un élève
          </button>
        </div>
      </div>

      {/* TABLEAU CRUD */}
      <div className="bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/30 border-b border-border text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              <th className="p-6">Matricule</th>
              <th className="p-6">Nom Complet</th>
              <th className="p-6">Classe</th>
              <th className="p-6">Sexe</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {students.map((student) => (
              <tr key={student.id} className="group hover:bg-primary/[0.02] transition-colors">
                <td className="p-6 font-mono text-sm text-primary font-bold">{student.rollNo || 'MAT-001'}</td>
                <td className="p-6 font-bold text-foreground">{student.name}</td>
                <td className="p-6"><span className="px-3 py-1 bg-muted rounded-full text-xs font-bold">N3B</span></td>
                <td className="p-6 text-muted-foreground font-medium">M</td>
                <td className="p-6">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors" title="Modifier">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors" title="Supprimer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}