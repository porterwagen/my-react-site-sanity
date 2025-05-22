This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app). It includes integration with WordPress CMS, contact form functionality, and Google Tag Manager implementation.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

## Email Integration

The contact form sends emails through a third-party email service. To configure your chosen email service:

1. Open `utils/emailService.js` and implement your preferred email provider (examples for SendGrid provided as comments)
2. Update your `.env.local` file with the appropriate API keys and credentials for your email service
3. If needed, install the required packages for your chosen email provider. For example:
   ```bash
   # For SendGrid
   npm install @sendgrid/mail
   
   # For Mailchimp Transactional/Mandrill
   npm install @mailchimp/mailchimp_transactional
   
   # For AWS SES
   npm install aws-sdk
   ```

## Google Tag Manager Integration

The site includes Google Tag Manager integration for analytics and event tracking:

1. Update the `.env.local` file with your Google Tag Manager ID:
   ```
   NEXT_PUBLIC_GTM_ID=GTM-YOURIDHERE
   ```
2. Form submissions are tracked via the dataLayer before redirection

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
