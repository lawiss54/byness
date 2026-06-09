'use client';

import { useEffect } from 'react';

interface AutoDownloadProps {
  fileUrl: string; 
}

const AutoDownload: React.FC<AutoDownloadProps> = ({ fileUrl }) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!fileUrl) return;

    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', ''); // اسم الملف الافتراضي، يمكن تغييره
    link.setAttribute('target', '_blank'); // اختياري

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [fileUrl]);

  return null;
};

export default AutoDownload;
