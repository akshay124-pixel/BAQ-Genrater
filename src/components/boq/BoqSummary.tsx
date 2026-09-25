import React, { useMemo } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { BoqItem } from '../../types/boq';
import { calculateBoqSummary } from '../../utils/calculations';
import { formatCurrency } from '../../utils/currency';

export interface BoqSummaryProps {
  items: BoqItem[];
  onGeneratePdf: () => void;
  onGenerateExcel: () => void;
  onReset: () => void;
  isGeneratingPdf?: boolean;
  isGeneratingExcel?: boolean;
}

export const BoqSummary: React.FC<BoqSummaryProps> = ({
  items,
  onGeneratePdf,
  onGenerateExcel,
  onReset,
  isGeneratingPdf = false,
  isGeneratingExcel = false,
}) => {
  const summary = useMemo(() => calculateBoqSummary(items), [items]);
  const isAnyGenerating = isGeneratingPdf || isGeneratingExcel;

  // SVG Icons
  const PdfIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );

  const ExcelIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );

  return (
    <Card title="BOQ Summary">
      <div className="space-y-4">
        {/* Item Count */}
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-600">Total Items:</span>
          <span className="text-lg font-semibold text-gray-900">{summary.itemCount}</span>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Subtotal:</span>
          <span className="text-base font-medium text-gray-900">
            {formatCurrency(summary.subtotal)}
          </span>
        </div>

        {/* GST */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total GST:</span>
          <span className="text-base font-medium text-gray-900">
            {formatCurrency(summary.totalGst)}
          </span>
        </div>

        {/* Grand Total */}
        <div className="flex justify-between items-center pt-3 border-t-2 border-gray-300">
          <span className="text-base font-semibold text-gray-900">Grand Total:</span>
          <span className="text-2xl font-bold text-primary-700">
            {formatCurrency(summary.grandTotal)}
          </span>
        </div>

        {/* Export Actions */}
        <div className="space-y-2 pt-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Download BOQ
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="primary"
              size="md"
              onClick={onGeneratePdf}
              disabled={summary.itemCount === 0 || isAnyGenerating}
              loading={isGeneratingPdf}
              icon={PdfIcon}
              className="text-sm"
            >
              {isGeneratingPdf ? 'PDF...' : 'PDF'}
            </Button>
            
            <Button
              variant="success"
              size="md"
              onClick={onGenerateExcel}
              disabled={summary.itemCount === 0 || isAnyGenerating}
              loading={isGeneratingExcel}
              icon={ExcelIcon}
              className="text-sm"
            >
              {isGeneratingExcel ? 'Excel...' : 'Excel'}
            </Button>
          </div>

          <Button
            fullWidth
            variant="secondary"
            size="sm"
            onClick={onReset}
            disabled={isAnyGenerating}
          >
            Reset BOQ
          </Button>
        </div>

        {summary.itemCount === 0 && (
          <p className="text-xs text-gray-500 text-center mt-2">
            Add at least one item to generate BOQ
          </p>
        )}
      </div>
    </Card>
  );
};
