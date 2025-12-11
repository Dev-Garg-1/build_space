import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';
import { Zap, Smartphone, MousePointer } from 'lucide-react';

interface FeaturesBlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
}

export const FeaturesBlock = ({ block, onUpdate, isPreview }: FeaturesBlockProps) => {
  const { content } = block;

  const updateField = (field: string, value: string) => {
    onUpdate({ ...content, [field]: value });
  };

  const features = [
    { icon: Zap, titleKey: 'feature1Title', descKey: 'feature1Desc' },
    { icon: Smartphone, titleKey: 'feature2Title', descKey: 'feature2Desc' },
    { icon: MousePointer, titleKey: 'feature3Title', descKey: 'feature3Desc' },
  ];

  const FeatureCard = ({ icon: Icon, titleKey, descKey }: { icon: typeof Zap; titleKey: string; descKey: string }) => (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-cyan-600" />
      </div>
      {isPreview ? (
        <>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{content[titleKey]}</h3>
          <p className="text-slate-600">{content[descKey]}</p>
        </>
      ) : (
        <>
          <EditableText
            as="h3"
            value={content[titleKey]}
            onChange={(v) => updateField(titleKey, v)}
            className="text-lg font-semibold text-slate-900 mb-2"
          />
          <EditableText
            as="p"
            value={content[descKey]}
            onChange={(v) => updateField(descKey, v)}
            className="text-slate-600 block"
          />
        </>
      )}
    </div>
  );

  return (
    <section className="py-16 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {isPreview ? (
            <>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{content.title}</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">{content.subtitle}</p>
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
                className="text-lg text-slate-600 max-w-2xl mx-auto block"
              />
            </>
          )}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.titleKey} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
