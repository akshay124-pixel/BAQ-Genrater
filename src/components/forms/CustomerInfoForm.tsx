import React from 'react';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { BoqHeader } from '../../types/boq';

export interface CustomerInfoFormProps {
  header: BoqHeader;
  onChange: (data: Partial<BoqHeader>) => void;
  errors?: Record<string, string>;
}

export const CustomerInfoForm: React.FC<CustomerInfoFormProps> = ({
  header,
  onChange,
  errors = {},
}) => {
  const handleChange = (field: keyof BoqHeader) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({ [field]: e.target.value });
  };

  return (
    <Card title="Customer & Project Information" subtitle="Enter client and project details">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Client Name"
          placeholder="Enter client name"
          value={header.clientName}
          onChange={handleChange('clientName')}
          error={errors.clientName}
          required
        />
        <Input
          label="Project Detail"
          placeholder="Enter project name/description"
          value={header.projectDetail}
          onChange={handleChange('projectDetail')}
          error={errors.projectDetail}
          required
        />
        <Input
          label="Location"
          placeholder="Enter project location"
          value={header.location}
          onChange={handleChange('location')}
          error={errors.location}
          required
        />
        <Input
          label="Sales Person"
          placeholder="Enter sales person name"
          value={header.salesPerson}
          onChange={handleChange('salesPerson')}
          error={errors.salesPerson}
          required
        />
        <Input
          label="Date"
          type="date"
          value={header.date}
          onChange={handleChange('date')}
          error={errors.date}
          required
        />
        <Input
          label="Version"
          placeholder="e.g., v1.0"
          value={header.version}
          onChange={handleChange('version')}
          error={errors.version}
        />
        <div className="md:col-span-2">
          <Input
            label="Subject"
            placeholder="Enter quotation subject"
            value={header.subject}
            onChange={handleChange('subject')}
            error={errors.subject}
            required
          />
        </div>
      </div>
    </Card>
  );
};
