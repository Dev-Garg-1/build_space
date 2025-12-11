import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';

interface CTABlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
}

export const CTABlock = ({ block, onUpdate, isPreview }: CTABlockProps) => {
  const { content } = block;

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  if (isPreview) {
    return (
      <section className="py-20 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">{content.headline}</h2>
          <p className="text-xl text-cyan-100 mb-8">{content.description}</p>
          <button className="px-8 py-4 bg-white text-cyan-700 font-semibold rounded-lg hover:bg-cyan-50 transition-colors shadow-lg">
            {content.buttonText}
          </button>
          <p className="mt-4 text-sm text-cyan-200">{content.note}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <EditableText
          as="h2"
          value={content.headline}
          onChange={(v) => updateField('headline', v)}
          className="text-4xl font-bold mb-4"
        />
        <EditableText
          as="p"
          value={content.description}
          onChange={(v) => updateField('description', v)}
          className="text-xl text-cyan-100 mb-8 block"
        />
        <button className="px-8 py-4 bg-white text-cyan-700 font-semibold rounded-lg hover:bg-cyan-50 transition-colors shadow-lg">
          <EditableText
            value={content.buttonText}
            onChange={(v) => updateField('buttonText', v)}
          />
        </button>
        <EditableText
          as="p"
          value={content.note}
          onChange={(v) => updateField('note', v)}
          className="mt-4 text-sm text-cyan-200 block"
        />
      </div>
    </section>
  );
};
