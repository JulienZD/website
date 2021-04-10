import { useState } from 'react';
import PopoverColorPicker from '@components/colors/PopoverColorPicker';

interface Props {
  onClose: (newColor: string) => void;
}

export default function ColorInput({ onClose }: Props) {
  const [color, setColor] = useState('#d49f1b');
  return <PopoverColorPicker color={color} onChange={setColor} onClose={() => onClose(color)} />;
}
