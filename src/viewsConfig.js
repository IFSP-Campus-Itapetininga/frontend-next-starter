const viewsConfig = [
  {
    name: 'Início',
    visible: true,
    route: '/',
    authorization: {
      enabled: false,
      roles: ['Administrador'],
    },
  },
  {
    name: 'Admin',
    route: '/admin',
    visible: true,
    authorization: {
      enabled: true,
      roles: ['Administrador'],
    },
  },
  {
    name: 'Admin - Editar',
    route: '/admin/edit',
    visible: false,
    authorization: {
      enabled: true,
      roles: ['Administrador'],
    },
  },
  {
    name: 'Admin - Criar',
    route: '/admin/create',
    visible: false,
    authorization: {
      enabled: true,
      roles: ['Administrador'],
    },
  },
  {
    name: 'Estoque',
    route: '/estoque',
    visible: true,
    authorization: {
      enabled: true,
      roles: ['Almoxarife', 'Administrador'],
    },
  },
  {
    name: 'Eventos',
    route: '/eventos',
    visible: true,
    authorization: {
      enabled: true,
      roles: ['Administrador', 'Resp. Evento'],
    },
  },
  {
    name: 'Marmitas',
    route: '/marmitas',
    visible: true,
    authorization: {
      enabled: false,
      roles: ['Administrador', 'Marmita'],
    },
  },
  {
    name: 'Secretaria',
    route: '/secretaria',
    visible: true,
    authorization: {
      enabled: false,
      roles: ['Administrador', 'Secretário'],
    },
  },
];

export default Object.freeze(viewsConfig);
