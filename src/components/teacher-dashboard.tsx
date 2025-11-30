import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Badge } from './ui/badge';
import { PlusCircle, Download, TrendingUp, TrendingDown, Users } from 'lucide-react';

// Mock data for demonstration
const mockStudents = [
  { id: 1, name: 'Alice Johnson', grade: 'A', math: 92, science: 88, english: 95, history: 87, trend: 'up' },
  { id: 2, name: 'Bob Smith', grade: 'B+', math: 85, science: 82, english: 79, history: 88, trend: 'up' },
  { id: 3, name: 'Charlie Brown', grade: 'B', math: 78, science: 85, english: 82, history: 80, trend: 'down' },
  { id: 4, name: 'Diana Prince', grade: 'A-', math: 90, science: 93, english: 88, history: 91, trend: 'up' },
  { id: 5, name: 'Eric Wilson', grade: 'C+', math: 72, science: 75, english: 68, history: 73, trend: 'stable' },
];

const performanceData = [
  { subject: 'Math', average: 83.4, target: 85 },
  { subject: 'Science', average: 84.6, target: 80 },
  { subject: 'English', average: 82.4, target: 85 },
  { subject: 'History', average: 83.8, target: 82 },
];

const trendData = [
  { month: 'Sep', average: 78 },
  { month: 'Oct', average: 81 },
  { month: 'Nov', average: 83 },
  { month: 'Dec', average: 84 },
];

export function TeacherDashboard() {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [newScore, setNewScore] = useState({ subject: '', score: '' });

  const handleAddScore = () => {
    // Mock function to add new score
    console.log('Adding score:', newScore, 'for student:', selectedStudent);
    setNewScore({ subject: '', score: '' });
    setSelectedStudent('');
  };

  const generateReport = (type: string) => {
    // Mock function to generate reports
    console.log(`Generating ${type} report`);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStudents.length}</div>
            <p className="text-xs text-muted-foreground">Active this semester</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Average</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">83.6%</div>
            <p className="text-xs text-muted-foreground">+2.4% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk Students</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance Overview</CardTitle>
            <CardDescription>Average scores vs targets by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="average" fill="#8884d8" name="Current Average" />
                <Bar dataKey="target" fill="#82ca9d" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Class Performance Trend</CardTitle>
            <CardDescription>Monthly average progression</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="average" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Data Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Add Student Performance Data
          </CardTitle>
          <CardDescription>Input new scores and assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="student-select">Student</Label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger>
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  {mockStudents.map((student) => (
                    <SelectItem key={student.id} value={student.name}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject-select">Subject</Label>
              <Select value={newScore.subject} onValueChange={(value) => setNewScore({...newScore, subject: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="score">Score</Label>
              <Input
                id="score"
                type="number"
                placeholder="0-100"
                value={newScore.score}
                onChange={(e) => setNewScore({...newScore, score: e.target.value})}
                min="0"
                max="100"
              />
            </div>
            
            <div className="flex items-end">
              <Button onClick={handleAddScore} className="w-full">
                Add Score
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Performance Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Student Performance Overview</CardTitle>
              <CardDescription>Individual student scores and trends</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => generateReport('individual')}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button onClick={() => generateReport('class')}>
                Generate Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Overall Grade</TableHead>
                <TableHead>Math</TableHead>
                <TableHead>Science</TableHead>
                <TableHead>English</TableHead>
                <TableHead>History</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>
                    <Badge variant={student.grade.startsWith('A') ? 'default' : 
                      student.grade.startsWith('B') ? 'secondary' : 'outline'}>
                      {student.grade}
                    </Badge>
                  </TableCell>
                  <TableCell>{student.math}%</TableCell>
                  <TableCell>{student.science}%</TableCell>
                  <TableCell>{student.english}%</TableCell>
                  <TableCell>{student.history}%</TableCell>
                  <TableCell>
                    {student.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
                    {student.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600" />}
                    {student.trend === 'stable' && <span className="text-yellow-600">—</span>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}