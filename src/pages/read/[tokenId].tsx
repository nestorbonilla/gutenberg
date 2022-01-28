import { MenuIcon } from "@heroicons/react/outline";
import axios from "axios";
import { Rendition } from "epubjs";
import Moralis from 'moralis';
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ReactReader } from "react-reader";
import RightSlider, { Highlight } from "../../components/rightSlider";
import { GENESIS_ADDRESS, SECONDARY_ADDRESS } from "../../utils/addresses";
// import styles from '../styles/Home.module.css'

const Reader: NextPage = () => {
  const router = useRouter();
  const { tokenId, marked } = router.query;
  const [tokenMetadata, setTokenMetadata] = useState<any>();
  const [address, setAddress] = useState<string>();

  const [showHighlights, setShowHighlights] = useState(false);
  const [location, setLocation] = useState<string>();
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [otherHighlights, setOtherHighlights] = useState<Highlight[]>([]);

  const renditionRef = useRef<Rendition>();
  const tocRef = useRef<any>();
  const MoralisHighlight = Moralis.Object.extend("Highlight");

  useEffect(() => {
    async function init() {
      if (!tokenId) {
        return;
      }

      // load epub URLs
      const options: any = {
        address: marked === "1" ? SECONDARY_ADDRESS : GENESIS_ADDRESS,
        token_id: tokenId,
        chain: "mumbai",
      };
      const tokenMetadataRes = await Moralis.Web3API.token.getTokenIdMetadata(options);
      if (tokenMetadataRes.metadata) {
        setTokenMetadata(JSON.parse(tokenMetadataRes.metadata as string));
      } else if (tokenMetadataRes.token_uri) {
        // seems like moralis doesn't always populate the metadata (indexing delay?) so we fetch it ourselves
        // also doctor the URL to read from infura rather than the moralis gateway
        const url = new URL(tokenMetadataRes.token_uri);
        const { data } = await axios.get("https://ipfs.infura.io" + url.pathname);
        setTokenMetadata(data);
      }

      // load personal highlights
      const user: any = Moralis.User.current();
      setAddress(user.get("ethAddress"));
      new Moralis.Query(MoralisHighlight)
        .equalTo("address", user.get("ethAddress"))
        .equalTo("bookId", tokenId)
        .find()
        .then((results) => {
          setOtherHighlights(results.map(result => result.toJSON() as unknown as Highlight));
        });
    }
    init();
  }, [tokenId])

  useEffect(() => {
    // set other highlights
    if (marked === "1" && tokenMetadata && renditionRef.current) {
      setOtherHighlights(tokenMetadata.highlights);
      tokenMetadata.highlights.forEach((highlight: Highlight) =>
        renditionRef.current!.annotations.add("highlight", highlight.cfiRange, {}, undefined, "hl", { "fill": "blue", "fill-opacity": "0.3", "mix-blend-mode": "multiply" }));
    }
  }, [tokenMetadata, marked, renditionRef.current])

  useEffect(() => {
    if (renditionRef.current && tocRef.current) {
      renditionRef.current.on("selected", saveHighlight)
      return () => {
        renditionRef.current!.off("selected", saveHighlight)
      }
    }
  });

  async function saveHighlight(cfiRange: string, contents: any) {
    const { href } = renditionRef.current!.location.start;
    const chapter = tocRef.current!.find((item: any) => item.href.startsWith(href));
    const highlightInput = {
      address,
      bookId: tokenId,
      text: renditionRef.current!.getRange(cfiRange).toString(),
      cfiRange,
      chapter,
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

  async function deleteHighlight(cfiRange: string, id: string) {
    renditionRef.current!.annotations.remove(cfiRange, 'highlight')
    const highlight = await new Moralis.Query(MoralisHighlight).get(id);
    await highlight.destroy();
    setHighlights(highlights.filter((item) => item.objectId !== id));
  }

  return (
    <div>
      {tokenMetadata && tokenMetadata.book_url && <div className="m" style={{ height: "100vh" }}>
        <ReactReader
          location={location}
          locationChanged={locationChanged}
          getRendition={getRendition}
          tocChanged={toc => tocRef.current = toc}
          url={tokenMetadata.book_url}
          epubInitOptions={{ openAs: "epub" }}
        />
      </div>}
      {!showHighlights && <button
        type="button"
        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
        onClick={() => setShowHighlights(true)}
      >
        <MenuIcon className="h-6 w-6" aria-hidden="true" style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 100 }} />
      </button>}
      <RightSlider
        marked={marked === "1"}
        highlights={highlights}
        otherHighlights={otherHighlights || []}
        toc={tocRef.current || []}
        show={showHighlights}
        setShow={setShowHighlights}
        select={selectHighlight}
        delete={deleteHighlight}
      />
    </div>
  );
};

export default Reader;
