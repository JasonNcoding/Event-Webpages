import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { InvalidDataComponent } from './components/invalid-data/invalid-data.component';
import { DatabaseService } from './services/database.service';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { ListCategoriesComponent } from './components/category/list-categories/list-categories.component';
import { UpdateCategoryComponent } from './components/category/update-category/update-category.component';
import { DeleteCategoryComponent } from './components/category/delete-category/delete-category.component';
import { CategoryDetailsComponent } from './components/category/category-details/category-details.component';
import { StatsG1Component } from './components/stats-g1/stats-g1.component';
import { CapitalisePipe } from './capitalise.pipe';
import { AddEventComponent } from './components/event/add-event/add-event.component';
import { ListEventComponent } from './components/event/list-event/list-event.component';
import { DeleteEventComponent } from './components/event/delete-event/delete-event.component';
import { UpdateEventComponent } from './components/event/update-event/update-event.component';
import { StatsG2Component } from './components/stats-g2/stats-g2.component';
import { EventDetailsComponent } from './components/event/event-details/event-details.component';
import { DurationConversionPipe } from './pipes/duration-conversion.pipe';
import { SetEndDateTimePipe } from './pipes/set-end-date-time.pipe';
import { ConvertCategoryListPipe } from './pipes/convert-category-list.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslationComponent } from './components/translation/translation.component';
import { TextToSpeechComponent } from './components/text-to-speech/text-to-speech.component';


const routes: Routes = [
  { path: 'category/add', component: AddCategoryComponent },
  { path: 'category/list', component: ListCategoriesComponent },
  { path: 'category/update', component: UpdateCategoryComponent },
  { path: 'category/delete', component: DeleteCategoryComponent },
  { path: 'category/:categoryId', component: CategoryDetailsComponent },
  { path: 'event/add', component: AddEventComponent },
  { path: 'event/list', component: ListEventComponent },
  { path: 'event/update', component: UpdateEventComponent },
  { path: 'event/delete', component: DeleteEventComponent },
  { path: 'event/view-event/:eventId', component: EventDetailsComponent },
  { path: 'stats/g1', component: StatsG1Component },
  { path: 'stats/g2', component: StatsG2Component },
  { path: 'translation', component: TranslationComponent },
  { path: 'text-to-speech', component: TextToSpeechComponent },
  { path: 'invalid', component: InvalidDataComponent },
  { path: '', redirectTo: "category/list", pathMatch: "full"},
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    AddCategoryComponent,
    ListCategoriesComponent,
    PageNotFoundComponent,
    InvalidDataComponent,
    UpdateCategoryComponent,
    DeleteCategoryComponent,
    CategoryDetailsComponent,
    StatsG1Component,
    CapitalisePipe,
    AddEventComponent,
    ListEventComponent,
    DeleteEventComponent,
    UpdateEventComponent,
    StatsG2Component,
    EventDetailsComponent,
    DurationConversionPipe,
    SetEndDateTimePipe,
    ConvertCategoryListPipe,
    TranslationComponent,
    TextToSpeechComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
