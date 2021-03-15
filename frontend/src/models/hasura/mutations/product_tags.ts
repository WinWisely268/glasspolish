import gql from 'graphql-tag'

export const UPSERT_PRODUCT_TAG = gql`
    mutation upsertProductTag(
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