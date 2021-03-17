import {gql} from '@apollo/client'

export const UPDATE_PRODUCT_TAG = gql`
    mutation updateProductTag($tagId: uuid!, $name: String, $description: String) {
        update_product_tags(where: {id: {_eq: $tagId}}, _set: {name: $name, description: $description}){
            returning {
                id
                name
                description
            }
        }
    }

`

export const INSERT_PRODUCT_TAG = gql`
    mutation insertProductTag(
        $tagId: uuid!,
        $name: String!,
        $description: String!,
    ) {
        insert_product_tags_one(
            object:
            {
                id: $tagId,
                name: $name,
                description: $description
            }
            , on_conflict: {
                constraint: product_tags_name_key,
                update_columns: [name, description, updated_at]
            }
        )
        {
            name
            description
            created_at
            updated_at
        }
    }
`

export const DELETE_PRODUCT_TAG = gql`
  mutation deleteProductTag($tagId: uuid!) {
      delete_product_tags(where: {id: {_eq: $tagId}}) {
          affected_rows
      }
  }
`