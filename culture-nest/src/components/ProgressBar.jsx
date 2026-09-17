import React from 'react';

export default function ProgressBar({ progress, label, variant = 'primary' }) {
  return (
    <div className="w-100">
      {label && (
        <div className="d-flex justify-content-between mb-1 small font-weight-bold">
          <span>{label}</span>
          <span>{progress}%</span>
        </div>
      )}
      <div className="progress" style={{ height: '8px', borderRadius: '4px' }}>
        <div
          className={`progress-bar bg-${variant}`}
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
}
