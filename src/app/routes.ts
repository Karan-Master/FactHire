import {Routes} from '@angular/router'
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CasestudyComponent } from './casestudy/casestudy.component';
import { TestComponent } from './test/test.component';

export const appRoutes : Routes =[
    {path:'user-detail',component:UserDetailComponent},
    {path:'casestudy',component:CasestudyComponent},
    {path:'test',component:TestComponent},
    {path:'',redirectTo:'/user-detail',pathMatch:'full'}
];