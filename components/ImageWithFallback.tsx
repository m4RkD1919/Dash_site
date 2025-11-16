import React, { useState } from 'react';
import { SoccerBallIcon } from './icons/Icons';

interface ImageWithFallbackProps {
  src?: string | null;
  alt: string;
  className: string;
}

const ImageWithFallback = ({ src, alt, className }: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(!src);

  if (hasError) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-200 dark:bg-gray-700`}>
        <SoccerBallIcon className="w-1/2 h-1/2 text-gray-400 dark:text-gray-500" />
      </div>
    );
  }

  return (
    <img
      src={src as string}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

export default ImageWithFallback;