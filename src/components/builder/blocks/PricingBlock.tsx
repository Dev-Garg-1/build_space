import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';
import { Check } from 'lucide-react';

interface PricingBlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
}

export const PricingBlock = ({ block, onUpdate, isPreview }: PricingBlockProps) => {
  const { content } = block;

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  const plans = [
    { 
      nameKey: 'plan1Name', 
      priceKey: 'plan1Price', 
      featuresKey: 'plan1Features',
      highlighted: false 
    },
    { 
      nameKey: 'plan2Name', 
      priceKey: 'plan2Price', 
      featuresKey: 'plan2Features',
      badgeKey: 'plan2Badge',
      highlighted: true 
    },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          {isPreview ? (
            <>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{content.title}</h2>
              <p className="text-lg text-slate-600">{content.subtitle}</p>
            </>
          ) : (
            <>
              <EditableText
                as="h2"
                value={content.title}
                onChange={(v) => updateField('title', v)}
                className="text-3xl font-bold text-slate-900 mb-4"
              />
              <EditableText
                as="p"
                value={content.subtitle}
                onChange={(v) => updateField('subtitle', v)}
                className="text-lg text-slate-600 block"
              />
            </>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {plans.map(({ nameKey, priceKey, featuresKey, badgeKey, highlighted }) => (
            <div
              key={nameKey}
              className={`p-8 rounded-2xl border-2 relative ${
                highlighted
                  ? 'border-cyan-500 bg-cyan-50/50'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {badgeKey && content[badgeKey] && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 text-white text-sm font-medium rounded-full">
                  {content[badgeKey]}
                </span>
              )}
              <div className="text-center mb-6">
                {isPreview ? (
                  <>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{content[nameKey]}</h3>
                    <div className="text-4xl font-bold text-slate-900">
                      {content[priceKey]}
                      <span className="text-lg font-normal text-slate-500">/mo</span>
                    </div>
                  </>
                ) : (
                  <>
                    <EditableText
                      as="h3"
                      value={content[nameKey]}
                      onChange={(v) => updateField(nameKey, v)}
                      className="text-xl font-semibold text-slate-900 mb-2"
                    />
                    <div className="text-4xl font-bold text-slate-900">
                      <EditableText
                        value={content[priceKey]}
                        onChange={(v) => updateField(priceKey, v)}
                      />
                      <span className="text-lg font-normal text-slate-500">/mo</span>
                    </div>
                  </>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {content[featuresKey]?.split(', ').map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-600">
                    <Check className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  highlighted
                    ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
