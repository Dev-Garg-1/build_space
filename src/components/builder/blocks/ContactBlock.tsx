import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';

interface ContactBlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
}

export const ContactBlock = ({ block, onUpdate, isPreview }: ContactBlockProps) => {
  const { content } = block;

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  return (
    <section className="py-16 px-6 bg-slate-100">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          {isPreview ? (
            <>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">{content.title}</h2>
              <p className="text-slate-600">{content.subtitle}</p>
            </>
          ) : (
            <>
              <EditableText
                as="h2"
                value={content.title}
                onChange={(v) => updateField('title', v)}
                className="text-3xl font-bold text-slate-900 mb-2"
              />
              <EditableText
                as="p"
                value={content.subtitle}
                onChange={(v) => updateField('subtitle', v)}
                className="text-slate-600 block"
              />
            </>
          )}
        </div>
        <form className="space-y-4 bg-white p-8 rounded-2xl shadow-sm">
          <div>
            <input
              type="text"
              placeholder={content.namePlaceholder}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              disabled={isPreview}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder={content.emailPlaceholder}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              disabled={isPreview}
            />
          </div>
          <div>
            <textarea
              rows={4}
              placeholder={content.messagePlaceholder}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
              disabled={isPreview}
            />
          </div>
          <button
            type="button"
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors"
          >
            {isPreview ? content.buttonText : (
              <EditableText
                value={content.buttonText}
                onChange={(v) => updateField('buttonText', v)}
              />
            )}
          </button>
        </form>
      </div>
    </section>
  );
};
