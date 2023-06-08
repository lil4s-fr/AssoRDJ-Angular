import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './pages/articles/articles.component';
import { EventsComponent } from './pages/events/events.component';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './formulaires/book/book.component';
import { ConnectionComponent } from './formulaires/connection/connection.component';
import { ContactComponent } from './formulaires/contact/contact.component';
import { CreateArticleComponent } from './formulaires/create-article/create-article.component';
import { CreateEventComponent } from './formulaires/create-event/create-event.component';
import { JoinEventComponent } from './formulaires/join-event/join-event.component';
import { NotFoundComponent } from './commons/not-found/not-found.component';
import { PersonalDataComponent } from './pages/personal-data/personal-data.component';
import { CategorieComponent } from './formulaires/create-category/categorie.component';
import { CreateRoomComponent } from './formulaires/create-room/create-room.component';
import { CreateUserComponent } from './formulaires/create-user/create-user.component';
import { ModifierUtilisateurComponent } from './pages/modifier-utilisateur/modifier-utilisateur.component';
import { ModifierSalleComponent } from './pages/modifier-salle/modifier-salle.component';

const routes: Routes = [
  {path :'', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'membre', component: CreateUserComponent},
  {path: 'category', component: CategorieComponent},
  {path: 'room', component: CreateRoomComponent},
  {path: 'reservation', component: BookComponent},
  {path: 'infoPerso', component: PersonalDataComponent},
  {path: 'event', component: EventsComponent},
  {path: 'articles', component: ArticlesComponent},
  {path: 'book', component: BookComponent},
  {path: 'login', component: ConnectionComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'createArticle', component: CreateArticleComponent},
  {path: 'createEvent', component: CreateEventComponent},
  {path: 'joinEvent', component: JoinEventComponent},
  {path: 'modifierutilisateur/:id', component: ModifierUtilisateurComponent },
  {path: 'modifiersalle/:id', component: ModifierUtilisateurComponent },
  // a retirer quand la page 404 sera finie
  {path: '404', component: NotFoundComponent},

  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
