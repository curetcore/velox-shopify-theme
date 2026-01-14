/**
 * Velox Theme - Main JavaScript
 * Handles header interactions: mobile menu, search, cart drawer
 */

(function() {
  'use strict';

  // DOM Ready
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initMobileMenu();
    initSearchModal();
    initCartDrawer();
    initAccordions();
    initStickyHeader();
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

      // Si carrito vacio, recargar para mostrar empty state
      if (cart.item_count === 0) {
        window.location.reload();
        return;
      }

      // Si item fue eliminado (quantity 0), remover del DOM
      if (quantity === 0 && item) {
        item.classList.add('tw-scale-95', 'tw-opacity-0');
        setTimeout(() => item.remove(), 200);
      } else if (item) {
        item.classList.remove('tw-opacity-50', 'tw-pointer-events-none');
      }

      // Actualizar UI sin recargar
      updateCartDrawerUI(cart);
      updateHeaderCartCount(cart.item_count);
    } catch (error) {
      console.error('Cart update error:', error);
      if (item) item.classList.remove('tw-opacity-50', 'tw-pointer-events-none');
      window.location.reload(); // Fallback
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

    if (progressBar) progressBar.style.width = `${progress}%`;
    if (message) {
      if (remaining === 0) {
        message.textContent = bar.dataset.freeShippingSuccess || 'Free shipping!';
      } else {
        const formattedRemaining = formatMoney(remaining);
        message.textContent = (bar.dataset.freeShippingRemaining || 'Add {amount} for free shipping').replace('{amount}', formattedRemaining);
      }
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
    initAccordions
  };

})();
