'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  position: THREE.Vector3;
  attachedTo: string; // ID of the mesh it's attached to
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Project Alpha',
    description: 'An innovative web application leveraging AI for content generation.',
    imageUrl: 'https://picsum.photos/seed/alpha/400/300',
    link: '#',
    position: new THREE.Vector3(1.5, 0, 0),
    attachedTo: 'cube',
  },
  {
    id: 2,
    title: 'Project Beta',
    description: 'A mobile-first platform connecting local communities.',
    imageUrl: 'https://picsum.photos/seed/beta/400/300',
    link: '#',
    position: new THREE.Vector3(0, 1.5, 0),
    attachedTo: 'sphere',
  },
  {
    id: 3,
    title: 'Project Gamma',
    description: 'Data visualization dashboard for real-time analytics.',
    imageUrl: 'https://picsum.photos/seed/gamma/400/300',
    link: '#',
    position: new THREE.Vector3(-1.5, 0, 0),
    attachedTo: 'torus',
  },
  {
    id: 4,
    title: 'Project Delta',
    description: 'E-commerce solution with a focus on user experience.',
    imageUrl: 'https://picsum.photos/seed/delta/400/300',
    link: '#',
    position: new THREE.Vector3(0, -1.5, 0),
    attachedTo: 'cone',
  },
];

const PortfolioViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const clickableObjects = useRef<THREE.Object3D[]>([]); // Store objects representing projects

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf6f8fa); // Light gray background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controlsRef.current = controls;

    // Central Model (placeholder geometric shapes)
    const geometryCube = new THREE.BoxGeometry(1, 1, 1);
    const materialCube = new THREE.MeshStandardMaterial({ color: 0x24292f }); // Dark navy blue
    const cube = new THREE.Mesh(geometryCube, materialCube);
    cube.name = 'cube'; // Assign ID
    scene.add(cube);

    const geometrySphere = new THREE.SphereGeometry(0.6, 32, 32);
    const materialSphere = new THREE.MeshStandardMaterial({ color: 0x26a69a }); // Teal
    const sphere = new THREE.Mesh(geometrySphere, materialSphere);
    sphere.position.y = 2;
    sphere.name = 'sphere';
    scene.add(sphere);

    const geometryTorus = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
    const materialTorus = new THREE.MeshStandardMaterial({ color: 0xaaaaaa }); // Gray
    const torus = new THREE.Mesh(geometryTorus, materialTorus);
    torus.position.x = -2;
    torus.name = 'torus';
    scene.add(torus);

    const geometryCone = new THREE.ConeGeometry(0.5, 1, 32);
    const materialCone = new THREE.MeshStandardMaterial({ color: 0x24292f });
    const cone = new THREE.Mesh(geometryCone, materialCone);
    cone.position.y = -2;
    cone.name = 'cone';
    scene.add(cone);

    // Attach project markers (simple spheres for clicking)
    projectsData.forEach(project => {
      const parentMesh = scene.getObjectByName(project.attachedTo);
      if (parentMesh) {
        const markerGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const markerMaterial = new THREE.MeshBasicMaterial({ color: 0x26a69a }); // Teal accent for markers
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.copy(project.position);
        marker.userData = { projectId: project.id }; // Store project ID
        // scene.add(marker); // Add marker directly to scene instead of attaching to mesh
        parentMesh.add(marker); // Attach marker to the parent mesh
        clickableObjects.current.push(marker);
      }
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

      // Rotate the main shapes slowly for visual interest
      cube.rotation.x += 0.001;
      cube.rotation.y += 0.001;
      sphere.rotation.y += 0.002;
      torus.rotation.x += 0.001;
      cone.rotation.y -= 0.001;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (mountRef.current) {
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

     // Handle clicks
    const handleClick = (event: MouseEvent) => {
        if (!mountRef.current) return;

        // Calculate mouse position in normalized device coordinates (-1 to +1)
        const rect = mountRef.current.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // Calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(clickableObjects.current);

        if (intersects.length > 0) {
            const firstIntersectedObject = intersects[0].object;
            const projectId = firstIntersectedObject.userData?.projectId;
            if (projectId) {
                const project = projectsData.find(p => p.id === projectId);
                setSelectedProject(project || null);
            }
        } else {
            // Optional: Deselect if clicking outside markers
            // setSelectedProject(null);
        }
    };
    mountRef.current.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeEventListener('click', handleClick);
      if (rendererRef.current && mountRef.current && mountRef.current.contains(rendererRef.current.domElement)) {
          mountRef.current.removeChild(rendererRef.current.domElement);
      }
      controls.dispose();
      // Dispose geometries and materials if needed for complex scenes
       scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      clickableObjects.current = []; // Clear the array
    };
  }, []);

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg border border-border">
      <div ref={mountRef} className="absolute inset-0" />
       {selectedProject && (
        <div className="absolute top-4 left-4 max-w-xs z-10">
          <Card className="bg-card/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>{selectedProject.title}</CardTitle>
              <CardDescription>{selectedProject.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                data-ai-hint="project technology interface"
                className="rounded-md mb-4 w-full h-32 object-cover"
              />
               <div className="flex justify-between items-center">
                 <Button variant="outline" size="sm" onClick={() => setSelectedProject(null)}>
                    Close
                 </Button>
                <Button asChild variant="link" size="sm" className="text-accent hover:text-accent/80">
                    <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                        View Project <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                </Button>
               </div>
            </CardContent>
          </Card>
        </div>
      )}
       <div className="absolute bottom-4 right-4 text-xs text-muted-foreground p-2 bg-background/50 rounded">
            Click on the teal markers to view project details. Drag to rotate. Scroll to zoom.
        </div>
    </div>
  );
};

export default PortfolioViewer;
