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
      enabled: true,
      roles: ['Almoxarife', 'Administrador'],
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
];

export default viewsConfig;
