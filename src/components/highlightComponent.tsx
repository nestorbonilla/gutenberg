/* This example requires Tailwind CSS v2.0+ */
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import Moralis from 'moralis';
import { useEffect, useState } from 'react';
import { Highlight } from './rightSlider';

interface HighlightComponentProps {
  highlight: Highlight;
  select: (cfiRange: string) => void;
  delete: (cfiRange: string, id: string) => void;
  color?: string;
}

export default function HighlightComponent(props: HighlightComponentProps) {
  const [note, setNote] = useState("");
  const [editNote, setEditNote] = useState(false);
  const MoralisHighlight = Moralis.Object.extend("Highlight");
  const [highlight, setHighlight] = useState<any>();

  useEffect(() => {
    new Moralis.Query(MoralisHighlight).get(props.highlight.objectId).then(setHighlight);
  });

  async function deleteNote() {
    highlight.unset("note");
    await highlight.save();
    setNote("");
    setEditNote(false);
  }

  async function saveNote() {
    highlight.set("note", note);
    await highlight.save();
    setEditNote(false);
  }

  return (
    <li key={props.highlight.objectId}>
      <div className="flex">
        <button className="relative group py-3 px-5 flex-1" onClick={() => props.select(props.highlight.cfiRange)}>
          <div className="absolute inset-0 group-hover:bg-gray-100" aria-hidden="true" />
          <div className="flex-1 flex min-w-0 relative border-l-4" style={{ borderColor: props.color || "#fff59d"}}>
            <div className="ml-4">
              <p className="text-sm text-gray-900 text-left">{props.highlight.text}</p>
            </div>
          </div>
        </button>
        <div>
          <button
            className="relative group py-3 px-5 flex self-stretch items-center justify-center"
            onClick={() => setEditNote(true)}>
            <div className="absolute inset-0 group-hover:bg-gray-100" aria-hidden="true" />
            <PencilAltIcon
              className="w-5 text-gray-400 group-hover:text-gray-500 justify-content-stretch z-50"
              aria-hidden="true"
            />
          </button>
          <button
            className="relative group py-3 px-5 flex self-stretch items-center justify-center"
            onClick={() => props.delete(props.highlight.cfiRange, props.highlight.objectId)}>
            <div className="absolute inset-0 group-hover:bg-gray-100" aria-hidden="true" />
            <TrashIcon
              className="w-5 text-gray-400 group-hover:text-gray-500 justify-content-stretch z-50"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
      <div className="mt-1 mb-3 mx-4">
        {editNote && <div>
          <input 
            className="appearance-none border w-full py-2 px-3 text-sm text-gray-700 focus:outline-none focus:shadow-outline" 
            type="text" 
            value={note} 
            onChange={e => setNote(e.target.value)}
            />
          <div className="flex my-2">
            <button className="py-1 px-4 mx-2 border text-sm hover:bg-gray-100 ml-auto" onClick={deleteNote}>
              Delete
            </button>
            <button className="py-1 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm" onClick={saveNote}>
              Save
            </button>
          </div>
        </div>}
        {!editNote && note && <div className="text-sm">{note}</div>}
      </div>
    </li>
  );
}
