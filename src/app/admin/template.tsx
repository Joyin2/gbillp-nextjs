import { ReactNode } from 'react';

export default function AdminTemplate({ children }: { children: ReactNode }) {
  return (
    <div className="admin-template">
      {children}
    </div>
  );
} 