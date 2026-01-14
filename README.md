# Velox - Shopify Theme

Premium Shopify theme designed for fashion and footwear stores. Built for conversion, performance, and exceptional user experience.

## Features

### Design
- **Mobile-first responsive design** - Optimized for all devices
- **Multiple layout options** - Flexible section configurations
- **Color scheme system** - Customizable through theme settings
- **Typography controls** - Primary and heading font settings

### Performance
- **< 3s LCP target** - Optimized for Core Web Vitals
- **Lazy loading** - Images load on demand
- **Critical CSS** - Above-the-fold styles loaded first
- **Deferred JavaScript** - Non-blocking script loading

### Accessibility
- **WCAG 2.1 AA compliant** - Meets accessibility standards
- **Skip to content link** - Keyboard navigation support
- **ARIA landmarks** - Proper semantic structure
- **Focus indicators** - Visible focus states
- **Reduced motion support** - Respects user preferences

### Sections

#### Homepage
- Hero (simple and slideshow)
- Featured collection
- Collection list
- Image with text
- Rich text
- Multi-column
- Featured product
- Video
- Testimonials
- Logo list
- Countdown timer
- Promo banners
- Blog posts preview
- FAQ accordion
- Trust badges
- Newsletter popup

#### Product
- Multiple gallery layouts
- Color swatches
- Image zoom (hover + lightbox)
- Tabbed content
- Related products
- Stock counter
- Quick view modal

#### Collection
- Multiple grid layouts (2-4 columns)
- Sidebar/horizontal/drawer filters
- Storefront Filtering API integration
- Sort options
- Pagination

#### Cart
- Page cart with multiple layouts
- Slide-out cart drawer
- Free shipping progress bar
- Cart notes

#### Customer Account
- Login/Register
- Account dashboard
- Order history
- Address management

#### Content
- Blog with grid layout
- Article with comments
- Custom pages
- Contact form
- Search with predictive results

### Additional Features
- **Wishlist system** - localStorage persistence
- **Breadcrumbs** - Multiple styles
- **Mega menu** - Multi-level navigation
- **Sticky header** - Stays visible on scroll
- **Newsletter popup** - Exit intent detection

## Installation

1. Download or clone this repository
2. Install Shopify CLI: `npm install -g @shopify/cli`
3. Connect to your store: `shopify theme dev --store=your-store.myshopify.com`

## Development

```bash
# Start development server
shopify theme dev --store=your-store

# Check theme for errors
shopify theme check

# Push to store
shopify theme push
```

## Theme Settings

Access theme settings in the Shopify admin:
**Online Store > Themes > Customize > Theme settings**

### Colors
- Background and foreground colors
- Secondary background
- Accent color for CTAs
- Sale price color

### Typography
- Primary font family
- Heading font family
- Font sizes (via CSS variables)

### Layout
- Page width (max content width)
- Page margins
- Section spacing

### Social Media
- Links to all major platforms
- Share button configuration

## Translations

The theme includes complete translations for:
- English (en.default.json)
- Spanish (es.json)

To add more languages, duplicate `en.default.json` and translate all strings.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Requirements

- Shopify Online Store 2.0
- Shopify CLI 3.0+

## Credits

- Icons: [Heroicons](https://heroicons.com/)
- CSS Framework: [Tailwind CSS](https://tailwindcss.com/)

## License

This theme is proprietary software. All rights reserved.

## Support

For support inquiries, contact:
- Instagram: [@_ronaldopaulino](https://www.instagram.com/_ronaldopaulino/)

---

*Developed by Ronaldo Paulino*
