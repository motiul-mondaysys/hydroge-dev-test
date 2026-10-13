import {Link, useLoaderData} from 'react-router';
import {Image, Pagination, getPaginationVariables} from '@shopify/hydrogen';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data}) => {
  return [
    {title: `${data?.blog.seo?.title || data?.blog.title || ''} | Viktilabs`},
    {name: 'description', content: data?.blog.seo?.description ?? ''},
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const criticalData = await loadCriticalData(args);
  return {...criticalData};
}

/**
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({context, request, params}) {
  const paginationVariables = getPaginationVariables(request, {pageBy: 9});

  if (!params.blogHandle) {
    throw new Response(`blog not found`, {status: 404});
  }

  const {blog} = await context.storefront.query(BLOG_QUERY, {
    variables: {blogHandle: params.blogHandle, ...paginationVariables},
    cache: context.storefront.CacheShort(),
  });

  if (!blog?.articles) {
    throw new Response('Not found', {status: 404});
  }

  redirectIfHandleIsLocalized(request, {handle: params.blogHandle, data: blog});

  // Theme's "blog-posts" section (4 latest) only shows on the first page
  const isFirstPage = !new URL(request.url).searchParams.has('cursor');

  return {blog, isFirstPage};
}

export default function Blog() {
  /** @type {LoaderReturnData} */
  const {blog, isFirstPage} = useLoaderData();
  const [featured, ...recent] = blog.latest.nodes;

  return (
    <div className="blog">
      {isFirstPage && featured && (
        <section className="blog-posts">
          <header className="blog-posts__header">
            <p className="blog-posts__subheading">Aktuelle Beiträge</p>
            <h1 className="blog-posts__title">{blog.title}</h1>
          </header>
          <div className="blog-posts__list">
            <ArticleItem
              article={featured}
              blogHandle={blog.handle}
              variant="featured"
              loading="eager"
            />
            <div className="blog-posts__side">
              {recent.map((article) => (
                <ArticleItem
                  key={article.id}
                  article={article}
                  blogHandle={blog.handle}
                  variant="side"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="blog-main">
        {!isFirstPage && <h1 className="sr-only">{blog.title}</h1>}
        <Pagination connection={blog.articles}>
          {({nodes, isLoading, PreviousLink, NextLink, hasPreviousPage}) => (
            <>
              <div className="blog-grid">
                {nodes.map((article, index) => (
                  <ArticleItem
                    key={article.id}
                    article={article}
                    blogHandle={blog.handle}
                    loading={index < 3 && !isFirstPage ? 'eager' : 'lazy'}
                    showExcerpt
                  />
                ))}
              </div>
              <nav className="blog-pagination" aria-label="Seitennummerierung">
                {hasPreviousPage && (
                  <PreviousLink className="blog-pagination__item" aria-label="Vorherige Seite">
                    {isLoading ? '…' : <Arrow direction="left" />}
                  </PreviousLink>
                )}
                <NextLink className="blog-pagination__item" aria-label="Nächste Seite">
                  {isLoading ? '…' : <Arrow direction="right" />}
                </NextLink>
              </nav>
            </>
          )}
        </Pagination>
      </section>
    </div>
  );
}

/**
 * @param {{
 *   article: ArticleItemFragment;
 *   blogHandle: string;
 *   variant?: 'featured' | 'side';
 *   loading?: HTMLImageElement['loading'];
 *   showExcerpt?: boolean;
 * }}
 */
function ArticleItem({article, blogHandle, variant, loading = 'lazy', showExcerpt}) {
  const url = `/blogs/${blogHandle}/${article.handle}`;
  return (
    <article
      className={`article-item${variant ? ` article-item--${variant}` : ''}`}
    >
      {article.image && (
        <Link to={url} prefetch="intent" className="article-item__image" tabIndex={-1}>
          <Image
            alt={article.image.altText || article.title}
            data={article.image}
            loading={loading}
            aspectRatio={variant === 'featured' ? '16/9' : '3/2'}
            sizes={
              variant === 'featured'
                ? '(min-width: 1000px) 640px, 100vw'
                : '(min-width: 1000px) 380px, (min-width: 741px) 50vw, 100vw'
            }
          />
        </Link>
      )}
      <div className="article-item__content">
        <h2 className="article-item__title">
          <Link to={url} prefetch="intent">
            {article.title}
          </Link>
        </h2>
        {showExcerpt && article.excerpt && (
          <p className="article-item__excerpt">{article.excerpt}</p>
        )}
      </div>
    </article>
  );
}

/** @param {{direction: 'left' | 'right'}} */
function Arrow({direction}) {
  return (
    <svg width="17" height="14" viewBox="0 0 17 14" aria-hidden="true">
      <path
        d={direction === 'right' ? 'M0 7h15M9 1l6 6-6 6' : 'M17 7H2M8 1 2 7l6 6'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog
const BLOG_QUERY = `#graphql
  query Blog(
    $language: LanguageCode
    $blogHandle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      title
      handle
      seo {
        title
        description
      }
      latest: articles(first: 4, sortKey: PUBLISHED_AT, reverse: true) {
        nodes {
          ...ArticleItem
        }
      }
      articles(
        first: $first
        last: $last
        before: $startCursor
        after: $endCursor
        sortKey: PUBLISHED_AT
        reverse: true
      ) {
        nodes {
          ...ArticleItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
  fragment ArticleItem on Article {
    excerpt
    handle
    id
    image {
      id
      altText
      url
      width
      height
    }
    publishedAt
    title
  }
`;

/** @typedef {import('./+types/blogs.$blogHandle._index').Route} Route */
/** @typedef {import('storefrontapi.generated').ArticleItemFragment} ArticleItemFragment */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
