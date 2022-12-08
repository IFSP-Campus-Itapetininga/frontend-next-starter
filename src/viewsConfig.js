const viewsConfig = [
  {
    name: 'Início',
    visible: true,
    route: '/',
    authorization: {
      enabled: false,
      roles: [],
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
      enabled: false,
      roles: [],
    },
  },
  {
    name: 'Eventos',
    route: '/eventos',
    visible: true,
    authorization: {
      enabled: true,
      roles: ['Administrador'],
    },
  },
  {
    name: 'Marmitas',
    route: '/marmitas',
    visible: true,
    authorization: {
      enabled: false,
      roles: [],
    },
  },
  {
    name: 'Secretaria',
    route: '/secretaria',
    visible: true,
    authorization: {
      enabled: false,
      roles: [],
    },
  },
];

export default viewsConfig;
