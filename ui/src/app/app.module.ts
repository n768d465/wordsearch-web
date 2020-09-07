import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WordsearchComponent } from './wordsearch/wordsearch.component';
import { GridComponent } from './wordsearch/grid/grid.component';
import { BankComponent } from './wordsearch/bank/bank.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from './wordsearch/navbar/navbar.component';
import { NavbarModule } from './wordsearch/navbar/navbar.module';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { wordsearchReducer } from './store/wordsearch.reducer';
import { WordsearchEffects } from './store/wordsearch.effects';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [AppComponent, WordsearchComponent, GridComponent, BankComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    NavbarModule,
    MatProgressSpinnerModule,
    MatListModule,
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    EffectsModule.forRoot([]),
    StoreModule.forFeature('wsState', wordsearchReducer),
    EffectsModule.forFeature([WordsearchEffects]),
    StoreModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
