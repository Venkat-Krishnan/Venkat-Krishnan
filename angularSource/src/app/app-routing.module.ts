import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { LoginComponent } from './login/login.component';
import { ViewCommentComponent } from './view-comment/view-comment.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"comment",component:ViewCommentComponent},
  {path:"addComment",component:AddCommentComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
