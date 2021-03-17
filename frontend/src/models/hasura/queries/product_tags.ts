import { gql } from '@apollo/client'

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

export const GET_TAG = gql`
    query getProductTag($tagId: uuid!) {
        product_tags(where: {id: {_eq: $tagId}}) {
            id
            name
            description
            created_at
            updated_at
        }
    }
`