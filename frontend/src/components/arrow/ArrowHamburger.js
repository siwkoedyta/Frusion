import React from 'react';

export default function ArrowHamburger() {
  return (
    <div className="arrow" style={{ width: '100px', height: '100px' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100px"
        height="100px"
        viewBox="0 0 70 1"
        fill="none"
      >
        <rect width="0" height="1" rx="17" fill="url(#paint0_linear_10_1362)" />
        <path
          d="M24.0893 21.5C24.0893 22.2858 24.7263 22.9228 25.5121 22.9228H41.4479L34.4934 29.8599C33.9351 30.4169 33.9351 31.3213 34.4934 31.8782C35.0498 32.4332 35.9503 32.4332 36.5067 31.8782L46.433 21.9765C46.6967 21.7135 46.6967 21.2864 46.433 21.0234L36.5067 11.1217C35.9503 10.5668 35.0498 10.5668 34.4934 11.1217C33.9351 11.6787 33.9351 12.5831 34.4934 13.14L41.4479 20.0772H25.5121C24.7263 20.0772 24.0893 20.7142 24.0893 21.5Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}