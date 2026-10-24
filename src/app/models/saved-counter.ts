/**
 * Model representing a saved counter entry
 */
export interface SavedCounter {
  /** Unique identifier (UUID) */
  id: string;
  /** Counter display name */
  name: string;
  /** Numerical value of the counter */
  value: number;
  /** Creation timestamp in ISO 8601 format */
  createdAt: string;
}
