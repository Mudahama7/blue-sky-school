import { useState } from "react";
import { students, grades, subjects } from "@/lib/mock-data";
import { Save, Send, X, ChevronRight, Book, FileSpreadsheet } from "lucide-react";

export default function GradeEntry() {
  // États de saisie et de statut
  const [localGrades, setLocalGrades] = useState<Record<string, number>>({});
  const [submittedMsg, setSubmittedMsg] = useState<string | null>(null);

  // Nouveaux états (Filtres supprimés, on garde juste le type)
  const [evaluationType, setEvaluationType] = useState("Devoir");
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [maxScore, setMaxScore] = useState(40);
  const [weighting, setWeighting] = useState(4);

  // On suppose que classStudents récupère les élèves de la classe gérée actuellement par le prof
  const classStudents = students; 

  const getGradeForStudent = (studentId: string) => {
    if (localGrades[studentId] !== undefined) return localGrades[studentId];
    const existing = grades.find(
      (g) => g.subject === activeSubject && g.studentId === studentId
    );
    return existing ? existing.marks : "";
  };

  const handleChange = (studentId: string, value: string) => {
    const num = Math.min(maxScore, Math.max(0, parseInt(value) || 0));
    setLocalGrades((prev) => ({ ...prev, [studentId]: num }));
  };

  const handleAction = (action: "draft" | "submit") => {
    setSubmittedMsg(action === "draft" ? "Brouillon enregistré" : "Cotes soumises avec succès");
    setTimeout(() => setSubmittedMsg(null), 3000);
    setIsModalOpen(false);
  };

  const openModal = (subject: string) => {
    setActiveSubject(subject);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveSubject(null);
  };

  const currentDate = new Date().toLocaleDateString('fr-FR');

  return (
    <div className="space-y-6 relative">
      {/* En-tête de la page */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Saisie des Cotes</h2>
        <p className="text-muted-foreground mt-1">Choisissez une matière pour remplir les cotes de vos élèves.</p>
      </div>

      {submittedMsg && (
        <div className="bg-success/10 text-success border border-success/20 rounded-lg px-4 py-3 text-sm font-medium animate-in fade-in slide-in-from-top-2">
          {submittedMsg}
        </div>
      )}

      {/* Barre d'outils épurée : Uniquement le type d'évaluation */}
      <div className="flex flex-wrap items-center gap-4 bg-card rounded-xl border border-border p-4 shadow-sm">
        <div className="flex items-center gap-2 text-primary bg-primary/10 p-2 rounded-lg">
           <FileSpreadsheet className="w-5 h-5" />
        </div>
        <label className="text-sm font-medium text-foreground flex items-center gap-3">
          Type d'évaluation :
          <select
            value={evaluationType}
            onChange={(e) => setEvaluationType(e.target.value)}
            className="bg-background border border-border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-w-[200px]"
          >
            <option value="Test">Test</option>
            <option value="Examen">Examen</option>
          </select>
        </label>
      </div>

      {/* Liste des Matières en mode Grille (Cards) pour mieux occuper l'espace */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => openModal(subject)}
            className="flex flex-col text-left bg-card p-5 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between w-full mb-4">
              <div className="p-2.5 bg-muted rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <Book className="w-5 h-5" />
              </div>
              {/* Petit badge pour simuler un état, ça habille l'interface */}
              <span className="text-[10px] uppercase tracking-wider font-semibold bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                À Remplir
              </span>
            </div>
            
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {subject}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {classStudents.length} élèves
            </p>

            <div className="mt-6 flex items-center justify-between w-full pt-4 border-t border-border/50 text-sm">
              <span className="text-muted-foreground font-medium group-hover:text-primary transition-colors">Saisir les cotes</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all" />
            </div>
          </button>
        ))}
      </div>

      {/* MODAL 95% (Inchangé, car il était parfait) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-[95vw] h-[95vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 border-b border-border bg-muted/30">
              <div>
                <h3 className="text-2xl font-bold text-foreground">Côter à l'{evaluationType.toLowerCase()} de {activeSubject}</h3>
                
                <div className="flex items-center gap-8 mt-4 text-sm font-medium text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <label>Pondération :</label>
                    <input 
                      type="number" 
                      value={weighting} 
                      onChange={(e) => setWeighting(Number(e.target.value))}
                      className="w-16 bg-background border border-border rounded-md px-2 py-1 text-foreground focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label>{evaluationType} sur :</label>
                    <input 
                      type="number" 
                      value={maxScore} 
                      onChange={(e) => setMaxScore(Number(e.target.value))}
                      className="w-16 bg-background border border-border rounded-md px-2 py-1 text-foreground focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div className="bg-background px-3 py-1 rounded-md border border-border">Date : {currentDate}</div>
                </div>
              </div>
              
              <button 
                onClick={closeModal}
                className="p-2 rounded-full bg-background border border-border hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-auto bg-background/50">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-muted/95 backdrop-blur-sm border-b border-border z-10 shadow-sm">
                  <tr>
                    <th className="text-left px-8 py-4 font-semibold text-muted-foreground w-24">N°</th>
                    <th className="text-left px-8 py-4 font-semibold text-muted-foreground w-40">Code Élève</th>
                    <th className="text-left px-8 py-4 font-semibold text-muted-foreground">Nom de l'élève</th>
                    <th className="text-left px-8 py-4 font-semibold text-muted-foreground w-48">Points obtenus</th>
                  </tr>
                </thead>
                <tbody>
                  {classStudents.map((s, index) => (
                    <tr key={s.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="px-8 py-4 text-muted-foreground font-medium">
                        {String(index + 1).padStart(3, '0')}
                      </td>
                      <td className="px-8 py-4 text-muted-foreground">
                        {s.rollNo || `CODE-${s.id.slice(0,4)}`} 
                      </td>
                      <td className="px-8 py-4 font-medium text-foreground">{s.name}</td>
                      <td className="px-8 py-4">
                        <input
                          type="number"
                          min={0}
                          max={maxScore}
                          value={getGradeForStudent(s.id)}
                          onChange={(e) => handleChange(s.id, e.target.value)}
                          className="w-24 bg-background border border-border rounded-md px-3 py-2 text-foreground font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          placeholder="--"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-border bg-muted/30 flex justify-end gap-3">
              <button 
                onClick={closeModal} 
                className="px-5 py-2.5 text-sm rounded-xl hover:bg-muted-foreground/10 transition-colors font-medium"
              >
                Annuler
              </button>
              <button 
                onClick={() => handleAction("submit")} 
                className="flex items-center gap-2 px-5 py-2.5 text-sm rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium shadow-sm"
              >
                <Send className="w-4 h-4" /> Enregistrer les cotes
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}