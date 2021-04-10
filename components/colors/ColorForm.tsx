import ColorInput from '@components/form/ColorInput';
import { ChangeEvent } from 'react';

interface Props {
  colors: string;
  onColorChange: (value: string) => void;
}

export default function ColorForm({ colors, onColorChange }: Props) {
  const handleColorTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => onColorChange(e.target.value);
  const handleColorInputChange = (newColor: string) => {
    if (!colors.includes(newColor)) onColorChange(colors.concat(`\n${newColor}`));
  };
  return (
    <form className="form w-48 mt-3" onSubmit={(e) => e.preventDefault()}>
      <ColorInput onClose={handleColorInputChange} />
      <div className="form-group">
        <label className="mb-1" htmlFor="colorInput">
          Colors (newline separated)
        </label>
        <textarea
          id="colorInput"
          name="colors"
          value={colors}
          onChange={handleColorTextChange}
          className="resize-none"
          rows={10}
          cols={5}
        />
      </div>
    </form>
  );
}
