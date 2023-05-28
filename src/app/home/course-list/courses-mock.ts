import {Course} from "./course/course";

export let courses: Course[] = [
  {
    id: '1',
    title: 'Video Course 1',
    creationDate: '02.29.2018',
    duration: '1 h 28 min',
    description: 'Create a repository at github/bitbucket Install ng-cli: npm install -g @angular/cli Use ng-cli to create initial a project Run the project by executing “ng serve” Explore a project structure Setup TS lint according to your preferences (indentation, spacing...)',
    topRated: true
  },
  {
    id: '2',
    title: 'Super long title of difficult video course about programming and frontend developme...',
    creationDate: '02.28.2018',
    duration: '1 h 28 min',
    description: 'Create a repository at github/bitbucket Install ng-cli: npm install -g @angular/cli Use ng-cli to create initial a project Run the project by executing “ng serve” Explore a project structure Setup TS lint according to your preferences (indentation, spacing...)',
    topRated: false
  }
];
