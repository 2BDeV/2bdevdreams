import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '2a99ehdl', // Ez a te egyedi azonosítód a logod alapján
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-01-10', 
})