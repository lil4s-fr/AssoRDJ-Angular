import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



// Import Angular material
import {MatCardModule} from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    CreateRoomComponent
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
