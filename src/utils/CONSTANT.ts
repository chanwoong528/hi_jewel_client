export const PAGE_LABEL = {
  home: "HOME",
  about: "ABOUT",
  company: "COMPANY",
  product: "PRODUCT",
  contact: "CONTACT",
  login: "LOGIN",
  admin: "ADMIN",
};

export const PAGE_LIST = [
  { url: "/", label: PAGE_LABEL.home, loginRequired: true },
  { url: "/about", label: PAGE_LABEL.about, loginRequired: true },
  { url: "/company", label: PAGE_LABEL.company, loginRequired: true },
  { url: "/product", label: PAGE_LABEL.product, loginRequired: true },
  { url: "/contact-us", label: PAGE_LABEL.contact, loginRequired: true },
  { url: "/login", label: PAGE_LABEL.login, loginRequired: false },
  {
    url: "/admin",
    label: PAGE_LABEL.admin,
    loginRequired: true,
    adminRequired: true,
  },
];
