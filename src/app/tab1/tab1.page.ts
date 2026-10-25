import { Component, inject } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { CounterComponent } from '../components/counter/counter.component';
import { SavedCounter } from '../models/saved-counter';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CounterComponent],
})
export class Tab1Page {
  // Inject counter service
  readonly counterService = inject(CounterService);

  /**
   * Handle saved event from CounterComponent
   */
  async onSaved(counter: SavedCounter): Promise<void> {
    await this.counterService.add(counter);
  }
}
