const viewsConfig = [
  {
    name: 'Início',
    route: '/',
    authorization: {
      enabled: false,
      roles: ['Administrador'],
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
      roles: ['Administrador', 'Resp. Evento'],
    },
  },
  {
    name: 'Marmitas',
    route: '/marmitas',
    authorization: {
      enabled: false,
      roles: ['Administrador', 'Marmita'],
    },
  },
  {
    name: 'Secretaria',
    route: '/secretaria',
    authorization: {
      enabled: false,
      roles: ['Administrador', 'Secretário'],
    },
  },
];

export default Object.freeze(viewsConfig);
