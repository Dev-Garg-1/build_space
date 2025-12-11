import { ComponentBlock } from '@/types/builder';
import { EditableText } from '../EditableText';

interface TeamBlockProps {
  block: ComponentBlock;
  onUpdate: (content: Record<string, string>) => void;
  isPreview?: boolean;
}

export const TeamBlock = ({ block, onUpdate, isPreview }: TeamBlockProps) => {
  const updateField = (field: string, value: string) => {
    onUpdate({ ...block.content, [field]: value });
  };

  const teamMembers = [
    {
      name: block.content.member1Name,
      role: block.content.member1Role,
      bio: block.content.member1Bio,
      photo: block.content.member1Photo,
      nameKey: 'member1Name',
      roleKey: 'member1Role',
      bioKey: 'member1Bio',
      photoKey: 'member1Photo',
    },
    {
      name: block.content.member2Name,
      role: block.content.member2Role,
      bio: block.content.member2Bio,
      photo: block.content.member2Photo,
      nameKey: 'member2Name',
      roleKey: 'member2Role',
      bioKey: 'member2Bio',
      photoKey: 'member2Photo',
    },
    {
      name: block.content.member3Name,
      role: block.content.member3Role,
      bio: block.content.member3Bio,
      photo: block.content.member3Photo,
      nameKey: 'member3Name',
      roleKey: 'member3Role',
      bioKey: 'member3Bio',
      photoKey: 'member3Photo',
    },
  ];

  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {isPreview ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-4">{block.content.title}</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">{block.content.subtitle}</p>
          </>
        ) : (
          <>
            <EditableText
              value={block.content.title}
              onChange={(val) => updateField('title', val)}
              className="text-3xl font-bold text-center mb-4"
            />
            <EditableText
              value={block.content.subtitle}
              onChange={(val) => updateField('subtitle', val)}
              className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
            />
          </>
        )}
        
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="text-center group">
              <div className="relative mb-4 overflow-hidden rounded-xl">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                {!isPreview && (
                  <input
                    type="text"
                    value={member.photo}
                    onChange={(e) => updateField(member.photoKey, e.target.value)}
                    className="absolute bottom-2 left-2 right-2 bg-background/90 text-xs p-1 rounded border border-border"
                    placeholder="Photo URL"
                  />
                )}
              </div>
              {isPreview ? (
                <>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </>
              ) : (
                <>
                  <EditableText
                    value={member.name}
                    onChange={(val) => updateField(member.nameKey, val)}
                    className="text-xl font-semibold mb-1"
                  />
                  <EditableText
                    value={member.role}
                    onChange={(val) => updateField(member.roleKey, val)}
                    className="text-primary font-medium mb-2"
                  />
                  <EditableText
                    value={member.bio}
                    onChange={(val) => updateField(member.bioKey, val)}
                    className="text-muted-foreground text-sm"
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
