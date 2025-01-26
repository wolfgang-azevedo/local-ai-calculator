import React from 'react';
import { useI18n } from '@/lib/i18n/i18n-context';
import { Github } from 'lucide-react';

const Footer = () => {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            <p>© {currentYear} Local AI Model Calculator. MIT License.</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-sm text-muted-foreground">
              Built with{' '}
              <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                React
              </a>
              ,{' '}
              <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                Tailwind
              </a>
              ,{' '}
              <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                shadcn/ui
              </a>
            </div>
            
            <a
              href="https://github.com/wolfgang-azevedo/local-ai-calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={20} />
              <span className="text-sm">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;