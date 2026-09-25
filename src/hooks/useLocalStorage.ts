import { useEffect } from 'react';
import { BoqData } from '../types/boq';
import { saveDraft, loadDraft as loadDraftFromStorage } from '../utils/storage';
import { useDebouncedValue } from './useDebouncedValue';

export function useLocalStorage(boqData: BoqData, enabled: boolean = true) {
  const debouncedData = useDebouncedValue(boqData, 2000);

  useEffect(() => {
    if (enabled && debouncedData) {
      saveDraft(debouncedData);
    }
  }, [debouncedData, enabled]);

  return {
    loadDraft: loadDraftFromStorage,
  };
}
