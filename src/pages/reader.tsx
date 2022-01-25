import { Rendition } from "epubjs";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { ReactReader } from "react-reader";
// import styles from '../styles/Home.module.css'

const Reader: NextPage = () => {
  const [location, setLocation] = useState<string>();
  const [selections, setSelections] = useState<any>([]);
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
  return (
    <div className="m" style={{ height: "100vh" }}>
      <ReactReader
        location={location}
        locationChanged={locationChanged}
        getRendition={getRendition}
        url="https://gerhardsletten.github.io/react-reader/files/alice.epub"
      />
    </div>
  );
};

export default Reader;
