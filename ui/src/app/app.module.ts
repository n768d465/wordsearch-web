import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordsearchEffects } from './store/wordsearch.effects';
import { wordsearchReducer } from './store/wordsearch.reducer';
import { BankComponent } from './wordsearch/bank/bank.component';
import { FormComponent } from './wordsearch/form/form.component';
import { GridComponent } from './wordsearch/grid/grid.component';
import { WordsearchComponent } from './wordsearch/wordsearch.component';

@NgModule({
  declarations: [AppComponent, WordsearchComponent, GridComponent, BankComponent, FormComponent],
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
export class AppModule {}
