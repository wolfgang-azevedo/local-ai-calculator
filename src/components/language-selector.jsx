// src/components/language-selector.jsx
import React from 'react';
import { Button } from './ui/button';
import { useI18n } from '@/lib/i18n/i18n-context';
import { BrazilFlag, USAFlag } from './ui/flags';

export function LanguageSelector() {
  const { language, setLanguage } = useI18n();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
      className="w-28 flex items-center justify-center gap-2 transition-all hover:scale-105"
    >
      {language === 'en' ? (
        <>
          <BrazilFlag />
          <span>PT-BR</span>
        </>
      ) : (
        <>
          <USAFlag />
          <span>EN-US</span>
        </>
      )}
    </Button>
  );
}