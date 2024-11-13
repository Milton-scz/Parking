import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PlazasModule } from './pages/plazas/plazas.module';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { PagesModule } from './pages/pages.module';
import { GraphQLModule } from './graphql.module';
import { TarifasModule } from './pages/tarifas/tarifas.module';
import { UsuariosModule } from './pages/usuarios/usuarios.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AbonadosModule } from './pages/abonados/abonados.module';
import { PlanesModule } from './pages/planes/planes.module';
import { RegistrosModule } from './pages/registros/registros.module';
import { ContratosModule } from './pages/contratos/contratos.module';

@NgModule({
  declarations: [
    AppComponent,
    NopageFoundComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PlazasModule,
    TarifasModule,
    UsuariosModule,
    AbonadosModule,
    PlanesModule,
    RegistrosModule,
    ContratosModule,
    PagesModule,
    HttpClientModule,
    GraphQLModule,
    FormsModule,
    BrowserAnimationsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
