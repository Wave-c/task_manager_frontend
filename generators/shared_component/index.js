module.exports = {
    description: 'Create a shared component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name(required):',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/shared/{{properCase name}}/{{properCase name}}.component.tsx',
        templateFile: 'generators/shared_component/Component.jsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/shared/{{properCase name}}/{{properCase name}}.component.css',
      },
    ],
  };