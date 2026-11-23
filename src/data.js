const asset = (name) => `./img/${encodeURI(name)}`;

const products = [
  {
    slug: "pan-sarnita",
    name: "Pan sarnita",
    category: "Panadería",
    image: "Pan sarnita casero con queso tostado-1.png",
    description:
      "Pan tradicional cochabambino, esponjoso y dorado, con queso criollo fundido en el centro.",
    label: "Casero y esponjoso",
  },
  {
    slug: "cunapes",
    name: "Cuñapés",
    category: "Panadería",
    image: "Cuñapés bolivianos caseros, recién horneados-2.png",
    description:
      "Bocados de queso y yuca con corteza dorada y un interior suave, hechos con sabor casero.",
    label: "Queso criollo",
  },
  {
    slug: "marraqueta",
    name: "Marraqueta",
    category: "Panadería",
    image: "Panes rellenos de queso en bandeja-3.png",
    description:
      "Pan de corteza crujiente y miga aireada, preparado para acompañar tus comidas.",
    label: "Corteza crocante",
  },
  {
    slug: "pan-frances",
    name: "Pan francés",
    category: "Panadería",
    image: "Cinco panes franceses bolivianos-9.png",
    description:
      "Pieza de pan tradicional de miga suave y corteza dorada, horneada para disfrutar fresca.",
    label: "Tradicional",
  },
  {
    slug: "pan-hamburguesa",
    name: "Pan para hamburguesa",
    category: "Panadería",
    image: "Panecillos caseros con sésamo-10.png",
    description:
      "Panecillo suave con sésamo, ideal para preparar hamburguesas en casa.",
    label: "Masa brioche suave",
  },
  {
    slug: "pan-hotdog",
    name: "Pan para hot dog",
    category: "Panadería",
    image: "Cinco panecillos caseros para perrito caliente-11.png",
    description:
      "Pan alargado y tierno para compartir en comidas y reuniones.",
    label: "Alargado y esponjoso",
  },
  {
    slug: "pan-integral",
    name: "Pan integral",
    category: "Panadería",
    image: "Pan integral casero con tres rebanadas-12.png",
    description:
      "Pan de harina integral de sabor delicado, horneado artesanalmente.",
    label: "Grano entero",
  },
  {
    slug: "pan-avena",
    name: "Pan de avena",
    category: "Panadería",
    image: "Pan de avena casero con rebanadas-13.png",
    description:
      "Miga suave con avena y semillas, elaborado en pequeñas tandas.",
    label: "Avena selecta",
  },
  {
    slug: "pan-cauca",
    name: "Pan cauca",
    category: "Panadería",
    image: "Pan cauca boliviano en cocina casera-1.png",
    description:
      "Receta tradicional de masa sobada con la textura y el sabor de la panadería casera.",
    label: "Herencia cochabambina",
  },
  {
    slug: "baguette",
    name: "Baguette",
    category: "Panadería",
    image: "Baguettes caseras doradas-15.png",
    description:
      "Baguette de fermentación paciente y corteza dorada, hecha para compartir.",
    label: "Corteza dorada",
  },
  {
    slug: "galletas",
    name: "Galletas con chispas",
    category: "Repostería",
    image: "Ocho galletas caseras con chispas de chocolate-16.png",
    description:
      "Galletas caseras de masa suave con chispas de chocolate.",
    label: "Mantequilla pura",
  },
  {
    slug: "queque-vainilla",
    name: "Queque de vainilla",
    category: "Repostería",
    image: "Queque de vainilla casero-17.png",
    description:
      "Queque casero de miga suave y sabor clásico a vainilla.",
    label: "Clásico de casa",
  },
  {
    slug: "alfajores",
    name: "Alfajores de maicena",
    category: "Repostería",
    image: "Seis alfajores caseros de maicena-7.png",
    description:
      "Alfajores suaves rellenos de dulce de leche, preparados para compartir.",
    label: "Dulce de leche casero",
  },
  {
    slug: "empanadas-horno",
    name: "Empanadas al horno",
    category: "Panadería",
    image: "Empanadas bolivianas caseras al horno-18.png",
    description:
      "Empanadas horneadas de masa casera, doradas y listas para disfrutar.",
    label: "Horneadas al punto",
  },
  {
    slug: "empanadas-masa-normal",
    name: "Empanadas con masa normal",
    category: "Panadería",
    image: "Cuatro empanadas bolivianas al horno-19.png",
    description:
      "Empanadas tradicionales horneadas con una masa suave y sabrosa.",
    label: "Masa esponjada",
  },
  {
    slug: "saltenas",
    name: "Salteñas",
    category: "Panadería",
    image: "Cuatro salteñas bolivianas recién horneadas-20.png",
    description:
      "Salteñas bolivianas horneadas, con masa dorada y relleno jugoso.",
    label: "Orgullo boliviano",
  },
  {
    slug: "tucumanas",
    name: "Tucumanas",
    category: "Panadería",
    image: "Tres tucumanas fritas bolivianas-21.png",
    description:
      "Tucumanas de masa fina y dorada, preparadas para compartir.",
    label: "Dorado crujiente",
  },
  {
    slug: "queque-platano",
    name: "Queque de plátano",
    category: "Repostería",
    image: "Queque casero de plátano con dos rebanadas-22.png",
    description:
      "Queque húmedo de plátano elaborado en casa con ingredientes sencillos.",
    label: "Fruta natural",
  },
  {
    slug: "bizcocho-marmolado",
    name: "Bizcocho marmolado",
    category: "Repostería",
    image: "Bizcocho marmolado casero con porción aparte-23.png",
    description:
      "Bizcocho casero de vainilla y chocolate con una miga suave.",
    label: "Vainilla y cacao",
  },
  {
    slug: "queque-naranja",
    name: "Queque de naranja",
    category: "Repostería",
    image: "Queque casero de naranja, dos rebanadas-24.png",
    description:
      "Queque de naranja con aroma cítrico y textura esponjosa.",
    label: "Cítrico fresco",
  },
  {
    slug: "queque-zanahoria",
    name: "Queque de zanahoria",
    category: "Repostería",
    image: "Queque de zanahoria casero, dos rebanadas-25.png",
    description:
      "Queque de zanahoria con miga húmeda y sabor delicado.",
    label: "Especial de la casa",
  },
  {
    slug: "rollo-queso",
    name: "Rollo de queso",
    category: "Panadería",
    image: "Rollo de queso boliviano casero-2.png",
    description:
      "Rollo de queso horneado, con una masa suave y dorada.",
    label: "Clásico de panadería",
  },
  {
    slug: "rollo-queso-casero",
    name: "Rollo de queso casero",
    category: "Panadería",
    image: "Rollo de queso casero boliviano-26.png",
    description:
      "Pan casero relleno de queso, horneado hasta quedar dorado.",
    label: "Receta familiar",
  },
  {
    slug: "cupcakes",
    name: "Cupcakes de vainilla",
    category: "Repostería",
    image: "Seis cupcakes caseros de vainilla-5.png",
    description:
      "Cupcakes suaves decorados para celebraciones y momentos especiales.",
    label: "Creatividad y dulzura",
  },
  {
    slug: "flan",
    name: "Flan clásico",
    category: "Postres",
    image: "Tres flanes caseros con caramelo-6.png",
    description:
      "Flan casero de textura suave con caramelo.",
    label: "Receta familiar",
  },
  {
    slug: "tres-leches",
    name: "Pastel tres leches",
    category: "Postres",
    image: "Pastel tres leches casero-3.png",
    description:
      "Bizcochuelo suave con crema y una cubierta delicada de repostería.",
    label: "Suave e irresistible",
  },
  {
    slug: "gelatina-arlequin",
    name: "Gelatina arlequín",
    category: "Postres",
    image: "Gelatina arlequín casera en mosaico-4.png",
    description:
      "Postre colorido de gelatina casera en mosaico.",
    label: "Color y tradición",
  },
];

const featuredProducts = [
  products.find((product) => product.slug === "pan-sarnita"),
  products.find((product) => product.slug === "cunapes"),
  products.find((product) => product.slug === "tres-leches"),
  products.find((product) => product.slug === "cupcakes"),
  products.find((product) => product.slug === "gelatina-arlequin"),
  products.find((product) => product.slug === "flan"),
];

const articles = [
  {
    category: "Consejos",
    title: "Cómo hacer cuñapés caseros perfectos",
    description:
      "Claves para lograr una corteza dorada y un corazón esponjoso, elástico y con auténtico queso criollo.",
    image: "Cuñapés bolivianos caseros, recién horneados-2.png",
    label: "Truco de panadería boliviana",
  },
  {
    category: "Tutoriales",
    title: "Cómo decorar una torta paso a paso",
    description:
      "Técnicas sencillas para cubrir y decorar una torta con crema y detalles hechos en casa.",
    image: "Pastel tres leches casero-3.png",
    label: "Técnica de manga pastelera",
  },
  {
    category: "Consejos",
    title: "Secretos de un buen alfajor",
    description:
      "Una masa suave, un relleno generoso y el tiempo de reposo hacen la diferencia.",
    image: "Seis alfajores caseros de maicena-7.png",
    label: "Punto de masa quebradiza",
  },
  {
    category: "Tutoriales",
    title: "Masa madre y amasado en altura",
    description:
      "Aprende a observar la masa y ajustar el amasado con paciencia en el clima de Cochabamba.",
    image: "Manos que amasan pan casero.png",
    label: "Panadería de altura",
  },
];

window.AleCadeData = { asset, products, featuredProducts, articles };
