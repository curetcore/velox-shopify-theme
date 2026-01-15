# Velox - Shopify Theme

## Descripción
Tema premium de Shopify para tiendas de moda/calzado. Diseñado para conversión y experiencia de usuario excepcional.

---

## Los 10 mandamientos de Velox

> **REGLAS INVIOLABLES** - Aplicar en cada decisión de desarrollo.

| # | Mandamiento | Razón |
|---|-------------|-------|
| 1 | **No reinventar la rueda** | Siempre usar Tailwind Plus MCP primero. Componentes probados > código custom |
| 2 | **Theme Store ready desde el día 1** | Seguir guidelines de Shopify desde el inicio. Sin atajos |
| 3 | **100% antes de continuar** | Terminar cada sección completamente antes de pasar a la siguiente |
| 4 | **Máxima personalización** | Exponer TODAS las opciones posibles en settings del schema |
| 5 | **Mobile-first obligatorio** | Diseñar para móvil primero, escalar a desktop después |
| 6 | **Accesibilidad WCAG 2.1 AA** | aria-labels, contraste 4.5:1, navegación por teclado |
| 7 | **Performance < 3s LCP** | Lazy load, critical CSS, defer JS, optimizar imágenes |
| 8 | **Zero hardcoded text** | Todo texto en `locales/`, siempre usar filtro `\| t` |
| 9 | **Probar antes de completar** | Preview real en tienda antes de marcar como terminado |
| 10 | **Documentar cada cambio** | CLAUDE.md siempre actualizado con el estado actual |

### Flujo de desarrollo obligatorio

```
1. Buscar componente en Tailwind Plus MCP
2. Si existe → Adaptar a Liquid con prefijo tw-
3. Si no existe → Crear con aprobación
4. Agregar TODAS las opciones al schema
5. Agregar traducciones en/es
6. Probar en preview
7. Documentar en CLAUDE.md
```

---

## Herramientas MCP

### Tailwind Plus (OBLIGATORIO)
Antes de crear cualquier componente UI, buscar primero en Tailwind Plus:

```
mcp__tailwind-plus__search        # Buscar componentes
mcp__tailwind-plus__list_blocks   # Ver bloques por categoría
mcp__tailwind-plus__list_variants # Ver variantes de un bloque
mcp__tailwind-plus__get_variant   # Obtener código del componente
```

**Categorías disponibles**: `marketing`, `application-ui`, `ecommerce`

---

## Stack técnico

| Categoría | Tecnología |
|-----------|------------|
| Plataforma | Shopify Online Store 2.0 |
| Templating | Liquid |
| CSS | Tailwind CSS v3.4 (prefijo `tw-`) |
| Icons | Heroicons (SVG inline) |
| JavaScript | Vanilla JS (sin frameworks) |

---

## Estructura del proyecto

```
velox-shopify-theme/
├── assets/           # CSS, JS, imágenes estáticas
├── config/           # settings_schema.json, settings_data.json
├── layout/           # theme.liquid (layout principal)
├── locales/          # Traducciones (es.json, en.default.json)
├── sections/         # Secciones modulares
├── snippets/         # Componentes reutilizables
└── templates/        # Templates JSON para páginas
```

---

## Convenciones de código

### CSS
- Prefijo `tw-` obligatorio para todas las clases de Tailwind
- Variables CSS definidas en `snippets/css-variables.liquid`
- Colores: `velox-50` a `velox-950`, `velox-accent`
- Estilos críticos en `assets/critical.css`

### Liquid
- Comentarios en español
- Variables descriptivas en inglés
- Usar `{% liquid %}` para lógica compleja
- Siempre incluir `{{ block.shopify_attributes }}` en bloques

### Secciones
- Schema siempre al final del archivo
- Incluir `presets` para el editor de temas
- Categorías: `Hero`, `Product`, `Collection`, `Text`, `Media`, `Social`

---

## Sistema de diseño

### Colores (variables CSS)
```css
--color-foreground      /* Texto principal */
--color-background      /* Fondo principal */
--color-secondary       /* Fondo secundario */
--color-accent          /* Color de acento/CTA */
--color-sale            /* Precio de oferta */
```

### Tipografía
```css
--font-primary--family  /* Fuente principal */
--font-heading--family  /* Fuente de títulos */
```

### Espaciado
```css
--page-width            /* Ancho máximo del contenido */
--page-margin           /* Margen lateral */
--section-spacing       /* Espaciado entre secciones */
```

---

## Secciones disponibles

### Header group
- `announcement-bar.liquid` - Barra de anuncios
- `header.liquid` - Header principal con navegación

### Homepage
- `hero-simple.liquid` - Hero section
- `slideshow.liquid` - Carrusel de imágenes hero
- `featured-collection.liquid` - Grid de productos
- `collection-list.liquid` - Grid de colecciones
- `image-with-text.liquid` - Imagen con texto promocional
- `rich-text.liquid` - Contenido de texto enriquecido
- `multicolumn.liquid` - Features/beneficios
- `featured-product.liquid` - Producto destacado
- `video.liquid` - Embed de video
- `testimonials.liquid` - Testimonios de clientes
- `logo-list.liquid` - Logos de marcas/partners
- `countdown.liquid` - Contador regresivo para ofertas

### Footer group
- `footer.liquid` - Footer completo

### Cart
- `cart.liquid` - Página de carrito (multi-estilo)
  - Layouts: two_column, single_column
  - Free shipping progress bar
  - Controles de cantidad +/-
  - Cart note con auto-save
  - Order summary con descuentos
  - AJAX para actualizaciones sin recarga

### Customer account
- `main-login.liquid` - Login con recuperar contraseña
- `main-register.liquid` - Formulario de registro
- `main-account.liquid` - Dashboard con historial de pedidos
- `main-order.liquid` - Detalle de pedido individual
- `main-addresses.liquid` - Gestión de direcciones (CRUD)

### Search
- `main-search.liquid` - Página de resultados de búsqueda
  - Filtros por tipo (productos, artículos, páginas)
  - Resultados agrupados con imágenes
  - Paginación integrada
  - Estado inicial con colecciones populares
  - Empty state con sugerencias

### Gift card
- `gift_card.liquid` - Página de tarjeta de regalo (template)
  - Diseño visual con gradiente de colores
  - Código con botón de copiar (Clipboard API)
  - Soporte QR code
  - Integración Apple Wallet
  - Estilos de impresión optimizados

### Password
- `password.liquid` - Página de tienda protegida (section)
  - Layout: `layout/password.liquid`
  - Esquemas de color: light, dark
  - Imagen de fondo con overlay
  - Links a redes sociales
  - Enlace de login para admin

### Content pages
- `main-blog.liquid` - Listado de artículos del blog
  - Grid responsivo (1/2/3 columnas)
  - Tags, autor, fecha, tiempo de lectura
  - Paginación integrada
  - Empty state
- `main-article.liquid` - Artículo individual
  - Hero image opcional
  - Breadcrumb, autor, fecha, tiempo lectura
  - Tipografía optimizada para contenido
  - Share buttons (Twitter, Facebook, LinkedIn, Email)
  - Navegación prev/next
  - Sistema de comentarios
- `main-page.liquid` - Página genérica
  - Featured image como hero opcional
  - Anchos de contenido (narrow/medium/wide)
  - Bloques: text, image, button, divider
  - Formulario de contacto integrado

### Product enhancements
- `related-products.liquid` - Productos relacionados
  - API: `/recommendations/products.json`
  - Fallback a productos de la misma colección
  - Grid configurable (2-6 columnas)
  - AJAX loading con skeleton

### Engagement
- `newsletter-popup.liquid` - Popup de newsletter
  - Modal con backdrop animado
  - Código de descuento configurable
  - localStorage para evitar mostrar repetidamente
  - Trigger por tiempo o exit intent
- `trust-badges.liquid` - Badges de confianza
  - Layouts: grid, horizontal, bar (compacto)
  - Estilos de icono: default, circle, square
  - 14 iconos predefinidos
  - Colores de fondo configurables
- `faq.liquid` - Preguntas frecuentes
  - Layouts: centered, two-column
  - Accordion con `<details>`/`<summary>`
  - Bloques para preguntas ilimitadas
  - Enlace a contacto opcional

### Utility & UX
- `page-scroll-progress.liquid` - Barra de progreso de scroll
  - Web Component nativo
  - Posición: arriba o abajo
  - Colores: accent, primary, gradient, custom
  - Porcentaje opcional
- `scroll-to-top.liquid` - Botón volver arriba
  - Posiciones: bottom-right, bottom-left, bottom-center
  - Estilos: solid, accent, outline, glass
  - Tamaños: small, medium, large
  - Respeta prefers-reduced-motion
- `horizontal-ticker.liquid` - Marquee infinito
  - Bloques: texto, texto+icono, imagen, separador
  - Fondos: white, light, primary, accent
  - Dirección: izquierda o derecha
  - Pausa en hover
- `comparison-slider.liquid` - Comparador antes/después
  - Slider interactivo con arrastre
  - Proporciones: 1:1, 4:3, 16:9, 21:9
  - Etiquetas configurables
  - Accessible con input range
- `section-divider.liquid` - Separadores SVG decorativos
  - 14 formas: wave, diagonal, curve, triangle, zigzag, drops, arrow, book, tilt
  - Altura configurable (40-200px)
  - Colores: white, light, primary, accent, dark, custom
  - Transformaciones: flip horizontal/vertical
- `shoppable-image.liquid` - Imagen con hotspots
  - Hotspots clickeables con popup de producto
  - Posicionamiento preciso (X/Y por porcentaje)
  - Estilos: primary, accent, white
  - Animación pulse en hotspots
- `insta-stories.liquid` - UI tipo Instagram Stories
  - Avatares circulares con borde gradiente
  - Modal fullscreen con navegación
  - Auto-avance configurable (3-15s)
  - Soporte video e imágenes
  - Caption y CTA por story

### Complementarias (Fase C)
- `promo-banners.liquid` - Banners promocionales
  - Layouts: single, double, triple, marquee
  - Colores y CTAs configurables
  - Countdown timer opcional
- `blog-posts-preview.liquid` - Preview de blog
  - Layouts: grid, carousel, featured
  - Filtro por blog específico
  - Navegación carousel con JS
- `contact-form.liquid` - Formulario de contacto avanzado
  - Info de contacto con iconos
  - Horarios y redes sociales
  - Campos personalizados via bloques
- `404.liquid` - Página de error mejorada
  - Layouts: centered, split con imagen
  - Búsqueda integrada
  - Colecciones populares via bloques
  - Fondos: colores, imagen, decoraciones

---

## Snippets disponibles

### Componentes UI
- `button.liquid` - Botones con estilos
- `badge.liquid` - Badges de estado
- `icon.liquid` - Sistema de iconos SVG
- `price.liquid` - Formato de precios
- `product-card.liquid` - Tarjeta de producto
- `breadcrumbs.liquid` - Navegación de migas de pan
  - Estilos: chevrons, slashes, arrows
  - Soporte para productos, colecciones, artículos, páginas
- `wishlist-button.liquid` - Botón de favoritos
  - Tamaños: small, medium, large
  - Estilos: icon, icon-text, text
  - Tooltip configurable
  - Animación al hacer click

### Product page
- `image-zoom.liquid` - Zoom de imágenes
  - Hover zoom con panel lateral
  - Lightbox fullscreen
  - Navegación por teclado
  - Soporte móvil
- `product-tabs.liquid` - Sistema de tabs
  - Dropdown en móvil, tabs en desktop
  - Estilos: underline, pills, full-width
  - Navegación por teclado (flechas)
  - Soporte para tabs personalizados via blocks
- `color-swatches.liquid` - Swatches de color
  - Tamaños: small, medium, large
  - Colores automáticos via metafields
  - Fallback a color CSS por nombre

### Header (sistema multi-estilo)
- `header-logo.liquid` - Logo reutilizable
- `header-nav.liquid` - Navegación principal con dropdowns
- `header-actions.liquid` - Búsqueda, cuenta y carrito

### Footer (sistema multi-estilo)
- `footer-social-icons.liquid` - Iconos de redes sociales

### Collection
- `collection-filters.liquid` - Filtros con Storefront Filtering API

### Search
- `predictive-search.liquid` - Búsqueda predictiva AJAX
  - API: `/search/suggest.json`
  - Debounce 300ms
  - Resultados agrupados (productos, artículos, páginas)
  - Query highlighting

### Cart
- `cart-drawer.liquid` - Carrito lateral (slide-over)
  - Free shipping progress bar
  - Controles de cantidad +/-
  - Cart note
  - Empty state

### Engagement
- `newsletter-popup.liquid` - Contenido del popup de newsletter
  - Form de suscripción con Shopify customer form
  - Reveal de código de descuento
  - Animaciones de entrada/salida
- `trust-badge-item.liquid` - Item individual de trust badge
  - Layouts: vertical, horizontal, compact
  - Estilos de icono configurables
  - Soporte para enlaces
- `faq-item.liquid` - Item individual de FAQ
  - Estilos: card (con borde), simple (con divisor)
  - Iconos plus/minus o chevron
  - Animación de rotación

### Quick view
- `quick-view.liquid` - Modal de vista rápida de producto
  - Galería de imágenes
  - Selector de variantes
  - Agregar al carrito

### Complementarios (Fase C)
- `stock-counter.liquid` - Indicador de stock
  - Alertas de stock bajo
  - Urgencia visual configurable
  - Umbrales personalizables
- `contact-form-fields.liquid` - Campos del formulario de contacto
  - Campos estándar: nombre, email, teléfono, asunto
  - Campos personalizados via bloques
  - Validación y estados de error
- `404-content.liquid` - Contenido de página 404
  - Código de error, título, descripción
  - Campo de búsqueda integrado
  - Botones de acción

### Utilidades
- `css-variables.liquid` - Variables CSS del tema
- `social-icons.liquid` - Iconos de redes sociales

---

## Checklist de desarrollo

### Antes de cada sección
- [ ] Verificar que existe el snippet de icono necesario
- [ ] Usar clases con prefijo `tw-`
- [ ] Incluir estados de placeholder/vacío
- [ ] Agregar schema con presets

### Antes de commit
- [ ] Verificar en preview local
- [ ] Probar responsivo (mobile/tablet/desktop)
- [ ] Verificar accesibilidad básica

### Errores comunes a evitar
- Olvidar prefijo `tw-` en clases
- No incluir `shopify_attributes` en bloques
- Usar clases de Tailwind que no están compiladas
- Olvidar traducciones en `locales/`

---

## Roadmap de desarrollo

### Completadas
- [x] Fase 0: Configuración + Liquid basics
- [x] Fase 1: Sistema de diseño (settings, snippets)
- [x] Fase 2: Header completo + sistema multi-estilo
- [x] Fase 3: Footer + sistema multi-estilo
- [x] Fase 4: Homepage sections (12 de 15 completadas)
  - [x] hero-simple, slideshow, featured-collection, collection-list
  - [x] image-with-text, rich-text, multicolumn, featured-product
  - [x] video, testimonials, logo-list, countdown
- [x] Fase 5: Página de producto (multi-estilo)
- [x] Fase 6: Página de colección (multi-estilo)
  - [x] Header: banner, overlay, minimal
  - [x] Grid: 4 cols, 3 cols, 2 cols, lista
  - [x] Filtros: sidebar, horizontal, drawer (Storefront Filtering API)
  - [x] Ordenamiento, paginación, estados vacíos

### Completadas recientes
- [x] Fase 7: Página de carrito
  - [x] cart.liquid - Sección principal (multi-estilo)
  - [x] cart-drawer.liquid - Carrito lateral
  - [x] Iconos: check-circle, photo, tag, lock-closed
  - [x] Traducciones en/es completas

- [x] Fase 8: Cuenta de cliente
  - [x] main-login.liquid - Login con recuperar contraseña
  - [x] main-register.liquid - Registro de usuario
  - [x] main-account.liquid - Dashboard con historial de pedidos
  - [x] main-order.liquid - Detalle de pedido individual
  - [x] main-addresses.liquid - Gestión de direcciones
  - [x] Templates JSON: login, register, account, order, addresses
  - [x] Traducciones en/es completas

- [x] Fase 9: Páginas de contenido
  - [x] main-blog.liquid - Listado de artículos con grid responsivo
  - [x] main-article.liquid - Artículo con hero, share, comments
  - [x] main-page.liquid - Página genérica con contact form
  - [x] Templates JSON actualizados
  - [x] Traducciones en/es completas

- [x] Fase 10: Búsqueda
  - [x] main-search.liquid - Página de resultados con filtros
  - [x] predictive-search.liquid - Búsqueda predictiva AJAX
  - [x] Template JSON: search.json
  - [x] Traducciones en/es completas

- [x] Fase 11: Gift card y Password
  - [x] gift_card.liquid - Página de tarjeta regalo
    - Diseño visual con gradiente
    - Botón copiar código con JavaScript
    - Soporte QR code y Apple Wallet
    - Estilos de impresión
  - [x] password.liquid - Página de tienda protegida
    - Esquemas de color (light/dark)
    - Imagen de fondo con overlay
    - Links a redes sociales
    - Link de admin login
  - [x] Traducciones en/es completas

- [x] Fase A: Fundamentos mejorados
  - [x] A1: Header - Mega menu con soporte multi-nivel
  - [x] A2: Header - Sticky header
  - [x] A3: Breadcrumbs (productos, colecciones, artículos, páginas)
  - [x] A4: Product page - Color swatches con metafields
  - [x] A5: Product page - Image zoom (hover + lightbox)
  - [x] A6: Product page - Sistema de tabs

- [x] Fase B: Features adicionales
  - [x] B1: Quick buy/view modal
    - Modal con galería de imágenes
    - Selector de variantes
    - Agregar al carrito AJAX
  - [x] B2: Productos relacionados
    - API recommendations de Shopify
    - Fallback a misma colección
    - AJAX loading
  - [x] B3: Newsletter popup
    - Modal con animaciones
    - Código de descuento reveal
    - localStorage persistence
    - Exit intent detection
  - [x] B4: Trust badges
    - 3 layouts: grid, horizontal, bar
    - 3 estilos de icono
    - 14 iconos predefinidos
  - [x] B5: FAQ accordion section
    - 2 layouts: centered, two-column
    - Native `<details>`/`<summary>`
    - Bloques para preguntas

- [x] Fase C: Secciones complementarias
  - [x] C1: Promo banners section
    - 4 layouts: single, double, triple, marquee
    - Colores configurables, CTA buttons
    - Countdown timer opcional
  - [x] C2: Blog posts preview section
    - Layouts: grid, carousel, featured
    - Filtro por blog, límite de posts
    - Navegación carousel con JavaScript
  - [x] C3: Stock counter snippet
    - Indicadores de stock bajo
    - Urgencia visual (iconos, colores)
    - Umbrales configurables
  - [x] C4: Formulario de contacto avanzado
    - contact-form.liquid section
    - contact-form-fields.liquid snippet
    - Campos personalizados via bloques
    - Info de contacto con iconos
    - Iconos: envelope, phone, map-pin
  - [x] C5: 404 page mejorada
    - 404.liquid section completa
    - 404-content.liquid snippet
    - Layouts: centered, split con imagen
    - Fondos: colores, imagen, decoraciones
    - Búsqueda integrada
    - Colecciones populares via bloques

- [x] Fase 12: Wishlist system
  - [x] wishlist.js - Sistema con localStorage
    - VeloxWishlist objeto global
    - Métodos: add, remove, toggle, has, getAll, getCount, clear
    - Eventos: wishlist:init, wishlist:add, wishlist:remove, wishlist:clear
    - Sincronización automática de botones y contadores
  - [x] wishlist-button.liquid - Botón reutilizable
    - Tamaños: small, medium, large
    - Estilos: icon, icon-text, text
    - Tooltip configurable
    - Animación de corazón
  - [x] main-wishlist.liquid - Página de favoritos
    - Grid responsivo configurable
    - Empty state con placeholder Shopify oficial
    - Template dinámico vía JavaScript
    - Botón de remover con animación
  - [x] Integración en product-card.liquid
  - [x] Link en header con contador
  - [x] Template page.wishlist.json
  - [x] Traducciones en/es completas

- [x] Fase 13-14: Performance y Accesibilidad
  - [x] Skip to content link para navegación por teclado
  - [x] ARIA landmarks (header role="banner", main role="main", footer role="contentinfo")
  - [x] Focus states WCAG 2.1 AA compliant
    - outline 2px solid con offset
    - Estilos para todos los elementos interactivos
  - [x] prefers-reduced-motion soporte
    - Desactiva animaciones para usuarios sensibles
    - Smooth scroll solo si usuario no desactiva
  - [x] Fetchpriority para imágenes LCP
    - Parámetro `priority` en image.liquid
    - fetchpriority="high" y loading="eager"
  - [x] Resource hints para CDNs
    - Preconnect a cdn.shopify.com
    - DNS prefetch para conexiones rápidas
  - [x] Todos los aria-labels verificados con traducciones

- [x] Fase 15-17: Presets, Traducciones, Documentación
  - [x] Auditoría de presets en todas las secciones
    - 28 secciones con presets configurados
    - Categorías: Hero, Product, Collection, Text, Media, Social, Footer
  - [x] Verificación de traducciones
    - 300 keys en en.default.json y es.json
    - Paridad completa entre ambos idiomas
  - [x] Documentación completa
    - README.md actualizado con features, instalación, settings
    - CLAUDE.md con roadmap completo
  - [x] Limpieza de archivos Skeleton theme
    - Eliminados: CONTRIBUTING.md, CODE_OF_CONDUCT.md
    - Eliminados: hello-world.liquid, article.liquid (placeholders)
    - Conservado: LICENSE.md (licencia derivada)

### Pendientes
- [ ] Fase 18-19: Testing y Submission

---

## Preview local

```bash
# Iniciar servidor de desarrollo
shopify theme dev --store=curetfy

# URL de preview
http://127.0.0.1:9292/
```

---

## Referencias

- [Shopify Liquid Docs](https://shopify.dev/docs/api/liquid)
- [Dawn Theme](https://github.com/Shopify/dawn) - Referencia oficial
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Heroicons](https://heroicons.com/)

---

*Tema desarrollado por Ronaldo Paulino*
