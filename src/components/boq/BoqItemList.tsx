import React from 'react';
import { Card } from '../common/Card';
import { EmptyState } from '../common/EmptyState';
import { BoqItemRow } from './BoqItemRow';
import { BoqItem } from '../../types/boq';

export interface BoqItemListProps {
  items: BoqItem[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export const BoqItemList: React.FC<BoqItemListProps> = ({
  items,
  onEdit,
  onDelete,
  onDuplicate,
}) => {
  if (items.length === 0) {
    return (
      <Card title="BOQ Items" subtitle="Added items will appear here">
        <EmptyState
          icon={
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
          title="No items added yet"
          description="Start by selecting a product and adding it to your BOQ. You can add as many items as needed."
        />
      </Card>
    );
  }

  return (
    <Card
      title="BOQ Items"
      subtitle={`${items.length} item${items.length !== 1 ? 's' : ''} added`}
    >
      <div className="space-y-4">
        {items.map((item, index) => (
          <BoqItemRow
            key={item.id}
            item={item}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
          />
        ))}
      </div>
    </Card>
  );
};
