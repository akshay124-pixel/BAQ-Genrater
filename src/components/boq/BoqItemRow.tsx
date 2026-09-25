import React, { useState } from 'react';
import { BoqItem } from '../../types/boq';
import { formatCurrency, formatPercentage } from '../../utils/currency';
import { Button } from '../common/Button';

export interface BoqItemRowProps {
  item: BoqItem;
  index: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export const BoqItemRow: React.FC<BoqItemRowProps> = ({
  item,
  index,
  onEdit,
  onDelete,
  onDuplicate,
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDelete = () => {
    if (showConfirmDelete) {
      onDelete(item.id);
    } else {
      setShowConfirmDelete(true);
      setTimeout(() => setShowConfirmDelete(false), 3000);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
      {/* Header Row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center">
            <span className="inline-flex items-center justify-center w-8 h-8 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mr-3">
              {index + 1}
            </span>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{item.itemName}</h4>
              <p className="text-sm text-gray-500">
                {item.quantity} {item.unit} × {formatCurrency(item.unitRate)}
              </p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900">
            {formatCurrency(item.totalAmount)}
          </div>
          <div className="text-xs text-gray-500">
            GST {formatPercentage(item.gstPercentage)}
          </div>
        </div>
      </div>

      {/* Description Toggle */}
      <button
        type="button"
        onClick={() => setShowDescription(!showDescription)}
        className="text-sm text-primary-600 hover:text-primary-700 font-medium focus:outline-none mb-2"
      >
        {showDescription ? '▼ Hide' : '▶ View'} Specification
      </button>

      {/* Description */}
      {showDescription && (
        <div className="mb-3 p-3 bg-gray-50 rounded border border-gray-200">
          <p className="text-sm text-gray-700 whitespace-pre-line">{item.description}</p>
        </div>
      )}

      {/* Calculation Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3 text-sm">
        <div>
          <span className="text-gray-500">Rate:</span>
          <span className="ml-2 font-medium">{formatCurrency(item.unitRate)}</span>
        </div>
        <div>
          <span className="text-gray-500">GST Amt:</span>
          <span className="ml-2 font-medium">{formatCurrency(item.gstAmount)}</span>
        </div>
        <div>
          <span className="text-gray-500">Rate Incl. Tax:</span>
          <span className="ml-2 font-medium">{formatCurrency(item.rateIncludingTax)}</span>
        </div>
        <div>
          <span className="text-gray-500">Total:</span>
          <span className="ml-2 font-medium text-primary-700">
            {formatCurrency(item.totalAmount)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2 pt-3 border-t border-gray-200">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onEdit(item.id)}
          className="text-blue-600 hover:bg-blue-50"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDuplicate(item.id)}
          className="text-green-600 hover:bg-green-50"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Duplicate
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleDelete}
          className={showConfirmDelete ? 'text-red-700 bg-red-100' : 'text-red-600 hover:bg-red-50'}
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          {showConfirmDelete ? 'Confirm Delete?' : 'Delete'}
        </Button>
      </div>
    </div>
  );
};
