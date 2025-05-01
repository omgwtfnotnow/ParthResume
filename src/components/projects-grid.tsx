'use client';

import React from 'react';
import Image from 'next/image'; // Use next/image for optimization
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react'; // Github icon no longer needed, but keep ExternalLink for potential future use

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  liveLink: string; // Keep for potential future use or structure consistency
  repoLink?: string; // Optional repository link
  tags: string[];
}

// Updated project data based on user input, removing Delta, Epsilon, Zeta
const projectsData: Project[] = [
  {
    id: 1,
    title: 'BrewUpdate',
    description: 'A Python tool packaged as a standalone macOS app using Py2App. It visualizes Homebrew packages and allows users to modify permissions, check updates, and remove packages.',
    imageUrl: 'https://kstatic.googleusercontent.com/files/2d4b478ba34be9c5d422a1109b58a1b6c157e052f3aa0f99218857ab6e808df8c875449773124807b42889680724b977e946698455e570f23d9140c830ff74d8', // Updated image URL
    liveLink: '#', // Placeholder link
    repoLink: '#', // Placeholder link
    tags: ['Python', 'macOS', 'Py2App', 'Homebrew', 'GUI Tool'],
  },
  {
    id: 2,
    title: 'Celestial - SkinCare App',
    description: 'An Android app for skincare product and dermatologist recommendations. Features a quiz for personalized suggestions. Built with Kotlin, XML, Android Gradle, and JSON.',
    imageUrl: 'https://picsum.photos/seed/celestial/600/400',
    liveLink: '#', // Placeholder link
    repoLink: '#', // Placeholder repo link
    tags: ['Android', 'Kotlin', 'XML', 'Skincare', 'Recommendation System', 'Mobile App'],
  },
  {
    id: 3,
    title: 'Stock Monitoring and Billing',
    description: 'A web-based stock monitoring and trading application fetching live market data from Yahoo Finance. Features real-time updates. Built using Next.js and Tailwind CSS.',
    imageUrl: 'https://picsum.photos/seed/stockmonitor/600/400',
    liveLink: '#', // Placeholder link
    repoLink: '#', // Placeholder link
    tags: ['Next.js', 'Tailwind CSS', 'Yahoo Finance API', 'Real-time Data', 'Web App', 'Finance'],
  },
];

const ProjectsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {projectsData.map((project, index) => (
        <Card
          key={project.id}
          className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 scroll-target animate-fadeInUp"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader className="p-0">
             <div className="relative w-full h-48">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill // Use fill instead of layout="fill"
                    style={{ objectFit: 'cover' }} // Use inline style for objectFit
                    className="rounded-t-lg"
                    // Ensure sizes prop is provided if using fill and responsiveness is needed beyond simple cover, though often not strictly necessary with object-fit: cover
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    data-ai-hint={project.id === 1 ? "macos terminal code" : "project interface screenshot app design code"} // Updated AI hint for BrewUpdate
                    priority={index === 0} // Prioritize loading the first image
                />
             </div>
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
            <CardDescription className="mb-4">{project.description}</CardDescription>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-end space-x-2">
            {/* Removed the "Code" button */}
            {/*
            {project.repoLink && (
              <Button asChild variant="outline" size="sm">
                <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-1 h-4 w-4" /> Code
                </a>
              </Button>
            )}
            */}
            {/* Removed Live Demo button previously */}
            {/*
            <Button asChild variant="default" size="sm">
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-4 w-4" /> Live Demo
              </a>
            </Button>
            */}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProjectsGrid;
