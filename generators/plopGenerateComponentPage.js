module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Criação de página',
    prompts: [
      {
        type: 'input',
        name: 'route',
        message: 'adicione a rota da página',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/pages/{{lowerCase route}}/index.js',
        templateFile: './templates/page/index.js.hbs',
      },
      {
        type: 'add',
        path: '../src/views/{{pascalCase route}}/index.js',
        templateFile: './templates/view/index.js.hbs',
      },
      {
        type: 'add',
        path: '../src/views/{{pascalCase route}}/{{pascalCase route}}.module.scss',
        templateFile: './templates/view/styles.js.hbs',
      },
      {
        // Action type 'append' injects a template into an existing file
        type: 'append',
        path: '../src/views/index.js',
        // Pattern tells plop where in the file to inject the template
        pattern: /[;]/,
        template: `export { default as {{pascalCase route}} } from './{{pascalCase route}}';`,
      },
    ],
  });
};
