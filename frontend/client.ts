import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'tz66tnke',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-04-12',
  token: process.env.SANITY_TOKEN,
})