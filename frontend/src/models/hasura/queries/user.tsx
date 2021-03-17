import { gql } from '@apollo/client'

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
    query listAccounts($name: String, $lastLogin: timestamptz) {
        accounts(where: {profile: {name: {_ilike: $name}, _or: {account: {last_login: {_gt: $lastLogin}}}}}, limit: 10) {
            user_id
            email
            role
            profile {
                name
                locked
                created_at
                updated_at
            }
            last_login
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
