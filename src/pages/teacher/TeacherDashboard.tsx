import { 
  Users, BookOpen, ClipboardCheck, TrendingUp, 
  Calendar as CalendarIcon, ArrowUpRight, Clock, 
  Star, ChevronRight
} from "lucide-react";
import { students, grades, subjects } from "@/lib/mock-data";

export default function TeacherDashboard() {
  const teacherGrades = grades.filter((g) => g.teacherName === "Mr. Adebayo");
  const approvedGrades = teacherGrades.filter((g) => g.status === "approved");
  
  const stats = [
    { label: "Nombre d'élèves", value: students.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50", trend: "+2 nouveaux" },
    { label: "Matières actives", value: subjects.length, icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50", trend: "Semaine en cours" },
    { label: "Cotes saisies", value: teacherGrades.length, icon: ClipboardCheck, color: "text-green-600", bg: "bg-green-50", trend: "85% complété" },
    { label: "Moyenne Générale", value: `${Math.round(approvedGrades.reduce((s, g) => s + g.marks, 0) / (approvedGrades.length || 1))}%`, icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50", trend: "+1.2% progression" },
  ];

  return (
    <div className="p-2 space-y-8 animate-in fade-in duration-700">
      {/* SECTION 1: WELCOME (Version épurée sans boutons) */}
      <div className="relative overflow-hidden bg-card border border-border p-8 rounded-[2.5rem] shadow-sm">
        <div className="relative z-10">
          <h2 className="text-2xl font-black tracking-tight text-foreground">
            Bon retour, <span className="text-primary italic">Mr. Adebayo</span> 👋
          </h2>
          <p className="text-muted-foreground font-medium mt-1 max-w-2xl">
            Voici l'aperçu global de vos performances pédagogiques et du suivi de vos classes pour ce trimestre.
          </p>
        </div>
        {/* Décoration abstraite pour combler le vide sans boutons */}
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      </div>

      {/* SECTION 2: STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="group bg-card p-6 rounded-[2rem] border border-border shadow-sm hover:border-primary/30 transition-all duration-300">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${s.bg} ${s.color}`}>
              <s.icon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
                <div className="text-3xl font-black tracking-tighter italic">{s.value}</div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{s.label}</div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 w-fit px-2 py-0.5 rounded-full">
                <ArrowUpRight className="w-3 h-3" /> {s.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SECTION 3: RECENT ACTIVITIES (Colonne principale) */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-[2.5rem] border border-border h-full shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-muted/20">
              <h3 className="text-1xl font-black tracking-tight flex items-center gap-2">
                <div className="w-2 h-6 bg-primary rounded-full" />
                Activités de Notation
              </h3>
            </div>
            
            <div className="p-4 space-y-1">
              {subjects.slice(0, 6).map((subject, i) => (
                <div key={subject} className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted/50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-primary font-bold shadow-sm">
                      {subject.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{subject}</p>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Il y a {i + 1}h</span>
                        <span className="flex items-center gap-1 text-primary/70 italic underline decoration-primary/20">Test Trimestriel</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:block text-right">
                       <div className="h-1.5 w-32 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${95 - (i * 12)}%` }}></div>
                       </div>
                       <p className="text-[10px] font-black text-muted-foreground mt-1 tracking-tighter italic">Progression: {95 - (i * 12)}%</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4: CALENDAR & INFO (Colonne de droite) */}
        <div className="flex flex-col gap-8">
           {/* CALENDAR MINI */}
           <div className="bg-card border border-border p-8 rounded-[2.5rem] shadow-sm flex-1">
              <div className="flex items-center justify-between mb-8">
                <h4 className="font-black text-sm tracking-widest flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-primary" /> Agenda
                </h4>
              </div>

              <div className="space-y-6">
                {[
                  { day: "Jeu", date: "05", task: "Remise Bulletin", time: "08:00", type: "Admin" },
                  { day: "Ven", date: "06", task: "Conseil de classe", time: "14:30", type: "Réunion" },
                  { day: "Lun", date: "09", task: "Saisie Examen Phisique", time: "10:00", type: "Notation" },
                ].map((item) => (
                  <div key={item.date} className="flex gap-5 items-center group cursor-pointer">
                    <div className="bg-muted group-hover:bg-primary group-hover:text-white transition-all px-4 py-3 rounded-2xl text-center min-w-[60px]">
                      <p className="text-[10px] font-bold uppercase opacity-60">{item.day}</p>
                      <p className="text-xl font-black leading-none">{item.date}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors">{item.task}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium text-muted-foreground italic">{item.time}</span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span className="text-[10px] font-bold text-primary/60 uppercase tracking-tighter">{item.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           {/* Petit widget de motivation ou stat rapide pour ne pas laisser de vide en bas */}
           <div className="bg-primary p-8 rounded-[2.5rem] text-primary-foreground shadow-lg shadow-primary/20">
              <Star className="w-8 h-8 mb-4 fill-white/20 text-white" />
              <p className="text-xl font-black italic leading-tight">Matière la plus performante</p>
              <p className="text-sm opacity-80 font-medium mt-1">Mathématiques (88% de réussite)</p>
           </div>
        </div>
      </div>
    </div>
  );
}