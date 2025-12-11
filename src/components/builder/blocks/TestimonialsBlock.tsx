import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';
import { Quote } from 'lucide-react';

interface TestimonialsBlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
}

export const TestimonialsBlock = ({ block, onUpdate, isPreview }: TestimonialsBlockProps) => {
  const { content } = block;

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  const testimonials = [
    { quoteKey: 'quote1', authorKey: 'author1', roleKey: 'role1' },
    { quoteKey: 'quote2', authorKey: 'author2', roleKey: 'role2' },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {isPreview ? (
            <h2 className="text-3xl font-bold text-slate-900">{content.title}</h2>
          ) : (
            <EditableText
              as="h2"
              value={content.title}
              onChange={(v) => updateField('title', v)}
              className="text-3xl font-bold text-slate-900"
            />
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map(({ quoteKey, authorKey, roleKey }) => (
            <div key={quoteKey} className="p-8 bg-slate-50 rounded-2xl relative">
              <Quote className="w-10 h-10 text-cyan-500/30 absolute top-6 left-6" />
              <div className="pt-8">
                {isPreview ? (
                  <>
                    <p className="text-lg text-slate-700 mb-6 italic">{content[quoteKey]}</p>
                    <div>
                      <p className="font-semibold text-slate-900">{content[authorKey]}</p>
                      <p className="text-sm text-slate-500">{content[roleKey]}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <EditableText
                      as="p"
                      value={content[quoteKey]}
                      onChange={(v) => updateField(quoteKey, v)}
                      className="text-lg text-slate-700 mb-6 italic block"
                    />
                    <div>
                      <EditableText
                        as="p"
                        value={content[authorKey]}
                        onChange={(v) => updateField(authorKey, v)}
                        className="font-semibold text-slate-900 block"
                      />
                      <EditableText
                        as="p"
                        value={content[roleKey]}
                        onChange={(v) => updateField(roleKey, v)}
                        className="text-sm text-slate-500 block"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
