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

// Updated timelineData with new education details
const timelineData: TimelineItem[] = [
  {
    id: 1,
    type: 'experience',
    title: 'Android Developer Intern',
    subtitle: 'Startup X', // Placeholder company name
    date: 'Oct 2021 - Jan 2022',
    description: 'Learned Android Studio and Packaging Techniques. Got good grasp of Kotlin and XML. Helped developers with UI and debug Kotlin Code.',
    icon: <Briefcase className="h-5 w-5 text-primary" />,
  },
  {
    id: 2,
    type: 'education',
    title: 'Computer Science and Engineering (Data Science)',
    subtitle: 'VCET, Vasai, Mumbai',
    date: 'Expected 2026',
    description: 'Relevant Coursework: DSA, DBMS, OOP, Web Computing',
    icon: <GraduationCap className="h-5 w-5 text-secondary-foreground" />,
  },
  {
    id: 3,
    type: 'education',
    title: 'Diploma in Computer Engineering',
    subtitle: 'MSBTE, Mumbai',
    date: '2019 - 2022',
    description: 'Completed diploma focusing on core computer engineering concepts.', // Slightly expanded description
    icon: <GraduationCap className="h-5 w-5 text-secondary-foreground" />,
  },
];

interface ResumeTimelineProps {
  filterType: 'experience' | 'education';
}

// Helper function to parse year from date string
const parseYear = (dateString: string): number => {
    // Handle "Expected YEAR"
    if (dateString.toLowerCase().startsWith('expected')) {
        const yearMatch = dateString.match(/\d{4}/);
        return yearMatch ? parseInt(yearMatch[0], 10) : 9999; // Place expected dates far in the future for sorting
    }
    // Handle "YEAR - YEAR" or "Month YEAR - Month YEAR"
    const yearMatches = dateString.match(/\d{4}/g);
    if (yearMatches && yearMatches.length > 0) {
        // Use the last year found (end year for ranges)
        return parseInt(yearMatches[yearMatches.length - 1], 10);
    }
    // Handle single year "YEAR" or "Month YEAR"
     const singleYearMatch = dateString.match(/\d{4}/);
     if (singleYearMatch) {
         return parseInt(singleYearMatch[0], 10);
     }

    // Default fallback (shouldn't happen with expected formats)
    return 0;
};


const ResumeTimeline: React.FC<ResumeTimelineProps> = ({ filterType }) => {
  // Filter and sort data based on type and date
  const filteredData = timelineData
    .filter(item => item.type === filterType)
    .sort((a, b) => {
      const yearA = parseYear(a.date);
      const yearB = parseYear(b.date);

      // Sort descending by year (most recent first)
      return yearB - yearA;
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
