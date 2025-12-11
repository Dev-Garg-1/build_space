import { ComponentBlock } from '@/types/builder';
import { X, Copy, Download, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  blocks: ComponentBlock[];
}

type ExportFormat = 'html' | 'json';

export const ExportModal = ({ isOpen, onClose, blocks }: ExportModalProps) => {
  const [format, setFormat] = useState<ExportFormat>('html');
  const [copied, setCopied] = useState(false);

  const generateHTML = () => {
    const htmlContent = blocks.map(block => {
      switch (block.type) {
        case 'hero':
          return `<section class="hero">
  <div class="container">
    <h1>${block.content.headline}</h1>
    <p>${block.content.subheadline}</p>
    <div class="buttons">
      <button class="btn-primary">${block.content.buttonText}</button>
      <button class="btn-secondary">${block.content.buttonSecondary}</button>
    </div>
  </div>
</section>`;
        case 'features':
          return `<section class="features">
  <div class="container">
    <h2>${block.content.title}</h2>
    <p>${block.content.subtitle}</p>
    <div class="features-grid">
      <div class="feature">
        <h3>${block.content.feature1Title}</h3>
        <p>${block.content.feature1Desc}</p>
      </div>
      <div class="feature">
        <h3>${block.content.feature2Title}</h3>
        <p>${block.content.feature2Desc}</p>
      </div>
      <div class="feature">
        <h3>${block.content.feature3Title}</h3>
        <p>${block.content.feature3Desc}</p>
      </div>
    </div>
  </div>
</section>`;
        case 'cta':
          return `<section class="cta">
  <div class="container">
    <h2>${block.content.headline}</h2>
    <p>${block.content.description}</p>
    <button class="btn-primary">${block.content.buttonText}</button>
    <small>${block.content.note}</small>
  </div>
</section>`;
        case 'contact':
          return `<section class="contact">
  <div class="container">
    <h2>${block.content.title}</h2>
    <p>${block.content.subtitle}</p>
    <form>
      <input type="text" placeholder="${block.content.namePlaceholder}" />
      <input type="email" placeholder="${block.content.emailPlaceholder}" />
      <textarea placeholder="${block.content.messagePlaceholder}"></textarea>
      <button type="submit">${block.content.buttonText}</button>
    </form>
  </div>
</section>`;
        default:
          return `<!-- ${block.type} section -->`;
      }
    }).join('\n\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Landing Page</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; line-height: 1.6; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
    .hero { padding: 5rem 0; background: linear-gradient(135deg, #1e293b, #334155); color: white; text-align: center; }
    .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
    .hero p { font-size: 1.25rem; opacity: 0.8; margin-bottom: 2rem; }
    .buttons { display: flex; gap: 1rem; justify-content: center; }
    .btn-primary { padding: 0.75rem 2rem; background: #06b6d4; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; }
    .btn-secondary { padding: 0.75rem 2rem; background: transparent; border: 1px solid #64748b; border-radius: 0.5rem; color: white; cursor: pointer; }
    .features { padding: 4rem 0; background: #f8fafc; }
    .features h2 { text-align: center; font-size: 2rem; margin-bottom: 0.5rem; }
    .features > .container > p { text-align: center; color: #64748b; margin-bottom: 3rem; }
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
    .feature { padding: 1.5rem; background: white; border-radius: 0.75rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .feature h3 { margin-bottom: 0.5rem; }
    .feature p { color: #64748b; }
    .cta { padding: 5rem 0; background: linear-gradient(135deg, #0891b2, #2563eb); color: white; text-align: center; }
    .cta h2 { font-size: 2.5rem; margin-bottom: 1rem; }
    .cta p { font-size: 1.25rem; opacity: 0.9; margin-bottom: 2rem; }
    .cta small { display: block; margin-top: 1rem; opacity: 0.7; }
    .contact { padding: 4rem 0; background: #f1f5f9; }
    .contact h2 { text-align: center; font-size: 2rem; margin-bottom: 0.5rem; }
    .contact > .container > p { text-align: center; color: #64748b; margin-bottom: 2rem; }
    .contact form { max-width: 500px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; }
    .contact input, .contact textarea { padding: 0.75rem 1rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; font-size: 1rem; }
    .contact textarea { min-height: 120px; resize: vertical; }
    .contact button { padding: 0.75rem; background: #0891b2; color: white; border: none; border-radius: 0.5rem; font-weight: 600; cursor: pointer; }
  </style>
</head>
<body>
${htmlContent}
</body>
</html>`;
  };

  const generateJSON = () => {
    return JSON.stringify({ version: '1.0', blocks }, null, 2);
  };

  const output = format === 'html' ? generateHTML() : generateJSON();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: format === 'html' ? 'text/html' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `layout.${format}`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded layout.${format}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl bg-card rounded-xl border border-border shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">Export Layout</h2>
                <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
                  <button
                    onClick={() => setFormat('html')}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      format === 'html'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    HTML
                  </button>
                  <button
                    onClick={() => setFormat('json')}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      format === 'json'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    JSON
                  </button>
                </div>
              </div>
              <button
                onClick={onClose}
                className="toolbar-button hover:bg-destructive/20 hover:text-destructive"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Code */}
            <div className="p-4 max-h-[60vh] overflow-auto">
              <pre className="p-4 bg-background rounded-lg text-sm font-mono overflow-x-auto">
                <code className="text-foreground/80">{output}</code>
              </pre>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/30">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-muted transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button onClick={handleDownload} className="export-button flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
