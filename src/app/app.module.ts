import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import {HttpClientModule} from "@angular/common/http";
import { UserService } from './shared/user.service';
import { FormsModule } from "@angular/forms";
import { TestComponent } from './test/test.component';
import { QuestionComponent } from './test/question/question.component';
import { McqComponent } from './test/mcq/mcq.component';
import { CasestudyComponent } from './casestudy/casestudy.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    TestComponent,
    QuestionComponent,
    McqComponent,
    CasestudyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }