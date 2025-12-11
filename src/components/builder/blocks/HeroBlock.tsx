import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';

interface HeroBlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
}

export const HeroBlock = ({ block, onUpdate, isPreview }: HeroBlockProps) => {
  const { content } = block;

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  if (isPreview) {
    return (
      <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {content.headline}
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            {content.subheadline}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors">
              {content.buttonText}
            </button>
            <button className="px-8 py-3 border border-slate-500 hover:border-slate-400 text-slate-200 font-semibold rounded-lg transition-colors">
              {content.buttonSecondary}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <EditableText
          as="h1"
          value={content.headline}
          onChange={(v) => updateField('headline', v)}
          className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
        />
        <EditableText
          as="p"
          value={content.subheadline}
          onChange={(v) => updateField('subheadline', v)}
          className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto block"
        />
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors">
            <EditableText
              value={content.buttonText}
              onChange={(v) => updateField('buttonText', v)}
            />
          </button>
          <button className="px-8 py-3 border border-slate-500 hover:border-slate-400 text-slate-200 font-semibold rounded-lg transition-colors">
            <EditableText
              value={content.buttonSecondary}
              onChange={(v) => updateField('buttonSecondary', v)}
            />
          </button>
        </div>
      </div>
    </section>
  );
};
