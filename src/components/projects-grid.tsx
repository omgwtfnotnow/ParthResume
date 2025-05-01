'use client';

import React from 'react';
import Image from 'next/image'; // Use next/image for optimization
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react'; // Add Github icon

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  liveLink: string;
  repoLink?: string; // Optional repository link
  tags: string[];
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Project Alpha',
    description: 'An innovative web application leveraging AI for content generation.',
    imageUrl: 'https://picsum.photos/seed/alpha/600/400',
    liveLink: '#',
    repoLink: '#',
    tags: ['React', 'AI', 'Next.js', 'Tailwind CSS'],
  },
  {
    id: 2,
    title: 'Project Beta',
    description: 'A mobile-first platform connecting local communities.',
    imageUrl: 'https://picsum.photos/seed/beta/600/400',
    liveLink: '#',
    // repoLink: '#', // Example without repo link
    tags: ['React Native', 'Firebase', 'Community'],
  },
  {
    id: 3,
    title: 'Project Gamma',
    description: 'Data visualization dashboard for real-time analytics.',
    imageUrl: 'https://picsum.photos/seed/gamma/600/400',
    liveLink: '#',
    repoLink: '#',
    tags: ['D3.js', 'Node.js', 'WebSocket', 'Analytics'],
  },
  {
    id: 4,
    title: 'Project Delta',
    description: 'E-commerce solution with a focus on user experience.',
    imageUrl: 'https://picsum.photos/seed/delta/600/400',
    liveLink: '#',
    repoLink: '#',
    tags: ['Vue.js', 'Stripe', 'UX/UI', 'E-commerce'],
  },
    {
    id: 5,
    title: 'Project Epsilon',
    description: 'Personal blog platform with markdown support and static site generation.',
    imageUrl: 'https://picsum.photos/seed/epsilon/600/400',
    liveLink: '#',
    repoLink: '#',
    tags: ['Gatsby', 'GraphQL', 'Markdown', 'Blog'],
  },
   {
    id: 6,
    title: 'Project Zeta',
    description: 'Interactive learning tool for coding beginners.',
    imageUrl: 'https://picsum.photos/seed/zeta/600/400',
    liveLink: '#',
    // repoLink: '#',
    tags: ['Svelte', 'WebSockets', 'Education', 'Interactive'],
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
                    layout="fill" // Use fill layout
                    objectFit="cover" // Cover the area
                    className="rounded-t-lg"
                    data-ai-hint="project interface screenshot" // AI hint
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
            {project.repoLink && (
              <Button asChild variant="outline" size="sm">
                <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-1 h-4 w-4" /> Code
                </a>
              </Button>
            )}
            <Button asChild variant="default" size="sm">
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-4 w-4" /> Live Demo
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProjectsGrid;
