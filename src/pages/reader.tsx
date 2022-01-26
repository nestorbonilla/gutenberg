import { MenuIcon } from "@heroicons/react/outline";
import { Rendition } from "epubjs";
import Moralis from 'moralis';
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { ReactReader } from "react-reader";
import RightSlider, { Highlight } from "../components/rightSlider";
// import styles from '../styles/Home.module.css'

const Reader: NextPage = () => {
  const [showHighlights, setShowHighlights] = useState(false);
  const [location, setLocation] = useState<string>();
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [address, setAddress] = useState<string>();
  const renditionRef = useRef<Rendition>();
  const MoralisHighlight = Moralis.Object.extend("Highlight");

  useEffect(() => {
    // load previously saved highlights
    const user: any = Moralis.User.current();
    setAddress(user.get("ethAddress"));
    new Moralis.Query(MoralisHighlight)
      .equalTo("address", user.get("ethAddress"))
      .find()
      .then((results) => {
        setHighlights(results.map(result => result.toJSON() as unknown as Highlight));
      });
  }, [])

  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.on("selected", saveHighlight)
      return () => {
        renditionRef.current!.off("selected", saveHighlight)
      }
    }
  }, [highlights]);

  async function saveHighlight(cfiRange: string, contents: any) {
    const highlightInput = {
      address,
      text: renditionRef.current!.getRange(cfiRange).toString(),
      cfiRange
    };
    const highlight = await new MoralisHighlight().save(highlightInput);
    setHighlights(highlights.concat(highlight.toJSON() as Highlight));
    renditionRef.current!.annotations.add("highlight", cfiRange)
    contents.window.getSelection().removeAllRanges()
  }

  function locationChanged(epubcifi: string) {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi);
  }

  function getRendition(rendition: Rendition) {
    renditionRef.current = rendition;
    renditionRef.current.themes.default({
      '::selection': {
        'background': 'rgba(255,255,0,0.3)'
      }
    });
    highlights.forEach(highlight => renditionRef.current!.annotations.add("highlight", highlight.cfiRange));
  }

  function selectHighlight(cfiRange: string) {
    renditionRef.current!.display(cfiRange);
  }

  function deleteHighlight(cfiRange: string, id: string) {
    renditionRef.current!.annotations.remove(cfiRange, 'highlight')
    setHighlights(highlights.filter((item) => item.id !== id));
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
        highlights={highlights}
        show={showHighlights}
        setShow={setShowHighlights}
        select={selectHighlight}
        delete={deleteHighlight}
      />
    </div>
  );
};

export default Reader;
