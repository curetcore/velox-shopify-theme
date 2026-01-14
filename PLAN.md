# Plan completo: Velox Shopify Theme
## De 0 a Theme Store - Moda/Zapateria

---

## Resumen ejecutivo

| Metrica | Valor |
|---------|-------|
| **Duracion total** | 5-6 meses |
| **Secciones a crear** | 35+ |
| **Snippets a crear** | 40+ |
| **Componentes Tailwind Plus** | 50+ a convertir |
| **Modulos JavaScript** | 15+ |
| **Presets visuales** | 3 (Classic, Urban, Natural) |

---

## Fases del proyecto

| # | Fase | Duracion | Acumulado |
|---|------|----------|-----------|
| 0 | Fundamentos y aprendizaje | 3-5 dias | 5 dias |
| 1 | Sistema de diseno base | 5-7 dias | 12 dias |
| 2 | Header y navegacion | 7-10 dias | 22 dias |
| 3 | Footer | 3-4 dias | 26 dias |
| 4 | Homepage sections | 10-12 dias | 38 dias |
| 5 | Pagina de producto | 12-15 dias | 53 dias |
| 6 | Pagina de coleccion | 10-12 dias | 65 dias |
| 7 | Carrito | 5-7 dias | 72 dias |
| 8 | Paginas de cuenta | 4-5 dias | 77 dias |
| 9 | Paginas de contenido | 5-6 dias | 83 dias |
| 10 | Busqueda | 4-5 dias | 88 dias |
| 11 | Paginas especiales | 3-4 dias | 92 dias |
| 12 | Features premium | 10-12 dias | 104 dias |
| 13 | Optimizacion performance | 5-7 dias | 111 dias |
| 14 | Accesibilidad | 4-5 dias | 116 dias |
| 15 | Presets visuales | 5-7 dias | 123 dias |
| 16 | Traducciones | 3-4 dias | 127 dias |
| 17 | Documentacion | 5-7 dias | 134 dias |
| 18 | Testing y QA | 7-10 dias | 144 dias |
| 19 | Submission al Theme Store | 14-28 dias | 172 dias |

---

## Fase 0: Fundamentos y aprendizaje
**Duracion: 3-5 dias**

### 0.1 Configuracion del entorno
- [ ] Conectar tienda de desarrollo con `shopify theme dev`
- [ ] Configurar hot reload para Tailwind + Liquid
- [ ] Instalar Shopify Theme Check
- [ ] Configurar VS Code con extension Liquid

### 0.2 Aprendizaje de Liquid
- Objetos globales: `shop`, `cart`, `customer`, `product`, `collection`
- Filtros esenciales: `money`, `img_url`, `link_to`, `t`
- Tags de control: `if`, `for`, `paginate`, `form`
- Sections y schemas

### 0.3 Recursos
- https://shopify.dev/docs/storefronts/themes/tools
- https://shopify.dev/docs/api/liquid
- Dawn theme como referencia

---

## Fase 1: Sistema de diseno base
**Duracion: 5-7 dias**

### 1.1 Settings schema completo
Expandir `config/settings_schema.json`:

| Seccion | Settings |
|---------|----------|
| Tipografia | Font primaria, secundaria, tamanos h1-h6 |
| Colores | Primario, secundario, acento, exito, error |
| Botones | Border radius, padding, estilos hover |
| Layout | Ancho maximo, margenes, spacing |
| Animaciones | Duracion, easing, toggle on/off |
| Social | Links redes sociales |
| Favicon | Upload favicon |

### 1.2 Snippets base

| Snippet | Descripcion | Prioridad |
|---------|-------------|-----------|
| `button.liquid` | Botones con variantes | Alta |
| `icon.liquid` | Sistema de iconos SVG | Alta |
| `image.liquid` | Imagenes responsive | Alta |
| `price.liquid` | Precios con formato | Alta |
| `badge.liquid` | Badges (sale, new) | Alta |
| `loading-spinner.liquid` | Estados de carga | Media |

---

## Fase 2: Header y navegacion
**Duracion: 7-10 dias**

### 2.1 Secciones

| Seccion | Tailwind Plus |
|---------|---------------|
| `announcement-bar.liquid` | `banners` |
| `header.liquid` | `headers`, `flyout-menus` |

### 2.2 Funcionalidades del header
- [ ] Logo (imagen o texto)
- [ ] Menu principal con dropdowns
- [ ] Mega menu con imagenes
- [ ] Busqueda predictiva
- [ ] Iconos: cuenta, carrito
- [ ] Carrito drawer
- [ ] Sticky header
- [ ] Mobile menu (drawer)

### 2.3 Snippets

| Snippet | Descripcion |
|---------|-------------|
| `mega-menu.liquid` | Mega menu con columnas |
| `mobile-menu.liquid` | Menu mobile acordeon |
| `search-modal.liquid` | Busqueda predictiva |
| `cart-drawer.liquid` | Drawer del carrito |
| `cart-item.liquid` | Item en carrito |

### 2.4 JavaScript
- `component-header.js`
- `component-mega-menu.js`
- `component-search.js`
- `component-cart-drawer.js`

---

## Fase 3: Footer
**Duracion: 3-4 dias**

### 3.1 Funcionalidades
- [ ] Logo y descripcion
- [ ] Menus en columnas (2-4)
- [ ] Newsletter signup
- [ ] Social links
- [ ] Payment icons
- [ ] Selector pais/moneda
- [ ] Copyright

### 3.2 Tailwind Plus
- `footers` - 4-column-with-newsletter

---

## Fase 4: Homepage sections
**Duracion: 10-12 dias**

### 4.1 Secciones hero

| Seccion | Tailwind Plus |
|---------|---------------|
| `hero-slideshow.liquid` | `heroes` - with-image-background |
| `hero-video.liquid` | Custom |
| `hero-split.liquid` | `heroes` - split-with-image |

### 4.2 Secciones de colecciones

| Seccion | Tailwind Plus |
|---------|---------------|
| `featured-collection.liquid` | `product-lists` |
| `collection-list.liquid` | `category-previews` |
| `lookbook.liquid` | Custom |

### 4.3 Secciones de contenido

| Seccion | Tailwind Plus |
|---------|---------------|
| `rich-text.liquid` | `content-sections` |
| `image-with-text.liquid` | `content-sections` |
| `testimonials.liquid` | `testimonials` |
| `logo-list.liquid` | `logo-clouds` |

### 4.4 Secciones promocionales

| Seccion | Tailwind Plus |
|---------|---------------|
| `promo-banner.liquid` | `promo-sections` |
| `countdown-timer.liquid` | Custom |
| `trust-badges.liquid` | `incentives` |

---

## Fase 5: Pagina de producto
**Duracion: 12-15 dias**

### 5.1 Funcionalidades principales
- [ ] Galeria con zoom
- [ ] Video de producto
- [ ] Variant selector (swatches)
- [ ] Size selector + guia tallas
- [ ] Add to cart AJAX
- [ ] Stock counter
- [ ] Accordion tabs

### 5.2 Tailwind Plus
- `product-overviews` - with-image-gallery
- `radio-groups` - color-picker (swatches)

### 5.3 Snippets de producto

| Snippet | Descripcion |
|---------|-------------|
| `product-card.liquid` | Card reutilizable |
| `product-gallery.liquid` | Galeria imagenes |
| `variant-selector.liquid` | Selector variantes |
| `color-swatch.liquid` | Swatch de color |
| `size-button.liquid` | Boton de talla |
| `quantity-input.liquid` | Input cantidad |
| `stock-counter.liquid` | Contador stock |

### 5.4 Modales

| Modal | Descripcion |
|-------|-------------|
| `quick-view-modal.liquid` | Vista rapida |
| `size-chart-modal.liquid` | Guia de tallas |

---

## Fase 6: Pagina de coleccion
**Duracion: 10-12 dias**

### 6.1 Funcionalidades
- [ ] Header de coleccion
- [ ] Filtros facetados (sidebar/drawer)
- [ ] Ordenamiento
- [ ] Grid productos (2-4 columnas)
- [ ] Paginacion / infinite scroll
- [ ] Vista grid/list toggle

### 6.2 Tailwind Plus
- `category-filters` - sidebar-filters
- `product-lists` - with-color-swatches

### 6.3 Snippets

| Snippet | Descripcion |
|---------|-------------|
| `faceted-filters.liquid` | Filtros API |
| `filter-drawer.liquid` | Drawer mobile |
| `sort-dropdown.liquid` | Ordenamiento |
| `pagination.liquid` | Paginacion |

---

## Fase 7: Carrito
**Duracion: 5-7 dias**

### 7.1 Funcionalidades
- [ ] Lista items con imagen
- [ ] Editar cantidad inline
- [ ] Eliminar items
- [ ] Codigo descuento
- [ ] Subtotal, total
- [ ] Upsell products

### 7.2 Tailwind Plus
- `shopping-carts` - with-order-summary

---

## Fase 8-11: Paginas secundarias
**Duracion: 16-20 dias**

### Cuenta (4-5 dias)
- Login/registro
- Dashboard
- Historial ordenes
- Direcciones

### Contenido (5-6 dias)
- FAQ accordion
- Contacto
- About/Team
- Blog

### Busqueda (4-5 dias)
- Resultados por tipo
- Filtros
- Predictive search

### Especiales (3-4 dias)
- 404
- Password page
- Gift card

---

## Fase 12: Features premium
**Duracion: 10-12 dias**

| Feature | Horas |
|---------|-------|
| Quick View modal | 6-8h |
| Wishlist (localStorage) | 6-8h |
| Recently viewed | 4-5h |
| Size chart modal | 3-4h |
| Sticky add to cart | 4-5h |
| Countdown timer | 3-4h |
| Stock counter | 2-3h |

---

## Fase 13: Performance
**Duracion: 5-7 dias**

### Objetivos Lighthouse

| Metrica | Objetivo | Minimo |
|---------|----------|--------|
| Performance | 70+ | 60+ |
| Accessibility | 95+ | 90+ |
| LCP | < 2.5s | < 4s |
| CLS | < 0.1 | < 0.25 |

### Optimizaciones
- [ ] Critical CSS inline
- [ ] Lazy loading imagenes
- [ ] Code splitting JS
- [ ] Image optimization (WebP)
- [ ] Font preloading

---

## Fase 14: Accesibilidad
**Duracion: 4-5 dias**

### Checklist
- [ ] Skip links
- [ ] Focus visible
- [ ] Alt text en imagenes
- [ ] Labels en formularios
- [ ] Contraste WCAG AA (4.5:1)
- [ ] Keyboard navigation
- [ ] ARIA labels

---

## Fase 15: Presets visuales
**Duracion: 5-7 dias**

### Preset 1: "Classic"
- Colores: Negro, blanco, dorado
- Tipografia: Serif headings
- Target: Zapateria de lujo

### Preset 2: "Urban"
- Colores: Blanco, negro, rojo
- Tipografia: Sans bold
- Target: Sneakers, streetwear

### Preset 3: "Natural"
- Colores: Beige, marron, verde
- Tipografia: Rounded sans
- Target: Zapatos sostenibles

---

## Fase 16-17: Traducciones y documentacion
**Duracion: 8-11 dias**

### Idiomas
- en.default.json (obligatorio)
- es.json
- fr.json (opcional)

### Documentacion
- Getting Started
- Theme Settings
- Sections Guide
- FAQ
- Changelog

---

## Fase 18: Testing y QA
**Duracion: 7-10 dias**

### Testing funcional
- [ ] Header completo
- [ ] Producto (gallery, variants, cart)
- [ ] Coleccion (filters, sort, pagination)
- [ ] Carrito (CRUD items)
- [ ] Checkout flow
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Cross-browser (Chrome, Firefox, Safari, Edge)

### Pre-submission checklist
- [ ] Theme Check: 0 errors
- [ ] Lighthouse Performance >= 60
- [ ] Lighthouse Accessibility >= 90
- [ ] Documentacion completa
- [ ] Demo store configurado

---

## Fase 19: Submission
**Duracion: 2-4 semanas (review Shopify)**

### Requisitos
1. Demo store con contenido profesional
2. Screenshots (1200x800 minimo)
3. Documentacion URL
4. Support email

### Proceso
1. Partner Dashboard > Themes
2. Upload ZIP
3. Completar metadata
4. Submit for review
5. Iterar con feedback

---

## Inventario de entregables

### Secciones (35+)

**Header/Footer (3)**
- announcement-bar
- header
- footer

**Homepage (15)**
- hero-slideshow
- hero-video
- hero-split
- featured-collection
- collection-list
- collection-tabs
- lookbook
- rich-text
- image-with-text
- multicolumn
- testimonials
- logo-list
- video-section
- promo-banner
- countdown-timer
- trust-badges

**Producto (6)**
- product-main
- product-recommendations
- recently-viewed
- product-reviews
- product-faq
- complete-look

**Coleccion (2)**
- collection-header
- collection-main

**Carrito (1)**
- cart-main

**Paginas (8)**
- page-header
- faq-accordion
- contact-form
- store-locator
- about-team
- blog-posts
- article-content
- search-results

### Snippets (40+)

**Base (10)**
- button, icon, image, price, badge
- link, loading-spinner, skeleton-loader
- color-system, typography

**Header (6)**
- mega-menu, mobile-menu, search-modal
- cart-drawer, cart-item, header-icons

**Footer (4)**
- newsletter-form, social-icons
- payment-icons, locale-selector

**Producto (13)**
- product-card, product-gallery, product-thumbnails
- variant-selector, color-swatch, size-button
- quantity-input, add-to-cart-button, stock-counter
- product-badges, product-price, product-rating, share-buttons

**Coleccion (10)**
- collection-card, faceted-filters, filter-drawer
- active-filters, sort-dropdown, pagination
- view-toggle, products-per-page, empty-collection

**Modales (4)**
- quick-view-modal, size-chart-modal
- notify-modal, image-zoom-modal

### JavaScript (15+)
- component-header.js
- component-mega-menu.js
- component-search.js
- component-cart-drawer.js
- component-product-form.js
- component-product-gallery.js
- component-quick-view.js
- component-recently-viewed.js
- component-faceted-filters.js
- component-infinite-scroll.js
- component-cart.js
- component-countdown.js
- component-accordion.js
- component-modal.js
- component-slider.js

---

## Componentes Tailwind Plus a convertir

### Prioridad Alta (Fases 1-6)
- `headers` - 3 variantes
- `flyout-menus` - 2 variantes
- `banners` - 2 variantes
- `footers` - 2 variantes
- `heroes` - 4 variantes
- `product-overviews` - 3 variantes
- `product-lists` - 4 variantes
- `category-filters` - 2 variantes
- `product-quickviews` - 2 variantes
- `shopping-carts` - 2 variantes

### Prioridad Media (Fases 7-11)
- `category-previews` - 2 variantes
- `testimonials` - 2 variantes
- `content-sections` - 3 variantes
- `faq-sections` - 2 variantes
- `contact-sections` - 1 variante
- `blog-sections` - 2 variantes
- `promo-sections` - 2 variantes
- `incentives` - 2 variantes

---

## Links de referencia

- [Shopify Theme Tools](https://shopify.dev/docs/storefronts/themes/tools)
- [Liquid Reference](https://shopify.dev/docs/api/liquid)
- [Theme Store Requirements](https://shopify.dev/docs/storefronts/themes/store/requirements)
- [Dawn Theme](https://github.com/Shopify/dawn)
- [Skeleton Theme](https://github.com/Shopify/skeleton-theme)

---

*Creado para el tema Velox - Moda/Zapateria*
*Autor: Ronaldo Paulino*
