import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { calculatorOutline, informationCircleOutline, timeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  // Inject environment injector for Ionic tabs
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    // Register icons used in navigation tabs
    addIcons({ calculatorOutline, informationCircleOutline, timeOutline });
  }
}
