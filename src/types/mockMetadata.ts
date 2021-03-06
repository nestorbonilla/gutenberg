export type nft_book = {
  // first 3 properties are standard: https://eips.ethereum.org/EIPS/eip-721
  //  id: string
  id: string;
  name: string;
  description: string;
  image: string;
  gr_url: string;
  ipfs_url: string;
  authors: string[];
  annotations: string[]; //people who annotated. 
  published: string;
  price: string;
  hash: string;
  erc1155_parent_hash: string; 
};

export const mockBooks: nft_book[] = [
  {
    name: "Alice's Adventures in Wonderland",
    description:
      '"I can\'t explain myself, I\'m afraid, sir," said Alice, "Because I\'m not myself, you see."\n\nWhen Alice sees a white rabbit take a watch out of its waistcoat pocket she decides to follow it, and a sequence of most unusual events is set in motion.',
    image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1630487234l/24213._SX318_.jpg",
    gr_url:
      "https://www.goodreads.com/book/show/24213.Alice_s_Adventures_in_Wonderland_Through_the_Looking_Glass",
    ipfs_url: "",
    authors: ["Lewis Carroll"],
    annotations: ["Carl Lippert" , "Nestor Banilla"],
    published: "1871-12-27",
    price: "20.00",
    id: "0",
    hash: "0x762901CA5eE5ee185A2E1Cf41Ea850bC9CE28401",
    erc1155_parent_hash: "asijdfopajsodfjalsdjflakjsdf;lkjas;dlf"
  },
  {
    name: "Flatland: A Romance of Many Dimensions",
    description:
      "This masterpiece of science (and mathematical) fiction is a delightfully unique and highly entertaining satire that has charmed readers for more than 100 years. The work of English clergyman, educator and Shakespearean scholar Edwin A. Abbott (1838-1926), it describes the journeys of A. Square [sic – ed.], a mathematician and resident of the two-dimensional Flatland, where women-thin, straight lines-are the lowliest of shapes, and where men may have any number of sides, depending on their social status.\n\nThrough strange occurrences that bring him into contact with a host of geometric forms, Square has adventures in Spaceland (three dimensions), Lineland (one dimension) and Pointland (no dimensions) and ultimately entertains thoughts of visiting a land of four dimensions—a revolutionary idea for which he is returned to his two-dimensional world. Charmingly illustrated by the author, Flatland is not only fascinating reading, it is still a first-rate fictional introduction to the concept of the multiple dimensions of space.",
    image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1435435775l/433567.jpg",
    gr_url: "https://www.goodreads.com/book/show/433567.Flatland",
    ipfs_url: "",
    authors: ["Edwin A. Abbott"],
    annotations: ["Sonia Joseph" , "Grace Wang"],
    published: "1884-01-01",
    price: "25.00",
    id: "1",
    hash: "asijdfopajsodfjalsdjflakjsdf;lkjas;dlf",
    erc1155_parent_hash: "asijdfopajsodfjalsdjflakjsdf;lkjas;dlf"
  },
  {
    name: "The War of the Worlds",
    description:
      "When an army of invading Martians lands in England, panic and terror seize the population. As the aliens traverse the country in huge three-legged machines, incinerating all in their path with a heat ray and spreading noxious toxic gases, the people of the Earth must come to terms with the prospect of the end of human civilization and the beginning of Martian rule.\n\nInspiring films, radio dramas, comic-book adaptations, television series and sequels,The War of the Worlds is a prototypical work of science fiction which has influenced every alien story that has come since, and is unsurpassed in its ability to thrill, well over a century since it was first published.",
    image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1320391644l/8909.jpg",
    gr_url: "https://www.goodreads.com/book/show/8909.The_War_of_the_Worlds",
    ipfs_url: "",
    authors: ["H. G. Wells"],
    annotations: ["Grace Wang", "Carl Lippert"],
    published: "1897-01-01",
    price: "15.00",
    id: "2",
    hash: "asijdfopajsodfjalsdjflakjsdf;lkjas;dlf",
    erc1155_parent_hash: "asijdfopajsodfjalsdjflakjsdf;lkjas;dlf"
  },
  {
    name: "A Journey to the Center of the Earth",
    description:
      "An adventurous geology professor chances upon a manuscript in which a 16th-century explorer claims to have found a route to the earth's core. Professor Lidenbrock can't resist the opportunity to investigate, and with his nephew Axel, he sets off across Iceland in the company of Hans Bjelke, a native guide. The expedition descends into an extinct volcano toward a sunless sea, where they encounter a subterranean world of luminous rocks, antediluvian forests, and fantastic marine life — a living past that holds the secrets to the origins of human existence.",
    image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1389754903l/32829.jpg",
    gr_url:
      "https://www.goodreads.com/book/show/32829.Journey_to_the_Center_of_the_Earth",
    ipfs_url: "",
    authors: ["Jules Verne"],
    annotations: ["Grace Wang", "Carl Lippert"],
    published: "1864-11-25",
    price: "17.00",
    id: "3",
    hash: "asijdfopajsodfjalsdjflakjsdf;lkjas;dlf",
    erc1155_parent_hash: "asijdfopajsodfjalsdjflakjsdf;lkjas;dlf"
  },
  {
    name: "Frankenstein",
    description:
      "Mary Shelley's seminal novel of the scientist whose creation becomes a monster.",
    image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1631088473l/35031085._SY475_.jpg",
    gr_url: "https://www.goodreads.com/book/show/35031085-frankenstein",
    ipfs_url: "",
    authors: ["Mary Wollstonecraft Shelley"],
    annotations: ["Grace Wang", "Carl Lippert"],
    published: "1818-01-01",
    price: "11.00",
    id: "4",
    hash: "asijdfopajsodfjalsdjflakjsdf;lkjas;dlf",
    erc1155_parent_hash: "asijdfopajsodfjalsdjflakjsdf;lkjas;dlf"
  },
  {
    name: "Erewhon",
    description:
      "An explorer discovers a utopian society with unconventional views on crime, illness, and religion. Erewhon, by Samuel Butler, is loosely inspired by his personal experience in New Zealand where he worked as a sheep farmer. The novel is a brilliant satire of Victorian society as a rigid and failing institution.",
    image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1175460304l/516570.jpg",
    gr_url: "https://www.goodreads.com/book/show/516570.Erewhon",
    ipfs_url: "",
    authors: ["Samuel Butler"],
    annotations: ["Grace Wang", "Carl Lippert"],
    published: "1872-01-01",
    price: "20.00",
    id: "5",
    hash: "asijdfopajsodfjalsdjflakjsdf;lkjas;dlf",
    erc1155_parent_hash: "asijdfopajsodfjalsdjflakjsdf;lkjas;dlf"
  },
  {
    name: "Mr. Spaceship",
    description:
      "A human brain-controlled spacecraft would mean mechanical perfection. This was accomplished, and something unforeseen: a strange entity called... Mr. Spaceship",
    image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1328303678l/6142025.jpg",
    gr_url: "https://www.goodreads.com/book/show/6142025-mr-spaceship",
    ipfs_url: "",
    authors: ["Philip K. Dick"],
    annotations: ["Sonia Joseph" , "Nestor Banilla"],
    published: "1953-01-01",
    price: "44.00",
    id: "6",
    hash: "asijdfopajsodfjalsdjflakjsdf;lkjas;dlf",
    erc1155_parent_hash: "asijdfopajsodfjalsdjflakjsdf;lkjas;dlf"
  },
  {
    name: "Gulliver's Travels",
    description:
      'Travels into Several Remote Nations of the World. In Four Parts. A novel by Anglo-Irish writer and clergyman Jonathan Swift, that is both a satire on human nature and a parody of the "travellers\' tales" literary subgenre.',
    image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1427829692l/7733.jpg",
    gr_url: "https://www.goodreads.com/book/show/7733.Gulliver_s_Travels",
    ipfs_url: "",
    authors: ["Jonathan Swift"],
    annotations: ["Carl Lippert" , "Nestor Banilla"],
    published: "1726-10-28",
    price: "29.00",
    id: "7",
    hash: "asijdfopajsodfjalsdjflakjsdf;lkjas;dlf",
    erc1155_parent_hash: "asijdfopajsodfjalsdjflakjsdf;lkjas;dlf"
  },
];
