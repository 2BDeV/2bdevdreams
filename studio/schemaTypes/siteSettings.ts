export default {
  name: 'siteSettings',
  title: 'Weboldal Beállítások',
  type: 'document',
  fields: [
    {
      name: 'maintenanceMode',
      title: 'Karbantartás mód bekapcsolása',
      type: 'boolean',
      description: 'Ha bepipálod, a főoldal helyett az egyedi HTML vagy az alap üzenet jelenik meg.',
    },
    {
      name: 'customHtml',
      title: 'Egyedi Karbantartási HTML kód',
      type: 'text',
      rows: 15,
      description: 'Ide másolhatod a saját HTML/CSS kódodat. (PHP nem támogatott kliensoldalon).',
    },
    {
      name: 'maintenanceMessage',
      title: 'Alapértelmezett üzenet',
      type: 'text',
      rows: 3,
      description: 'Ez csak akkor jelenik meg, ha az Egyedi HTML mező üres.',
    },
    {
      name: 'aboutText',
      title: 'Rólam szöveg',
      type: 'text',
      description: 'A főoldalon megjelenő bemutatkozó szöveg.',
    },
    {
      name: 'adminPassword',
      title: 'Admin Password',
      description: 'Password to bypass maintenance mode via /login page',
      type: 'string',
      hidden: false
    }
  ],
}