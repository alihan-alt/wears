/**
 * АЛА — Online Clothing Store
 * app.js — Main Application
 *
 * Architecture: Module pattern with ES6 classes
 * Features: SPA routing, cart (localStorage), filtering, search, checkout
 */

'use strict';

/* ============================================================
   1. PRODUCT DATA
   ============================================================ */

const PRODUCTS = [
  {
    id: 1,
    name: 'Льняное платье «Алатоо»',
    category: 'женское',
    price: 3200,
    sizes: ['XS', 'S', 'M', 'L'],
    emoji: '👗',
    badge: 'new',
    description: 'Невесомое льняное платье свободного кроя с вышивкой ручной работы. Идеально для жарких летних дней в городе.',
    material: '100% лён',
    country: 'Кыргызстан',
    sku: 'ALA-W-001',
  },
  {
    id: 2,
    name: 'Кашемировый пуловер «Тянь-Шань»',
    category: 'мужское',
    price: 7800,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    emoji: '🧶',
    badge: null,
    description: 'Мягкий пуловер из горного кашемира. Классический крой, подходит для офиса и повседневных образов.',
    material: '95% кашемир, 5% шёлк',
    country: 'Кыргызстан',
    sku: 'ALA-M-002',
  },
  {
    id: 3,
    name: 'Женская куртка «Иссык-Куль»',
    category: 'верхняя одежда',
    price: 9500,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    emoji: '🧥',
    badge: 'new',
    description: 'Лёгкая стёганая куртка на утеплителе — для прохладных вечеров у озера и городских прогулок.',
    material: '100% полиэстер, наполнитель — пух',
    country: 'Кыргызстан',
    sku: 'ALA-O-003',
  },
  {
    id: 4,
    name: 'Хлопковые брюки «Чуй»',
    category: 'женское',
    price: 2900,
    sizes: ['XS', 'S', 'M', 'L'],
    emoji: '👖',
    badge: null,
    description: 'Широкие брюки из органического хлопка с высокой посадкой. Сочетаются с любым топом.',
    material: '100% органический хлопок',
    country: 'Кыргызстан',
    sku: 'ALA-W-004',
  },
  {
    id: 5,
    name: 'Шёлковая блуза «Нарын»',
    category: 'женское',
    price: 4100,
    sizes: ['XS', 'S', 'M', 'L'],
    emoji: '👚',
    badge: 'sale',
    description: 'Блуза из натурального шёлка с асимметричным вырезом и лёгкой драпировкой.',
    material: '100% натуральный шёлк',
    country: 'Узбекистан / Кыргызстан',
    sku: 'ALA-W-005',
  },
  {
    id: 6,
    name: 'Мужская рубашка «Кок-Жайык»',
    category: 'мужское',
    price: 3600,
    sizes: ['S', 'M', 'L', 'XL'],
    emoji: '👔',
    badge: null,
    description: 'Рубашка из льна и хлопка смеси. Строгий силуэт с небольшим нагрудным карманом.',
    material: '55% лён, 45% хлопок',
    country: 'Кыргызстан',
    sku: 'ALA-M-006',
  },
  {
    id: 7,
    name: 'Кожаная сумка «Манас»',
    category: 'аксессуары',
    price: 6200,
    sizes: ['One Size'],
    emoji: '👜',
    badge: 'new',
    description: 'Вместительная сумка из натуральной кожи с национальным орнаментом. Ручная работа.',
    material: 'Натуральная кожа',
    country: 'Кыргызстан',
    sku: 'ALA-A-007',
  },
  {
    id: 8,
    name: 'Пальто «Ала-Тоо» оверсайз',
    category: 'верхняя одежда',
    price: 12500,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    emoji: '🧥',
    badge: null,
    description: 'Элегантное пальто оверсайз из шерстяного сукна. Двубортное, с поясом.',
    material: '80% шерсть, 20% полиэстер',
    country: 'Кыргызстан',
    sku: 'ALA-O-008',
  },
  {
    id: 9,
    name: 'Джинсы «Бишкек Слим»',
    category: 'мужское',
    price: 4400,
    sizes: ['28', '30', '32', '34', '36'],
    emoji: '🩲',
    badge: null,
    description: 'Джинсы облегающего кроя из качественного денима. Классические 5 карманов.',
    material: '98% хлопок, 2% эластан',
    country: 'Турция / Кыргызстан',
    sku: 'ALA-M-009',
  },
  {
    id: 10,
    name: 'Войлочный берет «Колпак»',
    category: 'аксессуары',
    price: 1800,
    sizes: ['One Size'],
    emoji: '🎩',
    badge: 'new',
    description: 'Берет ручной работы из натурального войлока. Вдохновлён традиционным кыргызским «ак калпаком».',
    material: '100% натуральный войлок',
    country: 'Кыргызстан',
    sku: 'ALA-A-010',
  },
  {
    id: 11,
    name: 'Трикотажное платье «Тоо»',
    category: 'женское',
    price: 3800,
    sizes: ['XS', 'S', 'M', 'L'],
    emoji: '👗',
    badge: null,
    description: 'Длинное платье-свитер из мягкого трикотажа. Водолазка, расклешённый силуэт.',
    material: '70% вискоза, 30% шерсть',
    country: 'Кыргызстан',
    sku: 'ALA-W-011',
  },
  {
    id: 12,
    name: 'Кожаный ремень «Эпос»',
    category: 'аксессуары',
    price: 2100,
    sizes: ['S/M', 'L/XL'],
    emoji: '🪡',
    badge: null,
    description: 'Широкий ремень из тиснёной кожи с орнаментом. Металлическая пряжка с логотипом.',
    material: 'Натуральная кожа',
    country: 'Кыргызстан',
    sku: 'ALA-A-012',
  },
  {
    id: 13,
    name: 'Мужской кардиган «Кочевник»',
    category: 'мужское',
    price: 5200,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    emoji: '🧥',
    badge: 'sale',
    description: 'Длинный кардиган из смеси шерсти и альпаки. Открытый передний край, глубокие карманы.',
    material: '60% шерсть, 40% альпака',
    country: 'Перу / Кыргызстан',
    sku: 'ALA-M-013',
  },
  {
    id: 14,
    name: 'Шёлковый платок «Орнамент»',
    category: 'аксессуары',
    price: 2800,
    sizes: ['One Size'],
    emoji: '🧣',
    badge: 'new',
    description: 'Платок из натурального шёлка с принтом в виде кыргызских национальных орнаментов.',
    material: '100% натуральный шёлк',
    country: 'Кыргызстан',
    sku: 'ALA-A-014',
  },
  {
    id: 15,
    name: 'Женская ветровка «Каньон»',
    category: 'верхняя одежда',
    price: 6800,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    emoji: '🧥',
    badge: null,
    description: 'Лёгкая ветровка с мембранным покрытием. Складывается в нагрудный карман.',
    material: '100% нейлон',
    country: 'Кыргызстан',
    sku: 'ALA-O-015',
  },
  {
    id: 16,
    name: 'Хлопковая футболка «Горы»',
    category: 'мужское',
    price: 1400,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    emoji: '👕',
    badge: null,
    description: 'Базовая футболка из плотного хлопка с вышитым логотипом на груди.',
    material: '100% хлопок',
    country: 'Кыргызстан',
    sku: 'ALA-M-016',
  },
];

/* ============================================================
   2. UTILITY FUNCTIONS
   ============================================================ */

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

/**
 * Format a number as KGS currency string
 * @param {number} amount
 * @returns {string}
 */
function formatPrice(amount) {
  return `${amount.toLocaleString('ru-RU')} KGS`;
}

/**
 * Generate a random order number
 * @returns {string}
 */
function generateOrderNumber() {
  return `ALA-${Date.now().toString().slice(-6)}`;
}

/**
 * Debounce a function
 */
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/* ============================================================
   3. CART MODULE
   ============================================================ */

class Cart {
  #STORAGE_KEY = 'ala_cart';

  constructor() {
    this.items = this.#load();
  }

  /** Load cart from localStorage */
  #load() {
    try {
      return JSON.parse(localStorage.getItem(this.#STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  /** Persist cart to localStorage */
  #save() {
    localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(this.items));
    this.#dispatch();
  }

  /** Dispatch custom event for listeners */
  #dispatch() {
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: this.items }));
  }

  /** Add item or increment quantity */
  add(productId, size) {
    const existing = this.items.find(i => i.productId === productId && i.size === size);
    if (existing) {
      existing.qty = Math.min(existing.qty + 1, 10);
    } else {
      this.items.push({ productId, size, qty: 1 });
    }
    this.#save();
  }

  /** Remove item completely */
  remove(productId, size) {
    this.items = this.items.filter(i => !(i.productId === productId && i.size === size));
    this.#save();
  }

  /** Update quantity; removes if qty reaches 0 */
  setQty(productId, size, qty) {
    if (qty <= 0) { this.remove(productId, size); return; }
    const item = this.items.find(i => i.productId === productId && i.size === size);
    if (item) { item.qty = Math.min(qty, 10); }
    this.#save();
  }

  /** Total number of individual units */
  get count() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  }

  /** Total price in KGS */
  get total() {
    return this.items.reduce((sum, i) => {
      const product = PRODUCTS.find(p => p.id === i.productId);
      return sum + (product ? product.price * i.qty : 0);
    }, 0);
  }

  /** Get enriched cart items (with product data) */
  get enrichedItems() {
    return this.items.map(item => ({
      ...item,
      product: PRODUCTS.find(p => p.id === item.productId),
    })).filter(i => i.product);
  }

  /** Clear all items */
  clear() {
    this.items = [];
    this.#save();
  }
}

/* ============================================================
   4. TOAST NOTIFICATION MODULE
   ============================================================ */

class Toaster {
  #container;

  constructor() {
    this.#container = $('#toastContainer');
  }

  show(message, type = 'default', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    this.#container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('show'));
    });

    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, duration);
  }
}

/* ============================================================
   5. ROUTER MODULE
   ============================================================ */

class Router {
  #pages;
  #navLinks;
  #currentPage = null;

  constructor() {
    this.#pages = {
      home:     $('#page-home'),
      catalog:  $('#page-catalog'),
      product:  $('#page-product'),
      cart:     $('#page-cart'),
      checkout: $('#page-checkout'),
      success:  $('#page-success'),
    };
    this.#navLinks = $$('.nav-link');
  }

  /**
   * Navigate to a page by name
   * @param {string} page
   */
  navigate(page) {
    if (!(page in this.#pages)) {
      console.warn(`Router: unknown page "${page}"`);
      return;
    }

    // Hide all pages
    Object.values(this.#pages).forEach(el => el.classList.add('hidden'));

    // Show target
    this.#pages[page].classList.remove('hidden');
    this.#currentPage = page;

    // Update nav links
    this.#navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.page === page);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.dispatchEvent(new CustomEvent('router:navigate', { detail: page }));
  }

  get current() { return this.#currentPage; }
}

/* ============================================================
   6. FILTER STATE MODULE
   ============================================================ */

class FilterState {
  constructor() {
    this.reset();
  }

  reset() {
    this.categories = new Set();
    this.sizes      = new Set();
    this.priceMin   = 0;
    this.priceMax   = 15000;
    this.sort       = 'default';
    this.query      = '';
  }

  /**
   * Apply filters and sort to a list of products
   * @param {Array} products
   * @returns {Array}
   */
  apply(products) {
    let result = products.filter(p => {
      const matchCat    = this.categories.size === 0 || this.categories.has(p.category);
      const matchSize   = this.sizes.size === 0 || p.sizes.some(s => this.sizes.has(s));
      const matchPrice  = p.price >= this.priceMin && p.price <= this.priceMax;
      const q           = this.query.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchCat && matchSize && matchPrice && matchSearch;
    });

    switch (this.sort) {
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'name-asc':   result.sort((a, b) => a.name.localeCompare(b.name, 'ru')); break;
    }

    return result;
  }
}

/* ============================================================
   7. RENDER HELPERS
   ============================================================ */

/**
 * Build product card HTML
 */
function buildProductCard(product, animationDelay = 0) {
  const badgeMap = { new: 'Новинка', sale: 'Скидка' };
  const badge = product.badge
    ? `<span class="product-card__badge product-card__badge--${product.badge}">${badgeMap[product.badge]}</span>`
    : '';
  const sizes = product.sizes.slice(0, 4).map(s =>
    `<span class="size-chip">${s}</span>`
  ).join('');

  return `
    <article class="product-card" data-id="${product.id}" style="animation-delay:${animationDelay}ms" role="button" tabindex="0" aria-label="${product.name}">
      <div class="product-card__img-wrap">
        <div class="product-card__placeholder">
          <span>${product.emoji}</span>
          <span class="product-card__placeholder-label">${product.category}</span>
        </div>
        ${badge}
        <button class="product-card__wishlist" aria-label="В избранное">♡</button>
      </div>
      <div class="product-card__body">
        <p class="product-card__category">${product.category}</p>
        <h3 class="product-card__name">${product.name}</h3>
        <div class="product-card__sizes">${sizes}</div>
        <div class="product-card__footer">
          <span class="product-card__price">${formatPrice(product.price)}</span>
          <button class="product-card__add-btn" data-action="quick-add" data-id="${product.id}" aria-label="Добавить в корзину">+</button>
        </div>
      </div>
    </article>
  `;
}

/**
 * Build checkout summary HTML
 */
function buildCheckoutSummary(cart) {
  const rows = cart.enrichedItems.map(({ product, qty, size }) => `
    <div class="checkout-summary__item">
      <span>${product.name} × ${qty} (${size})</span>
      <span>${formatPrice(product.price * qty)}</span>
    </div>
  `).join('');

  return `
    <h2 class="checkout-summary__title">Ваш заказ</h2>
    ${rows}
    <hr class="checkout-summary__divider">
    <div class="checkout-summary__total">
      <span>Итого</span>
      <span>${formatPrice(cart.total)}</span>
    </div>
    <p style="font-size:.75rem;color:var(--clr-ink-muted);margin-top:.75rem;">Доставка по Бишкеку: 200–400 KGS (уточняется при подтверждении)</p>
  `;
}

/* ============================================================
   8. MAIN APPLICATION CLASS
   ============================================================ */

class App {
  constructor() {
    this.cart    = new Cart();
    this.router  = new Router();
    this.toaster = new Toaster();
    this.filters = new FilterState();

    // Currently viewed product id
    this.activeProductId = null;

    // Selected size on product page
    this.selectedSize = null;

    this.#init();
  }

  /* ── Init ── */
  #init() {
    this.#bindGlobalEvents();
    this.#bindHeaderEvents();
    this.#bindFilterEvents();
    this.#bindCheckoutEvents();
    this.#updateCartCounter();

    // Render initial home page
    this.#renderFeatured();
    this.#renderNewArrivals();
    this.router.navigate('home');

    // Listen to cart updates
    document.addEventListener('cart:updated', () => this.#updateCartCounter());

    // Scroll-based header style
    window.addEventListener('scroll', () => {
      $('#header').classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  /* ── Global event delegation ── */
  #bindGlobalEvents() {
    document.addEventListener('click', e => {
      // Page navigation via data-page
      const pageEl = e.target.closest('[data-page]');
      if (pageEl) {
        e.preventDefault();
        const page = pageEl.dataset.page;
        this.#handlePageNav(page);
        return;
      }

      // Product card click → product page
      const card = e.target.closest('.product-card');
      if (card && !e.target.closest('[data-action]')) {
        const id = parseInt(card.dataset.id, 10);
        this.#openProduct(id);
        return;
      }

      // Quick-add button on card
      const addBtn = e.target.closest('[data-action="quick-add"]');
      if (addBtn) {
        e.stopPropagation();
        const id = parseInt(addBtn.dataset.id, 10);
        const product = PRODUCTS.find(p => p.id === id);
        if (product) {
          const defaultSize = product.sizes[0];
          this.cart.add(id, defaultSize);
          this.toaster.show(`«${product.name}» добавлен в корзину`, 'success');
        }
        return;
      }

      // Product detail — add to cart
      if (e.target.closest('#addToCartBtn')) {
        this.#addActiveProductToCart();
        return;
      }

      // Cart item — quantity controls
      const qtyBtn = e.target.closest('.qty-btn');
      if (qtyBtn) {
        const { productId, size, action } = qtyBtn.dataset;
        const pid = parseInt(productId, 10);
        const item = this.cart.items.find(i => i.productId === pid && i.size === size);
        if (item) {
          this.cart.setQty(pid, size, item.qty + (action === 'inc' ? 1 : -1));
          this.#renderCart();
        }
        return;
      }

      // Cart item — remove
      const removeBtn = e.target.closest('.cart-item__remove');
      if (removeBtn) {
        const { productId, size } = removeBtn.dataset;
        this.cart.remove(parseInt(productId, 10), size);
        this.toaster.show('Товар удалён из корзины');
        this.#renderCart();
        return;
      }

      // Category pills on home page
      const pill = e.target.closest('.category-pill');
      if (pill && $('#page-home:not(.hidden)')) {
        $$('.category-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const cat = pill.dataset.category;
        this.#renderFeatured(cat === 'all' ? null : cat);
        return;
      }

      // Home section-link → catalog
      // handled by data-page

      // Footer links
      const footerLink = e.target.closest('.footer__links a[data-page]');
      if (footerLink) {
        e.preventDefault();
        this.#handlePageNav(footerLink.dataset.page);
        return;
      }

      // Mobile nav links
      const mobileLink = e.target.closest('.mobile-nav__link');
      if (mobileLink) {
        e.preventDefault();
        this.#closeMobileNav();
        this.#handlePageNav(mobileLink.dataset.page);
        return;
      }

      // Size selector on product detail
      const sizeBtn = e.target.closest('.size-btn');
      if (sizeBtn) {
        $$('.size-btn').forEach(b => b.classList.remove('selected'));
        sizeBtn.classList.add('selected');
        this.selectedSize = sizeBtn.dataset.size;
        return;
      }

      // Gallery thumbnail
      const thumb = e.target.closest('.gallery__thumb');
      if (thumb) {
        $$('.gallery__thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        return;
      }

      // Back to cart from checkout
      if (e.target.closest('#backToCart')) {
        this.router.navigate('cart');
        return;
      }

      // Reset filters
      if (e.target.closest('#resetFilters') || e.target.closest('#resetFilters2')) {
        this.#resetFilters();
        return;
      }
    });

    // Keyboard accessibility for product cards
    document.addEventListener('keydown', e => {
      const card = e.target.closest('.product-card');
      if (card && e.key === 'Enter') {
        const id = parseInt(card.dataset.id, 10);
        this.#openProduct(id);
      }
    });
  }

  #handlePageNav(page) {
    if (page === 'catalog') {
      this.#renderCatalog();
    } else if (page === 'cart') {
      this.#renderCart();
    }
    this.router.navigate(page);
  }

  /* ── Header ── */
  #bindHeaderEvents() {
    const burger       = $('#burgerBtn');
    const mobileNav    = $('#mobileNav');
    const overlay      = $('#mobileNavOverlay');
    const searchToggle = $('#searchToggle');
    const searchBar    = $('#searchBar');
    const searchClose  = $('#searchClose');
    const searchInput  = $('#searchInput');
    const logoLink     = $('.header__logo');

    burger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      burger.classList.toggle('open', open);
      overlay.classList.toggle('visible', open);
      burger.setAttribute('aria-expanded', open);
    });

    overlay.addEventListener('click', () => this.#closeMobileNav());

    searchToggle.addEventListener('click', () => {
      searchBar.classList.add('open');
      searchInput.focus();
    });

    searchClose.addEventListener('click', () => {
      searchBar.classList.remove('open');
      searchInput.value = '';
      this.filters.query = '';
    });

    searchInput.addEventListener('input', debounce(e => {
      this.filters.query = e.target.value.trim();
      this.#renderCatalog();
      if (this.router.current !== 'catalog') {
        this.router.navigate('catalog');
      }
    }, 350));

    logoLink.addEventListener('click', e => {
      e.preventDefault();
      this.router.navigate('home');
    });
  }

  #closeMobileNav() {
    $('#mobileNav').classList.remove('open');
    $('#burgerBtn').classList.remove('open');
    $('#mobileNavOverlay').classList.remove('visible');
    $('#burgerBtn').setAttribute('aria-expanded', false);
  }

  /* ── Cart Counter ── */
  #updateCartCounter() {
    const counter = $('#cartCounter');
    const count   = this.cart.count;
    counter.textContent = count;
    counter.classList.toggle('visible', count > 0);
  }

  /* ── Home Page Rendering ── */
  #renderFeatured(category = null) {
    const container = $('#featuredGrid');
    const products  = category
      ? PRODUCTS.filter(p => p.category === category).slice(0, 8)
      : PRODUCTS.filter(p => p.badge === 'new' || p.badge === 'sale').slice(0, 8);

    container.innerHTML = products.length
      ? products.map((p, i) => buildProductCard(p, i * 60)).join('')
      : '<p class="empty-state" style="grid-column:1/-1;padding:2rem;color:var(--clr-ink-muted)">Товары не найдены</p>';
  }

  #renderNewArrivals() {
    const container = $('#newArrivalsGrid');
    const products  = [...PRODUCTS].sort(() => Math.random() - .5).slice(0, 6);
    container.innerHTML = products.map((p, i) => buildProductCard(p, i * 60)).join('');
  }

  /* ── Catalog Page Rendering ── */
  #buildFilterPanel() {
    // Categories
    const catContainer  = $('#categoryFilters');
    const categories    = [...new Set(PRODUCTS.map(p => p.category))];
    catContainer.innerHTML = categories.map(cat => `
      <label class="filter-checkbox">
        <input type="checkbox" data-filter="category" value="${cat}" ${this.filters.categories.has(cat) ? 'checked' : ''} />
        ${cat.charAt(0).toUpperCase() + cat.slice(1)}
      </label>
    `).join('');

    // Sizes
    const sizeContainer = $('#sizeFilters');
    const allSizes      = [...new Set(PRODUCTS.flatMap(p => p.sizes))];
    const sizeOrder     = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', 'S/M', 'L/XL', 'One Size'];
    const sorted        = allSizes.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b));

    sizeContainer.innerHTML = sorted.map(s => `
      <button class="filter-size-btn ${this.filters.sizes.has(s) ? 'active' : ''}" data-filter="size" data-size="${s}">${s}</button>
    `).join('');

    // Price range
    const prices  = PRODUCTS.map(p => p.price);
    const minP    = Math.min(...prices);
    const maxP    = Math.max(...prices);

    const rangeMin = $('#priceMin');
    const rangeMax = $('#priceMax');
    rangeMin.min = minP; rangeMin.max = maxP;
    rangeMax.min = minP; rangeMax.max = maxP;
    rangeMin.value = this.filters.priceMin || minP;
    rangeMax.value = this.filters.priceMax || maxP;
    $('#priceMinLabel').textContent = (this.filters.priceMin || minP).toLocaleString('ru-RU');
    $('#priceMaxLabel').textContent = (this.filters.priceMax || maxP).toLocaleString('ru-RU');

    // Sort
    $('#sortSelect').value = this.filters.sort;
  }

  #bindFilterEvents() {
    // Category checkboxes (delegated)
    $('#categoryFilters').addEventListener('change', e => {
      if (e.target.type !== 'checkbox') return;
      const val = e.target.value;
      e.target.checked ? this.filters.categories.add(val) : this.filters.categories.delete(val);
      this.#renderCatalog();
    });

    // Size buttons (delegated)
    $('#sizeFilters').addEventListener('click', e => {
      const btn = e.target.closest('.filter-size-btn');
      if (!btn) return;
      const size = btn.dataset.size;
      if (this.filters.sizes.has(size)) {
        this.filters.sizes.delete(size);
        btn.classList.remove('active');
      } else {
        this.filters.sizes.add(size);
        btn.classList.add('active');
      }
      this.#renderCatalog();
    });

    // Price range
    const updatePrice = () => {
      const min = parseInt($('#priceMin').value, 10);
      const max = parseInt($('#priceMax').value, 10);
      this.filters.priceMin = Math.min(min, max);
      this.filters.priceMax = Math.max(min, max);
      $('#priceMinLabel').textContent = this.filters.priceMin.toLocaleString('ru-RU');
      $('#priceMaxLabel').textContent = this.filters.priceMax.toLocaleString('ru-RU');
      this.#renderCatalog();
    };
    $('#priceMin').addEventListener('input', debounce(updatePrice, 200));
    $('#priceMax').addEventListener('input', debounce(updatePrice, 200));

    // Sort
    $('#sortSelect').addEventListener('change', e => {
      this.filters.sort = e.target.value;
      this.#renderCatalog();
    });

    // Mobile filter toggle
    $('#filtersToggle').addEventListener('click', () => {
      const panel    = $('#filtersPanel');
      const isOpen   = panel.classList.toggle('open');
      $('#filtersToggle').setAttribute('aria-expanded', isOpen);
    });
  }

  #resetFilters() {
    this.filters.reset();
    this.#buildFilterPanel();
    this.#renderCatalog();
    this.toaster.show('Фильтры сброшены');
  }

  #renderCatalog() {
    this.#buildFilterPanel();

    const filtered = this.filters.apply(PRODUCTS);
    const grid     = $('#catalogGrid');
    const empty    = $('#catalogEmpty');
    const count    = $('#catalogCount');

    count.textContent = `${filtered.length} товаров`;

    if (filtered.length === 0) {
      grid.innerHTML = '';
      empty.classList.remove('hidden');
    } else {
      empty.classList.add('hidden');
      grid.innerHTML = filtered.map((p, i) => buildProductCard(p, i * 40)).join('');
    }
  }

  /* ── Product Detail Page ── */
  #openProduct(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    this.activeProductId = id;
    this.selectedSize    = product.sizes[0];

    const badgeMap = { new: 'Новинка', sale: 'Скидка' };
    const badge    = product.badge ? `<span class="product-card__badge product-card__badge--${product.badge}">${badgeMap[product.badge]}</span>` : '';

    const sizeBtns = product.sizes.map((s, i) => `
      <button class="size-btn ${i === 0 ? 'selected' : ''}" data-size="${s}">${s}</button>
    `).join('');

    const thumbs = ['🌄', '🏔️', '🎨'].map((alt, i) => `
      <div class="gallery__thumb ${i === 0 ? 'active' : ''}" aria-label="Фото ${i + 1}">
        ${alt}
      </div>
    `).join('');

    $('#productDetail').innerHTML = `
      <nav class="product-detail__breadcrumb" aria-label="Хлебные крошки">
        <a data-page="home">Главная</a>
        <span>›</span>
        <a data-page="catalog">Каталог</a>
        <span>›</span>
        <span>${product.name}</span>
      </nav>

      <div class="product-detail__layout">
        <div class="product-detail__gallery">
          <div class="gallery__main" id="galleryMain">
            <span style="font-size:8rem;">${product.emoji}</span>
            ${badge}
          </div>
          <div class="gallery__thumbs">${thumbs}</div>
        </div>

        <div class="product-detail__info">
          <p class="product-detail__category">${product.category}</p>
          <h1 class="product-detail__name">${product.name}</h1>
          <p class="product-detail__price">${formatPrice(product.price)}</p>

          <span class="product-detail__sizes-label">Размер</span>
          <div class="product-detail__sizes">${sizeBtns}</div>

          <div class="product-detail__actions">
            <button class="btn btn--primary" id="addToCartBtn">Добавить в корзину</button>
            <button class="btn btn--outline" aria-label="В избранное">♡</button>
          </div>

          <p class="product-detail__desc-title">Описание</p>
          <p class="product-detail__desc">${product.description}</p>

          <div class="product-detail__meta">
            <span><strong>Материал:</strong> ${product.material}</span>
            <span><strong>Страна:</strong> ${product.country}</span>
            <span><strong>Артикул:</strong> ${product.sku}</span>
          </div>
        </div>
      </div>
    `;

    this.router.navigate('product');
  }

  #addActiveProductToCart() {
    const product = PRODUCTS.find(p => p.id === this.activeProductId);
    if (!product || !this.selectedSize) return;

    this.cart.add(this.activeProductId, this.selectedSize);
    this.toaster.show(`«${product.name}» (${this.selectedSize}) добавлен в корзину`, 'success');
  }

  /* ── Cart Page Rendering ── */
  #renderCart() {
    const cartLayout = $('#cartLayout');
    const cartItems  = $('#cartItems');
    const cartEmpty  = $('#cartEmpty');
    const enriched   = this.cart.enrichedItems;

    if (enriched.length === 0) {
      cartLayout.classList.add('hidden');
      cartEmpty.classList.remove('hidden');
      return;
    }

    cartLayout.classList.remove('hidden');
    cartEmpty.classList.add('hidden');

    cartItems.innerHTML = enriched.map(({ product, qty, size }) => `
      <div class="cart-item">
        <div class="cart-item__img-wrap">
          <span style="font-size:2.5rem;">${product.emoji}</span>
        </div>
        <div class="cart-item__info">
          <p class="cart-item__name">${product.name}</p>
          <p class="cart-item__meta">Размер: ${size}</p>
          <div class="qty-control">
            <button class="qty-btn" data-action="dec" data-product-id="${product.id}" data-size="${size}" aria-label="Уменьшить">−</button>
            <span class="qty-value" aria-label="Количество">${qty}</span>
            <button class="qty-btn" data-action="inc" data-product-id="${product.id}" data-size="${size}" aria-label="Увеличить">+</button>
          </div>
        </div>
        <div class="cart-item__price-col">
          <span class="cart-item__price">${formatPrice(product.price * qty)}</span>
          <button class="cart-item__remove" data-product-id="${product.id}" data-size="${size}" aria-label="Удалить товар">Удалить</button>
        </div>
      </div>
    `).join('');

    const delivery = 300;
    $('#cartSummary').innerHTML = `
      <h2 class="cart-summary__title">Ваш заказ</h2>
      <div class="cart-summary__row"><span>Товары (${this.cart.count} шт.)</span><span>${formatPrice(this.cart.total)}</span></div>
      <div class="cart-summary__row"><span>Доставка по Бишкеку</span><span>~${formatPrice(delivery)}</span></div>
      <div class="cart-summary__row cart-summary__row--total"><span>Итого</span><span>${formatPrice(this.cart.total + delivery)}</span></div>
      <p class="cart-summary__delivery">📍 Доставка по Бишкеку 1–2 часа. Возможен самовывоз.</p>
      <div class="cart-summary__actions">
        <button class="btn btn--primary btn--full" data-page="checkout" id="checkoutBtn">Оформить заказ</button>
        <button class="btn btn--ghost btn--full" data-page="catalog">Продолжить покупки</button>
      </div>
    `;
  }

  /* ── Checkout ── */
  #bindCheckoutEvents() {
    document.addEventListener('router:navigate', e => {
      if (e.detail === 'checkout') {
        this.#renderCheckoutSummary();
      }
    });

    $('#submitOrder').addEventListener('click', () => this.#submitOrder());
  }

  #renderCheckoutSummary() {
    const container = $('#checkoutSummary');
    if (this.cart.count === 0) {
      this.toaster.show('Корзина пуста — добавьте товары', 'error');
      this.router.navigate('cart');
      return;
    }
    container.innerHTML = buildCheckoutSummary(this.cart);
  }

  #validateField(id, errorId, validator) {
    const input = $(`#${id}`);
    const error = $(`#${errorId}`);
    const valid = validator(input.value.trim());
    input.classList.toggle('error', !valid.ok);
    error.textContent = valid.ok ? '' : valid.msg;
    return valid.ok;
  }

  #submitOrder() {
    const validators = {
      fname:    v => v.length >= 2 ? { ok: true } : { ok: false, msg: 'Введите имя (минимум 2 символа)' },
      lname:    v => v.length >= 2 ? { ok: true } : { ok: false, msg: 'Введите фамилию' },
      phone:    v => /^\+?[\d\s\-]{10,}$/.test(v) ? { ok: true } : { ok: false, msg: 'Введите корректный номер' },
      district: v => v !== '' ? { ok: true } : { ok: false, msg: 'Выберите район' },
      street:   v => v.length >= 4 ? { ok: true } : { ok: false, msg: 'Введите улицу и дом' },
    };

    const results = Object.entries(validators).map(([field, fn]) =>
      this.#validateField(field, `${field}Error`, fn)
    );

    if (results.some(r => !r)) {
      this.toaster.show('Пожалуйста, заполните все обязательные поля', 'error');
      return;
    }

    // Show loading
    const overlay = $('#loadingOverlay');
    overlay.classList.remove('hidden');
    overlay.removeAttribute('aria-hidden');

    // Simulate order processing
    setTimeout(() => {
      overlay.classList.add('hidden');
      overlay.setAttribute('aria-hidden', 'true');

      const orderNum = generateOrderNumber();
      $('#successOrderNum').textContent = `Номер заказа: ${orderNum}`;
      this.cart.clear();
      this.router.navigate('success');
    }, 1800);
  }
}

/* ============================================================
   9. BOOT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Small initial load animation
  const overlay = $('#loadingOverlay');
  overlay.classList.remove('hidden');
  overlay.removeAttribute('aria-hidden');

  setTimeout(() => {
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');

    // Instantiate app
    window.alaApp = new App();
  }, 600);
});
