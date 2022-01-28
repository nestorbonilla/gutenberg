import { useState, useEffect } from "react";
// import { StarIcon } from "@heroicons/react/solid";
// import { RadioGroup } from "@headlessui/react";
import { CurrencyDollarIcon, GlobeIcon } from "@heroicons/react/outline";
import MarketingLayout from "../../components/marketingLayout";
import { mockBooks } from "../../types/mockMetadata";
import { nft_book } from "../../types/mockMetadata";
import { useRouter } from "next/router";

import {
  useWeb3ExecuteFunction,
  useApiContract,
  useMoralis,
} from "react-moralis";
import { abi } from "../../../artifacts/contracts/GenesisCollection.sol/GenesisCollection.json";

const policies = [
  {
    name: "Share with friends",
    icon: GlobeIcon,
    description: "Share your knowledge with others",
  },
  {
    name: "Get rewarded",
    icon: CurrencyDollarIcon,
    description: "Your notes are worth more",
  },
];

const MintERC721 = () => {
  const [mintBook, setMintBook] = useState<nft_book>(mockBooks[0]);
  const router = useRouter();
  const { hash } = router.query;

  const mint = () => {
    // const { data, error, fetch, isFetching, isLoading } =
    //   useWeb3ExecuteFunction({
    //     abi,
    //     contractAddress: "0x762901CA5eE5ee185A2E1Cf41Ea850bC9CE28401", //bad addres
    //     functionName: "mint",
    //     params: {
    //       // secondsAgos: [0, 10],
    //     },
    //   });
  };

  const fetchweb2Metadata = async () => {
    //todo fetch data from moralis
  };

  useEffect(() => {
    if (address) {
      fetchweb2Metadata();
    }
  }, [address]);

  return (
    <MarketingLayout>
      <div className="pt-6 pb-16 sm:pb-24">
        <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
            <div className="lg:col-start-8 lg:col-span-5">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">
                  {mintBook.name}
                </h1>
                <p className="text-xl font-medium rounded-full bg-green-100 text-green-800">
                  ${mintBook.price}
                </p>
              </div>
              {/* Reviews */}
              {/* <div className="mt-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center"> */}
              {/* <p className="text-sm text-gray-700">
                    {4}
                    <span className="sr-only"> out of 5 stars</span>
                  </p> */}
              {/* <div className="ml-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          book.rating > rating
                            ? "text-yellow-400"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div> */}
              {/* <div
                    aria-hidden="true"
                    className="ml-4 text-sm text-gray-300"
                  >
                    · */}
              {/* </div>
                  <div className="ml-4 flex">
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    > */}
              {/* See all {book} reviews */}
              {/* </a>
                  </div>
                </div>
                          </div>  */}
              {/*  */}
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
              <h2 className="sr-only">Images</h2>

              {/* <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                {book.images.map((image) => ( */}
              <img
                // key={mintBook.image}
                src={mintBook.image}
                // alt={image.imageAlt}
                className={"lg:col-span-2 lg:row-span-2 rounded-lg"}
              />
              {/* ))}
              </div> */}
            </div>

            <div className="mt-8 lg:col-span-5">
              <form>
                {/* Annotations */}
                {/* {erc721 ? ( */}
                <div>
                  <h2 className="text-md font-medium text-gray-900 mb-5 ">
                    My Annotations:{" "}
                  </h2>
                  {/* My Annotations Meta data */}
                  {/* <Annotationer annotation={book.annotations} /> */}
                </div>
                {/* ) : null} */}

                {/* Size picker */}
                <div className="mt-8">
                  {/* <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900">Size</h2>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      See sizing chart
                    </a>
                  </div> */}

                  {/* <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-2"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {book.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          className={({ active, checked }) =>
                            classNames(
                              size.inStock
                                ? "cursor-pointer focus:outline-none"
                                : "opacity-25 cursor-not-allowed",
                              active
                                ? "ring-2 ring-offset-2 ring-indigo-500"
                                : "",
                              checked
                                ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                                : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                              "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                            )
                          }
                          disabled={!size.inStock}
                        >
                          <RadioGroup.Label as="p">
                            {size.name}
                          </RadioGroup.Label>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup> */}
                </div>

                <button
                  onClick={mint}
                  className="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {/* {erc721 ? "Mint Annotated NFT" : "Buy 456 / 500 Genesis*"} */}
                </button>
              </form>

              {/* book details */}
              {/* <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Description
                </h2> */}

              {/* <div
                  className="mt-4 prose prose-sm text-gray-500"
                  dangerouslySetInnerHTML={{ __html: book.description }}
                /> */}
              {/* </div> */}

              {/* <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">
                  Fabric &amp; Care
                </h2>

                <div className="mt-4 prose prose-sm text-gray-500">
                  <ul role="list">
                    {book.details.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div> */}

              {/* Policies */}
              <section aria-labelledby="policies-heading" className="mt-10">
                <h2 id="policies-heading" className="sr-only">
                  Our Policies
                </h2>

                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {policies.map((policy) => (
                    <div
                      key={policy.name}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center"
                    >
                      <dt>
                        <policy.icon
                          className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="mt-4 text-sm font-medium text-gray-900">
                          {policy.name}
                        </span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-500">
                        {policy.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* <BookList hash={book.hash} /> */}
    </MarketingLayout>
  );
};

export default MintERC721;
