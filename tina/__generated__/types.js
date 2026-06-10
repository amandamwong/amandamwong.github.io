export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const ReviewsPartsFragmentDoc = gql`
    fragment ReviewsParts on Reviews {
  __typename
  title
  type
  year
  genre
  rating
  review
  dateWatched
  recommended
  status
}
    `;
export const DipPartsFragmentDoc = gql`
    fragment DipParts on Dip {
  __typename
  season
  episode
  title
  summary
  method
  motive
  killer
  notes
  tags
  dateAdded
}
    `;
export const ReviewsDocument = gql`
    query reviews($relativePath: String!) {
  reviews(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ReviewsParts
  }
}
    ${ReviewsPartsFragmentDoc}`;
export const ReviewsConnectionDocument = gql`
    query reviewsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ReviewsFilter) {
  reviewsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ReviewsParts
      }
    }
  }
}
    ${ReviewsPartsFragmentDoc}`;
export const DipDocument = gql`
    query dip($relativePath: String!) {
  dip(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...DipParts
  }
}
    ${DipPartsFragmentDoc}`;
export const DipConnectionDocument = gql`
    query dipConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: DipFilter) {
  dipConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...DipParts
      }
    }
  }
}
    ${DipPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    reviews(variables, options) {
      return requester(ReviewsDocument, variables, options);
    },
    reviewsConnection(variables, options) {
      return requester(ReviewsConnectionDocument, variables, options);
    },
    dip(variables, options) {
      return requester(DipDocument, variables, options);
    },
    dipConnection(variables, options) {
      return requester(DipConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "https://content.tinajs.io/2.4/content/7e700257-effd-440b-aa89-2e2552040a2e/github/main",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
