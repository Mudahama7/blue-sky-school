import { useState } from "react";
import { students } from "@/lib/mock-data";
import { Search, FileText, X, Download, Printer, User, ChevronRight } from "lucide-react";

export default function BulletinsView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openBulletin = (student: any) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const sections = [
    { title: "PRE-CALCUL", color: "bg-[#D9EAD3]", items: ["LES LIGNES", "LES LETTRES", "CHIFFRES ET NOMBRES"], max: [20, 10, 10] },
    { title: "PRE-LECTURE", color: "bg-[#FFF2CC]", items: ["IMAGES"], max: [10] },
    { title: "PRE-ECRITURE", color: "bg-[#EAD1DC]", items: ["LES LIGNES", "LES LETTRES", "CHIFFRES ET NOMBRES"], max: [10, 10, 10] },
    { title: "ACTIVITES-SENSORIELLES", color: "bg-[#CFE2F3]", items: ["LES COULEURS", "DIRECTIONS", "NOTION DE GRANDEUR"], max: [10, 10, 10] },
    { title: "ACTIVITES-MOTRICES", color: "bg-[#FCE5CD]", items: ["COLORIAGE", "DECOUPAGE", "MODELAGE", "COLLAGE", "PEINTURE", "DESSIN", "MOSAÏQUE"], max: [10, 5, 5, 5, 5, 10, 5] },
    { title: "LANGUES", color: "bg-[#D0E0E3]", items: ["FRANÇAIS", "ANGLAIS", "KINYARWANDA"], max: [20, 10, 10] },
  ];

  return (
    <div className="p-2 space-y-8 animate-in fade-in duration-700">
      {/* HEADER RECHERCHE */}
      <div className="bg-card border border-border p-8 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Bulletins Scolaires</h2>
          <p className="text-muted-foreground font-medium">Cliquez sur un élève pour voir son bulletin officiel.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Rechercher un nom..." 
            className="w-full pl-12 pr-4 py-3 bg-muted/50 border border-border rounded-2xl outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* LISTE DES ÉLÈVES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((student) => (
          <div 
            key={student.id} 
            onClick={() => openBulletin(student)}
            className="group cursor-pointer bg-card border border-border p-6 rounded-[2rem] hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
              <User />
            </div>
            <p className="font-black text-lg truncate">{student.name}</p>
            <p className="text-xs font-bold text-muted-foreground">CLASSE: N3B</p>
            <div className="mt-4 pt-4 border-t border-border flex justify-end">
              <ChevronRight className="w-5 h-5 text-primary" />
            </div>
          </div>
        ))}
      </div>

      {/* MODAL BULLETIN AVEC SECTIONS COLORÉES */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          
          <div className="relative w-[95vw] h-[95vh] bg-slate-300 flex flex-col overflow-hidden rounded-[2.5rem] shadow-2xl">
            
            <div className="p-4 bg-white border-b flex justify-between items-center shadow-sm z-10">
              <div className="flex items-center gap-2 font-black text-primary">
                <FileText /> Document Officiel : {selectedStudent.name}
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"><Printer className="w-4 h-4" /> Imprimer</button>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"><Download className="w-4 h-4" /> PDF</button>
                <button onClick={() => setIsModalOpen(false)} className="ml-4 p-2 hover:bg-slate-200 rounded-full transition-colors"><X className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-12">
              <div className="w-[210mm] mx-auto bg-white p-[15mm] shadow-2xl text-black font-serif relative">
                
                {/* Header Filigrane ou Logo (Optionnel) */}
                <div className="text-center mb-10">
                  <h1 className="text-3xl font-black text-[#003366] tracking-tighter">BLUE SKY SCHOOL</h1>
                  <p className="text-[10px] font-bold tracking-[0.4em] text-gray-500">EXCELLENT LEGACY</p>
                  <div className="mt-6 border-y-[3px] border-black py-3">
                    <h2 className="text-xl font-black italic">BULLETIN DE L'ECOLE MATERNELLE</h2>
                    <p className="text-xs font-bold tracking-[0.2em] mt-1">ANNÉE SCOLAIRE: 2025-2026</p>
                  </div>
                </div>

                {/* Infos Élève */}
                <div className="flex justify-between text-[12px] font-bold mb-6 border-b border-black pb-4">
                  <div className="space-y-2">
                    <p>NOM DE L'ELEVE : <span className="uppercase font-black underline decoration-2 ml-2">{selectedStudent.name}</span></p>
                    <p>CLASSE : <span className="underline decoration-2 ml-2">TROISIEME ANNEE MATERNELLE (N3B)</span></p>
                  </div>
                  <p>NO : <span className="underline decoration-2 ml-2">00{selectedStudent.rollNo || '1'}</span></p>
                </div>

                {/* TABLEAU AVEC COULEURS DE SECTION */}
                <table className="w-full border-[2.5px] border-black text-[11px] leading-none">
                  <thead>
                    <tr className="border-b-[2.5px] border-black bg-white">
                      <th className="border-r-2 border-black p-3 text-left w-[45%] font-black italic">LES LEÇONS</th>
                      <th className="border-r-2 border-black p-3 w-20">1er TRIM.</th>
                      <th className="border-r-2 border-black p-3 w-20">2e TRIM.</th>
                      <th className="border-r-2 border-black p-3 w-20">3e TRIM.</th>
                      <th className="p-3 w-24 bg-gray-50">TOTAL ANNUEL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sections.map((section, sIdx) => (
                      <>
                        {/* Barre de Titre de Section Colorée */}
                        <tr key={sIdx} className={`${section.color} border-b-2 border-black font-black`}>
                          <td className="p-2 border-r-2 border-black uppercase tracking-wider" colSpan={5}>
                            {section.title}
                          </td>
                        </tr>
                        {/* Sous-matières */}
                        {section.items.map((item, iIdx) => (
                          <tr key={`${sIdx}-${iIdx}`} className="border-b border-black hover:bg-slate-50 transition-colors">
                            <td className="p-2 pl-6 border-r-2 border-black italic font-medium">{item}</td>
                            <td className="border-r-2 border-black text-center font-bold">18/{section.max[iIdx]}</td>
                            <td className="border-r-2 border-black text-center"></td>
                            <td className="border-r-2 border-black text-center"></td>
                            <td className="text-center bg-gray-50/50"></td>
                          </tr>
                        ))}
                      </>
                    ))}

                    {/* LIGNES DE TOTALISATION */}
                    <tr className="border-t-[2.5px] border-black font-black bg-slate-100">
                      <td className="p-3 border-r-2 border-black text-right uppercase italic">Total Général / 250</td>
                      <td className="border-r-2 border-black text-center text-sm underline">218</td>
                      <td className="border-r-2 border-black text-center"></td>
                      <td className="border-r-2 border-black text-center"></td>
                      <td className="text-center text-primary text-base italic underline">87%</td>
                    </tr>
                  </tbody>
                </table>

                {/* Footer Signature & Légende */}
                <div className="mt-1 flex justify-between items-start">
                  {/* LEGENDE */}
                    <div className="border-b border-black">
                    <p className="text-cyan-400 px-1 py-0.5 border-b border-black text-[14px]">LEGENDE</p>
                    <div className="flex flex-col">
                        {/* Ligne EXCELLENT */}
                        <div className="flex border-b border-black">
                        <div className="w-24 h-6 bg-[#00a651] border-r border-black"></div>
                        <div className="flex-1 bg-gray-400 px-2 flex items-center">EXCELLENT</div>
                        </div>
                        {/* Ligne TRES BIEN */}
                        <div className="flex border-b border-black">
                        <div className="w-24 h-6 bg-[#2e3192] border-r border-black"></div>
                        <div className="flex-1 bg-gray-400 px-2 flex items-center">TRES BIEN</div>
                        </div>
                        {/* Ligne BIEN */}
                        <div className="flex border-b border-black">
                        <div className="w-24 h-6 bg-[#fff200] border-r border-black"></div>
                        <div className="flex-1 bg-gray-400 px-2 flex items-center">BIEN</div>
                        </div>
                        {/* Ligne ECHEC */}
                        <div className="flex">
                        <div className="w-24 h-6 bg-[#ed1c24] border-r border-black"></div>
                        <div className="flex-1 bg-gray-400 px-2 flex items-center">ECHEC</div>
                        </div>
                    </div>
                    </div>
                  <div className="text-center font-black italic space-y-12">
                    <p className="text-[11px] underline">SIGNATURE DE LA DIRECTRICE</p>
                    <div className="pt-4">
                       <p className="text-sm uppercase tracking-tighter">MUKANDINDA ELLIN</p>
                       <p className="text-[9px] not-italic opacity-70 leading-none">DIRECTRICE DE L'ECOLE BLUE SKY</p>
                    </div>
                  </div>
                </div>

                {/* Date de génération en bas de page */}
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-bold text-gray-400 uppercase tracking-widest">Généré numériquement le {new Date().toLocaleDateString()}</p>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}