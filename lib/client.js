import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient ({
    projectId: 'nmz6kb8n',
    dataset: 'production',
    apiVersion: '2025-02-07',
    useCdn: true,
    token: process.env.sanity_token
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
