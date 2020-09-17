export enum AppRoute {
  Home = 'routes.home',
  Resume = 'routes.resume',
  Projects = 'routes.projects',
  Work = 'routes.work',
  // IBM = 'routes.ibm',
}

export const AppRouteTitles = new Map([
  [AppRoute.Home, 'home.title'],
  [AppRoute.Resume, 'resume.title'],
  [AppRoute.Projects, 'projects.title'],
  [AppRoute.Work, 'work.title'],
  // [AppRoute.IBM, 'projects.ibm.title'],
]);
