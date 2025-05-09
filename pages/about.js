import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO 
        title="About Me" 
        description="Learn more about me and my skills"
        ogImage="/images/project1.jpg"
      />
      
      <Layout>
        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          About Me
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          This is my about page where I can share more information about myself.
        </p>
        <p className="text-lg text-gray-600">
          I&apos;m learning React and Next.js to build modern web applications.
        </p>
      </Layout>
    </>
  );
}