module.exports = {
    schema: [
        {
            'https://api.glasspolish.store/v1/graphql': {
                headers: {
                    'X-Hasura-Admin-Secret': "TuIXYZblvxUvo3fnGQ1HrlVPQ"
                }
            }
        }
    ],
    documents: ['./src/models/hasura/**/*.tsx', './src/models/hasura/**/*.ts'],
    overwrite: true,
    generates: {
        './src/service/graphql/index.tsx': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo'
            ],
            config: {
                skipTypename: false,
                withHooks: true,
                withHOC: false,
                withComponent: false
            }
        },
        './graphql.schema.json': {
            plugins: ['introspection']
        }
    }
}
