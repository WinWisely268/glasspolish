import { Maybe, Product_Pictures, Product_Tags, Products } from '../service/graphql'

export type ProductQueryResult = (
  { __typename?: 'products' }
  & Pick<Products, 'id' | 'downline_price' | 'created_at' | 'buy_price' | 'best_price' | 'retail_price' | 'sellable' | 'sku' | 'name' | 'updated_at'>
  & {
  product_tag?: Maybe<(
    { __typename?: 'product_tags' }
    & Pick<Product_Tags, 'id' | 'name'>
    )>, product_pictures: Array<(
    { __typename?: 'product_pictures' }
    & Pick<Product_Pictures, 'id' | 'picture_url' | 'primary'>
    )>
}
  )
