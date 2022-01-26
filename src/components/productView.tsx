import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import { CurrencyDollarIcon, GlobeIcon } from "@heroicons/react/outline";
import MarketingLayout from "./marketingLayout";
import { mockBooks } from "../types/mockMetadata";
import { nft_book } from "../types/mockMetadata";
import BookList from "./bookList";
import AnnotationsList from "./annotationsList";
// const book = {
//   name: "Basic Tee",
//   price: "$35",
//   rating: 3.9,
//   reviewCount: 512,
//   href: "#",
//   breadcrumbs: [
//     { id: 1, name: "Women", href: "#" },
//     { id: 2, name: "Clothing", href: "#" },
//   ],
//   images: [
//     {
//       id: 1,
//       imageSrc:
//         "https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg",
//       imageAlt: "Back of women's Basic Tee in black.",
//       primary: true,
//     },
//     {
//       id: 2,
//       imageSrc:
//         "https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-01.jpg",
//       imageAlt: "Side profile of women's Basic Tee in black.",
//       primary: false,
//     },
//     {
//       id: 3,
//       imageSrc:
//         "https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-02.jpg",
//       imageAlt: "Front of women's Basic Tee in black.",
//       primary: false,
//     },
//   ],
//   colors: [
//     { name: "Black", bgColor: "bg-gray-900", selectedColor: "ring-gray-900" },
//     {
//       name: "Heather Grey",
//       bgColor: "bg-gray-400",
//       selectedColor: "ring-gray-400",
//     },
//   ],
//   sizes: [
//     { name: "XXS", inStock: true },
//     { name: "XS", inStock: true },
//     { name: "S", inStock: true },
//     { name: "M", inStock: true },
//     { name: "L", inStock: true },
//     { name: "XL", inStock: false },
//   ],
//   description: `
//     <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
//     <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
//   `,
//   details: [
//     "Only the best materials",
//     "Ethically and locally made",
//     "Pre-washed and pre-shrunk",
//     "Machine wash cold with similar colors",
//   ],
// };
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

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  book: nft_book;
  //   mint: boolean;
  erc721: boolean;
  callback: () => {};
};

const ProductView = ({ book, erc721, callback }: Props) => {
  //   const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  //     const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [mintBook, setMintBook] = useState<nft_book>(book);

  return (
    <MarketingLayout>
      {/* <div className="bg-white"> */}
      <div className="pt-6 pb-16 sm:pb-24">
        {/* <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
        {/* <ol role="list" className="flex items-center space-x-4"> */}
        {/* {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-4 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    viewBox="0 0 6 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-5 w-auto text-gray-300"
                  >
                    <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                  </svg>
                </div>
              </li>
            ))} */}
        {/* <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li> */}
        {/* </ol> */}
        {/* </nav> */}
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
                {erc721 ? (
                  <div>
                    <h2 className="text-md font-medium text-gray-900 mb-5 ">
                      Annotated By:{" "}
                    </h2>
                    {/* {book.annotations.map((annotation) => (
                      //todo bring in actual annotations
                    ))} */}
                    <AnnotationsList />
                  </div>
                ) : null}

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
                  onClick={callback}
                  className="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {erc721 ? "Mint Annotated NFT" : "Buy 456 / 500 Genesis*"}
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
      <BookList hash={book.hash} />
    </MarketingLayout>
  );
};

export default ProductView;
