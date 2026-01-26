import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: '2bdevdreams',

  projectId: '2a99ehdl',
  dataset: '2bdevdreams',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
