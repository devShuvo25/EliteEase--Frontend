type SubCategory = { label: string; value: string };
type Category = {
  id: number;
  label: string;
  cover: string;
  children?: SubCategory[];
};

export const categories: Category[] = [
  {
    id: 1,
    label: "Men's Fashion",
    cover:
      "https://hopelifestyle.com.bd/wp-content/uploads/2023/09/Navy-hj.png",
    children: [
      { label: "Shirts", value: "shirts" },
      { label: "Pants", value: "pants" },
    ],
  },
  {
    id: 2,
    label: "Women's Fashion",
    cover:
      "https://levin.com.bd/cdn/shop/files/IMG_6735.jpg?v=1716634763&width=600",
    children: [
      { label: "Dresses", value: "dresses" },
      { label: "Sarees", value: "sarees" },
    ],
  },
  {
    id: 3,
    label: "Kids Fashion",
    cover:
      "https://levin.com.bd/cdn/shop/files/web-1_a1dca7ab-32d0-4c48-997a-757952546f46.jpg?v=1698213038&width=600",
  },
  {
    id: 4,
    label: "Denim Collection",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYodObNo6frOII1_FxsE26QDMEleBBtK_PPQ&s",
  },
  {
    id: 5,
    label: "Western Wear",
    cover:
      "https://cdn.shopify.com/s/files/1/0520/7395/5522/files/riveri_360x.png?v=1745397656",
  },
  {
    id: 6,
    label: "Sport Wear",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAGLRes9EpBOFC9kL95Bq4Dl7HYvP9nsXTow&s",
  },
  {
    id: 7,
    label: "Footwear",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRT5ieMIIMAj_ena1V1Vl8qZU_dxEQpflIlA&s",
  },
  {
    id: 8,
    label: "Fashion Jewellery",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtPWtIwSXil4ffkj9fMU8Ghum4bOhWEoBLJw&s",
  },
  {
    id: 9,
    label: "Beauty & Cosmetics",
    cover:
      "https://cdn.shopify.com/s/files/1/0723/8156/3182/files/Top_10_Cosmetic_companies_in_Bangladesh_1d6feb4d-5b6c-4411-ab57-5e38183ed221_480x480.jpg?v=1723553379",
  },
  {
    id: 10,
    label: "Speaker",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkzm330_QXVLpQJnT6jKW3ixSYYI9Vka9t6Q&s",
  },
  {
    id: 11,
    label: "Mobile",
    cover:
      "https://www.gsmarena.com.bd/images/products/thumb/Apple-iPhone-14-Pro-Purple.jpg",
  },
];
