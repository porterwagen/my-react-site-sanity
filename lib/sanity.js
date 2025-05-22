import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const config = {
  /**
   * Find your project ID and dataset in `sanity.json` in your studio project.
   * These are considered "public", but you can use environment variables
   * if you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   **/
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9gjsljwo',
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  /**
   * Set useCdn to `false` if your application requires the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated requests (like preview) will always bypass the CDN
   **/
  useCdn: process.env.NODE_ENV === 'production',
};

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

// Set up a helper function for generating Image URLs with only the asset reference data in your documents
const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source) => builder.image(source);

// Helper function for using the current logged in user account
export const useCurrentUser = async () => {
  return sanityClient.config().token
    ? await sanityClient.request({ uri: '/users/me' })
    : null;
};
