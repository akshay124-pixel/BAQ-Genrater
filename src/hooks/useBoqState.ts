import { useReducer, useCallback } from 'react';
import { BoqState, BoqAction, BoqItem, BoqHeader } from '../types/boq';
import { getDefaultBoqHeader } from '../utils/storage';
import { recalculateItem } from '../utils/calculations';

const initialState: BoqState = {
  header: getDefaultBoqHeader(),
  items: [],
  currentItem: null,
  isEditing: false,
  editingId: null,
};

function boqReducer(state: BoqState, action: BoqAction): BoqState {
  switch (action.type) {
    case 'UPDATE_HEADER':
      return {
        ...state,
        header: { ...state.header, ...action.payload },
      };

    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        currentItem: null,
      };

    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.data }
            : item
        ),
        isEditing: false,
        editingId: null,
        currentItem: null,
      };

    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case 'REORDER_ITEMS':
      return {
        ...state,
        items: action.payload,
      };

    case 'START_EDIT':
      const itemToEdit = state.items.find((item) => item.id === action.payload);
      return {
        ...state,
        isEditing: true,
        editingId: action.payload,
        currentItem: itemToEdit || null,
      };

    case 'CANCEL_EDIT':
      return {
        ...state,
        isEditing: false,
        editingId: null,
        currentItem: null,
      };

    case 'RESET':
      return initialState;

    case 'LOAD_DRAFT':
      return {
        ...state,
        header: action.payload.header,
        items: action.payload.items,
      };

    default:
      return state;
  }
}

export function useBoqState() {
  const [state, dispatch] = useReducer(boqReducer, initialState);

  const updateHeader = useCallback((data: Partial<BoqHeader>) => {
    dispatch({ type: 'UPDATE_HEADER', payload: data });
  }, []);

  const addItem = useCallback((itemData: Partial<BoqItem>) => {
    const calculations = recalculateItem(itemData);
    const newItem: BoqItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      productId: itemData.productId!,
      itemName: itemData.itemName!,
      description: itemData.description!,
      quantity: itemData.quantity!,
      unit: itemData.unit!,
      unitRate: itemData.unitRate!,
      gstPercentage: itemData.gstPercentage!,
      ...calculations,
    };
    dispatch({ type: 'ADD_ITEM', payload: newItem });
  }, []);

  const updateItem = useCallback((id: string, data: Partial<BoqItem>) => {
    const calculations = recalculateItem(data);
    dispatch({
      type: 'UPDATE_ITEM',
      payload: { id, data: { ...data, ...calculations } },
    });
  }, []);

  const deleteItem = useCallback((id: string) => {
    dispatch({ type: 'DELETE_ITEM', payload: id });
  }, []);

  const duplicateItem = useCallback((id: string) => {
    const itemToDuplicate = state.items.find((item) => item.id === id);
    if (itemToDuplicate) {
      const newItem: BoqItem = {
        ...itemToDuplicate,
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      dispatch({ type: 'ADD_ITEM', payload: newItem });
    }
  }, [state.items]);

  const reorderItems = useCallback((newItems: BoqItem[]) => {
    dispatch({ type: 'REORDER_ITEMS', payload: newItems });
  }, []);

  const startEdit = useCallback((id: string) => {
    dispatch({ type: 'START_EDIT', payload: id });
  }, []);

  const cancelEdit = useCallback(() => {
    dispatch({ type: 'CANCEL_EDIT' });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const loadDraft = useCallback((header: BoqHeader, items: BoqItem[]) => {
    dispatch({ type: 'LOAD_DRAFT', payload: { header, items } });
  }, []);

  return {
    state,
    updateHeader,
    addItem,
    updateItem,
    deleteItem,
    duplicateItem,
    reorderItems,
    startEdit,
    cancelEdit,
    reset,
    loadDraft,
  };
}
