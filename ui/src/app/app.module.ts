import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { WordsearchComponent } from "./wordsearch/wordsearch.component";
import { GridComponent } from "./wordsearch/grid/grid.component";
import { ReactiveFormsModule } from "@angular/forms";
import { BankComponent } from "./wordsearch/bank/bank.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { NavbarComponent } from "./wordsearch/navbar/navbar.component";
import { DialogModule } from "./wordsearch/navbar/navbar.module";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { WordsearchContentComponent } from "./wordsearch/wordsearch-content/wordsearch-content.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    WordsearchComponent,
    GridComponent,
    BankComponent,
    NavbarComponent,
    WordsearchContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    DialogModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
