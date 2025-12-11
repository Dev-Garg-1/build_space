import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';

interface BlogBlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
}

export const BlogBlock = ({ block, onUpdate, isPreview }: BlogBlockProps) => {
  const updateField = (field: string, value: string) => {
    onUpdate({ ...block.content, [field]: value });
  };

  return (
    <section className="py-16 px-6 bg-background">
      <article className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
        {isPreview ? (
          <>
            <h1 className="text-4xl font-bold mb-4 text-foreground">{block.content.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground mb-8">
              <span>{block.content.author}</span>
              <span>•</span>
              <span>{block.content.date}</span>
            </div>
            {block.content.featuredImage && (
              <img
                src={block.content.featuredImage}
                alt={block.content.title}
                className="w-full h-64 object-cover rounded-xl mb-8"
              />
            )}
            <p className="text-xl text-muted-foreground mb-6 font-medium">{block.content.excerpt}</p>
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">{block.content.heading1}</h2>
            <p className="text-foreground/80 mb-6 whitespace-pre-line">{block.content.paragraph1}</p>
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">{block.content.heading2}</h2>
            <p className="text-foreground/80 mb-6 whitespace-pre-line">{block.content.paragraph2}</p>
          </>
        ) : (
          <>
            <EditableText
              value={block.content.title}
              onChange={(val) => updateField('title', val)}
              className="text-4xl font-bold mb-4 text-foreground"
            />
            <div className="flex items-center gap-4 text-muted-foreground mb-4">
              <EditableText
                value={block.content.author}
                onChange={(val) => updateField('author', val)}
                className="inline"
              />
              <span>•</span>
              <EditableText
                value={block.content.date}
                onChange={(val) => updateField('date', val)}
                className="inline"
              />
            </div>
            <div className="mb-8">
              <input
                type="text"
                value={block.content.featuredImage || ''}
                onChange={(e) => updateField('featuredImage', e.target.value)}
                className="w-full bg-muted/50 text-sm p-2 rounded border border-border mb-2"
                placeholder="Featured image URL"
              />
              {block.content.featuredImage && (
                <img
                  src={block.content.featuredImage}
                  alt={block.content.title}
                  className="w-full h-64 object-cover rounded-xl"
                />
              )}
            </div>
            <EditableText
              value={block.content.excerpt}
              onChange={(val) => updateField('excerpt', val)}
              className="text-xl text-muted-foreground mb-6 font-medium"
            />
            <EditableText
              value={block.content.heading1}
              onChange={(val) => updateField('heading1', val)}
              className="text-2xl font-semibold mt-8 mb-4 text-foreground"
            />
            <textarea
              value={block.content.paragraph1}
              onChange={(e) => updateField('paragraph1', e.target.value)}
              className="w-full bg-transparent text-foreground/80 mb-6 resize-none min-h-[100px] focus:outline-none focus:ring-1 focus:ring-primary rounded p-2"
              placeholder="Write your first paragraph..."
            />
            <EditableText
              value={block.content.heading2}
              onChange={(val) => updateField('heading2', val)}
              className="text-2xl font-semibold mt-8 mb-4 text-foreground"
            />
            <textarea
              value={block.content.paragraph2}
              onChange={(e) => updateField('paragraph2', e.target.value)}
              className="w-full bg-transparent text-foreground/80 mb-6 resize-none min-h-[100px] focus:outline-none focus:ring-1 focus:ring-primary rounded p-2"
              placeholder="Write your second paragraph..."
            />
          </>
        )}
      </article>
    </section>
  );
};
