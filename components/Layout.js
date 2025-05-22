import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout({ children, showGlobalBreadcrumbs = false }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navigation />
      </header>
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}