/* This example requires Tailwind CSS v2.0+ */
import HighlightComponent from './highlightComponent';
import { Highlight, Toc } from './rightSlider';

interface AllHighlightProps {
  toc: Toc[];
  highlights: Highlight[];
  color?: string;
  select: (cfiRange: string) => void;
  delete: (cfiRange: string, id: string) => void;
}

export default function AllHighlights(props: AllHighlightProps) {
  const groupedHighlights = props.highlights.reduce((acc, item) => {
    const chapter = item.chapter.href;
    if (!acc[chapter]) {
      acc[chapter] = [];
    }
    acc[chapter].push(item);
    return acc;
  }, {} as { [chapter: string]: Highlight[] });

  return (
    <ul role="list" className="divide-y divide-gray-200">
      {props.toc
        .filter(chapter => groupedHighlights[chapter.href])
        .map(chapter => (
          <li key={chapter.href}>
            <div className="pt-4 pb-2 px-5">{chapter.label}</div>
            <ul role="list" className="flex-1 overflow-y-auto">
              {groupedHighlights[chapter.href].map((highlight) => <HighlightComponent
                key={highlight.objectId}
                highlight={highlight}
                color={props.color}
                select={props.select}
                delete={props.delete}
              />)}
            </ul>
          </li>
        ))}
    </ul>
  )
}
