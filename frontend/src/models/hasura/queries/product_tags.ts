import gql from 'graphql-tag'

export const LIST_PRODUCT_TAGS = gql`
  query listProductTags($query: String!) {
      product_tags(where: {name: {_ilike: $query}}) {
          id
          name
          description
          created_at
          updated_at        
      }
  }
`