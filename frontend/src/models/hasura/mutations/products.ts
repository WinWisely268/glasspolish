import {gql } from '@apollo/client'

export const INSERT_PRODUCT = gql`
    mutation insertProduct(
        $name: String!,
        $retailPrice: numeric,
        $sellable: Boolean!,
        $buyPrice: numeric!,
        $bestPrice: numeric,
        $downlinePrice: numeric,
        $sku: String!,
        $tagId: uuid
    ) {
        insert_products_one(
            object:
            {
                name: $name,
                retail_price: $retailPrice,
                sellable: $sellable,
                sku: $sku,
                best_price: $bestPrice,
                buy_price: $buyPrice,
                downline_price: $downlinePrice,
                tag_id: $tagId
            }
        )
        {
            id
            name
            sku
            sellable
            buy_price
            best_price
            downline_price
            retail_price
            created_at
            updated_at
        }
    }
`

export const UPDATE_PRODUCT = gql`
    mutation updateProduct(
        $id: uuid!,
        $name: String,
        $sku: String,
        $buyPrice: numeric,
        $bestPrice: numeric,
        $downlinePrice: numeric,
        $retailPrice: numeric,
        $tagId: uuid,
        $sellable: Boolean,
    ) {
        update_products(where: {id: {_eq: $id}}, _set: {
            name: $name,
            sku: $sku,
            buy_price: $buyPrice,
            best_price: $bestPrice,
            downline_price: $downlinePrice,
            retail_price: $retailPrice,
            tag_id: $tagId,
            sellable: $sellable,
        }){
            returning {
                id
                name
                sku
                sellable
                buy_price
                best_price
                downline_price
                retail_price
                created_at
                updated_at
            }
        }
    }
`

export const DELETE_PRODUCT = gql`
    mutation deleteProduct($id: uuid!) {
        delete_products(where: {id: {_eq: $id}}) {
           affected_rows
        }
    }
`