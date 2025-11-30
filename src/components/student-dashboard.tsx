import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, Target, BookOpen, Award, AlertCircle } from 'lucide-react';

// Mock data for a specific student
const studentData = {
  name: 'Alice Johnson',
  grade: 'A',
  overallAverage: 90.5,
  subjects: [
    { name: 'Mathematics', current: 92, target: 90, trend: 'up', improvement: '+3%' },
    { name: 'Science', current: 88, target: 85, trend: 'up', improvement: '+2%' },
    { name: 'English', current: 95, target: 90, trend: 'stable', improvement: '0%' },
    { name: 'History', current: 87, target: 85, trend: 'up', improvement: '+5%' },
  ],
  recommendations: [
    'Focus on improving problem-solving speed in Mathematics',
    'Strengthen vocabulary for English essays',
    'Review historical timeline concepts for better retention'
  ]
};

const radarData = [
  { subject: 'Math', score: 92, fullMark: 100 },
  { subject: 'Science', score: 88, fullMark: 100 },
  { subject: 'English', score: 95, fullMark: 100 },
  { subject: 'History', score: 87, fullMark: 100 },
];

const progressData = [
  { month: 'Sep', average: 85 },
  { month: 'Oct', average: 87 },
  { month: 'Nov', average: 89 },
  { month: 'Dec', average: 90.5 },
];

const achievements = [
  { title: 'Top Performer', description: 'Highest score in English this month', icon: Award },
  { title: 'Consistent Improvement', description: 'Steady progress across all subjects', icon: TrendingUp },
  { title: 'Target Achiever', description: 'Met all monthly targets', icon: Target },
];

const areasForImprovement = [
  { area: 'Mathematics Speed', priority: 'Medium', description: 'Work on solving problems more quickly' },
  { area: 'Science Lab Reports', priority: 'Low', description: 'Improve formatting and detail in reports' },
];

export function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center space-y-2">
        <h1>Welcome back, {studentData.name}!</h1>
        <p> className="text-muted-foreground" Here's your academic performance overview</p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Average</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentData.overallAverage}%</div>
            <p className="text-xs text-muted-foreground">Current Grade: {studentData.grade}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects Above Target</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {studentData.subjects.filter(s => s.current >= s.target).length}/4
            </div>
            <p className="text-xs text-muted-foreground">Meeting expectations</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2.5%</div>
            <p className="text-xs text-muted-foreground">Improvement this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Visualization */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance Radar</CardTitle>
            <CardDescription>Your scores across all subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis domain={[0, 100]} tick={false} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress Trend</CardTitle>
            <CardDescription>Your average score over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[80, 95]} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="average"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Subject Details */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Performance Details</CardTitle>
          <CardDescription>Track your progress in each subject</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentData.subjects.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4>{subject.name}</h4>
                    <Badge variant={subject.current >= subject.target ? 'default' : 'secondary'}>
                      {subject.current}%
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Target: {subject.target}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {subject.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
                    <span className="text-sm text-green-600">{subject.improvement}</span>
                  </div>
                </div>
                <Progress value={subject.current} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements and Recommendations */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Recent Achievements
            </CardTitle>
            <CardDescription>Your accomplishments this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <achievement.icon className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Areas for Improvement
            </CardTitle>
            <CardDescription>Focus on these areas to enhance your performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {areasForImprovement.map((area, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{area.area}</h4>
                    <Badge variant={area.priority === 'High' ? 'destructive' : 
                      area.priority === 'Medium' ? 'secondary' : 'outline'}>
                      {area.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{area.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
          <CardDescription>AI-generated suggestions to improve your learning</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {studentData.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-sm">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}