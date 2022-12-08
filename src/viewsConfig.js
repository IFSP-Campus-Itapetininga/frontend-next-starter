const viewsConfig = [
  {
    name: 'Início',
    route: '/',
    authorization: {
      enabled: false,
      roles: [],
    },
  },
  {
    name: 'Estoque',
    route: '/estoque',
    authorization: {
      enabled: false,
      roles: [],
    },
  },
  {
    name: 'Eventos',
    route: '/eventos',
    authorization: {
      enabled: true,
      roles: ['Administrador'],
    },
  },
  {
    name: 'Marmitas',
    route: '/marmitas',
    authorization: {
      enabled: false,
      roles: [],
    },
  },
  {
    name: 'Secretaria',
    route: '/secretaria',
    authorization: {
      enabled: false,
      roles: [],
    },
  },
  {
    name: 'Fila de Espera',
    route: '/waitlist',
    authorization: {
      enabled: true,
      roles: ['Administrador'],
    },
  }
];

export default viewsConfig;
