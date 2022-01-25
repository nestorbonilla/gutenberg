import { MenuIcon } from "@heroicons/react/outline";
import { Rendition } from "epubjs";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { ReactReader } from "react-reader";
import RightSlider, { Highlight } from "../components/rightSlider";
// import styles from '../styles/Home.module.css'

const Reader: NextPage = () => {
  const [showHighlights, setShowHighlights] = useState(false);
  const [location, setLocation] = useState<string>();
  const [selections, setSelections] = useState<Highlight[]>([]);
  const renditionRef = useRef<Rendition>();

  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.on("selected", setRenderSelection)
      return () => {
        renditionRef.current!.off("selected", setRenderSelection)
      }
    }
  }, [selections]);

  function setRenderSelection(cfiRange: string, contents: any) {
    setSelections(selections.concat({
      id: selections.length,
      text: renditionRef.current!.getRange(cfiRange).toString(),
      cfiRange
    }))
    renditionRef.current!.annotations.add("highlight", cfiRange)
    contents.window.getSelection().removeAllRanges()
  }

  function locationChanged(epubcifi: string) {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi);
    console.log(location);
  }

  function getRendition(rendition: Rendition) {
    renditionRef.current = rendition;
    renditionRef.current.themes.default({
      '::selection': {
        'background': 'rgba(255,255,0,0.3)'
      }
    })
    setSelections([]);
  }

  function deleteHighlight(cfiRange: string, i: number) {
    renditionRef.current!.annotations.remove(cfiRange, 'highlight')
    setSelections(selections.filter((item: any, j: number) => j !== i))
  }

  return (
    <div>
      <div className="m" style={{ height: "100vh" }}>
        <ReactReader
          location={location}
          locationChanged={locationChanged}
          getRendition={getRendition}
          url="https://gerhardsletten.github.io/react-reader/files/alice.epub"
        />
      </div>
      {!showHighlights && <button
        type="button"
        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
        onClick={() => setShowHighlights(true)}
      >
        <MenuIcon className="h-6 w-6" aria-hidden="true" style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 100 }} />
      </button>}
      <RightSlider
        highlights={selections}
        show={showHighlights}
        setShow={setShowHighlights}
        select={(cfiRange: string) => renditionRef.current!.display(cfiRange)}
        delete={deleteHighlight}
      />
      <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', zIndex: 1, backgroundColor: 'white' }}>
        <ul>
          {selections.map(({ text, cfiRange }, i: number) => (
            <li key={i}>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reader;
