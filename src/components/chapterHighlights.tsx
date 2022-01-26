/* This example requires Tailwind CSS v2.0+ */
import { TrashIcon } from '@heroicons/react/outline';
import { Highlight } from './rightSlider';

interface ChapterHighlightProps {
  chapterLabel: string,
  highlights: Highlight[];
  select: (cfiRange: string) => void;
  delete: (cfiRange: string, id: string) => void;
}

export default function ChapterHighlights(props: ChapterHighlightProps) {
  return (
    <li>
      <div className="pt-4 pb-2 px-5">{props.chapterLabel}</div>
      <ul role="list" className="flex-1 overflow-y-auto">
        {props.highlights.map((highlight) => (
          <li key={highlight.objectId}>
            <div className="flex">
              <button className="relative group py-3 px-5 flex-1" onClick={() => props.select(highlight.cfiRange)}>
                <div className="absolute inset-0 group-hover:bg-gray-100" aria-hidden="true" />
                <div className="flex-1 flex min-w-0 relative border-l-4 border-yellow-200">
                  <div className="ml-4">
                    <p className="text-sm text-gray-900 text-left">{highlight.text}</p>
                  </div>
                </div>
              </button>
              <button
                className="relative group px-5 flex self-stretch items-center justify-center"
                onClick={() => props.delete(highlight.cfiRange, highlight.objectId)}>
                <div className="absolute inset-0 group-hover:bg-gray-100" aria-hidden="true" />
                <TrashIcon
                  className="w-5 text-gray-400 group-hover:text-gray-500 justify-content-stretch z-50"
                  aria-hidden="true"
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
}
