import { useState, useEffect } from 'react';
import contentData from '../data/content.json';

type ContentData = typeof contentData;

export const useContent = () => {
  const [content, setContent] = useState<ContentData>(contentData);
  const [loading, setLoading] = useState(false);

  // En el futuro podríamos cargar desde una API
  useEffect(() => {
    setContent(contentData);
  }, []);

  const updateContent = (section: keyof ContentData, data: any) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  return {
    content,
    loading,
    updateContent
  };
};
