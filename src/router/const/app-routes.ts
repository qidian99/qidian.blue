export enum AppRoute {
  Home = 'routes.home',
  Resume = 'routes.resume',
  Projects = 'routes.projects',
}

export const AppRouteTitles = new Map([
  [AppRoute.Home, 'home.title'],
  [AppRoute.Resume, 'resume.title'],
  [AppRoute.Projects, 'projects.title'],
]);
