export default {
  name: 'project',
  title: 'Projektek',
  type: 'document',
  fields: [
    { name: 'title', title: 'Projekt neve', type: 'string' },
    { name: 'description', title: 'Leírás', type: 'text' },
    { name: 'link', title: 'Link', type: 'url' },
  ],
}