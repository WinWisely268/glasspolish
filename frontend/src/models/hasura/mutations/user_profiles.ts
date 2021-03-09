import gql from 'graphql-tag'

export const UPSERT_PROFILE = gql`
    mutation upsertProfile(
        $accountId: uuid!,
        $name: String!,
    ) {
        insert_profiles_one(
            object:
            {
                account_id: $accountId,
                name: $name,
            }
        )
        {
            name
        }
    }
`