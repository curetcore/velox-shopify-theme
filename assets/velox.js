/**
 * Velox Theme - Main JavaScript
 * Handles header interactions: mobile menu, search, cart drawer
 */

(function () {
  'use strict';

  // DOM Ready
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initMobileMenu();
    initSearchModal();
    initCartDrawer();
    initAccordions();
    initStickyHeader();
    initSectionAnimations();
    initSplideCarousels();
  }

  /**
   * Mobile Menu
   */
  function initMobileMenu() {
    const openBtn = document.querySelector('[data-mobile-menu-open]');
    const closeBtn = document.querySelector('[data-mobile-menu-close]');
    const menu = document.querySelector('[data-mobile-menu]');
    const overlay = document.querySelector('[data-mobile-menu-overlay]');

    if (!menu) return;

    function openMenu() {
      menu.classList.remove('tw--translate-x-full');
      overlay.classList.remove('tw-opacity-0', 'tw-invisible');
      document.body.style.overflow = 'hidden';
      openBtn?.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      menu.classList.add('tw--translate-x-full');
      overlay.classList.add('tw-opacity-0', 'tw-invisible');
      document.body.style.overflow = '';
      openBtn?.setAttribute('aria-expanded', 'false');
    }

    openBtn?.addEventListener('click', openMenu);
    closeBtn?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.classList.contains('tw--translate-x-full')) {
        closeMenu();
      }
    });
  }

  /**
   * Search Modal
   */
  function initSearchModal() {
    const openBtns = document.querySelectorAll('[data-search-open]');
    const closeBtn = document.querySelector('[data-search-close]');
    const modal = document.querySelector('[data-search-modal]');
    const overlay = document.querySelector('[data-search-overlay]');
    const input = document.querySelector('[data-predictive-search-input]');

    if (!modal) return;

    function openSearch() {
      modal.classList.remove('tw--translate-y-full');
      overlay.classList.remove('tw-opacity-0', 'tw-invisible');
      document.body.style.overflow = 'hidden';
      setTimeout(() => input?.focus(), 100);
    }

    function closeSearch() {
      modal.classList.add('tw--translate-y-full');
      overlay.classList.add('tw-opacity-0', 'tw-invisible');
      document.body.style.overflow = '';
      if (input) input.value = '';
      hideResults();
    }

    openBtns.forEach(btn => btn.addEventListener('click', openSearch));
    closeBtn?.addEventListener('click', closeSearch);
    overlay?.addEventListener('click', closeSearch);

    // Escape to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('tw--translate-y-full')) {
        closeSearch();
      }
    });

    // Predictive search
    let searchTimeout;
    input?.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();

      if (query.length < 2) {
        hideResults();
        return;
      }

      searchTimeout = setTimeout(() => {
        performSearch(query);
      }, 300);
    });
  }

  function performSearch(query) {
    const resultsContainer = document.querySelector('[data-predictive-search-results]');
    const loadingEl = document.querySelector('[data-loading]');
    const resultsEl = document.querySelector('[data-results-container]');
    const noResultsEl = document.querySelector('[data-no-results]');

    if (!resultsContainer) return;

    resultsContainer.classList.remove('tw-hidden');
    loadingEl?.classList.remove('tw-hidden');
    noResultsEl?.classList.add('tw-hidden');

    fetch(`${window.Shopify.routes.root}search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=6`)
      .then(response => response.json())
      .then(data => {
        loadingEl?.classList.add('tw-hidden');

        const products = data.resources?.results?.products || [];

        if (products.length === 0) {
          noResultsEl?.classList.remove('tw-hidden');
          resultsEl.innerHTML = '';
          return;
        }

        const template = document.getElementById('search-result-template');
        resultsEl.innerHTML = '';

        products.forEach(product => {
          const clone = template.content.cloneNode(true);
          const link = clone.querySelector('[data-result-item]');
          const img = clone.querySelector('[data-result-image]');
          const title = clone.querySelector('[data-result-title]');
          const price = clone.querySelector('[data-result-price]');

          link.href = product.url;
          if (product.image) img.src = product.image;
          title.textContent = product.title;
          price.textContent = formatMoney(product.price);

          resultsEl.appendChild(clone);
        });
      })
      .catch(err => {
        console.error('Search error:', err);
        loadingEl?.classList.add('tw-hidden');
      });
  }

  function hideResults() {
    const resultsContainer = document.querySelector('[data-predictive-search-results]');
    resultsContainer?.classList.add('tw-hidden');
  }

  /**
   * Cart Drawer
   */
  function initCartDrawer() {
    const openBtns = document.querySelectorAll('[data-cart-open]');
    const closeBtn = document.querySelector('[data-cart-close]');
    const drawer = document.querySelector('[data-cart-drawer]');
    const overlay = document.querySelector('[data-cart-overlay]');

    if (!drawer) return;

    function openCart() {
      drawer.classList.remove('tw-translate-x-full');
      overlay.classList.remove('tw-opacity-0', 'tw-invisible');
      document.body.style.overflow = 'hidden';
      // Load upsells when cart opens
      loadCartUpsells();
    }

    function closeCart() {
      drawer.classList.add('tw-translate-x-full');
      overlay.classList.add('tw-opacity-0', 'tw-invisible');
      document.body.style.overflow = '';
    }

    openBtns.forEach(btn => btn.addEventListener('click', openCart));
    closeBtn?.addEventListener('click', closeCart);
    overlay?.addEventListener('click', closeCart);

    // Close buttons inside cart
    document.querySelectorAll('[data-cart-close]').forEach(btn => {
      btn.addEventListener('click', closeCart);
    });

    // Escape to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !drawer.classList.contains('tw-translate-x-full')) {
        closeCart();
      }
    });

    // Quantity controls
    initQuantityControls();
    initRemoveItem();
  }

  function initQuantityControls() {
    document.querySelectorAll('[data-quantity-minus]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.quantityMinus;
        const input = document.querySelector(`[data-quantity-input="${key}"]`);
        const newQty = Math.max(1, parseInt(input.value) - 1);
        updateCartItem(key, newQty);
      });
    });

    document.querySelectorAll('[data-quantity-plus]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.quantityPlus;
        const input = document.querySelector(`[data-quantity-input="${key}"]`);
        const newQty = parseInt(input.value) + 1;
        updateCartItem(key, newQty);
      });
    });

    document.querySelectorAll('[data-quantity-input]').forEach(input => {
      input.addEventListener('change', () => {
        const key = input.dataset.quantityInput;
        const newQty = Math.max(1, parseInt(input.value) || 1);
        updateCartItem(key, newQty);
      });
    });
  }

  function initRemoveItem() {
    document.querySelectorAll('[data-remove-item]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.removeItem;
        updateCartItem(key, 0);
      });
    });
  }

  async function updateCartItem(key, quantity) {
    const item = document.querySelector(`[data-cart-item="${key}"]`);
    if (item) item.classList.add('tw-opacity-50', 'tw-pointer-events-none');

    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity: parseInt(quantity) })
      });

      if (!response.ok) throw new Error('Update failed');
      const cart = await response.json();

      // Si item fue eliminado (quantity 0), remover del DOM con animación
      if (quantity === 0 && item) {
        item.classList.add('tw-scale-95', 'tw-opacity-0');
        setTimeout(() => item.remove(), 200);
      } else if (item) {
        item.classList.remove('tw-opacity-50', 'tw-pointer-events-none');
      }

      // Actualizar UI completamente sin recargar
      updateCartDrawerUI(cart);
      updateHeaderCartCount(cart.item_count);

      // Si carrito vacío, mostrar empty state dinámicamente
      if (cart.item_count === 0) {
        renderEmptyCartState();
      }
    } catch (error) {
      console.error('Cart update error:', error);
      if (item) item.classList.remove('tw-opacity-50', 'tw-pointer-events-none');
      // Mostrar error toast en lugar de reload
      showCartError('Error actualizando el carrito. Por favor intenta de nuevo.');
    }
  }

  function updateCartDrawerUI(cart) {
    // Subtotal
    const subtotal = document.querySelector('[data-cart-subtotal]');
    if (subtotal) subtotal.textContent = formatMoney(cart.total_price);

    // Total (si hay descuentos)
    const total = document.querySelector('[data-cart-total]');
    if (total) total.textContent = formatMoney(cart.total_price);

    // Actualizar cantidades y precios de cada item
    cart.items.forEach(cartItem => {
      const qtyInput = document.querySelector(`[data-quantity-input="${cartItem.key}"]`);
      if (qtyInput) qtyInput.value = cartItem.quantity;

      const itemPrice = document.querySelector(`[data-item-price="${cartItem.key}"]`);
      if (itemPrice) itemPrice.textContent = formatMoney(cartItem.final_line_price);
    });

    // Actualizar free shipping bar
    updateFreeShippingBar(cart.total_price);

    // Actualizar texto del contador
    const countText = document.querySelector('[data-cart-count-text]');
    if (countText) {
      const itemLabel = cart.item_count === 1 ? 'item' : 'items';
      countText.textContent = `(${cart.item_count} ${itemLabel})`;
    }
  }

  function updateHeaderCartCount(count) {
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? '' : 'none';
    });
  }

  function updateFreeShippingBar(totalPrice) {
    const bar = document.querySelector('[data-free-shipping-bar]');
    if (!bar) return;

    const threshold = parseInt(bar.dataset.freeShippingThreshold) || 200000; // centavos
    const progress = Math.min((totalPrice / threshold) * 100, 100);
    const remaining = Math.max(threshold - totalPrice, 0);

    const progressBar = bar.querySelector('[data-shipping-progress]');
    const message = bar.querySelector('[data-shipping-message]');

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
      // Agregar clase de celebración cuando se alcanza envío gratis
      if (progress >= 100) {
        progressBar.classList.add('tw-bg-green-500');
        progressBar.classList.remove('tw-bg-accent');
      } else {
        progressBar.classList.remove('tw-bg-green-500');
        progressBar.classList.add('tw-bg-accent');
      }
    }
    if (message) {
      if (remaining === 0) {
        message.innerHTML = `<span class="tw-text-green-700 tw-font-medium">🎉 ${bar.dataset.freeShippingSuccess || '¡Tienes envío gratis!'}</span>`;
      } else {
        const formattedRemaining = formatMoney(remaining);
        message.innerHTML = `<span class="tw-text-velox-700">${(bar.dataset.freeShippingRemaining || 'Te faltan {amount} para envío gratis').replace('{amount}', formattedRemaining)}</span>`;
      }
    }
  }

  /**
   * Render empty cart state dynamically
   */
  function renderEmptyCartState() {
    const cartItems = document.querySelector('[data-cart-items]');
    const cartFooter = document.querySelector('[data-cart-footer]');
    const shippingBar = document.querySelector('[data-free-shipping-bar]');
    const upsellsSection = document.querySelector('[data-cart-upsells]');

    // Ocultar elementos que no aplican para carrito vacío
    if (cartFooter) cartFooter.style.display = 'none';
    if (shippingBar) shippingBar.style.display = 'none';
    if (upsellsSection) upsellsSection.style.display = 'none';

    // Mostrar empty state
    if (cartItems) {
      cartItems.innerHTML = `
        <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-12 tw-text-center" data-cart-empty>
          <svg class="tw-w-16 tw-h-16 tw-text-velox-200 tw-mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <p class="tw-text-velox-500 tw-mb-4">Tu carrito está vacío</p>
          <button type="button" class="tw-btn tw-btn-primary" data-cart-close>Seguir comprando</button>
        </div>
      `;
      // Re-attach close event
      const closeBtn = cartItems.querySelector('[data-cart-close]');
      closeBtn?.addEventListener('click', () => {
        const drawer = document.querySelector('[data-cart-drawer]');
        const overlay = document.querySelector('[data-cart-overlay]');
        drawer?.classList.add('tw-translate-x-full');
        overlay?.classList.add('tw-opacity-0', 'tw-invisible');
        document.body.style.overflow = '';
      });
    }
  }

  /**
   * Show cart error toast
   */
  function showCartError(message) {
    // Crear toast si no existe
    let toast = document.querySelector('[data-cart-error-toast]');
    if (!toast) {
      toast = document.createElement('div');
      toast.setAttribute('data-cart-error-toast', '');
      toast.className = 'tw-fixed tw-bottom-4 tw-right-4 tw-bg-red-500 tw-text-white tw-px-4 tw-py-3 tw-rounded-lg tw-shadow-lg tw-z-50 tw-transform tw-translate-y-full tw-opacity-0 tw-transition-all tw-duration-300';
      document.body.appendChild(toast);
    }
    toast.textContent = message;

    // Mostrar con animación
    requestAnimationFrame(() => {
      toast.classList.remove('tw-translate-y-full', 'tw-opacity-0');
    });

    // Ocultar después de 3 segundos
    setTimeout(() => {
      toast.classList.add('tw-translate-y-full', 'tw-opacity-0');
    }, 3000);
  }

  /**
   * Cart Upsells
   * Load product recommendations based on cart items
   */
  let upsellsLoaded = false;

  async function loadCartUpsells() {
    if (upsellsLoaded) return;

    const container = document.querySelector('[data-upsells-container]');
    const loadingEl = document.querySelector('[data-upsells-loading]');
    const productsEl = document.querySelector('[data-upsells-products]');

    if (!container || !productsEl) return;

    // Get first product ID from cart for recommendations
    const cartItems = document.querySelectorAll('[data-cart-item]');
    if (!cartItems.length) return;

    // Get product IDs from cart to exclude and use for recommendations
    const cartProductIds = [];
    cartItems.forEach(item => {
      const link = item.querySelector('a[href*="/products/"]');
      if (link) {
        const match = link.href.match(/\/products\/([^?\/]+)/);
        if (match) cartProductIds.push(match[1]);
      }
    });

    if (!cartProductIds.length) return;

    try {
      // Fetch recommendations for first cart product
      const response = await fetch(`${window.Shopify.routes.root}recommendations/products.json?product_id=${cartProductIds[0]}&limit=6`);
      const data = await response.json();

      if (!data.products || !data.products.length) {
        container.closest('[data-cart-upsells]')?.classList.add('tw-hidden');
        return;
      }

      // Filter out products already in cart
      const recommendations = data.products.filter(p =>
        !cartProductIds.includes(p.handle)
      ).slice(0, 4);

      if (!recommendations.length) {
        container.closest('[data-cart-upsells]')?.classList.add('tw-hidden');
        return;
      }

      // Render upsell products
      productsEl.innerHTML = recommendations.map(product => `
        <a href="${product.url}" class="tw-flex-shrink-0 tw-w-24 tw-group">
          <div class="tw-w-24 tw-h-24 tw-bg-velox-100 tw-rounded-md tw-overflow-hidden tw-mb-2">
            ${product.featured_image ? `
              <img
                src="${product.featured_image.replace(/(\.[^.]+)$/, '_200x200$1')}"
                alt="${product.title}"
                class="tw-w-full tw-h-full tw-object-cover group-hover:tw-scale-105 tw-transition-transform"
                loading="lazy"
              >
            ` : ''}
          </div>
          <p class="tw-text-xs tw-text-velox-900 tw-line-clamp-2 group-hover:tw-underline">${product.title}</p>
          <p class="tw-text-xs tw-font-medium tw-text-velox-600">${formatMoney(product.price)}</p>
        </a>
      `).join('');

      // Show products, hide loading
      loadingEl?.classList.add('tw-hidden');
      productsEl.classList.remove('tw-hidden');
      upsellsLoaded = true;

    } catch (error) {
      console.error('Upsells error:', error);
      container.closest('[data-cart-upsells]')?.classList.add('tw-hidden');
    }
  }

  /**
   * Accordion (for mobile menu)
   */
  function initAccordions() {
    document.querySelectorAll('[data-accordion]').forEach(accordion => {
      const trigger = accordion.querySelector('[data-accordion-trigger]');
      const content = accordion.querySelector('[data-accordion-content]');
      const icon = trigger?.querySelector('svg');

      trigger?.addEventListener('click', () => {
        const isOpen = !content.classList.contains('tw-hidden');

        if (isOpen) {
          content.classList.add('tw-hidden');
          trigger.setAttribute('aria-expanded', 'false');
          icon?.classList.remove('tw-rotate-180');
        } else {
          content.classList.remove('tw-hidden');
          trigger.setAttribute('aria-expanded', 'true');
          icon?.classList.add('tw-rotate-180');
        }
      });
    });
  }

  /**
   * Sticky Header
   */
  function initStickyHeader() {
    const header = document.querySelector('[data-sticky-header]');
    if (!header) return;

    let lastScroll = 0;
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      // Add shadow when scrolled
      if (currentScroll > 10) {
        header.classList.add('tw-shadow-md');
      } else {
        header.classList.remove('tw-shadow-md');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  /**
   * Section Animations
   * Animate sections on scroll using IntersectionObserver
   * Enhanced with settings from Theme Customizer
   */
  function initSectionAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate], [data-animate-children]');
    if (!animatedElements.length) return;

    // Check if animations are disabled via CSS (reduced motion)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Make all elements visible immediately
      animatedElements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    // Get settings from data attributes (set in theme.liquid)
    const animationRepeat = document.body.dataset.animationRepeat === 'true';
    const animationThreshold = parseFloat(document.body.dataset.animationThreshold || '0.1');

    const observerOptions = {
      threshold: animationThreshold,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add stagger delay for children if data-animate-stagger is set
          const stagger = entry.target.dataset.animateStagger;
          if (stagger) {
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
              child.style.transitionDelay = `${index * parseInt(stagger)}ms`;
            });
          }

          entry.target.classList.add('is-visible');

          // Only unobserve if repeat is disabled
          if (!animationRepeat) {
            observer.unobserve(entry.target);
          }
        } else if (animationRepeat) {
          // Remove visible class when out of view (for repeat)
          entry.target.classList.remove('is-visible');
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
  }

  /**
   * Splide Carousels
   * Initialize all Splide carousel instances on the page
   */
  function initSplideCarousels() {
    // Check if Splide is loaded
    if (typeof Splide === 'undefined') {
      // Retry after a short delay (Splide loads with defer)
      setTimeout(initSplideCarousels, 100);
      return;
    }

    const carousels = document.querySelectorAll('.splide');
    if (!carousels.length) return;

    carousels.forEach(carousel => {
      // Skip if already mounted
      if (carousel.classList.contains('is-initialized')) return;

      try {
        const splide = new Splide(carousel);
        splide.mount();
      } catch (error) {
        console.error('Splide initialization error:', error);
      }
    });
  }

  /**
   * Format money (basic implementation)
   */
  function formatMoney(cents) {
    const amount = (cents / 100).toFixed(2);
    // Use shop currency format if available
    if (window.Shopify && window.Shopify.formatMoney) {
      return window.Shopify.formatMoney(cents);
    }
    return '$' + amount;
  }

  // Expose to global for dynamic loading
  window.Velox = {
    initMobileMenu,
    initSearchModal,
    initCartDrawer,
    initAccordions,
    initSplideCarousels
  };

})();
