import React from 'react';

export default function StatusBadge({ status }) {
  const getStatusStyle = () => {
    switch (status) {
      case 'Verified':
        return 'bg-success text-white';
      case 'Observation Period':
        return 'bg-warning text-dark';
      case 'Under Review':
        return 'bg-info text-dark';
      case 'Expired':
        return 'bg-danger text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  return (
    <span className={`badge ${getStatusStyle()} px-2.5 py-1 text-xs font-semibold rounded-pill`}>
      {status}
    </span>
  );
}
