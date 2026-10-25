import { Injectable, computed, signal } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { SavedCounter } from '../models/saved-counter';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  /** Storage key for saved counters in Capacitor Preferences */
  private readonly storageKey = 'saved-counters';

  /** Internal reactive signal storing the list of counters */
  private readonly countersState = signal<SavedCounter[]>([]);

  /** Internal signal tracking whether initial load finished */
  private readonly initializedState = signal<boolean>(false);

  /** Public read-only signal with saved counters */
  readonly counters = this.countersState.asReadonly();

  /** Public read-only signal showing if service is initialized */
  readonly initialized = this.initializedState.asReadonly();

  /** Computed signal calculating the average value of saved counters */
  readonly average = computed<number>(() => {
    const list = this.countersState();
    if (list.length === 0) {
      return 0;
    }
    const sum = list.reduce((acc, curr) => acc + curr.value, 0);
    return Math.round((sum / list.length) * 100) / 100;
  });

  /** Cached initialization promise to prevent multiple concurrent loads */
  private initializationPromise: Promise<void> | null = null;

  /**
   * Initialize service and load counters from storage
   */
  initialize(): Promise<void> {
    this.initializationPromise ??= this.load();
    return this.initializationPromise;
  }

  /**
   * Add a new counter to the beginning of the list and persist
   */
  async add(counter: SavedCounter): Promise<void> {
    await this.initialize();
    this.countersState.update((current) => [counter, ...current]);
    await this.persist();
  }

  /**
   * Remove a counter by id and persist
   */
  async remove(id: string): Promise<void> {
    await this.initialize();
    this.countersState.update((current) => current.filter((item) => item.id !== id));
    await this.persist();
  }

  /**
   * Clear all counters and remove from storage
   */
  async clear(): Promise<void> {
    this.countersState.set([]);
    await Preferences.remove({ key: this.storageKey });
  }

  /**
   * Load counters from Capacitor Preferences with error handling
   */
  private async load(): Promise<void> {
    try {
      const { value } = await Preferences.get({ key: this.storageKey });
      if (value) {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          this.countersState.set(parsed);
        }
      }
    } catch (error) {
      console.error('Failed to load counters from storage:', error);
    } finally {
      this.initializedState.set(true);
    }
  }

  /**
   * Save current counters state to Capacitor Preferences
   */
  private async persist(): Promise<void> {
    await Preferences.set({
      key: this.storageKey,
      value: JSON.stringify(this.countersState()),
    });
  }
}
