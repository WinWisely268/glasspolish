import {gql } from '@apollo/client'

export const LIST_PRODUCTS = gql`
    query listProducts($name: String, $createdAt: timestamptz, $limit: Int!) {
        products(where: {sku: {_ilike: $name}, _or: {created_at: {_gt: $createdAt}}}, order_by: {created_at: asc}, limit: $limit) {
            id
            downline_price
            created_at
            buy_price
            best_price
            retail_price
            sellable
            sku
            name
            updated_at
            product_tag {
                id
                name
            }
            product_pictures {
                id
                picture_url
                primary
            }
        }
    }
`