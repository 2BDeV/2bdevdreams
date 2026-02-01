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
      description: 'Ide másolhatod a saját HTML/CSS kódodat.',
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
      description: 'Jelszó a /login oldalhoz.',
      type: 'string',
      hidden: false
    },
    {
      name: 'allowedIps',
      title: 'Allowed IPs',
      type: 'array',
      of: [{type: 'string'}]
    },
    // --- SKILLS LISTA ---
    {
      name: 'skills',
      title: 'Technikai Skill-ek',
      description: 'Válaszd ki azokat, amik megjelenjenek a weboldalon! Az ikonokat a rendszer automatikusan generálja.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          // Frontend
          {title: 'React', value: 'react'},
          {title: 'Next.js', value: 'nextdotjs'},
          {title: 'Vue.js', value: 'vuedotjs'},
          {title: 'Angular', value: 'angular'},
          {title: 'Svelte', value: 'svelte'},
          {title: 'TypeScript', value: 'typescript'},
          {title: 'JavaScript', value: 'javascript'},
          {title: 'HTML5', value: 'html5'},
          {title: 'CSS3', value: 'css3'},
          {title: 'Tailwind CSS', value: 'tailwindcss'},
          {title: 'Sass', value: 'sass'},
          {title: 'Framer Motion', value: 'framer'},
          
          // Backend & DB
          {title: 'Node.js', value: 'nodedotjs'},
          {title: 'Python', value: 'python'},
          {title: 'PHP', value: 'php'},
          {title: 'Java', value: 'java'},
          {title: 'Go', value: 'go'},
          {title: 'C#', value: 'csharp'},
          {title: 'PostgreSQL', value: 'postgresql'},
          {title: 'MongoDB', value: 'mongodb'},
          {title: 'MySQL', value: 'mysql'},
          {title: 'Firebase', value: 'firebase'},
          {title: 'Supabase', value: 'supabase'},
          
          // Tools & DevOps
          {title: 'Git', value: 'git'},
          {title: 'GitHub', value: 'github'},
          {title: 'GitLab', value: 'gitlab'},
          {title: 'Docker', value: 'docker'},
          {title: 'AWS', value: 'amazonwebservices'},
          {title: 'Vercel', value: 'vercel'},
          {title: 'Netlify', value: 'netlify'},
          {title: 'Sanity', value: 'sanity'},
          {title: 'Figma', value: 'figma'},
          {title: 'Photoshop', value: 'adobephotoshop'},
          {title: 'Wordpress', value: 'wordpress'},
        ]
      }
    },

    // --- ÚJ RÉSZ: ÉRTESÍTÉSI SÁV (ANNOUNCEMENT BAR) ---
    {
      name: 'announcement',
      title: 'Felső Értesítési Sáv',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'isActive',
          title: 'Bekapcsolva',
          type: 'boolean',
          description: 'Ha nincs bepipálva, semmiképp nem jelenik meg.',
          initialValue: false
        },
        {
          name: 'text',
          title: 'Üzenet szövege',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Link (opcionális)',
          type: 'url',
          description: 'Ha kitöltöd, az üzenet kattintható lesz.',
        },
        {
          name: 'type',
          title: 'Típus (Színkód)',
          type: 'string',
          options: {
            list: [
              {title: 'Info (Kék)', value: 'info'},
              {title: 'Figyelem (Sárga/Narancs)', value: 'warning'},
              {title: 'Hiba/Fontos (Piros)', value: 'error'},
              {title: 'Siker (Zöld)', value: 'success'},
              {title: 'Brand (Pink/Lila)', value: 'brand'},
            ],
            layout: 'radio'
          },
          initialValue: 'brand'
        },
        // --- IDŐZÍTÉS ---
        {
          name: 'startDate',
          title: 'Megjelenés kezdete (Opcionális)',
          type: 'datetime',
          description: 'Hagyd üresen, ha azonnal meg akarod jeleníteni.',
        },
        {
          name: 'endDate',
          title: 'Megjelenés vége (Opcionális)',
          type: 'datetime',
          description: 'Hagyd üresen, ha nem akarod, hogy eltűnjön magától.',
        },
        {
          name: 'closable',
          title: 'Bezárható?',
          type: 'boolean',
          description: 'Engedjük-e a felhasználónak, hogy bezárja (X gomb)?',
          initialValue: true
        }
      ]
    },
  ],
}