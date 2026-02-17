export type Role = "teacher" | "director" | "parent";

export interface Student {
  id: string;
  name: string;
  class: string;
  rollNo: number;
  parentName: string;
  avatar: string;
}

export interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  class: string;
  marks: number;
  maxMarks: number;
  term: string;
  status: "draft" | "submitted" | "approved";
  teacherName: string;
}

export interface TermResult {
  term: string;
  average: number;
  rank: number;
}

export const classes = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"];
export const subjects = ["Mathematics", "English", "Science", "History", "Geography", "French", "Art"];
export const terms = ["Term 1", "Term 2", "Term 3"];

const firstNames = ["Amara", "Kwame", "Fatima", "Emeka", "Zainab", "David", "Grace", "Samuel", "Adaeze", "Tunde", "Blessing", "Kofi", "Ngozi", "Yusuf", "Chioma", "Ibrahim", "Esther", "Oumar", "Ruth", "Jean"];
const lastNames = ["Okafor", "Mensah", "Diallo", "Adeyemi", "Hassan", "Kimani", "Njoku", "Asante", "Bello", "Kamara", "Osei", "Traore", "Nwosu", "Mugisha", "Abdi", "Ndlovu", "Sow", "Okonkwo", "Mwangi", "Dlamini"];

export const students: Student[] = Array.from({ length: 40 }, (_, i) => ({
  id: `STU-${String(i + 1).padStart(3, "0")}`,
  name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
  class: classes[Math.floor(i / 7) % classes.length],
  rollNo: (i % 7) + 1,
  parentName: `Mr/Mrs ${lastNames[i % lastNames.length]}`,
  avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${firstNames[i % firstNames.length]}+${lastNames[i % lastNames.length]}&backgroundColor=3498db&textColor=ffffff`,
}));

export const grades: Grade[] = [];
students.forEach((s) => {
  subjects.forEach((sub) => {
    terms.forEach((term) => {
      const marks = Math.floor(Math.random() * 40) + 60;
      grades.push({
        id: `GRD-${grades.length + 1}`,
        studentId: s.id,
        studentName: s.name,
        subject: sub,
        class: s.class,
        marks,
        maxMarks: 100,
        term,
        status: Math.random() > 0.3 ? "approved" : Math.random() > 0.5 ? "submitted" : "draft",
        teacherName: ["Mr. Adebayo", "Ms. Mensah", "Mr. Kimani", "Mrs. Traore"][Math.floor(Math.random() * 4)],
      });
    });
  });
});

export const getStudentGrades = (studentId: string) => grades.filter((g) => g.studentId === studentId);

export const getClassGrades = (className: string, subject?: string, term?: string) => {
  return grades.filter(
    (g) => g.class === className && (!subject || g.subject === subject) && (!term || g.term === term)
  );
};

export const getSchoolAverage = () => {
  const approved = grades.filter((g) => g.status === "approved");
  return approved.length ? Math.round(approved.reduce((s, g) => s + g.marks, 0) / approved.length) : 0;
};

export const getTopStudents = (limit = 5) => {
  const avgMap: Record<string, { total: number; count: number; name: string; class: string }> = {};
  grades.filter((g) => g.status === "approved").forEach((g) => {
    if (!avgMap[g.studentId]) avgMap[g.studentId] = { total: 0, count: 0, name: g.studentName, class: g.class };
    avgMap[g.studentId].total += g.marks;
    avgMap[g.studentId].count++;
  });
  return Object.entries(avgMap)
    .map(([id, d]) => ({ id, name: d.name, class: d.class, average: Math.round(d.total / d.count) }))
    .sort((a, b) => b.average - a.average)
    .slice(0, limit);
};

export const getPendingGrades = () => grades.filter((g) => g.status === "submitted");

export const getStudentTermResults = (studentId: string): TermResult[] => {
  return terms.map((term) => {
    const tGrades = grades.filter((g) => g.studentId === studentId && g.term === term && g.status === "approved");
    return {
      term,
      average: tGrades.length ? Math.round(tGrades.reduce((s, g) => s + g.marks, 0) / tGrades.length) : 0,
      rank: Math.floor(Math.random() * 10) + 1,
    };
  });
};

export const getSubjectAverages = (className: string) => {
  return subjects.map((sub) => {
    const subGrades = grades.filter((g) => g.class === className && g.subject === sub && g.status === "approved");
    return {
      subject: sub,
      average: subGrades.length ? Math.round(subGrades.reduce((s, g) => s + g.marks, 0) / subGrades.length) : 0,
    };
  });
};
