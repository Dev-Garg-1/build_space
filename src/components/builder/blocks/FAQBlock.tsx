import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQBlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
}

export const FAQBlock = ({ block, onUpdate, isPreview }: FAQBlockProps) => {
  const { content } = block;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  const faqs = [
    { qKey: 'q1', aKey: 'a1' },
    { qKey: 'q2', aKey: 'a2' },
    { qKey: 'q3', aKey: 'a3' },
  ];

  return (
    <section className="py-16 px-6 bg-slate-50">
      <div className="max-w-3xl mx-auto">
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
        <div className="space-y-4">
          {faqs.map(({ qKey, aKey }, index) => (
            <div key={qKey} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                {isPreview ? (
                  <span className="font-medium text-slate-900">{content[qKey]}</span>
                ) : (
                  <EditableText
                    value={content[qKey]}
                    onChange={(v) => updateField(qKey, v)}
                    className="font-medium text-slate-900"
                  />
                )}
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  {isPreview ? (
                    <p className="text-slate-600">{content[aKey]}</p>
                  ) : (
                    <EditableText
                      as="p"
                      value={content[aKey]}
                      onChange={(v) => updateField(aKey, v)}
                      className="text-slate-600 block"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
