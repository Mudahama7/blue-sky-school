import { BookOpen, Layers, Edit, Trash, PlusCircle, LayoutGrid } from "lucide-react";

export default function CourseManagement() {
  const domains = [
    { name: "PRE-CALCUL", color: "bg-[#D9EAD3]", courses: ["Lignes", "Lettres", "Nombres"] },
    { name: "LANGUES", color: "bg-[#D0E0E3]", courses: ["Français", "Anglais", "Kinyarwanda"] },
    { name: "MOTRICITE", color: "bg-[#FCE5CD]", courses: ["Dessin", "Coloriage", "Découpage"] },
  ];

  return (
    <div className="p-2 space-y-8 animate-in slide-in-from-right-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black tracking-tighter">Catalogue des Cours</h2>
          <p className="text-muted-foreground font-medium">Configurez les domaines et matières par trimestre.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all">
          <PlusCircle className="w-5 h-5" /> Nouveau Domaine
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {domains.map((domain, i) => (
          <div key={i} className="bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col">
            {/* Header Domaine */}
            <div className={`${domain.color} p-6 border-b-2 border-black/5 flex justify-between items-center`}>
              <h3 className="font-black text-lg tracking-widest uppercase">{domain.name}</h3>
              <div className="flex gap-2">
                <button className="p-2 bg-white/50 hover:bg-white rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                <button className="p-2 bg-white/50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"><Trash className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Liste des cours (Sub-CRUD) */}
            <div className="p-4 space-y-2 flex-1">
              {domain.courses.map((course, j) => (
                <div key={j} className="flex justify-between items-center p-4 bg-muted/30 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-bold">{course}</span>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="p-2 text-muted-foreground hover:text-primary"><Edit className="w-4 h-4" /></button>
                    <button className="p-2 text-muted-foreground hover:text-red-500"><Trash className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
              <button className="w-full mt-2 py-3 border-2 border-dashed border-border rounded-2xl text-muted-foreground text-xs font-black uppercase hover:border-primary hover:text-primary transition-all">
                + Ajouter une leçon
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}