import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <>
      <SEO 
        title="Test Portfolio" 
        description="Testing Tailwind with Next.js"
      />
      
      <Layout>
        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          Welcome to My Portfolio!
        </h1>
        <p className="text-lg text-gray-600">
          This is a test to confirm Tailwind CSS is working.
        </p>
      </Layout>
    </>
  );
}