import { BoqHeader, BoqItem, BoqData } from '../types/boq';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates BOQ header (customer/project information)
 */
export function validateBoqHeader(header: Partial<BoqHeader>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!header.clientName?.trim()) {
    errors.clientName = 'Client name is required';
  } else if (header.clientName.trim().length < 2) {
    errors.clientName = 'Client name must be at least 2 characters';
  }

  if (!header.projectDetail?.trim()) {
    errors.projectDetail = 'Project detail is required';
  } else if (header.projectDetail.trim().length < 3) {
    errors.projectDetail = 'Project detail must be at least 3 characters';
  }

  if (!header.location?.trim()) {
    errors.location = 'Location is required';
  }

  if (!header.salesPerson?.trim()) {
    errors.salesPerson = 'Sales person is required';
  }

  if (!header.date) {
    errors.date = 'Date is required';
  } else {
    const date = new Date(header.date);
    if (isNaN(date.getTime())) {
      errors.date = 'Invalid date';
    }
  }

  if (!header.subject?.trim()) {
    errors.subject = 'Subject is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates a single BOQ item
 */
export function validateBoqItem(item: Partial<BoqItem>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!item.productId) {
    errors.product = 'Please select a product';
  }

  if (!item.itemName?.trim()) {
    errors.itemName = 'Item name is required';
  }

  if (!item.quantity || item.quantity <= 0) {
    errors.quantity = 'Quantity must be greater than 0';
  } else if (item.quantity > 999999) {
    errors.quantity = 'Quantity is too large';
  }

  if (!item.unit?.trim()) {
    errors.unit = 'Unit is required';
  }

  if (item.unitRate === undefined || item.unitRate === null) {
    errors.unitRate = 'Rate is required';
  } else if (item.unitRate < 0) {
    errors.unitRate = 'Rate cannot be negative';
  } else if (item.unitRate > 99999999) {
    errors.unitRate = 'Rate is too large';
  }

  if (item.gstPercentage === undefined || item.gstPercentage === null) {
    errors.gstPercentage = 'GST is required';
  } else if (item.gstPercentage < 0) {
    errors.gstPercentage = 'GST cannot be negative';
  } else if (item.gstPercentage > 100) {
    errors.gstPercentage = 'GST cannot exceed 100%';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates if BOQ is ready for PDF generation
 */
export function canGeneratePdf(boqData: BoqData): ValidationResult {
  const errors: Record<string, string> = {};

  const headerValidation = validateBoqHeader(boqData.header);
  if (!headerValidation.isValid) {
    errors.header = 'Please complete all customer information fields';
  }

  if (!boqData.items || boqData.items.length === 0) {
    errors.items = 'Please add at least one item to the BOQ';
  } else {
    // Validate each item
    const invalidItems = boqData.items.filter(item => {
      const itemValidation = validateBoqItem(item);
      return !itemValidation.isValid;
    });

    if (invalidItems.length > 0) {
      errors.items = `${invalidItems.length} item(s) have validation errors`;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates email format (for future use)
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates phone number format (Indian)
 */
export function isValidIndianPhone(phone: string): boolean {
  // Accepts formats: +91-XXXXXXXXXX, +91 XXXXXXXXXX, XXXXXXXXXX
  const phoneRegex = /^(\+91[-\s]?)?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Sanitizes text input (removes leading/trailing whitespace, normalizes)
 */
export function sanitizeTextInput(text: string): string {
  return text.trim().replace(/\s+/g, ' ');
}

/**
 * Validates numeric input
 */
export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Validates positive number
 */
export function isPositiveNumber(value: number): boolean {
  return isValidNumber(value) && value > 0;
}

/**
 * Validates non-negative number
 */
export function isNonNegativeNumber(value: number): boolean {
  return isValidNumber(value) && value >= 0;
}
