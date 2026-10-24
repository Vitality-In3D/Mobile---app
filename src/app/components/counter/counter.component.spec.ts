import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { CounterComponent } from './counter.component';
import { SavedCounter } from '../../models/saved-counter';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verify component creates with defaults
  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.heading()).toBe('Nové počítadlo');
    expect(component.count).toBe(0);
    expect(component.counterName).toBe('');
  });

  // Increment value
  it('should increment value', () => {
    component.increment();
    expect(component.count).toBe(1);
    component.increment();
    expect(component.count).toBe(2);
  });

  // Decrement value without going below zero
  it('should decrement value and not go below zero', () => {
    component.decrement();
    expect(component.count).toBe(0);

    component.increment();
    component.increment();
    expect(component.count).toBe(2);

    component.decrement();
    expect(component.count).toBe(1);

    component.decrement();
    expect(component.count).toBe(0);

    component.decrement();
    expect(component.count).toBe(0);
  });

  // Reset value to zero
  it('should reset value to zero', () => {
    component.increment();
    component.increment();
    expect(component.count).toBe(2);

    component.reset();
    expect(component.count).toBe(0);
  });

  // Validation: do not save with empty name
  it('should not emit saved event when counter name is empty or whitespace', () => {
    let emittedCounter: SavedCounter | undefined;
    component.saved.subscribe((counter) => {
      emittedCounter = counter;
    });

    component.counterName = '   ';
    component.save();

    expect(emittedCounter).toBeUndefined();
  });

  // Save event emission, UUID generation, and form reset
  it('should emit saved event, generate UUID, and clear form on save', () => {
    let emittedCounter: SavedCounter | undefined;
    component.saved.subscribe((counter) => {
      emittedCounter = counter;
    });

    component.counterName = 'Test počítadlo';
    component.count = 5;

    component.save();

    expect(emittedCounter).toBeDefined();
    expect(emittedCounter?.name).toBe('Test počítadlo');
    expect(emittedCounter?.value).toBe(5);
    expect(emittedCounter?.id).toBeDefined();
    expect(emittedCounter?.id.length).toBeGreaterThan(0);
    expect(emittedCounter?.createdAt).toBeDefined();

    // Verify form was reset
    expect(component.counterName).toBe('');
    expect(component.count).toBe(0);
  });
});
