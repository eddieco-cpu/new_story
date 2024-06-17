import React, { ReactNode } from 'react';

const env = process.env.NODE_ENV;

type PageDevNameProps = {
  children: ReactNode;
  className?: string;
};

const PageNameInDev: React.FC<PageDevNameProps> = ({ children, className }) => {
  if (env === 'production') {
    return null;
  } else {
    return <p className={` fixed bottom-6 left-6 inline-block text-center text-xl p-2 rounded-md ring-1 ring-gray-500 bg-gray-50 ${className || ''}`}>{children}</p>;
  }
};

export default PageNameInDev;
