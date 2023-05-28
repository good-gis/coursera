import { Course } from './course/course';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Video Course 1',
    creationDate: '02.29.2018',
    duration: '1 h 28 min',
    description:
      'Create a repository at github/bitbucket Install ng-cli: npm install -g @angular/cli Use ng-cli to create initial a project Run the project by executing “ng serve” Explore a project structure Setup TS lint according to your preferences (indentation, spacing...)',
    topRated: true,
  },
  {
    id: '2',
    title: 'Super Long Course Title with Detailed Description',
    creationDate: '05.28.2023',
    duration: '2 h 30 min',
    description:
      'This is a super long course title with a detailed description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt elit vel congue aliquam. Morbi id est sed risus tempor tristique. Duis condimentum leo ac convallis luctus. Proin consectetur lobortis tortor, nec blandit massa sagittis vitae. Aliquam id metus ac tellus rutrum cursus at vitae leo. Nullam ac venenatis felis. Nulla facilisi. Sed et efficitur risus, quis iaculis eros. Aliquam vestibulum dapibus ligula, id semper sem lobortis et. Aenean convallis, ipsum at efficitur volutpat, ligula erat tincidunt nisl, ut consectetur velit justo at lectus. Aenean eget erat vel diam scelerisque posuere. Integer ut ex nec erat feugiat facilisis at ac ipsum. Aliquam nec fermentum eros. Nulla facilisi.',
    topRated: false,
  },
  {
    id: '3',
    title: 'Video Course 3',
    creationDate: '10.15.2022',
    duration: '45 min',
    description: 'This is Video Course 3 description.',
    topRated: false,
  },
  {
    id: '4',
    title: 'Angular Basics',
    creationDate: '07.05.2023',
    duration: '2 h',
    description: 'This is Angular Basics course description.',
    topRated: true,
  },
  {
    id: '5',
    title: 'React Crash Course',
    creationDate: '11.20.2023',
    duration: '1 h 30 min',
    description: 'This is React Crash Course description.',
    topRated: true,
  },
  {
    id: '6',
    title: 'JavaScript Fundamentals',
    creationDate: '04.12.2023',
    duration: '3 h',
    description: 'This is JavaScript Fundamentals course description.',
    topRated: false,
  },
  {
    id: '7',
    title: 'CSS Masterclass',
    creationDate: '09.28.2022',
    duration: '2 h 15 min',
    description: 'This is CSS Masterclass course description.',
    topRated: true,
  },
];
