export const PAGE_LABEL = {
  home: "HOME",
  about: "FACTORY",
  company: "COMPANY",
  product: "PRODUCT",
  contact: "CONTACT",
  post: "POST",
  login: "LOGIN",
  admin: "ADMIN",
};

export const PAGE_LIST = [
  { url: "/", label: PAGE_LABEL.home, loginRequired: true, show: true },
  {
    url: "/company",
    label: PAGE_LABEL.company,
    loginRequired: true,
    show: true,
  },
  { url: "/about", label: PAGE_LABEL.about, loginRequired: true, show: true },
  {
    url: "/product",
    label: PAGE_LABEL.product,
    loginRequired: true,
    show: true,
  },
  {
    url: "/contact-us",
    label: PAGE_LABEL.contact,
    loginRequired: true,
    show: true,
  },
  {
    url: "/post",
    label: PAGE_LABEL.post,
    loginRequired: true,
    show: false,
  },
  { url: "/login", label: PAGE_LABEL.login, loginRequired: false, show: true },
  {
    url: "/admin",
    label: PAGE_LABEL.admin,
    loginRequired: true,
    adminRequired: true,
    show: true,
  },
];

export const PRODUCT_TYPE_LIST_IMG = [
  {
    name: "Earring",
    imgSrc: "",
  },
  {
    name: "Necklace",
    imgSrc: "",
  },
  {
    name: "Bracelet",
    imgSrc: "",
  },
  {
    name: "Ring",
    imgSrc: "",
  },
  {
    name: "Chain",
    imgSrc: "",
  },
  {
    name: "Set",
    imgSrc: "",
  },
  {
    name: "Other Acc.",
    imgSrc: "",
  },
];
