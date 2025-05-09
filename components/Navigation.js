import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();
  
  // Navigation links - add more pages here
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' }
  ];

  return (
    <nav className="mb-6">
      <ul className="flex space-x-4">
        {links.map(({ href, label }) => (
          <li key={href}>
            {router.pathname === href ? (
              <span className="text-blue-500 font-medium">{label}</span>
            ) : (
              <Link href={href} className="text-blue-500 hover:text-blue-700">
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}