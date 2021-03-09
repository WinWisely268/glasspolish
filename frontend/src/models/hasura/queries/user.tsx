import gql from 'graphql-tag'

export const GET_ACCOUNT = gql`
    query getAccount($id: uuid!) {
        accounts(where: {user_id: {_eq: $id}}) {
            email
            role
            profile {
                name
                locked
                created_at
                updated_at
            }
            profile_pictures {
                picture_url
                primary
            }
            last_login
        }
    }
`

export const LIST_ACCOUNTS = gql`
    query listAccount($last_login: timestamptz!) {
        accounts(where: { last_login: { _gt: $last_login } }, limit: 10) {
            user_id
            email
            role
            last_login
            profile {
                locked
                name
                created_at
                updated_at
            }
            profile_pictures {
                picture_url
                primary
            }
        }
    }
`

export const GET_USER_AVATAR = gql`
    query getProfilePicture($id: uuid!) {
        profile_pictures(where: { account_id: { _eq: $id } }) {
            id
            picture_url
            primary
        }
    }
`
