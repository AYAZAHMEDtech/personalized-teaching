import React, { useState } from 'react';
import { TeacherDashboard } from './components/teacher-dashboard';
import { StudentDashboard } from './components/student-dashboard';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { GraduationCap, Users, BarChart3, BookOpen } from 'lucide-react';

type UserRole = 'teacher' | 'student' | null;

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);

  if (!userRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-4xl w-full space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">FEDF-PS29</h1>
            <h2 className="text-xl text-muted-foreground">
              Student Performance Analytics and Reporting System
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive web application that analyzes student performance data to generate 
              reports and insights, helping educators track academic progress and provide 
              actionable recommendations to enhance student learning outcomes.
            </p>
          </div>

          {/* Features Overview */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  For Teachers/Admins
                </CardTitle>
                <CardDescription>
                  Comprehensive tools for managing and analyzing student performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    Input and analyze student performance data
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    Generate comprehensive reports and insights
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    Track class performance trends over time
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    Identify at-risk students and intervention opportunities
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  For Students
                </CardTitle>
                <CardDescription>
                  Personal dashboard for tracking academic progress and growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    View personalized performance reports
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    Track academic progress across subjects
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    Identify areas for improvement
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                    Receive AI-powered learning recommendations
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Role Selection */}
          <div className="text-center space-y-4">
            <h3 className="text-lg font-medium">Choose your role to continue</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => setUserRole('teacher')}
                className="flex items-center gap-2"
              >
                <Users className="h-5 w-5" />
                Teacher/Admin Dashboard
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setUserRole('student')}
                className="flex items-center gap-2"
              >
                <BookOpen className="h-5 w-5" />
                Student Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-semibold">FEDF-PS29</span>
              <span className="text-muted-foreground">|</span>
              <span className="capitalize">{userRole} Dashboard</span>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setUserRole(null)}
            >
              Switch Role
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {userRole === 'teacher' && <TeacherDashboard />}
        {userRole === 'student' && <StudentDashboard />}
      </main>
    </div>
  );
}