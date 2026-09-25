import React, { useState, useMemo } from 'react';
import { Product } from '../../types/product';
import { getActiveProducts } from '../../data/products';

export interface ProductSelectorProps {
  value: string;
  onChange: (product: Product | null) => void;
  error?: string;
  label?: string;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({
  value,
  onChange,
  error,
  label = 'Select Product',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const products = getActiveProducts();

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    const term = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  const selectedProduct = products.find((p) => p.id === value);

  const handleSelect = (product: Product) => {
    onChange(product);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    onChange(null);
    setSearchTerm('');
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        <span className="text-red-500 ml-1">*</span>
      </label>

      <div className="relative">
        {/* Selected Product Display or Search Input */}
        {!isOpen && selectedProduct ? (
          <div className="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {selectedProduct.name}
              </div>
              {selectedProduct.category && (
                <div className="text-xs text-gray-500">{selectedProduct.category}</div>
              )}
            </div>
            <div className="flex items-center space-x-2 ml-2">
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Clear selection"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Change selection"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        )}

        {/* Dropdown List */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Options */}
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-96 overflow-auto">
              {filteredProducts.length > 0 ? (
                <ul className="py-1">
                  {filteredProducts.map((product) => (
                    <li key={product.id}>
                      <button
                        type="button"
                        onClick={() => handleSelect(product)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors"
                      >
                        <div className="font-medium text-gray-900">
                          {product.name}
                        </div>
                        {product.category && (
                          <div className="text-xs text-gray-500 mt-0.5">
                            {product.category}
                          </div>
                        )}
                        <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {product.description.substring(0, 120)}
                          {product.description.length > 120 && '...'}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-8 text-center text-sm text-gray-500">
                  No products found matching "{searchTerm}"
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
