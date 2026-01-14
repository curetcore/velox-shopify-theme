/**
 * Velox Wishlist System
 *
 * Sistema de favoritos con localStorage para visitantes
 * y sincronización con Customer Metafields para usuarios logueados.
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'velox_wishlist';
  const METAFIELD_NAMESPACE = 'velox';
  const METAFIELD_KEY = 'wishlist';

  // Estado global del wishlist
  window.VeloxWishlist = {
    items: [],
    isCustomerLoggedIn: false,
    customerId: null,

    /**
     * Inicializar wishlist
     */
    init: function() {
      // Detectar si hay cliente logueado
      this.isCustomerLoggedIn = document.body.dataset.customerLoggedIn === 'true';
      this.customerId = document.body.dataset.customerId || null;

      // Cargar items del storage
      this.load();

      // Inicializar botones
      this.initButtons();

      // Escuchar eventos
      this.bindEvents();

      // Actualizar contadores
      this.updateCounters();

      // Disparar evento de inicialización
      document.dispatchEvent(new CustomEvent('wishlist:init', {
        detail: { items: this.items }
      }));
    },

    /**
     * Cargar wishlist desde localStorage
     */
    load: function() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        this.items = stored ? JSON.parse(stored) : [];
      } catch (e) {
        console.warn('Velox Wishlist: Error loading from localStorage', e);
        this.items = [];
      }
    },

    /**
     * Guardar wishlist en localStorage
     */
    save: function() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
      } catch (e) {
        console.warn('Velox Wishlist: Error saving to localStorage', e);
      }
    },

    /**
     * Agregar producto al wishlist
     * @param {Object} product - Datos del producto
     */
    add: function(product) {
      if (!product || !product.id) return false;

      // Verificar si ya existe
      if (this.has(product.id)) return false;

      // Agregar item con timestamp
      this.items.push({
        id: product.id,
        handle: product.handle,
        title: product.title,
        price: product.price,
        comparePrice: product.comparePrice,
        image: product.image,
        url: product.url,
        available: product.available !== false,
        addedAt: Date.now()
      });

      this.save();
      this.updateCounters();
      this.updateButtons(product.id, true);

      // Disparar evento
      document.dispatchEvent(new CustomEvent('wishlist:add', {
        detail: { product, items: this.items }
      }));

      return true;
    },

    /**
     * Remover producto del wishlist
     * @param {string|number} productId - ID del producto
     */
    remove: function(productId) {
      const index = this.items.findIndex(item => String(item.id) === String(productId));

      if (index === -1) return false;

      const removed = this.items.splice(index, 1)[0];
      this.save();
      this.updateCounters();
      this.updateButtons(productId, false);

      // Disparar evento
      document.dispatchEvent(new CustomEvent('wishlist:remove', {
        detail: { product: removed, items: this.items }
      }));

      return true;
    },

    /**
     * Toggle producto en wishlist
     * @param {Object} product - Datos del producto
     */
    toggle: function(product) {
      if (this.has(product.id)) {
        return this.remove(product.id);
      } else {
        return this.add(product);
      }
    },

    /**
     * Verificar si producto está en wishlist
     * @param {string|number} productId - ID del producto
     */
    has: function(productId) {
      return this.items.some(item => String(item.id) === String(productId));
    },

    /**
     * Obtener todos los items
     */
    getAll: function() {
      return [...this.items];
    },

    /**
     * Obtener cantidad de items
     */
    getCount: function() {
      return this.items.length;
    },

    /**
     * Limpiar wishlist
     */
    clear: function() {
      this.items = [];
      this.save();
      this.updateCounters();
      this.updateAllButtons();

      document.dispatchEvent(new CustomEvent('wishlist:clear', {
        detail: { items: this.items }
      }));
    },

    /**
     * Inicializar botones de wishlist
     */
    initButtons: function() {
      document.querySelectorAll('[data-wishlist-button]').forEach(button => {
        const productId = button.dataset.productId;
        if (productId && this.has(productId)) {
          button.classList.add('is-active');
          button.setAttribute('aria-pressed', 'true');
        }
      });
    },

    /**
     * Actualizar estado de botón específico
     */
    updateButtons: function(productId, isActive) {
      document.querySelectorAll(`[data-wishlist-button][data-product-id="${productId}"]`).forEach(button => {
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });
    },

    /**
     * Actualizar todos los botones
     */
    updateAllButtons: function() {
      document.querySelectorAll('[data-wishlist-button]').forEach(button => {
        const productId = button.dataset.productId;
        const isActive = this.has(productId);
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });
    },

    /**
     * Actualizar contadores de wishlist
     */
    updateCounters: function() {
      const count = this.getCount();

      document.querySelectorAll('[data-wishlist-count]').forEach(el => {
        el.textContent = count;
        el.classList.toggle('tw-hidden', count === 0);
      });

      // Actualizar badge en header si existe
      const headerBadge = document.querySelector('.wishlist-header-count');
      if (headerBadge) {
        headerBadge.textContent = count;
        headerBadge.classList.toggle('tw-hidden', count === 0);
      }
    },

    /**
     * Vincular eventos
     */
    bindEvents: function() {
      // Click en botones de wishlist
      document.addEventListener('click', (e) => {
        const button = e.target.closest('[data-wishlist-button]');
        if (!button) return;

        e.preventDefault();
        e.stopPropagation();

        const productData = {
          id: button.dataset.productId,
          handle: button.dataset.productHandle,
          title: button.dataset.productTitle,
          price: button.dataset.productPrice,
          comparePrice: button.dataset.productComparePrice,
          image: button.dataset.productImage,
          url: button.dataset.productUrl,
          available: button.dataset.productAvailable !== 'false'
        };

        this.toggle(productData);

        // Feedback visual
        button.classList.add('wishlist-animating');
        setTimeout(() => button.classList.remove('wishlist-animating'), 300);
      });

      // Click en botón de remover en página de wishlist
      document.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('[data-wishlist-remove]');
        if (!removeBtn) return;

        e.preventDefault();
        const productId = removeBtn.dataset.productId;

        if (productId) {
          this.remove(productId);

          // Remover item del DOM si estamos en la página de wishlist
          const item = removeBtn.closest('[data-wishlist-item]');
          if (item) {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.remove();
              this.checkEmptyState();
            }, 200);
          }
        }
      });
    },

    /**
     * Verificar y mostrar estado vacío
     */
    checkEmptyState: function() {
      const container = document.querySelector('[data-wishlist-container]');
      const emptyState = document.querySelector('[data-wishlist-empty]');
      const itemsGrid = document.querySelector('[data-wishlist-grid]');

      if (!container) return;

      if (this.getCount() === 0) {
        if (itemsGrid) itemsGrid.classList.add('tw-hidden');
        if (emptyState) emptyState.classList.remove('tw-hidden');
      } else {
        if (itemsGrid) itemsGrid.classList.remove('tw-hidden');
        if (emptyState) emptyState.classList.add('tw-hidden');
      }
    }
  };

  // Auto-inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => VeloxWishlist.init());
  } else {
    VeloxWishlist.init();
  }
})();
