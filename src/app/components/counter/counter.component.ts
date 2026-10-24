import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonInput, IonItem } from '@ionic/angular';
import { SavedCounter } from '../../models/saved-counter';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  imports: [FormsModule, IonButton, IonInput, IonItem],
})
export class CounterComponent {
  /** Heading title passed via Signal Input */
  readonly heading = input<string>('Nové počítadlo');

  /** Event emitted when counter is saved */
  readonly saved = output<SavedCounter>();

  /** Current count value */
  count = 0;

  /** Name of the counter entered by user */
  counterName = '';

  /**
   * Increase count by 1
   */
  increment(): void {
    this.count++;
  }

  /**
   * Decrease count by 1 (minimum value is 0)
   */
  decrement(): void {
    if (this.count > 0) {
      this.count--;
    }
  }

  /**
   * Reset count back to 0
   */
  reset(): void {
    this.count = 0;
  }

  /**
   * Save counter: validate name, create new object, emit event, and reset form
   */
  save(): void {
    const trimmedName = this.counterName.trim();
    if (!trimmedName) {
      return;
    }

    const newCounter: SavedCounter = {
      id: crypto.randomUUID(),
      name: trimmedName,
      value: this.count,
      createdAt: new Date().toISOString(),
    };

    // Emit saved counter to parent component
    this.saved.emit(newCounter);

    // Reset input fields
    this.counterName = '';
    this.count = 0;
  }
}
