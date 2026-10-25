import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Preferences } from '@capacitor/preferences';
import { CounterService } from './counter.service';
import { SavedCounter } from '../models/saved-counter';

// Mock Capacitor Preferences plugin
vi.mock('@capacitor/preferences', () => {
  return {
    Preferences: {
      get: vi.fn(),
      set: vi.fn(),
      remove: vi.fn(),
    },
  };
});

describe('CounterService', () => {
  let service: CounterService;

  beforeEach(() => {
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [CounterService],
    });
    service = TestBed.inject(CounterService);
  });

  // Verify service creation
  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.counters()).toEqual([]);
    expect(service.initialized()).toBe(false);
  });

  // Single initialization on multiple calls
  it('should initialize only once', async () => {
    vi.mocked(Preferences.get).mockResolvedValue({ value: null });

    // Call initialize multiple times concurrently
    await Promise.all([service.initialize(), service.initialize(), service.initialize()]);

    expect(Preferences.get).toHaveBeenCalledTimes(1);
    expect(Preferences.get).toHaveBeenCalledWith({ key: 'saved-counters' });
    expect(service.initialized()).toBe(true);
  });

  // Load existing records from storage
  it('should load existing records from storage', async () => {
    const mockCounters: SavedCounter[] = [
      { id: '1', name: 'Počítadlo 1', value: 10, createdAt: '2026-01-01T12:00:00.000Z' },
      { id: '2', name: 'Počítadlo 2', value: 20, createdAt: '2026-01-02T12:00:00.000Z' },
    ];
    vi.mocked(Preferences.get).mockResolvedValue({ value: JSON.stringify(mockCounters) });

    await service.initialize();

    expect(service.counters()).toEqual(mockCounters);
    expect(service.initialized()).toBe(true);
  });

  // Calculate average value of saved counters
  it('should compute average correctly when empty and with items', async () => {
    // Empty list returns 0
    expect(service.average()).toBe(0);

    const mockCounters: SavedCounter[] = [
      { id: '1', name: 'A', value: 10, createdAt: '2026-01-01T00:00:00.000Z' },
      { id: '2', name: 'B', value: 20, createdAt: '2026-01-02T00:00:00.000Z' },
      { id: '3', name: 'C', value: 15, createdAt: '2026-01-03T00:00:00.000Z' },
    ];
    vi.mocked(Preferences.get).mockResolvedValue({ value: JSON.stringify(mockCounters) });

    await service.initialize();

    // (10 + 20 + 15) / 3 = 15
    expect(service.average()).toBe(15);
  });

  // Add new counter and save to Preferences
  it('should add a new counter and persist to Preferences', async () => {
    vi.mocked(Preferences.get).mockResolvedValue({ value: null });
    vi.mocked(Preferences.set).mockResolvedValue();

    const newCounter: SavedCounter = {
      id: 'abc-123',
      name: 'Nové počítadlo',
      value: 7,
      createdAt: '2026-01-03T10:00:00.000Z',
    };

    await service.add(newCounter);

    expect(service.counters()).toEqual([newCounter]);
    expect(Preferences.set).toHaveBeenCalledWith({
      key: 'saved-counters',
      value: JSON.stringify([newCounter]),
    });
  });

  // Remove counter by ID
  it('should remove counter by id and persist updated list', async () => {
    const initialCounters: SavedCounter[] = [
      { id: '1', name: 'Počítadlo 1', value: 5, createdAt: '2026-01-01T00:00:00.000Z' },
      { id: '2', name: 'Počítadlo 2', value: 15, createdAt: '2026-01-02T00:00:00.000Z' },
    ];
    vi.mocked(Preferences.get).mockResolvedValue({ value: JSON.stringify(initialCounters) });
    vi.mocked(Preferences.set).mockResolvedValue();

    await service.initialize();
    await service.remove('1');

    expect(service.counters()).toEqual([initialCounters[1]]);
    expect(Preferences.set).toHaveBeenCalledWith({
      key: 'saved-counters',
      value: JSON.stringify([initialCounters[1]]),
    });
  });

  // Clear all counters and remove from Preferences
  it('should clear all counters and remove from Preferences', async () => {
    const initialCounters: SavedCounter[] = [
      { id: '1', name: 'Počítadlo', value: 3, createdAt: '2026-01-01T00:00:00.000Z' },
    ];
    vi.mocked(Preferences.get).mockResolvedValue({ value: JSON.stringify(initialCounters) });
    vi.mocked(Preferences.remove).mockResolvedValue();

    await service.initialize();
    expect(service.counters().length).toBe(1);

    await service.clear();

    expect(service.counters()).toEqual([]);
    expect(Preferences.remove).toHaveBeenCalledWith({ key: 'saved-counters' });
  });

  // Error handling: handle corrupted JSON and log error
  it('should handle corrupted JSON gracefully and log error via console.error', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(Preferences.get).mockResolvedValue({ value: 'CORRUPTED_JSON_DATA{{{' });

    await service.initialize();

    expect(service.counters()).toEqual([]);
    expect(service.initialized()).toBe(true);
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
