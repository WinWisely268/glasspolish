import gql from 'graphql-tag'

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