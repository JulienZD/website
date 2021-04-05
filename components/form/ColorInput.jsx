import { useState } from 'react';
import PopoverColorPicker from '@components/colors/PopoverColorPicker';

export default function ColorInput({ onClose }) {
  const [color, setColor] = useState('#d49f1b');
  return <PopoverColorPicker color={color} onChange={setColor} onClose={() => onClose(color)} />;
}
