import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { CounterService } from '../services/counter.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    DatePipe,
    DecimalPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonSpinner,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonCard,
    IonCardContent,
  ],
})
export class Tab2Page implements OnInit {
  // Inject counter service
  readonly counterService = inject(CounterService);

  constructor() {
    // Register trash icon for deleting items
    addIcons({ trashOutline });
  }

  /**
   * Load saved counters on page initialization
   */
  async ngOnInit(): Promise<void> {
    await this.counterService.initialize();
  }

  /**
   * Remove a counter by ID
   */
  async remove(id: string): Promise<void> {
    await this.counterService.remove(id);
  }

  /**
   * Clear all saved counters
   */
  async clear(): Promise<void> {
    await this.counterService.clear();
  }
}
