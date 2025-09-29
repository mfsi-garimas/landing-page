// components/SerialNumberField.tsx
import React from 'react';
import { useRecordContext, useListContext } from 'react-admin';

export const SerialNumberField: React.FC = () => {
  const record = useRecordContext();
  const { data, page = 1, perPage = 25 } = useListContext();

  if (!record || !data) return null;

  // Convert the record ids to an array to get index
  const ids = Object.keys(data);

  const index = ids.findIndex(id => id === String(record.id));

  // Compute the serial number with pagination offset
  const serial = index >= 0 ? index + 1 + (page - 1) * perPage : '-';

  return <span>{serial}</span>;
};
