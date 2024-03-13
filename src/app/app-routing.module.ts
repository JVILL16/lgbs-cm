import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CMComponent } from './components/cm/cm.component';
import { CSComponent } from './components/cs/cs.component';
import { FilesComponent } from './components/files/files.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthguardGuard } from './services/authguard.guard';

const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'contract_manager', component: CMComponent },
    { path: 'files', component: FilesComponent,canActivate: [AuthguardGuard] },
    { path: 'client_support', component: CSComponent,canActivate: [AuthguardGuard] },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent },
//canActivate: [AuthguardGuard]

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
