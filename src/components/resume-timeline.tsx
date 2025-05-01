'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, GraduationCap, Star } from 'lucide-react'; // Minimalist icons

interface TimelineItem {
  id: number;
  type: 'experience' | 'education' | 'skill';
  title: string;
  subtitle?: string;
  date: string;
  description: string;
  icon: React.ReactNode;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    type: 'experience',
    title: 'Senior Software Engineer',
    subtitle: 'Tech Innovations Inc.',
    date: '2021 - Present',
    description: 'Led development of key features for the flagship product. Mentored junior engineers and improved code quality standards.',
    icon: <Briefcase className="h-5 w-5 text-primary" />,
  },
  {
    id: 2,
    type: 'experience',
    title: 'Software Engineer',
    subtitle: 'Web Solutions Co.',
    date: '2018 - 2021',
    description: 'Developed and maintained scalable web applications using React and Node.js. Collaborated with cross-functional teams.',
    icon: <Briefcase className="h-5 w-5 text-primary" />,
  },
    {
    id: 3,
    type: 'skill',
    title: 'Key Skills',
    date: 'Acquired over time',
    description: 'React, Next.js, TypeScript, Node.js, Three.js, Tailwind CSS, Cloud Platforms (AWS/GCP), Agile Methodologies.',
    icon: <Star className="h-5 w-5 text-accent" />,
  },
  {
    id: 4,
    type: 'education',
    title: 'M.S. Computer Science',
    subtitle: 'University of Technology',
    date: '2016 - 2018',
    description: 'Focused on software engineering principles, algorithms, and distributed systems. Thesis on real-time data processing.',
    icon: <GraduationCap className="h-5 w-5 text-secondary-foreground" />,
  },
  {
    id: 5,
    type: 'education',
    title: 'B.S. Computer Science',
    subtitle: 'State College',
    date: '2012 - 2016',
    description: 'Graduated with honors. Active member of the coding club and participated in hackathons.',
    icon: <GraduationCap className="h-5 w-5 text-secondary-foreground" />,
  },
];

const ResumeTimeline: React.FC = () => {
  return (
    <div className="relative w-full max-w-3xl mx-auto pl-8">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" aria-hidden="true"></div>

      {timelineData.map((item, index) => (
        <div key={item.id} className="relative mb-12 scroll-target">
          {/* Dot on the timeline */}
          <div className="absolute left-[-0.6875rem] top-1 flex items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-primary shadow-sm z-10">
             <div className="w-2 h-2 rounded-full bg-primary"></div>
          </div>

          <Card className={`w-full shadow-md hover:shadow-lg transition-shadow duration-300 ${index % 2 === 0 ? 'ml-0' : 'ml-0' /* Adjusted for single column layout */} animate-fadeInUp` } style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader className="flex flex-row items-start space-x-4 pb-2">
               <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                {item.icon}
              </div>
              <div className="flex-grow">
                <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                {item.subtitle && (
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                )}
                 <p className="text-xs text-muted-foreground pt-1">{item.date}</p>
              </div>

            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ResumeTimeline;
