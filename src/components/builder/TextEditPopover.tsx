import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Trash2, Link, Type, Palette, ExternalLink } from 'lucide-react';

interface TextEditPopoverProps {
  children: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  onRemove?: () => void;
  link?: string;
  onLinkChange?: (link: string, openInNewTab: boolean) => void;
  openInNewTab?: boolean;
  color?: string;
  onColorChange?: (color: string) => void;
  fontStyle?: string;
  onFontStyleChange?: (style: string) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isPreview?: boolean;
}

const fontStyles = [
  { label: 'Normal', value: 'normal' },
  { label: 'Bold', value: 'bold' },
  { label: 'Italic', value: 'italic' },
  { label: 'Underline', value: 'underline' },
];

const colorPresets = [
  '#000000', '#ffffff', '#ef4444', '#f97316', '#eab308', 
  '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280'
];

export const TextEditPopover = ({
  children,
  value,
  onChange,
  onRemove,
  link = '',
  onLinkChange,
  openInNewTab = false,
  color,
  onColorChange,
  fontStyle = 'normal',
  onFontStyleChange,
  isOpen,
  onOpenChange,
  isPreview = false,
}: TextEditPopoverProps) => {
  const [editValue, setEditValue] = useState(value);
  const [linkValue, setLinkValue] = useState(link);
  const [newTabValue, setNewTabValue] = useState(openInNewTab);
  const [colorValue, setColorValue] = useState(color || '#000000');
  const [styleValue, setStyleValue] = useState(fontStyle);

  const handleSave = () => {
    onChange(editValue);
    if (onLinkChange) {
      onLinkChange(linkValue, newTabValue);
    }
    if (onColorChange) {
      onColorChange(colorValue);
    }
    if (onFontStyleChange) {
      onFontStyleChange(styleValue);
    }
    onOpenChange(false);
  };

  if (isPreview) {
    return <>{children}</>;
  }

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3 bg-popover border border-border shadow-lg" align="start">
        <div className="space-y-3">
          {/* Edit Text */}
          <div className="space-y-1.5">
            <Label className="text-xs flex items-center gap-1.5 text-muted-foreground">
              <Type className="w-3 h-3" />
              Edit Text
            </Label>
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="h-8 text-sm"
              placeholder="Enter text..."
            />
          </div>

          {/* Link */}
          {onLinkChange && (
            <div className="space-y-1.5">
              <Label className="text-xs flex items-center gap-1.5 text-muted-foreground">
                <Link className="w-3 h-3" />
                Add Link
              </Label>
              <Input
                value={linkValue}
                onChange={(e) => setLinkValue(e.target.value)}
                className="h-8 text-sm"
                placeholder="https://..."
              />
              <div className="flex items-center justify-between">
                <Label className="text-xs flex items-center gap-1.5 text-muted-foreground">
                  <ExternalLink className="w-3 h-3" />
                  Open in new tab
                </Label>
                <Switch
                  checked={newTabValue}
                  onCheckedChange={setNewTabValue}
                  className="scale-75"
                />
              </div>
            </div>
          )}

          {/* Color */}
          {onColorChange && (
            <div className="space-y-1.5">
              <Label className="text-xs flex items-center gap-1.5 text-muted-foreground">
                <Palette className="w-3 h-3" />
                Text Color
              </Label>
              <div className="flex gap-1 flex-wrap">
                {colorPresets.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColorValue(c)}
                    className={`w-5 h-5 rounded-full border-2 transition-all ${
                      colorValue === c ? 'border-primary scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
                <Input
                  type="color"
                  value={colorValue}
                  onChange={(e) => setColorValue(e.target.value)}
                  className="w-5 h-5 p-0 border-0 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Font Style */}
          {onFontStyleChange && (
            <div className="space-y-1.5">
              <Label className="text-xs flex items-center gap-1.5 text-muted-foreground">
                <Type className="w-3 h-3" />
                Font Style
              </Label>
              <div className="flex gap-1">
                {fontStyles.map((style) => (
                  <button
                    key={style.value}
                    onClick={() => setStyleValue(style.value)}
                    className={`px-2 py-1 text-xs rounded border transition-all ${
                      styleValue === style.value
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-muted text-muted-foreground border-border hover:bg-accent'
                    }`}
                    style={{
                      fontWeight: style.value === 'bold' ? 'bold' : 'normal',
                      fontStyle: style.value === 'italic' ? 'italic' : 'normal',
                      textDecoration: style.value === 'underline' ? 'underline' : 'none',
                    }}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            {onRemove && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onRemove();
                  onOpenChange(false);
                }}
                className="h-7 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Remove
              </Button>
            )}
            <div className="flex gap-1.5 ml-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-7 px-2 text-xs"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="h-7 px-3 text-xs"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
