import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { ProductSelector } from './ProductSelector';
import { Product } from '../../types/product';
import { BoqItem } from '../../types/boq';
import { units } from '../../data/units';
import { validateBoqItem } from '../../utils/validation';

const GST_OPTIONS = [
  { value: '0', label: '0%' },
  { value: '5', label: '5%' },
  { value: '12', label: '12%' },
  { value: '18', label: '18%' },
  { value: '28', label: '28%' },
];

export interface ProductBuilderFormProps {
  onAdd: (item: Partial<BoqItem>) => void;
  onUpdate?: (id: string, item: Partial<BoqItem>) => void;
  onCancel?: () => void;
  editingItem?: Partial<BoqItem> | null;
  isEditing?: boolean;
}

export const ProductBuilderForm: React.FC<ProductBuilderFormProps> = ({
  onAdd,
  onUpdate,
  onCancel,
  editingItem,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<Partial<BoqItem>>({
    productId: '',
    itemName: '',
    description: '',
    quantity: 1,
    unit: 'Nos',
    unitRate: 0,
    gstPercentage: 18,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDescription, setShowDescription] = useState(false);

  // Load editing item
  useEffect(() => {
    if (isEditing && editingItem) {
      setFormData(editingItem);
      setShowDescription(true);
    } else {
      resetForm();
    }
  }, [isEditing, editingItem]);

  const resetForm = () => {
    setFormData({
      productId: '',
      itemName: '',
      description: '',
      quantity: 1,
      unit: 'Nos',
      unitRate: 0,
      gstPercentage: 18,
    });
    setErrors({});
    setShowDescription(false);
  };

  const handleProductSelect = (product: Product | null) => {
    if (product) {
      setFormData({
        ...formData,
        productId: product.id,
        itemName: product.name,
        description: product.description,
        unit: product.defaultUnit,
        unitRate: product.defaultRate,
        gstPercentage: product.gstPercentage,
      });
      setShowDescription(true);
    } else {
      setFormData({
        ...formData,
        productId: '',
        itemName: '',
        description: '',
        unit: 'Nos',
        unitRate: 0,
        gstPercentage: 18,
      });
      setShowDescription(false);
    }
    setErrors({});
  };

  const handleChange = (field: keyof BoqItem) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [field]:
        field === 'quantity' || field === 'unitRate' || field === 'gstPercentage'
          ? parseFloat(value) || 0
          : value,
    });
    // Clear error for this field
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateBoqItem(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (isEditing && editingItem?.id && onUpdate) {
      onUpdate(editingItem.id, formData);
    } else {
      onAdd(formData);
    }

    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    if (onCancel) {
      onCancel();
    }
  };

  const unitOptions = units.map((unit) => ({ value: unit, label: unit }));

  return (
    <Card
      title={isEditing ? 'Edit BOQ Item' : 'Add BOQ Item'}
      subtitle="Select a product and specify quantity"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Selection */}
        <ProductSelector
          value={formData.productId || ''}
          onChange={handleProductSelect}
          error={errors.product}
        />

        {/* Show description if product selected */}
        {showDescription && formData.description && (
          <div>
            <button
              type="button"
              onClick={() => setShowDescription(!showDescription)}
              className="text-sm font-medium text-primary-600 hover:text-primary-700 focus:outline-none"
            >
              {showDescription ? '▼ Hide' : '▶ View'} Specification
            </button>
            {showDescription && (
              <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={handleChange('description')}
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                  placeholder="Product description and specifications"
                />
                <p className="mt-1 text-xs text-gray-500">
                  You can modify the description for this BOQ item
                </p>
              </div>
            )}
          </div>
        )}

        {/* Quantity and Unit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Quantity"
            type="number"
            min="0.01"
            step="0.01"
            value={formData.quantity || ''}
            onChange={handleChange('quantity')}
            error={errors.quantity}
            required
          />
          <Select
            label="Unit"
            value={formData.unit || 'Nos'}
            onChange={handleChange('unit')}
            options={unitOptions}
            error={errors.unit}
            required
          />
        </div>

        {/* Rate and GST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Unit Rate (₹)"
            type="number"
            min="0"
            step="0.01"
            value={formData.unitRate || ''}
            onChange={handleChange('unitRate')}
            error={errors.unitRate}
            required
          />
          <Select
            label="GST (%)"
            value={String(formData.gstPercentage || 18)}
            onChange={handleChange('gstPercentage')}
            options={GST_OPTIONS}
            error={errors.gstPercentage}
            required
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          {isEditing && (
            <Button type="button" variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" variant="primary">
            {isEditing ? 'Update Item' : '+ Add Item'}
          </Button>
        </div>
      </form>
    </Card>
  );
};
