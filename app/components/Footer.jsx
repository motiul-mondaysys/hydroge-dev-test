import {useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router';
import {
  footerContact,
  footerLanguages,
  footerMenus,
  footerNewsletter,
} from '~/data/footer';
import amex from '~/assets/payment/amex.svg';
import bancontact from '~/assets/payment/bancontact.svg';
import eps from '~/assets/payment/eps.svg';
import idealWero from '~/assets/payment/ideal-wero.svg';
import maestro from '~/assets/payment/maestro.svg';
import mastercard from '~/assets/payment/mastercard.svg';
import mobilepay from '~/assets/payment/mobilepay.svg';
import paypal from '~/assets/payment/paypal.svg';
import unionpay from '~/assets/payment/unionpay.svg';
import visa from '~/assets/payment/visa.svg';

const PAYMENT_ICONS = [
  {name: 'American Express', src: amex},
  {name: 'Bancontact', src: bancontact},
  {name: 'EPS', src: eps},
  {name: 'iDEAL Wero', src: idealWero},
  {name: 'Maestro', src: maestro},
  {name: 'Mastercard', src: mastercard},
  {name: 'MobilePay', src: mobilepay},
  {name: 'PayPal', src: paypal},
  {name: 'Union Pay', src: unionpay},
  {name: 'Visa', src: visa},
];

/**
 * Port of sections/footer.liquid
 * @param {FooterProps}
 */
export function Footer({klaviyo}) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__columns">
          {footerMenus.map((menu) => (
            <div key={menu.title} className="footer__column">
              <p className="footer__title">{menu.title}</p>
              <ul className="footer__links list--unstyled">
                {menu.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      className={link.highlight ? 'footer__link--boxed' : ''}
                      to={link.url}
                      prefetch="intent"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer__column">
            <p className="footer__title">{footerContact.title}</p>
            <div
              className="footer__text"
              dangerouslySetInnerHTML={{__html: footerContact.html}}
            />
            <ul className="footer__social list--unstyled">
              {footerContact.social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Folge uns auf ${item.name}`}
                  >
                    <SocialIcon name={item.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__column">
            <p className="footer__title">{footerNewsletter.title}</p>
            <NewsletterForm klaviyo={klaviyo} />
          </div>
        </div>

        <div className="footer__aside">
          <LanguageSelect />
          <span className="footer__copyright">Viktilabs</span>
          <div className="footer__payment">
            <span>Du entscheidest, wie du bezahlen möchtest</span>
            <ul className="footer__payment-list list--unstyled">
              {PAYMENT_ICONS.map((icon) => (
                <li key={icon.name}>
                  <img src={icon.src} alt={icon.name} width="38" height="24" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Subscribes to the Klaviyo list via the public Client API; disabled without config.
 * @param {{klaviyo: FooterProps['klaviyo']}}
 */
function NewsletterForm({klaviyo}) {
  const [status, setStatus] = useState(
    /** @type {'idle' | 'sending' | 'success' | 'error'} */ ('idle'),
  );
  const enabled = Boolean(klaviyo?.companyId && klaviyo?.listId);

  /** @param {React.FormEvent<HTMLFormElement>} event */
  const onSubmit = async (event) => {
    event.preventDefault();
    if (!enabled) return;
    const form = new FormData(event.currentTarget);
    setStatus('sending');
    try {
      const response = await fetch(
        `https://a.klaviyo.com/client/subscriptions?company_id=${klaviyo.companyId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/vnd.api+json',
            revision: '2024-10-15',
          },
          body: JSON.stringify({
            data: {
              type: 'subscription',
              attributes: {
                custom_source: 'Hydrogen Footer',
                profile: {
                  data: {
                    type: 'profile',
                    attributes: {
                      email: form.get('email'),
                      first_name: form.get('firstName') || undefined,
                      properties: {'DSGVO Embed Form': ['Akzeptiert DSGVO']},
                    },
                  },
                },
              },
              relationships: {
                list: {data: {type: 'list', id: klaviyo.listId}},
              },
            },
          }),
        },
      );
      setStatus(response.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="newsletter-form__success" role="status">
        <p>
          <strong>{footerNewsletter.successTitle}</strong>
        </p>
        <p>{footerNewsletter.successText}</p>
      </div>
    );
  }

  return (
    <form className="newsletter-form" onSubmit={onSubmit}>
      <p className="newsletter-form__intro">{footerNewsletter.intro}</p>
      <input
        name="firstName"
        type="text"
        placeholder="Vorname"
        autoComplete="given-name"
        aria-label="Vorname"
      />
      <input
        name="email"
        type="email"
        placeholder="Deine E-Mail Adresse"
        autoComplete="email"
        aria-label="E-Mail Adresse"
        required
      />
      <p className="newsletter-form__privacy">
        Hinweise zur Verarbeitung unserer Daten geben wir in unserer{' '}
        <Link to="/policies/privacy-policy">Datenschutzerklärung</Link>.
      </p>
      <label className="newsletter-form__consent">
        <input type="checkbox" name="consent" required />
        <span>{footerNewsletter.consent}</span>
      </label>
      <button
        className="newsletter-form__button"
        type="submit"
        disabled={status === 'sending'}
      >
        {footerNewsletter.button}
      </button>
      {!enabled && (
        <p className="newsletter-form__note">
          Newsletter-Anmeldung ist in dieser Umgebung deaktiviert.
        </p>
      )}
      {status === 'error' && (
        <p className="newsletter-form__note" role="alert">
          Etwas ist schiefgelaufen. Bitte versuche es erneut.
        </p>
      )}
    </form>
  );
}

function LanguageSelect() {
  const {pathname, search} = useLocation();
  const navigate = useNavigate();
  const current =
    footerLanguages.find(
      (lang) => lang.prefix && pathname.toUpperCase().startsWith(lang.prefix),
    ) ?? footerLanguages[0];

  return (
    <label className="footer__language">
      <FlagIcon flag={current.flag} />
      <select
        aria-label="Sprache"
        value={current.prefix}
        onChange={(e) => {
          const path = pathname.slice(current.prefix.length) || '/';
          navigate(`${e.target.value}${path}${search}`);
        }}
      >
        {footerLanguages.map((lang) => (
          <option key={lang.label} value={lang.prefix}>
            {lang.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/**
 * @param {{flag: string}}
 */
function FlagIcon({flag}) {
  const stripes = {
    de: ['#000', '#d00', '#ffce00'],
    es: ['#c60b1e', '#ffc400', '#c60b1e'],
  }[flag];
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" aria-hidden="true">
      {stripes ? (
        stripes.map((color, i) => (
          <rect
            key={['top', 'middle', 'bottom'][i]}
            y={(16 / 3) * i}
            width="22"
            height={16 / 3 + 0.2}
            fill={color}
          />
        ))
      ) : (
        <rect width="22" height="16" rx="2" fill="#112f95" />
      )}
    </svg>
  );
}

/**
 * @param {{name: string}}
 */
function SocialIcon({name}) {
  const paths = {
    Facebook: {
      viewBox: '0 0 9 17',
      d: 'M2.486 16.2084L2.486 8.81845H0L0 5.93845L2.486 5.93845L2.486 3.81845C2.38483 2.79982 2.73793 1.78841 3.45107 1.05407C4.16421 0.319722 5.16485 -0.0628415 6.186 0.00844868C6.9284 0.00408689 7.67039 0.0441585 8.408 0.128449V2.69845L6.883 2.69845C6.4898 2.61523 6.08104 2.73438 5.79414 3.01585C5.50724 3.29732 5.3803 3.70373 5.456 4.09845L5.456 5.93845H8.308L7.936 8.81845H5.46L5.46 16.2084H2.486Z',
    },
    Instagram: {
      viewBox: '0 0 16 16',
      d: 'M8 0C5.827 0 5.555.01 4.702.048 3.85.087 3.269.222 2.76.42a3.921 3.921 0 00-1.417.923c-.445.444-.719.89-.923 1.417-.198.509-.333 1.09-.372 1.942C.01 5.555 0 5.827 0 8s.01 2.445.048 3.298c.039.852.174 1.433.372 1.942.204.526.478.973.923 1.417.444.445.89.719 1.417.923.509.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.445-.01 3.298-.048c.852-.039 1.433-.174 1.942-.372a3.922 3.922 0 001.417-.923c.445-.444.719-.89.923-1.417.198-.509.333-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.298c-.039-.852-.174-1.433-.372-1.942a3.922 3.922 0 00-.923-1.417A3.921 3.921 0 0013.24.42c-.509-.198-1.09-.333-1.942-.372C10.445.01 10.173 0 8 0zm0 1.441c2.136 0 2.39.009 3.233.047.78.036 1.203.166 1.485.276.374.145.64.318.92.598.28.28.453.546.598.92.11.282.24.705.276 1.485.038.844.047 1.097.047 3.233s-.009 2.39-.047 3.233c-.036.78-.166 1.203-.276 1.485-.145.374-.318.64-.598.92-.28.28-.546.453-.92.598-.282.11-.705.24-1.485.276-.844.038-1.097.047-3.233.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.479 2.479 0 01-.92-.598 2.478 2.478 0 01-.598-.92c-.11-.282-.24-.705-.276-1.485-.038-.844-.047-1.097-.047-3.233s.009-2.39.047-3.233c.036-.78.166-1.203.276-1.485.145-.374.318-.64.598-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.844-.038 1.097-.047 3.233-.047zm0 9.226a2.667 2.667 0 110-5.334 2.667 2.667 0 010 5.334zm0-6.775a4.108 4.108 0 100 8.216 4.108 4.108 0 000-8.216zm5.23-.162a.96.96 0 11-1.92 0 .96.96 0 011.92 0z',
    },
    WhatsApp: {
      viewBox: '0 0 16 16',
      d: 'M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232',
    },
  }[name];
  return (
    <svg width="18" height="18" viewBox={paths.viewBox} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d={paths.d}
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * @typedef {Object} FooterProps
 * @property {{companyId?: string; listId?: string}} [klaviyo]
 */
