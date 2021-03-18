import { gql } from '@apollo/client'

export const LIST_WAREHOUSES = gql`
  query listWarehouses($query: String!) {
      warehouses(where: {name: {_ilike: $query}, _or: {address: {_ilike: $query}}}) {
          id
          name
          address
          created_at
          updated_at
          max_cap
      }
  }
`

export const GET_WAREHOUSE = gql`
  query getWarehouse($id: uuid!) {
      warehouses(where: {id: {_eq: $id}}) {
          id
          name
          address
          created_at
          updated_at
          max_cap
      }
  }
`