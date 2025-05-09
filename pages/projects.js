import Layout from '../components/Layout';
import SEO from '../components/SEO';
import projectsData from '../data/projects.json';
import Image from 'next/image';

export default function Projects() {
  return (
    <>
      <SEO 
        title="My Projects" 
        description="A showcase of my recent projects"
        ogImage="/images/project1.jpg"
      />
      
      <Layout>
        <h1 className="text-4xl font-bold text-green-800 mb-8">
          My Projects
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map(project => (
            <div key={project.id} className="border rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48 w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <p className="text-sm text-gray-500">{project.content}</p>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
}