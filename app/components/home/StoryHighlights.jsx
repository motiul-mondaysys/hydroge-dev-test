import {Link} from 'react-router';

/**
 * @param {{items: Array<{title: string; link: string; image: string}>}}
 */
export function StoryHighlights({items}) {
  return (
    <section className="story-highlights">
      <ul className="story-highlights__list list--unstyled">
        {items.map((item) => (
          <li key={item.title}>
            <Link
              className="story-highlights__item"
              to={item.link}
              prefetch="intent"
            >
              <img
                src={item.image}
                alt=""
                width="24"
                height="24"
                loading="eager"
              />
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
