import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PostDetailsComponent} from './post-details/post-details.component';
import {SomeKindOfGuard} from './some-kind-of.guard';
import {TemplateFormComponent} from './template-form/template-form.component';
import {ReactiveFormComponent} from './reactive-form/reactive-form.component';


const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'post', component: TemplateFormComponent},
    {path: 'post-v2', component: ReactiveFormComponent},
    {path: 'post/:id', component: PostDetailsComponent, canActivate: [SomeKindOfGuard]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
