import { faker } from '@faker-js/faker';

import { Course } from './course/course';

export const courses: Course[] = [
  {
    id: '1',
    title: 'video course 1',
    creationDate: faker.date.past(),
    duration: faker.number.int({ min: 1, max: 1000 }),
    description:
      'Create a repository at github/bitbucket Install ng-cli: npm install -g @angular/cli Use ng-cli to create initial a project Run the project by executing “ng serve” Explore a project structure Setup TS lint according to your preferences (indentation, spacing...)',
    topRated: true,
  },
  {
    id: '2',
    title: 'super long course title with detailed description',
    creationDate: faker.date.past(),
    duration: faker.number.int({ min: 1, max: 1000 }),
    description:
      'This is a super long course title with a detailed description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt elit vel congue aliquam. Morbi id est sed risus tempor tristique. Duis condimentum leo ac convallis luctus. Proin consectetur lobortis tortor, nec blandit massa sagittis vitae. Aliquam id metus ac tellus rutrum cursus at vitae leo. Nullam ac venenatis felis. Nulla facilisi. Sed et efficitur risus, quis iaculis eros. Aliquam vestibulum dapibus ligula, id semper sem lobortis et. Aenean convallis, ipsum at efficitur volutpat, ligula erat tincidunt nisl, ut consectetur velit justo at lectus. Aenean eget erat vel diam scelerisque posuere. Integer ut ex nec erat feugiat facilisis at ac ipsum. Aliquam nec fermentum eros. Nulla facilisi.',
    topRated: false,
  },
  {
    id: '3',
    title: 'Video Course 3',
    creationDate: faker.date.past(),
    duration: faker.number.int({ min: 1, max: 1000 }),
    description: 'This is Video Course 3 description.',
    topRated: false,
  },
  {
    id: '4',
    title: 'Angular Basics',
    creationDate: faker.date.past(),
    duration: faker.number.int({ min: 1, max: 1000 }),
    description: 'This is Angular Basics course description.',
    topRated: true,
  },
  {
    id: '5',
    title: 'React Crash Course',
    creationDate: faker.date.past(),
    duration: faker.number.int({ min: 1, max: 1000 }),
    description: 'This is React Crash Course description.',
    topRated: true,
  },
  {
    id: '6',
    title: 'JavaScript Fundamentals',
    creationDate: faker.date.past(),
    duration: faker.number.int({ min: 1, max: 1000 }),
    description: 'This is JavaScript Fundamentals course description.',
    topRated: false,
  },
  {
    id: '7',
    title: 'CSS Masterclass',
    creationDate: faker.date.past(),
    duration: faker.number.int({ min: 1, max: 1000 }),
    description: 'This is CSS Masterclass course description.',
    topRated: true,
  },
];
