import prismic from 'prismic.io';

const PRISMIC_ENDPOINT = 'https://rhiannon.prismic.io/api';
const PRISMIC_DEFAULT_OPTIONS = {
  pageSize: 4,
  orderings: '[my.post.priority, my.post.date]',
};

const linkResolver = (doc) => {
  if (doc.isBroken) return false;
  return `/!/${doc.id}`;
};

const filterPostType = (e) => {
  const title = e.getStructuredText('post.title');
  const image = e.getImage('post.image');
  const caption = e.getStructuredText('post.caption');
  const content = e.getStructuredText('post.body');
  const group = e.getGroup('post.videos');
  const videos = group ? group.toArray().map(g => g.getText('video')) : [];
  return {
    id: e.id,
    type: e.type,
    tags: e.tags,
    slug: e.slug,
    title: title ? title.asText() : '',
    image: image ? image.asHtml(linkResolver) : null,
    caption: caption ? caption.asHtml(linkResolver) : null,
    content: content ? content.asHtml(linkResolver) : '',
    videos,
  };
};

export const fetch = (page, after) => (
  prismic.api(PRISMIC_ENDPOINT)
    .then(api => api.query(
      prismic.Predicates.at('document.type', 'post'),
      { ...PRISMIC_DEFAULT_OPTIONS, page, after },
    ))
    .then(result => result.results.map(filterPostType))
);

export const fetchSlug = slug => (
  prismic.api(PRISMIC_ENDPOINT)
    .then(api => api.query(
      prismic.Predicates.fulltext('document', slug),
      // PRISMIC_DEFAULT_OPTIONS,
    ))
    .then(res => res.results.filter(d => d.slug === slug).map(filterPostType))
);

export const fetchId = id => prismic.api(PRISMIC_ENDPOINT).getByID(id).then(filterPostType);
