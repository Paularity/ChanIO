export interface TaskItem {
    id: string;
    tasks: string[];
    todo: string;
    date: string;
}

export const MockTaskItems: TaskItem[] = [
    {
      id: '1a2b3c',
      tasks: ['Design user interface', 'Implement header component', 'Write unit tests'],
      todo: 'Finalize UI design for dashboard',
      date: '2024-10-01',
    },
    {
      id: '4d5e6f',
      tasks: ['Set up database schema', 'Write backend API', 'Test API integration'],
      todo: 'Integrate backend API with frontend',
      date: '2024-10-02',
    },
    {
      id: '7g8h9i',
      tasks: ['Fix bug in login module', 'Refactor user service', 'Optimize app performance'],
      todo: 'Improve authentication process',
      date: '2024-10-03',
    },
    {
      id: '0j1k2l',
      tasks: ['Research on CI/CD tools', 'Set up pipeline', 'Deploy app to staging'],
      todo: 'Automate deployment process',
      date: '2024-10-04',
    }
  ];
  