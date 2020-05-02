import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "wordsearch-bank",
  templateUrl: "./bank.component.html",
  styleUrls: ["./bank.component.css"]
})
export class BankComponent {
  @Input() bank: string[];
  @Output() onHover = new EventEmitter<string>();

  emitHover(word: string) {
    this.onHover.emit(word);
  }

  emitMouseLeave() {
    this.onHover.emit();
  }
}
