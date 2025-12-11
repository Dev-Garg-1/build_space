import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CTABannerBlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
}

export const CTABannerBlock = ({ block, onUpdate, isPreview }: CTABannerBlockProps) => {
  const updateField = (field: string, value: string) => {
    onUpdate({ ...block.content, [field]: value });
  };

  return (
    <section className="py-12 px-6 bg-gradient-to-r from-primary to-primary/80">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          {isPreview ? (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                {block.content.headline}
              </h2>
              <p className="text-primary-foreground/80">
                {block.content.subtext}
              </p>
            </>
          ) : (
            <>
              <EditableText
                value={block.content.headline}
                onChange={(val) => updateField('headline', val)}
                className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2"
              />
              <EditableText
                value={block.content.subtext}
                onChange={(val) => updateField('subtext', val)}
                className="text-primary-foreground/80"
              />
            </>
          )}
        </div>
        
        <div className="flex gap-4">
          <Button 
            variant="secondary" 
            size="lg"
            className="group"
          >
            {isPreview ? (
              <span className="flex items-center gap-2">
                {block.content.buttonText}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <EditableText
                  value={block.content.buttonText}
                  onChange={(val) => updateField('buttonText', val)}
                  className="text-inherit"
                />
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
          
          {block.content.secondaryButtonText && (
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              {isPreview ? (
                block.content.secondaryButtonText
              ) : (
                <EditableText
                  value={block.content.secondaryButtonText}
                  onChange={(val) => updateField('secondaryButtonText', val)}
                  className="text-inherit"
                />
              )}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
