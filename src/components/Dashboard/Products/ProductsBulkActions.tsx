'use client';

import BulkActions from './BulkActions';

interface ProductsBulkActionsProps {
  selectedCount: number;
  onDelete: () => void;
  bulkStatusLoading: boolean;
  bulkDeleteLoading: boolean;
  onStatusChange: (status: 'active' | 'inactive') => void;
}

/**
 * Wrapper component for bulk actions
 */
export default function ProductsBulkActions(props: ProductsBulkActionsProps) {
  return <BulkActions {...props} />;
}
