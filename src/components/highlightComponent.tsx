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
    <div>
      {props.chapterLabel}
      <ul role="list" className="flex-1 divide-y divide-gray-200 overflow-y-auto">
        {props.highlights.map((highlight) => (
          <li key={highlight.objectId}>
            <div className="flex items-center">
              <button className="relative group py-6 px-5 flex-1 truncate" onClick={() => props.select(highlight.cfiRange)}>
                <div className="absolute inset-0 group-hover:bg-gray-100" aria-hidden="true" />
                <div className="flex-1 flex items-center min-w-0 relative">
                  <div className="ml-4 truncate">
                    <p className="text-sm font-medium text-gray-900 truncate">{highlight.text}</p>
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
    </div>
  );
}
