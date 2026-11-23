(() => {
const { asset, products, featuredProducts, articles } = window.AleCadeData;
const shell = document.querySelector(".app-shell");
const panels = [...document.querySelectorAll("[data-page]")];
const order = {
  fullName: "",
  phone: "",
  product: "",
  quantity: "",
  desiredDate: "",
  delivery: "",
  address: "",
  pickupNote: "",
  notes: "",
};
let catalogCategory = "Todos";
let ideaCategory = "Todos";
let searchTerm = "";
let theme = localStorage.getItem("alecade-theme") || "light";

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);

const sectionTitle = (eyebrow, title, description = "", centered = false) => `
  <div class="section-title${centered ? " section-title-centered" : ""}">
    ${eyebrow ? `<span class="eyebrow">${eyebrow}</span>` : ""}
    <h2>${title}</h2>
    ${description ? `<p>${description}</p>` : ""}
  </div>`;

const productCard = (product, compact = false) => `
  <article class="product-card${compact ? " product-card-compact" : ""}">
    <a href="#producto/${encodeURIComponent(product.slug)}" class="product-card-link" aria-label="Ver ficha de ${escapeHtml(product.name)}">
      <div class="product-image-wrap">
        <img src="${asset(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" />
        <span class="product-tag">${escapeHtml(product.category)}</span>
      </div>
      <div class="product-card-copy">
        <span class="product-kicker">${escapeHtml(product.label)}</span>
        <h3>${escapeHtml(product.name)}</h3>
        ${compact ? "" : `<p>${escapeHtml(product.description)}</p>`}
      </div>
      <span class="product-card-action">Consultar precio <span aria-hidden="true">→</span></span>
    </a>
  </article>`;

const productGrid = (list, compact = false) => list.length
  ? `<div class="product-grid${compact ? " product-grid-featured" : ""}">${list.map((product) => productCard(product, compact)).join("")}</div>`
  : `<div class="empty-state" role="status">No encontramos productos con ese nombre. Prueba otra búsqueda.</div>`;

const articleGrid = (list) => `
  <div class="article-grid">
    ${list.map((article) => `
      <article class="article-card">
        <img src="${asset(article.image)}" alt="${escapeHtml(article.title)}" loading="lazy" />
        <div class="article-copy">
          <div class="article-meta"><span>${escapeHtml(article.category)}</span><span>Lectura breve</span></div>
          <span class="eyebrow">${escapeHtml(article.label)}</span>
          <h3>${escapeHtml(article.title)}</h3>
          <p>${escapeHtml(article.description)}</p>
          <details class="article-details">
            <summary>${article.category === "Consejos" ? "Leer tips del secreto" : "Ver guía paso a paso"} <span aria-hidden="true">→</span></summary>
            <p>Empieza con ingredientes a temperatura adecuada, respeta los tiempos de reposo y observa la textura durante la preparación. Cada horno y cada masa pueden necesitar ajustes.</p>
          </details>
        </div>
      </article>`).join("")}
  </div>`;

const featureStrip = (items) => `
  <div class="feature-strip">${items.map((item) => `
    <div class="feature-item"><span class="feature-icon" aria-hidden="true">${item.icon}</span>
      <div><strong>${item.title}</strong><p>${item.description}</p></div>
    </div>`).join("")}</div>`;

function renderHome() {
  document.querySelector('[data-page="home"]').innerHTML = `
    <section class="home-hero">
      <div class="hero-copy">
        <span class="eyebrow eyebrow-on-dark">Cochabamba, Bolivia</span>
        <p class="script-label">Tradición &amp; hogar</p>
        <h1 class="display-title">Dulces momentos que nos unen</h1>
        <p class="hero-description">Panadería y repostería artesanal en Cochabamba, hecha con ingredientes reales, recetas heredadas y mucho cariño familiar en cada horneada.</p>
        <div class="hero-actions"><a href="#productos" class="button button-light">Ver catálogo <span aria-hidden="true">→</span></a><a href="#pedidos" class="button button-outline-light">Personalizar pedido</a></div>
        <div class="hero-points"><span>100% hecho a mano</span><span>Pedidos con anticipación</span></div>
      </div>
      <div class="hero-art">
        <img src="${asset("alecade-bienvenida.png")}" alt="Ilustración de AleCade presentando una bandeja de dulces" />
        <div class="hero-callout"><span class="callout-icon" aria-hidden="true">✦</span><div><strong>Especial Todos Santos</strong><p>Tradiciones cochabambinas también en nuestros dulces.</p></div><a href="#productos">Conoce más →</a></div>
      </div>
    </section>
    <section class="page-section feature-section" aria-label="Lo que nos caracteriza">
      ${featureStrip([
        { icon: "♨", title: "Repostería artesanal", description: "Elaborada a mano, sin procesos industriales acelerados." },
        { icon: "✿", title: "Ingredientes reales", description: "Mantequilla pura, quesos selectos y harinas de calidad." },
        { icon: "♡", title: "Hecho con cariño", description: "El mismo cuidado familiar que se disfruta en casa." },
      ])}
    </section>
    <section class="page-section">
      <div class="section-heading-row">${sectionTitle("Horneado diario", "Nuestros productos", "El sabor de siempre, hecho con tiempo, paciencia y receta de hogar.")}<a href="#productos" class="text-link">Ver catálogo completo <span aria-hidden="true">→</span></a></div>
      ${productGrid(featuredProducts, true)}
    </section>
    <section class="page-section home-story">
      <div class="story-copy">${sectionTitle("Orígenes & pasión", "Nuestra historia horneada en casa")}
        <p>AleCade nació del calor del hogar y del deseo de compartir momentos dulces que perduran en el tiempo. Cada receta de nuestro taller en Cochabamba honra las enseñanzas de nuestras abuelas, utilizando mantequilla noble, huevos de granja y el tiempo exacto de reposo.</p>
        <div class="story-stats"><div><strong>100%</strong><span>Artesanal</span></div><div><strong>48 hrs</strong><span>Elaboración a pedido</span></div></div>
        <a href="#nosotros" class="button button-small">Conoce más sobre nosotros <span aria-hidden="true">→</span></a>
      </div>
      <div class="story-gallery">
        <img src="${asset("Manos que amasan tradición familiar-4.png")}" alt="Manos preparando masa en familia" loading="lazy" />
        <img src="${asset("Decorando una torta casera en familia-5.png")}" alt="Decoración artesanal de una torta" loading="lazy" />
        <img src="${asset("Manos que dan forma al cuñapé-6.png")}" alt="Preparación manual de cuñapés" loading="lazy" />
      </div>
    </section>
    <section class="page-section steps-section">
      ${sectionTitle("Fácil y personal", "Tu pedido paso a paso", "Planificamos cada detalle para que tus celebraciones cochabambinas salgan a la perfección.", true)}
      <div class="steps-grid">
        <article class="step-card"><span>01</span><h3>Elige tus postres o panes</h3><p>Explora nuestra variedad y cuéntanos qué te gustaría compartir.</p></article>
        <article class="step-card"><span>02</span><h3>Cuéntanos los detalles</h3><p>Indica la cantidad y una fecha deseada; revisaremos disponibilidad contigo.</p></article>
        <article class="step-card"><span>03</span><h3>Coordinamos la entrega</h3><p>El modo de entrega y los detalles se confirman al responder tu solicitud.</p></article>
      </div>
      <div class="home-order-panel"><div><span class="eyebrow">Respuesta personalizada</span><h3>¿Tienes una idea especial en mente?</h3><p>Cuéntanos qué imaginas y solicita una cotización sin compromiso.</p></div><a href="#pedidos" class="button">Solicitar cotización <span aria-hidden="true">→</span></a></div>
    </section>
    <section class="page-section home-ideas">
      <div class="section-heading-row">${sectionTitle("Consejos & recetas", "Dulces ideas del taller", "Secretos de cocina, recetas caseras y sugerencias para tus eventos.")}<a href="#ideas" class="text-link">Ver todas las ideas <span aria-hidden="true">→</span></a></div>
      ${articleGrid(articles.slice(0, 3))}
    </section>
    <section class="page-section home-contact-cta"><div><span class="eyebrow eyebrow-on-dark">Atención personalizada</span><h2>¿Tienes alguna consulta o fecha especial?</h2><p>Escríbenos desde el formulario y cuéntanos qué tienes en mente.</p></div><a href="#contacto" class="button button-light">Ir a contacto <span aria-hidden="true">→</span></a></section>`;
}

function renderProducts() {
  const term = searchTerm.trim().toLocaleLowerCase("es");
  const filtered = products.filter((product) =>
    (catalogCategory === "Todos" || product.category === catalogCategory) &&
    (!term || `${product.name} ${product.description} ${product.category}`.toLocaleLowerCase("es").includes(term)),
  );
  const main = document.querySelector('[data-page="products"]');
  main.innerHTML = `
    <section class="catalog-intro"><div><span class="eyebrow">Tradición cochabambina</span><h1 class="display-title">Nuestros productos</h1><p>El sabor de siempre, hecho en casa. Elaboramos cada pieza con recetas familiares e ingredientes nobles que honran el aroma de hogar.</p></div>
      <div class="catalog-promo"><span class="feature-icon" aria-hidden="true">✦</span><div><strong>¿Tienes un evento en mente?</strong><p>Pedidos especiales, mesas y catering.</p></div><a href="#pedidos" class="button button-small">Cotizar</a></div>
    </section>
    <section class="catalog-tools" aria-label="Buscar y filtrar productos">
      <label class="search-field"><span aria-hidden="true">⌕</span><span class="visually-hidden">Buscar productos</span><input id="product-search" type="search" value="${escapeHtml(searchTerm)}" placeholder="Buscar pan, queque, torta, cuñapé..." /></label>
      <span class="catalog-count" aria-live="polite">${filtered.length} ${filtered.length === 1 ? "producto" : "productos"}</span>
    </section>
    <div class="category-list" role="group" aria-label="Filtrar por categoría">
      ${["Todos", "Panadería", "Repostería", "Postres"].map((item) => `<button type="button" class="category-button${catalogCategory === item ? " is-selected" : ""}" data-category="${item}" aria-pressed="${catalogCategory === item}">${item}${item !== "Todos" ? `<span>${products.filter((product) => product.category === item).length}</span>` : ""}</button>`).join("")}
    </div>
    <section class="catalog-results" aria-label="Catálogo de productos">${productGrid(filtered)}</section>
    <section class="catalog-cta"><div><span class="eyebrow eyebrow-on-dark">Atención dedicada en Cochabamba</span><h2>Personalizamos tu pedido para cualquier ocasión</h2><p>Consulta disponibilidad y precio según el producto y la cantidad.</p></div><a href="#pedidos" class="button button-light">Personalizar pedido <span aria-hidden="true">→</span></a></section>`;
}

function renderProduct(product) {
  const main = document.querySelector('[data-page="product"]');
  if (!product) {
    main.innerHTML = `<section class="not-found-hero"><span class="eyebrow eyebrow-on-dark">Producto no encontrado</span><h1>Ups</h1><p>No encontramos ese producto en nuestro catálogo.</p><div class="not-found-actions"><a href="#productos" class="button button-light">Volver al catálogo</a></div></section>`;
    return;
  }
  main.innerHTML = `
    <div class="breadcrumb"><a href="#productos">Productos</a><span aria-hidden="true">/</span><span>${escapeHtml(product.name)}</span></div>
    <section class="product-detail">
      <div class="detail-image"><img src="${asset(product.image)}" alt="${escapeHtml(product.name)}" /><span class="product-tag">${escapeHtml(product.category)}</span></div>
      <div class="detail-copy"><span class="eyebrow">${escapeHtml(product.label)}</span><h1 class="display-title">${escapeHtml(product.name)}</h1><p>${escapeHtml(product.description)}</p>
        <div class="price-note"><span>Precio</span><strong>Consultar precio</strong></div><p class="detail-availability">El precio y la disponibilidad se confirman con AleCade según tu solicitud.</p>
        <button type="button" class="button" data-quote="${escapeHtml(product.slug)}">Solicitar cotización <span aria-hidden="true">→</span></button><a href="#productos" class="text-link back-link">← Volver al catálogo</a>
      </div>
    </section>`;
}

function renderDeliveryFields() {
  const container = document.getElementById("delivery-fields");
  if (!container) return;
  container.innerHTML = order.delivery === "delivery"
    ? `<div class="field"><label for="order-address">Zona y dirección de entrega <span aria-hidden="true">*</span></label><textarea id="order-address" rows="3" placeholder="Indica la zona y una referencia para coordinar">${escapeHtml(order.address)}</textarea><small>No se calcula un costo de envío en esta solicitud.</small><span class="field-error" data-error="address"></span></div>`
    : order.delivery === "pickup"
      ? `<div class="field"><label for="order-pickup-note">Referencia para coordinar el recojo <span class="optional-label">(opcional)</span></label><input id="order-pickup-note" value="${escapeHtml(order.pickupNote)}" placeholder="Si tienes alguna preferencia, cuéntanos" /></div>`
      : "";
}

function renderOrder() {
  document.querySelector('[data-page="orders"]').innerHTML = `
    <section class="order-hero"><div class="order-hero-art"><img src="${asset("alecade-pedidos.png")}" alt="Ilustración de la repostera AleCade con un pedido" /></div>
      <div class="order-hero-copy"><span class="eyebrow eyebrow-on-dark">Servicio exclusivo por encargo</span><h1 class="display-title">Cuéntanos tu idea</h1><p>Hagamos juntos algo auténtico y memorable. Personaliza tu pedido con recetas de tradición familiar y solicita una cotización.</p>
        <div class="order-benefits"><div><span aria-hidden="true">▤</span><strong>Personalizar pedido</strong><small>Diseños y gustos a medida</small></div><div><span aria-hidden="true">◷</span><strong>Solicitar cotización</strong><small>Precio a confirmar</small></div><div><span aria-hidden="true">✉</span><strong>Déjanos tu consulta</strong><small>Respuesta personalizada</small></div></div>
      </div>
    </section>
    <section class="order-products page-section"><div class="section-heading-row">${sectionTitle("Hecho en casa", "Especialidades a pedido", "Productos para inspirarte. Selecciona uno para ver su ficha o solicitar cotización.")}<a href="#productos" class="text-link">Ver catálogo completo <span aria-hidden="true">→</span></a></div>${productGrid(featuredProducts.slice(0, 4), true)}</section>
    <section class="page-section order-form-section">
      <div class="order-form-column"><div class="form-heading"><span class="eyebrow">Paso 1 de 2 · Tu solicitud</span><h2>Solicita tu cotización</h2><p>Completa el formulario y AleCade confirmará precio y disponibilidad.</p></div>
        <form class="form-card" id="order-form" novalidate>
          <div class="field"><label for="order-name">Nombre completo <span aria-hidden="true">*</span></label><input id="order-name" autocomplete="name" value="${escapeHtml(order.fullName)}" placeholder="Ej. Mariana Rojas" /><span class="field-error" data-error="fullName"></span></div>
          <div class="field"><label for="order-phone">WhatsApp o teléfono <span aria-hidden="true">*</span></label><input id="order-phone" type="tel" autocomplete="tel" value="${escapeHtml(order.phone)}" placeholder="Ej. 7xxxxxxx" /><small>Incluye el código de país si corresponde.</small><span class="field-error" data-error="phone"></span></div>
          <div class="form-row"><div class="field"><label for="order-product">Producto <span aria-hidden="true">*</span></label><select id="order-product"><option value="">Selecciona un producto</option>${products.map((product) => `<option value="${escapeHtml(product.name)}"${order.product === product.name ? " selected" : ""}>${escapeHtml(product.name)}</option>`).join("")}<option value="Pedido personalizado"${order.product === "Pedido personalizado" ? " selected" : ""}>Pedido personalizado</option></select><span class="field-error" data-error="product"></span></div>
            <div class="field"><label for="order-quantity">Cantidad / porciones <span aria-hidden="true">*</span></label><input id="order-quantity" type="number" min="1" step="1" value="${escapeHtml(order.quantity)}" placeholder="Ej. 2 docenas" /><span class="field-error" data-error="quantity"></span></div></div>
          <div class="field"><label for="order-date">Fecha deseada <span class="optional-label">(opcional)</span></label><input id="order-date" type="date" value="${escapeHtml(order.desiredDate)}" /><small>La fecha está sujeta a confirmación de disponibilidad.</small></div>
          <fieldset class="field delivery-fieldset"><legend>¿Cómo quieres recibir tu pedido? <span aria-hidden="true">*</span></legend><div class="delivery-options">
            <label class="delivery-option${order.delivery === "pickup" ? " is-selected" : ""}"><input type="radio" name="delivery" value="pickup"${order.delivery === "pickup" ? " checked" : ""} /><span><strong>Recojo coordinado</strong><small>Coordinaremos los detalles contigo.</small></span></label>
            <label class="delivery-option${order.delivery === "delivery" ? " is-selected" : ""}"><input type="radio" name="delivery" value="delivery"${order.delivery === "delivery" ? " checked" : ""} /><span><strong>Envío a domicilio</strong><small>La cobertura se confirma al responder.</small></span></label>
          </div><span class="field-error" data-error="delivery"></span></fieldset>
          <div id="delivery-fields"></div>
          <div class="field"><label for="order-notes">Detalles del pedido <span class="optional-label">(opcional)</span></label><textarea id="order-notes" rows="4" placeholder="Cuéntanos sobre sabores, decoración o algún detalle especial">${escapeHtml(order.notes)}</textarea></div>
          <p class="form-disclaimer">Esta página funciona sin servidor: enviar no transmite tus datos. La solicitud y el resumen son una simulación.</p>
          <button type="submit" class="button button-full">Revisar solicitud <span aria-hidden="true">→</span></button>
        </form>
      </div>
      <aside class="order-aside"><div class="aside-card aside-highlight"><span class="eyebrow">Atención personalizada</span><h3>¿Tienes una fecha muy próxima?</h3><p>Indícala en el formulario para que podamos revisar la disponibilidad.</p></div>
        <div class="aside-card"><h3>Hecho a mano en Cochabamba</h3><ul class="check-list"><li>Recetas familiares y elaboración artesanal.</li><li>Ingredientes seleccionados para cada preparación.</li><li>Precio y disponibilidad confirmados con AleCade.</li></ul></div>
        <details class="faq-card"><summary>¿Con cuánta anticipación debo pedir?</summary><p>La disponibilidad se revisa al recibir la solicitud; no se confirma un plazo automático.</p></details>
        <details class="faq-card"><summary>¿Cómo se confirma el pedido?</summary><p>Verás un resumen simulado. No se envía un pedido real.</p></details>
      </aside>
    </section>`;
  renderDeliveryFields();
}

function renderConfirmation() {
  const deliveryLabel = order.delivery === "delivery" ? "Envío a domicilio" : "Recojo coordinado";
  const rows = [
    ["Nombre", order.fullName],
    ["Producto", order.product],
    ["Cantidad", order.quantity],
    ["Entrega", deliveryLabel],
    ...(order.desiredDate ? [["Fecha deseada", order.desiredDate]] : []),
    ...(order.delivery === "delivery" && order.address ? [["Zona / dirección", order.address]] : []),
  ];
  document.querySelector('[data-page="confirmation"]').innerHTML = `
    <section class="confirmation-card"><span class="confirmation-icon" aria-hidden="true">✓</span><span class="eyebrow">Paso 2 · Revisión local</span><h1 class="display-title">Resumen de tu solicitud</h1>
      <p class="confirmation-lead">Esta es una simulación para revisar el recorrido. No se envió ningún pedido ni se compartieron tus datos.</p>
      <dl class="confirmation-summary">${rows.map(([label, value]) => `<div><dt>${label}</dt><dd>${escapeHtml(value || "—")}</dd></div>`).join("")}</dl>
      <div class="simulation-note">El precio y la disponibilidad se confirmarían directamente con AleCade antes de aceptar el pedido.</div>
      <div class="confirmation-actions"><a href="#productos" class="button">Volver al catálogo</a><a href="#inicio" class="text-link">Ir al inicio</a></div>
    </section>`;
}

function renderAbout() {
  document.querySelector('[data-page="about"]').innerHTML = `
    <section class="about-hero"><div><span class="eyebrow eyebrow-on-dark">Dulce herencia · Cochabamba</span><h1 class="display-title">Nuestra historia</h1><p class="script-label">Tradición, hogar y amor en cada masa</p>
      <p>AleCade nace del amor por la repostería casera y la tradición de compartir momentos únicos. Inspirados en los recuerdos de las abuelas y la calidez de la cocina tradicional cochabambina, cada masa y glaseado es parte de una dulce historia que seguimos creando con esmero en cada horneada.</p>
      <a href="#productos" class="button button-light">Conoce nuestros productos <span aria-hidden="true">→</span></a></div>
      <img src="${asset("alecade-nosotros.png")}" alt="Ilustración de la repostera AleCade con una bandeja de pan" />
    </section>
    <section class="page-section">${featureStrip([{ icon: "♨", title: "100% artesanal", description: "Elaborado a mano y sin procesos industriales." }, { icon: "◷", title: "48 h por encargo", description: "La disponibilidad se confirma al coordinar." }, { icon: "✿", title: "Ingredientes", description: "Mantequilla, huevos frescos y frutos locales." }])}</section>
    <section class="page-section workshop-section">${sectionTitle("Vocación & esmero", "El corazón de nuestro taller", "Una mirada íntima a nuestras raíces familiares y el oficio diario.")}
      <div class="workshop-grid">
        <article class="workshop-card"><img src="${asset("Manos que amasan tradición familiar-4.png")}" alt="Un sueño con raíces en la familia" loading="lazy" /><div><span class="eyebrow">Historia</span><h3>Un sueño con raíces en la familia</h3><p>Nació en la cocina del hogar, donde el aroma a vainilla congregaba a todos.</p></div></article>
        <article class="workshop-card"><img src="${asset("Decorando una torta casera en familia-5.png")}" alt="Pasión y dedicación en cada detalle" loading="lazy" /><div><span class="eyebrow">Chef / repostera</span><h3>Pasión y dedicación en cada detalle</h3><p>Cada torta, cupcake y relleno se trabaja minuciosamente, respetando la receta que nos inspira.</p></div></article>
        <article class="workshop-card"><img src="${asset("Manos que dan forma al cuñapé-6.png")}" alt="Ingredientes reales y elaboración artesanal" loading="lazy" /><div><span class="eyebrow">Nuestro proceso</span><h3>Ingredientes reales y elaboración artesanal</h3><p>Seleccionamos ingredientes para hornear con cuidado y compartir frescura en cada entrega.</p></div></article>
      </div>
    </section>
    <section class="page-section mission-section">${sectionTitle("Propósito & camino", "Hacia dónde caminamos", "La convicción que orienta cada amanecer entre harina, canela y brasas en Cochabamba.", true)}
      <div class="mission-grid"><article><span aria-hidden="true">⚑</span><span class="eyebrow">Compromiso</span><h3>Nuestra misión</h3><p>Ofrecer productos de panadería y repostería elaborados artesanalmente, combinando recetas tradicionales e internacionales con dedicación y cuidado.</p></article><article><span aria-hidden="true">◉</span><span class="eyebrow">Futuro</span><h3>Nuestra visión</h3><p>Consolidarnos como un emprendimiento reconocido en Cochabamba por la calidad, variedad y sabor de sus productos.</p></article></div>
    </section>
    <section class="page-section values-section">${sectionTitle("Nuestra esencia", "Valores que nos guían", "Principios que aplicamos desde la selección de cada ingrediente hasta la entrega.", true)}
      <div class="values-grid"><article><span>♡</span><h3>Dedicación</h3><p>Cuidamos cada proceso con tiempo, detalle y esmero.</p></article><article><span>✦</span><h3>Calidad</h3><p>Usamos ingredientes seleccionados para cada preparación.</p></article><article><span>◉</span><h3>Confianza</h3><p>Trabajamos con transparencia en cada pedido coordinado.</p></article><article><span>✎</span><h3>Creatividad</h3><p>Personalizamos sabores y presentaciones para celebrar.</p></article></div>
    </section>
    <section class="page-section home-contact-cta about-cta"><div><span class="eyebrow eyebrow-on-dark">¿Listo para endulzar tu día?</span><h2>Explora nuestras recetas de hogar</h2><p>Descubre nuestra variedad de panes artesanales, tortas y postres.</p></div><a href="#productos" class="button button-light">Ver nuestros productos <span aria-hidden="true">→</span></a></section>`;
}

function renderIdeas() {
  const list = articles.filter((article) => ideaCategory === "Todos" || article.category === ideaCategory);
  document.querySelector('[data-page="ideas"]').innerHTML = `
    <section class="ideas-intro"><span class="eyebrow">Recetario & secretos artesanales</span><h1 class="display-title">Dulces ideas</h1><p>Consejos prácticos, técnicas heredadas y tutoriales paso a paso para endulzar tus momentos con la calidez de nuestro horno tradicional en Cochabamba.</p>
      <div class="category-list" role="group" aria-label="Filtrar ideas">${["Todos", "Consejos", "Tutoriales"].map((item) => `<button type="button" class="category-button${ideaCategory === item ? " is-selected" : ""}" data-idea-category="${item}" aria-pressed="${ideaCategory === item}">${item}</button>`).join("")}</div>
    </section>
    <section class="page-section ideas-content">${articleGrid(list)}</section>
    <section class="page-section altitude-section">${sectionTitle("Ciencia y magia pastelera", "El balance clásico y el factor altitud", "En los valles cochabambinos, la física del horno cambia. Conoce algunas claves para lograr tus preparaciones.", true)}
      <div class="altitude-grid"><article><span>Proporción áurea</span><h3>Regla de los 4 cuartos</h3><p>Harina, mantequilla, azúcar y huevos frescos en equilibrio para una base de bizcocho.</p></article><article><span>Microclima del valle</span><h3>Observa la masa</h3><p>La altura y la humedad pueden influir en el horneado. Ajusta con paciencia y según la receta.</p></article><article><span>Paciencia artesanal</span><h3>El reposo</h3><p>El tiempo de reposo ayuda a que las masas y rellenos se asienten antes de hornear.</p></article></div>
    </section>
    <section class="page-section home-contact-cta"><div><span class="eyebrow eyebrow-on-dark">¿Tienes una fecha especial?</span><h2>Horneamos algo para ti</h2><p>Cuéntanos qué te gustaría preparar y solicita una cotización.</p></div><a href="#pedidos" class="button button-light">Hacer un pedido especial <span aria-hidden="true">→</span></a></section>`;
}

function renderContact() {
  document.querySelector('[data-page="contact"]').innerHTML = `
    <section class="contact-intro"><span class="eyebrow">Atención directa & personalizada</span><h1 class="display-title">Hablemos</h1><p>Estamos para ayudarte con tus pedidos artesanales y resolver tus consultas con la calidez de siempre.</p></section>
    <section class="contact-layout page-section"><div class="contact-form-column">
      <form class="form-card contact-form" id="contact-form" novalidate><div class="form-heading"><span class="eyebrow">Mensaje directo</span><h2>Escríbenos tu consulta</h2></div><p id="contact-success" class="success-message" role="status" hidden>Consulta guardada solo en esta simulación local. No se envió a AleCade.</p>
        <div class="field"><label for="contact-name">Nombre completo <span aria-hidden="true">*</span></label><input id="contact-name" autocomplete="name" placeholder="Ej. María Elena Rojas" /><span class="field-error" data-contact-error="name"></span></div>
        <div class="field"><label for="contact-reply">WhatsApp o correo de contacto <span aria-hidden="true">*</span></label><input id="contact-reply" placeholder="Tu teléfono o correo electrónico" /><small>El formulario es una simulación; no enviaremos los datos.</small><span class="field-error" data-contact-error="replyTo"></span></div>
        <div class="form-row"><div class="field"><label for="contact-topic">Tipo de consulta</label><select id="contact-topic"><option value="">Selecciona una opción</option><option>Pedido para evento</option><option>Disponibilidad de productos</option><option>Otra consulta</option></select></div><div class="field"><label for="contact-date">Fecha aproximada</label><input id="contact-date" type="date" /></div></div>
        <div class="field"><label for="contact-message">Mensaje o detalles del pedido <span aria-hidden="true">*</span></label><textarea id="contact-message" rows="5" placeholder="Cuéntanos qué producto deseas, cantidad estimada o cualquier detalle especial..."></textarea><span class="field-error" data-contact-error="message"></span></div>
        <button class="button button-full" type="submit">Guardar consulta de prueba <span aria-hidden="true">→</span></button>
      </form>
      <div class="contact-prompt"><span aria-hidden="true">✉</span><div><strong>Atención personalizada</strong><p>Los enlaces oficiales de contacto no están disponibles en los archivos.</p></div></div>
    </div>
    <aside class="location-column"><div class="location-card"><span class="eyebrow">Ubicación y cobertura</span><h2>Zona de referencia</h2><p class="location-name">Cochabamba, Bolivia</p><p>La ubicación exacta y la cobertura deben confirmarse directamente con AleCade.</p>
      <div class="map-placeholder" role="img" aria-label="Ilustración de referencia de Cochabamba, Bolivia; no representa un pin exacto del negocio"><span class="map-label">Cochabamba</span><span class="map-pin" aria-hidden="true">●</span><span class="map-road road-one" aria-hidden="true"></span><span class="map-road road-two" aria-hidden="true"></span><span class="map-road road-three" aria-hidden="true"></span><span class="map-suburb">Bolivia · zona referencial</span></div>
      <a class="button button-full maps-button" href="https://www.google.com/maps/search/?api=1&amp;query=Cochabamba%2C%20Bolivia" target="_blank" rel="noreferrer">Ver ubicación en Google Maps <span aria-hidden="true">↗</span></a><small>El enlace abre la ciudad como referencia, no un pin verificado del negocio.</small>
    </div><div class="social-card"><span class="eyebrow">Comunidad y fotos diarias</span><h2>Síguenos en redes sociales</h2><div class="social-tags"><span>Instagram</span><span>Facebook</span></div><p>Los enlaces de las cuentas oficiales no venían en los recursos disponibles.</p></div></aside></section>
    <section class="page-section contact-gallery"><div class="section-heading-row">${sectionTitle("Inspiración de nuestro horno", "Nuestra galería", "Momentos horneados con dedicación artesanal y recetas auténticas.")}<a href="#productos" class="text-link">Ver catálogo de productos →</a></div>${productGrid(featuredProducts, true)}</section>`;
}

function renderNotFound() {
  document.querySelector('[data-page="notFound"]').innerHTML = `
    <section class="not-found-hero"><img src="${asset("alecade-error404.png")}" alt="Ilustración de AleCade junto a una caja vacía" /><span class="eyebrow eyebrow-on-dark">Receta no encontrada</span><h1>404</h1><h2>Esta página se nos perdió entre las recetas</h2><p>El enlace no existe o cambió de lugar. No te preocupes, el horno sigue encendido y nuestras delicias te esperan.</p><div class="not-found-actions"><a href="#inicio" class="button button-light">Ir al inicio</a><a href="#productos" class="button button-brick">Volver al catálogo <span aria-hidden="true">→</span></a></div></section>
    <section class="page-section">${sectionTitle("Recién horneado", "Llévate una delicia mientras exploras")}${productGrid(featuredProducts.slice(0, 3), true)}</section>`;
}

function currentRoute() {
  const route = decodeURIComponent(location.hash.slice(1) || "inicio");
  if (route.startsWith("producto/")) return { page: "product", product: products.find((item) => item.slug === route.slice("producto/".length)), key: "products" };
  const routes = { inicio: "home", productos: "products", pedidos: "orders", confirmacion: "confirmation", nosotros: "about", ideas: "ideas", contacto: "contact" };
  const page = routes[route] || "notFound";
  return { page, key: page === "confirmation" ? "orders" : page };
}

function navigate() {
  const route = currentRoute();
  panels.forEach((panel) => { panel.hidden = panel.dataset.page !== route.page; });
  document.querySelectorAll("[data-route]").forEach((link) => {
    const active = link.dataset.route === route.key;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  if (route.page === "products") renderProducts();
  if (route.page === "product") renderProduct(route.product);
  if (route.page === "orders") renderOrder();
  if (route.page === "confirmation") renderConfirmation();
  if (route.page === "about") renderAbout();
  if (route.page === "ideas") renderIdeas();
  if (route.page === "contact") renderContact();
  if (route.page === "notFound") renderNotFound();
  document.querySelector(".mobile-menu").hidden = true;
  document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
  document.querySelector(".menu-toggle").setAttribute("aria-label", "Abrir menú");
  document.querySelector(".menu-toggle span").textContent = "☰";
  window.scrollTo(0, 0);
}

function setOrderValue(field, value) {
  order[field] = value;
  const error = document.querySelector(`[data-error="${field}"]`);
  if (error) error.textContent = "";
}

function submitOrder(event) {
  event.preventDefault();
  const errors = {};
  if (!order.fullName.trim()) errors.fullName = "Escribe tu nombre completo.";
  if (!order.phone.trim()) errors.phone = "Indica un teléfono o WhatsApp.";
  else if (order.phone.replace(/[^\d]/g, "").length < 7) errors.phone = "Revisa el número; debe tener al menos 7 dígitos.";
  if (!order.product) errors.product = "Selecciona un producto.";
  if (!order.quantity || Number(order.quantity) < 1) errors.quantity = "Indica una cantidad mayor que cero.";
  if (!order.delivery) errors.delivery = "Elige cómo quieres recibir tu pedido.";
  if (order.delivery === "delivery" && !order.address.trim()) errors.address = "Indica la zona y dirección para coordinar la entrega.";
  document.querySelectorAll("[data-error]").forEach((node) => { node.textContent = errors[node.dataset.error] || ""; });
  if (Object.keys(errors).length) {
    const firstError = document.querySelector(".field-error:not(:empty)");
    if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  location.hash = "confirmacion";
}

function submitContact(event) {
  event.preventDefault();
  const values = {
    name: document.getElementById("contact-name").value.trim(),
    replyTo: document.getElementById("contact-reply").value.trim(),
    message: document.getElementById("contact-message").value.trim(),
  };
  const errors = {
    name: values.name ? "" : "Escribe tu nombre.",
    replyTo: values.replyTo ? "" : "Indica un medio para poder responderte.",
    message: values.message ? "" : "Cuéntanos brevemente tu consulta.",
  };
  Object.entries(errors).forEach(([field, message]) => {
    document.querySelector(`[data-contact-error="${field}"]`).textContent = message;
  });
  const invalid = Object.values(errors).some(Boolean);
  document.getElementById("contact-success").hidden = invalid;
}

function updateTheme() {
  shell.dataset.theme = theme;
  const dark = theme === "dark";
  document.querySelector(".brand-link img").src = dark ? "./img/logohorizontal-crema.png" : "./img/logohorizontal-guindo.png";
  document.querySelector(".theme-toggle").innerHTML = `<span aria-hidden="true">${dark ? "☀" : "☾"}</span><span class="theme-label">${dark ? "Modo claro" : "Modo oscuro"}</span>`;
  document.querySelector(".theme-toggle").setAttribute("aria-label", dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
}

renderHome();
renderProducts();
renderAbout();
renderIdeas();
renderContact();
renderNotFound();
document.getElementById("current-year").textContent = new Date().getFullYear();
updateTheme();
renderDeliveryFields();
navigate();

window.addEventListener("hashchange", navigate);
document.querySelector(".theme-toggle").addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  localStorage.setItem("alecade-theme", theme);
  updateTheme();
});
document.querySelector(".menu-toggle").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const menu = document.getElementById("mobile-menu");
  menu.hidden = !menu.hidden;
  button.setAttribute("aria-expanded", String(!menu.hidden));
  button.setAttribute("aria-label", menu.hidden ? "Abrir menú" : "Cerrar menú");
  button.querySelector("span").textContent = menu.hidden ? "☰" : "×";
});
document.addEventListener("click", (event) => {
  const quoteButton = event.target.closest("[data-quote]");
  if (quoteButton) {
    const product = products.find((item) => item.slug === quoteButton.dataset.quote);
    if (product) {
      order.product = product.name;
      location.hash = "pedidos";
    }
    return;
  }
  const categoryButton = event.target.closest("[data-category]");
  if (categoryButton) {
    catalogCategory = categoryButton.dataset.category;
    renderProducts();
    document.getElementById("product-search").focus();
    return;
  }
  const ideaButton = event.target.closest("[data-idea-category]");
  if (ideaButton) {
    ideaCategory = ideaButton.dataset.ideaCategory;
    renderIdeas();
  }
});
document.addEventListener("input", (event) => {
  if (event.target.id === "product-search") {
    searchTerm = event.target.value;
    const position = event.target.selectionStart;
    renderProducts();
    const input = document.getElementById("product-search");
    input.focus();
    input.setSelectionRange(position, position);
    return;
  }
  const fields = {
    "order-name": "fullName",
    "order-phone": "phone",
    "order-quantity": "quantity",
    "order-date": "desiredDate",
    "order-address": "address",
    "order-pickup-note": "pickupNote",
    "order-notes": "notes",
  };
  if (fields[event.target.id]) setOrderValue(fields[event.target.id], event.target.value);
});
document.addEventListener("change", (event) => {
  if (event.target.id === "order-product") setOrderValue("product", event.target.value);
  if (event.target.name === "delivery") {
    order.delivery = event.target.value;
    renderDeliveryFields();
    document.querySelectorAll(".delivery-option").forEach((label) => {
      label.classList.toggle("is-selected", label.querySelector("input").checked);
    });
  }
});
document.addEventListener("submit", (event) => {
  if (event.target.id === "order-form") submitOrder(event);
  if (event.target.id === "contact-form") submitContact(event);
});
})();
