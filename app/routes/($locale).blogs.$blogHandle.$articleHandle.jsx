import {Link, useLoaderData} from 'react-router';
import {Image} from '@shopify/hydrogen';
import {ShareLinks} from '~/components/FeaturedProduct';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data}) => {
  const article = data?.article;
  return [
    {title: `${article?.seo?.title || article?.title || ''} | Viktilabs`},
    {
      name: 'description',
      content: article?.seo?.description || article?.excerpt || '',
    },
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
  const {blogHandle, articleHandle} = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', {status: 404});
  }

  const {blog} = await context.storefront.query(ARTICLE_QUERY, {
    variables: {blogHandle, articleHandle},
    cache: context.storefront.CacheShort(),
  });

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  redirectIfHandleIsLocalized(
    request,
    {handle: articleHandle, data: blog.articleByHandle},
    {handle: blogHandle, data: blog},
  );

  return {article: blog.articleByHandle, blog};
}

export default function Article() {
  /** @type {LoaderReturnData} */
  const {article, blog} = useLoaderData();
  const {title, image, contentHtml} = article;
  const blogUrl = `/blogs/${blog.handle}`;

  return (
    <article className="article">
      <header className="article-banner">
        <div className="article-banner__content">
          <nav className="article-banner__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Start</Link> / <Link to={blogUrl}>{blog.title}</Link>{' '}
            / <span aria-current="page">{title}</span>
          </nav>
          <h1 className="article-banner__title">{title}</h1>
        </div>
        {image && (
          <div className="article-banner__image">
            <Image
              data={image}
              alt={image.altText || title}
              sizes="(min-width: 1000px) 50vw, 100vw"
              loading="eager"
            />
          </div>
        )}
      </header>

      <div className="article__inner">
        <div className="article__aside">
          <ShareLinks title={title} path={`${blogUrl}/${article.handle}`} />
        </div>
        <div
          className="article__content rte"
          dangerouslySetInnerHTML={{__html: contentHtml}}
        />
      </div>
    </article>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog#field-blog-articlebyhandle
const ARTICLE_QUERY = `#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      handle
      title
      articleByHandle(handle: $articleHandle) {
        handle
        title
        contentHtml
        excerpt
        publishedAt
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
`;

/** @typedef {import('./+types/blogs.$blogHandle.$articleHandle').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
