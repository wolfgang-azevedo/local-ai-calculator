// src/App.jsx
import React from 'react';
import { ThemeProvider, useTheme } from './components/theme-provider';
import { I18nProvider, useI18n } from './lib/i18n/i18n-context';
import { LanguageSelector } from './components/language-selector';
import AIResourceCalculator from './components/AIResourceCalculator';
import { ResourceProvider } from './components/resource-manager';
import Footer from './components/Footer';
import './styles/globals.css';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
    >
      {t(`theme.${theme}`)}
    </button>
  );
};

const AppContent = () => {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t('app.title')}</h1>
              <p className="text-muted-foreground">
                {t('app.subtitle')}
              </p>
            </div>
            <div className="flex gap-4">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
          <AIResourceCalculator />
        </div>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <I18nProvider defaultLanguage="pt">
        <ResourceProvider>
          <AppContent />
        </ResourceProvider>
      </I18nProvider>
    </ThemeProvider>
  );
};

export default App;