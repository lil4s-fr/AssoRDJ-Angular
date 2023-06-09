import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 



// Import Angular material
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './commons/navbar/navbar.component';
import { FooterComponent } from './commons/footer/footer.component';
import { NotFoundComponent } from './commons/not-found/not-found.component';
import { CreateArticleComponent } from './formulaires/create-article/create-article.component';
import { CreateEventComponent } from './formulaires/create-event/create-event.component';
import { ConnectionComponent } from './formulaires/connection/connection.component';
import { ContactComponent } from './formulaires/contact/contact.component';
import { BookComponent } from './formulaires/book/book.component';
import { JoinEventComponent } from './formulaires/join-event/join-event.component';
import { EventCardComponent } from './lists/event-card/event-card.component';
import { ArticleCardComponent } from './lists/article-card/article-card.component';
import { HomeComponent } from './pages/home/home.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { EventsComponent } from './pages/events/events.component';
import { ButtonsComponent } from './commons/buttons/buttons.component';
import { ListsComponent } from './lists/lists.component';
import { FormulairesComponent } from './formulaires/formulaires.component';
import { PersonalDataComponent } from './pages/personal-data/personal-data.component';
import { CategorieComponent } from './formulaires/create-category/categorie.component';
import { CreateRoomComponent } from './formulaires/create-room/create-room.component';
import { CreateUserComponent } from './formulaires/create-user/create-user.component';
import { LastEventComponent } from './pages/home/last-event/last-event.component';
import { DatePipe } from '@angular/common';
import { ModifierUtilisateurComponent } from './pages/modifier-utilisateur/modifier-utilisateur.component';
import { ModifierSalleComponent } from './pages/modifier-salle/modifier-salle.component';
import { ModifierCategorieComponent } from './pages/modifier-categorie/modifier-categorie.component';
import { ModifierArticleComponent } from './pages/modifier-article/modifier-article.component';

import { NativeDateAdapter, DateAdapter } from "@angular/material/core";
    
export class FrenchDateAdapter extends NativeDateAdapter {
  override parse(value: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
      const str = value.split('/');
      if (str.length < 2 || isNaN(+str[0]) || isNaN(+str[1]) || isNaN(+str[2])) {
        return null;
      }
      return new Date(Number(str[2]), Number(str[1]) - 1, Number(str[0]), 12);
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    CreateArticleComponent,
    CreateEventComponent,
    ConnectionComponent,
    ContactComponent,
    BookComponent,
    JoinEventComponent,
    EventCardComponent,
    ArticleCardComponent,
    HomeComponent,
    ArticlesComponent,
    EventsComponent,
    ButtonsComponent,
    ListsComponent,
    FormulairesComponent,
    PersonalDataComponent,
    CategorieComponent,
    CreateRoomComponent,
    CreateUserComponent,
    LastEventComponent,
    ModifierUtilisateurComponent,
    ModifierSalleComponent,
    ModifierCategorieComponent,
    ModifierArticleComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDialogModule,
  ],
  providers: [
    DatePipe,
    {provide: MAT_DATE_LOCALE, useValue: "fr-FR"},
    {provide: DateAdapter, useClass: FrenchDateAdapter}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
