// import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import dynamic from 'next/dynamic';
// import { useState } from 'react';

// export default function MdEdior() {
//   const [text, setText] = useState('# Hello Editor');
//   return <MdEditor modelValue={text} onChange={setText} />;
// };

export const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
    ssr: false,
});