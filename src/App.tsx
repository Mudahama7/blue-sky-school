import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import HomePage from "./pages/HomePage";
import DashboardLayout from "./components/DashboardLayout";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import GradeEntry from "./pages/teacher/GradeEntry";
import DirectorOverview from "./pages/director/DirectorOverview";
import ValidationPage from "./pages/director/ValidationPage";
import StudentDirectory from "./pages/director/StudentDirectory";
import ParentDashboard from "./pages/parent/ParentDashboard";
import PerformancePage from "./pages/parent/PerformancePage";
import ReportCardPage from "./pages/parent/ReportCardPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import ParentLoginPage from "./pages/ParentLoginPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/parentLogin" element={<ParentLoginPage/>}/>
            <Route element={<DashboardLayout />}>
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/teacher/grades" element={<GradeEntry />} />
              
              <Route path="/director" element={<DirectorOverview />} />
              <Route path="/director/validation" element={<ValidationPage />} />
              <Route path="/director/students" element={<StudentDirectory />} />
              
              <Route path="/parent" element={<ParentDashboard />} />
              <Route path="/parent/performance" element={<PerformancePage />} />
              <Route path="/parent/report" element={<ReportCardPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
