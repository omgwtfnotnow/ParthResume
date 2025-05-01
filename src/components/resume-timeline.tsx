// src/components/resume-timeline.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, GraduationCap } from 'lucide-react'; // Removed Star icon

interface TimelineItem {
  id: number;
  type: 'experience' | 'education'; // Removed 'skill' type
  title: string;
  subtitle?: string;
  date: string;
  description: string;
  icon: React.ReactNode;
}

// Updated timelineData removing Senior and Junior Software Engineer roles
const timelineData: TimelineItem[] = [
  // Removed Senior Software Engineer
  // Removed Software Engineer
  {
    id: 1, // Adjusted ID
    type: 'experience',
    title: 'Android Developer Intern',
    subtitle: 'Startup X', // Assuming a placeholder company name
    date: 'Oct 2021 - Jan 2022',
    description: 'Learned Android Studio and Packaging Techniques. Got good grasp of Kotlin and XML. Helped developers with UI and debug Kotlin Code.',
    icon: <Briefcase className="h-5 w-5 text-primary" />,
  },
  {
    id: 2, // Adjusted ID
    type: 'education',
    title: 'M.S. Computer Science',
    subtitle: 'University of Technology',
    date: '2016 - 2018',
    description: 'Focused on software engineering principles, algorithms, and distributed systems. Thesis on real-time data processing.',
    icon: <GraduationCap className="h-5 w-5 text-secondary-foreground" />,
  },
  {
    id: 3, // Adjusted ID
    type: 'education',
    title: 'B.S. Computer Science',
    subtitle: 'State College',
    date: '2012 - 2016',
    description: 'Graduated with honors. Active member of the coding club and participated in hackathons.',
    icon: <GraduationCap className="h-5 w-5 text-secondary-foreground" />,
  },
];

interface ResumeTimelineProps {
  filterType: 'experience' | 'education';
}

const ResumeTimeline: React.FC<ResumeTimelineProps> = ({ filterType }) => {
  // Sort experience items by date descending (most recent first)
  // Sort education items by date descending (most recent first)
  const filteredData = timelineData
    .filter(item => item.type === filterType)
    .sort((a, b) => {
      // Simple sort based on the start year extracted from the date string
      // This might need adjustment if date formats become more complex
      const yearA = parseInt(a.date.split(' ')[0].replace(/[^\d]/g, ''), 10) || 0;
      const yearB = parseInt(b.date.split(' ')[0].replace(/[^\d]/g, ''), 10) || 0;

      // Handle "Present" case for experience (though not present currently)
      if (a.date.includes('Present')) return -1;
      if (b.date.includes('Present')) return 1;

      // If years are the same, we might need secondary sorting (e.g., month), but keeping it simple for now
      return yearB - yearA; // Descending order
    });


  return (
    <div className="relative w-full max-w-3xl mx-auto pl-8">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" aria-hidden="true"></div>

      {filteredData.length === 0 ? (
         <Card className="w-full shadow-md">
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">No {filterType} entries available yet.</p>
            </CardContent>
          </Card>
      ) : (
        filteredData.map((item, index) => (
          <div key={item.id} className="relative mb-12 scroll-target">
            {/* Dot on the timeline */}
            <div className="absolute left-[-0.6875rem] top-1 flex items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-primary shadow-sm z-10">
               <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>

            <Card className={`w-full shadow-md hover:shadow-lg transition-shadow duration-300 animate-fadeInUp` } style={{ animationDelay: `${index * 0.1}s` }}>
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
        ))
      )}
    </div>
  );
};

export default ResumeTimeline;
