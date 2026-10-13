import {Suspense, useEffect, useState} from 'react';
import {Await, Link, NavLink, useAsyncValue} from 'react-router';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';
import logoUrl from '~/assets/logo.png';
import ratingStarsUrl from '~/assets/rating-stars.png';
import bioLogoUrl from '~/assets/bio-oeko-logo.png';

const ANNOUNCEMENTS = [
  {
    text: 'Free shipping from',
    link: {label: '€49 *', to: '/policies/shipping-policy'},
  },
  {text: 'Save 15%:', link: {label: 'Sign up now', to: '/account/login'}},
];

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart, publicStoreDomain}) {
  const {shop, menu} = header;
  return (
    <>
      <AnnouncementBar />
      <header className="header">
        <div className="header__wrapper">
          <div className="header__left">
            <HeaderMenu
              menu={menu}
              viewport="desktop"
              primaryDomainUrl={header.shop.primaryDomain.url}
              publicStoreDomain={publicStoreDomain}
            />
            <HeaderMenuMobileToggle />
            <SearchToggle className="hidden-desk" />
          </div>
          <NavLink className="header__logo" prefetch="intent" to="/" end>
            <img src={logoUrl} alt={shop.name} width="230" height="47" />
          </NavLink>
          <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
        </div>
      </header>
    </>
  );
}

function AnnouncementBar() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % ANNOUNCEMENTS.length),
      5000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="announcement-bar">
      <div className="announcement-bar__side">
        <img
          className="announcement-bar__stars"
          src={ratingStarsUrl}
          alt=""
          width="362"
          height="94"
        />
        <span className="hidden-mobile">4.8 with over 1 million customers</span>
        <span className="hidden-tablet-up">4.8</span>
      </div>
      <div className="announcement-bar__messages" aria-live="polite">
        {ANNOUNCEMENTS.map(({text, link}, i) => (
          <p key={text} hidden={i !== active}>
            {text} <Link to={link.to}>{link.label}</Link>
          </p>
        ))}
      </div>
      <div className="announcement-bar__side announcement-bar__side--right">
        <nav
          className="announcement-bar__nav hidden-mobile"
          aria-label="Service"
        >
          <Link to="/pages/contact">Contact</Link>
          <Link to="/pages/faq">FAQ</Link>
        </nav>
        <img
          className="announcement-bar__badge"
          src={bioLogoUrl}
          alt="BIO certified, DE-ÖKO-070"
          width="176"
          height="70"
        />
      </div>
    </div>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 * }}
 */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav className="header-ctas" role="navigation">
      <SearchToggle className="hidden-pocket" />
      <Suspense fallback={<AccountLink label="Sign in" />}>
        <Await
          resolve={isLoggedIn}
          errorElement={<AccountLink label="Sign in" />}
        >
          {(isLoggedIn) => (
            <AccountLink label={isLoggedIn ? 'Account' : 'Sign in'} />
          )}
        </Await>
      </Suspense>
      <CartToggle cart={cart} />
    </nav>
  );
}

/**
 * @param {{label: string}}
 */
function AccountLink({label}) {
  return (
    <NavLink
      className="header-icon hidden-mobile"
      prefetch="intent"
      to="/account"
      aria-label={label}
    >
      <svg width="18" height="17" viewBox="0 0 18 17" aria-hidden="true">
        <circle cx="9" cy="5" r="4" />
        <path d="M1 17v0a4 4 0 014-4h8a4 4 0 014 4v0" />
      </svg>
    </NavLink>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle header-icon reset hidden-desk"
      onClick={() => open('mobile')}
      aria-label="Open menu"
    >
      <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
        <path d="M0 1h18M0 13h18H0zm0-6h18H0z" />
      </svg>
    </button>
  );
}

/**
 * @param {{className: string}}
 */
function SearchToggle({className}) {
  const {open} = useAside();
  return (
    <button
      className={`header-icon reset ${className}`}
      onClick={() => open('search')}
      aria-label="Search"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <path d="M12.336 12.336c2.634-2.635 2.682-6.859.106-9.435-2.576-2.576-6.8-2.528-9.435.106C.373 5.642.325 9.866 2.901 12.442c2.576 2.576 6.8 2.528 9.435-.106zm0 0L17 17" />
      </svg>
    </button>
  );
}

/**
 * @param {{count: number}}
 */
function CartBadge({count}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      className="header-icon header-cart"
      href="/cart"
      aria-label={`Cart, ${count} items`}
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
    >
      <svg width="20" height="18" viewBox="0 0 20 18" aria-hidden="true">
        <path d="M3 1h14l1 16H2L3 1z" />
        <path d="M7 4v0a3 3 0 003 3v0a3 3 0 003-3v0" />
      </svg>
      <span className="header-cart__count">{count}</span>
    </a>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isPending}) {
  return {
    color: isPending ? 'grey' : undefined,
  };
}

/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */

/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
