import { gql } from '@apollo/client'

export const INSERT_WAREHOUSE = gql`
    mutation insertWarehouse($maxCap: numeric, $name: String!, $address: String) {
        insert_warehouses_one(
            object: {
                name: $name,
                address: $address,
                max_cap: $maxCap
            }
        ) {
            id
            name
            address
            created_at
            updated_at
            max_cap
        }
    }
`

export const UPDATE_WAREHOUSE = gql`
    mutation updateWarehouse($id: uuid!, $name: String, $address: String, $maxCap: numeric) {
        update_warehouses(where: {id: {_eq: $id}}, _set: {
            name: $name,
            address: $address,
            max_cap: $maxCap,
        }){
            affected_rows
            returning {
                id
                name
                address
                created_at
                updated_at
                max_cap
            }
        }
    }
`

export const DELETE_WAREHOUSE = gql`
    mutation deleteWarehouse($id: uuid!) {
        delete_warehouses(where: {id: {_eq: $id}}) {
            affected_rows
        }
    }
`    