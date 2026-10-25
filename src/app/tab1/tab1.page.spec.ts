import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Tab1Page } from './tab1.page';
import { CounterService } from '../services/counter.service';
import { SavedCounter } from '../models/saved-counter';

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;
  let counterServiceMock: { add: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    // Mock counter service
    counterServiceMock = {
      add: vi.fn().mockResolvedValue(undefined),
    };

    await TestBed.configureTestingModule({
      imports: [Tab1Page],
      providers: [{ provide: CounterService, useValue: counterServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verify page creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verify save delegation to service
  it('should call counterService.add when onSaved is invoked', async () => {
    const mockCounter: SavedCounter = {
      id: '123',
      name: 'Test',
      value: 10,
      createdAt: '2026-01-01T00:00:00.000Z',
    };

    await component.onSaved(mockCounter);

    expect(counterServiceMock.add).toHaveBeenCalledWith(mockCounter);
  });
});
