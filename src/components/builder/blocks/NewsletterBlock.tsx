import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

interface NewsletterBlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
}

export const NewsletterBlock = ({ block, onUpdate, isPreview }: NewsletterBlockProps) => {
  const updateField = (field: string, value: string) => {
    onUpdate({ ...block.content, [field]: value });
  };

  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        
        {isPreview ? (
          <>
            <h2 className="text-3xl font-bold mb-4">{block.content.title}</h2>
            <p className="text-muted-foreground mb-8">{block.content.subtitle}</p>
          </>
        ) : (
          <>
            <EditableText
              value={block.content.title}
              onChange={(val) => updateField('title', val)}
              className="text-3xl font-bold mb-4"
            />
            <EditableText
              value={block.content.subtitle}
              onChange={(val) => updateField('subtitle', val)}
              className="text-muted-foreground mb-8"
            />
          </>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder={block.content.placeholder}
            className="flex-1"
            disabled={isPreview}
          />
          <Button className="whitespace-nowrap">
            {isPreview ? (
              block.content.buttonText
            ) : (
              <EditableText
                value={block.content.buttonText}
                onChange={(val) => updateField('buttonText', val)}
                className="text-inherit"
              />
            )}
          </Button>
        </div>
        
        {isPreview ? (
          <p className="text-xs text-muted-foreground mt-4">{block.content.disclaimer}</p>
        ) : (
          <EditableText
            value={block.content.disclaimer}
            onChange={(val) => updateField('disclaimer', val)}
            className="text-xs text-muted-foreground mt-4"
          />
        )}
      </div>
    </section>
  );
};
