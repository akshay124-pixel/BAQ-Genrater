import { BoqData, BoqHeader } from '../types/boq';

const STORAGE_KEYS = {
  DRAFT_HEADER: 'boq_draft_header',
  DRAFT_ITEMS: 'boq_draft_items',
  DRAFT_TIMESTAMP: 'boq_draft_timestamp',
} as const;

/**
 * Saves BOQ draft to localStorage
 */
export function saveDraft(boqData: BoqData): boolean {
  try {
    localStorage.setItem(
      STORAGE_KEYS.DRAFT_HEADER,
      JSON.stringify(boqData.header)
    );
    localStorage.setItem(
      STORAGE_KEYS.DRAFT_ITEMS,
      JSON.stringify(boqData.items)
    );
    localStorage.setItem(
      STORAGE_KEYS.DRAFT_TIMESTAMP,
      new Date().toISOString()
    );
    return true;
  } catch (error) {
    console.error('Failed to save draft:', error);
    return false;
  }
}

/**
 * Loads BOQ draft from localStorage
 */
export function loadDraft(): BoqData | null {
  try {
    const headerJson = localStorage.getItem(STORAGE_KEYS.DRAFT_HEADER);
    const itemsJson = localStorage.getItem(STORAGE_KEYS.DRAFT_ITEMS);

    if (!headerJson || !itemsJson) {
      return null;
    }

    const header = JSON.parse(headerJson);
    const items = JSON.parse(itemsJson);

    return { header, items };
  } catch (error) {
    console.error('Failed to load draft:', error);
    return null;
  }
}

/**
 * Clears BOQ draft from localStorage
 */
export function clearDraft(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEYS.DRAFT_HEADER);
    localStorage.removeItem(STORAGE_KEYS.DRAFT_ITEMS);
    localStorage.removeItem(STORAGE_KEYS.DRAFT_TIMESTAMP);
    return true;
  } catch (error) {
    console.error('Failed to clear draft:', error);
    return false;
  }
}

/**
 * Gets the timestamp of the last saved draft
 */
export function getDraftTimestamp(): Date | null {
  try {
    const timestamp = localStorage.getItem(STORAGE_KEYS.DRAFT_TIMESTAMP);
    return timestamp ? new Date(timestamp) : null;
  } catch (error) {
    console.error('Failed to get draft timestamp:', error);
    return null;
  }
}

/**
 * Checks if a draft exists
 */
export function hasDraft(): boolean {
  return (
    localStorage.getItem(STORAGE_KEYS.DRAFT_HEADER) !== null &&
    localStorage.getItem(STORAGE_KEYS.DRAFT_ITEMS) !== null
  );
}

/**
 * Gets default BOQ header with today's date
 */
export function getDefaultBoqHeader(): BoqHeader {
  return {
    clientName: '',
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    projectDetail: '',
    salesPerson: '',
    location: '',
    version: 'v1.0',
    subject: '',
  };
}

/**
 * Checks localStorage availability
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}
