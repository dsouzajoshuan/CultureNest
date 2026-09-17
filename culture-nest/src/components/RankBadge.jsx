import React from 'react';

export default function RankBadge({ rank }) {
  const getBadgeStyle = () => {
    switch (rank) {
      case 'Leader':
        return 'bg-primary text-dark';
      case 'Co-Leader':
        return 'bg-info text-dark';
      case 'Elder':
        return 'bg-warning text-dark';
      default:
        return 'bg-secondary text-white';
    }
  };

  return (
    <span className={`badge ${getBadgeStyle()} px-2.5 py-1 text-xs font-semibold rounded-pill`}>
      {rank}
    </span>
  );
}
