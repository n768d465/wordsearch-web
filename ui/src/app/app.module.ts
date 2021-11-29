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
import { FormDialogComponent } from './wordsearch/form-dialog/form-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [AppComponent, WordsearchComponent, GridComponent, BankComponent, FormDialogComponent],
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
    MatProgressSpinnerModule,
    MatListModule,
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    EffectsModule.forRoot([]),
    StoreModule.forFeature('wsState', wordsearchReducer),
    EffectsModule.forFeature([WordsearchEffects]),
    StoreModule.forRoot({}),
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
