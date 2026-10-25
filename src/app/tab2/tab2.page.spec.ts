import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Tab2Page } from './tab2.page';
import { CounterService } from '../services/counter.service';
import { SavedCounter } from '../models/saved-counter';

describe('Tab2Page', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;
  let counterServiceMock: {
    initialized: ReturnType<typeof signal>;
    counters: ReturnType<typeof signal>;
    average: ReturnType<typeof signal>;
    initialize: ReturnType<typeof vi.fn>;
    remove: ReturnType<typeof vi.fn>;
    clear: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    // Mock counter service with signals and async methods
    counterServiceMock = {
      initialized: signal(true),
      counters: signal<SavedCounter[]>([
        { id: '1', name: 'Test', value: 3, createdAt: '2026-01-01T12:00:00.000Z' },
      ]),
      average: signal(3),
      initialize: vi.fn().mockResolvedValue(undefined),
      remove: vi.fn().mockResolvedValue(undefined),
      clear: vi.fn().mockResolvedValue(undefined),
    };

    await TestBed.configureTestingModule({
      imports: [Tab2Page],
      providers: [{ provide: CounterService, useValue: counterServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Verify page creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verify service initialization on ngOnInit
  it('should initialize counterService on ngOnInit', async () => {
    await component.ngOnInit();
    expect(counterServiceMock.initialize).toHaveBeenCalled();
  });

  // Verify remove delegation
  it('should delegate remove to counterService', async () => {
    await component.remove('1');
    expect(counterServiceMock.remove).toHaveBeenCalledWith('1');
  });

  // Verify clear delegation
  it('should delegate clear to counterService', async () => {
    await component.clear();
    expect(counterServiceMock.clear).toHaveBeenCalled();
  });
});
