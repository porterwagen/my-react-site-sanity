import localFont from 'next/font/local';

const lato = localFont({
  src: [
    {
      path: '../public/fonts/lato-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/lato-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-lato',
  display: 'swap', // Ensures text is visible during font loading
});

export { lato };