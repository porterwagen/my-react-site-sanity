import Navigation from './Navigation';

export default function Layout({ children }) {
  return (
    <>
      <div className="container mx-auto p-6">
        <Navigation />
        <main>{children}</main>
      </div>

      {/* 
      // Google Tag Manager noscript code is commented out for now
      */}
    </>
  );
}