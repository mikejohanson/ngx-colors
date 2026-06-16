import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";





const routes: Routes = [
  {
    path: "overview",
    loadComponent: () => import('./views/overview/overview.component').then(m => m.OverviewComponent),
    data: { tabIndex: 1 },
  },
  {
    path: "api",
    loadComponent: () => import('./views/api/api.component').then(m => m.ApiComponent),
    data: { tabIndex: 2 },
  },
  {
    path: "examples",
    loadComponent: () => import('./views/examples/examples.component').then(m => m.ExamplesComponent),
    data: { tabIndex: 3 },
  },
  {
    path: "changelog",
    loadComponent: () => import('./views/changelog/changelog.component').then(m => m.ChangelogComponent),
    data: { tabIndex: 4 },
  },

  { path: "", redirectTo: "overview", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
