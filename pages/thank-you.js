import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Link from 'next/link';
import PageHeader from '../components/PageHeader';

export default function ThankYou() {
  // Simplified thank-you page without form data handling

  return (
    <>
      <SEO 
        title="Thank You | Message Received" 
        description="Your message has been successfully sent"
        ogImage="/images/project1.jpg"
      />
      
      <Layout>
        <PageHeader 
          title="Thank You!" 
          showBreadcrumbs={false}
        />
        
        <div className="container mx-auto px-4 pb-8 text-center">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <div className="mb-6 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <p className="text-xl text-gray-600 mb-8">
              Your message has been received. We&apos;ll get back to you shortly.
            </p>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                We appreciate you contacting us and will respond as soon as possible.
              </p>
              
              <Link 
                href="/"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
