interface SeedData {
  entries: SeedEntry[]
}

interface SeedEntry {
  description: string
  status: string
  createdAt: number
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Pendiente: Tengo que hacer los proyectos de ecomind, en web y app movil, la app de cinemapedia y algún otro proyecto.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description: 'En-Progreso: Terminar los cursos que me he propuesto realizar durante el verano, en este caso Next y Node.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description: 'Terminadas: Repasar algunos de los temas que he aprendido antes, como Sass, JavaScript, etc.',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ]
}
