// client.ts 是我們可以為 server component 設定 apollo config 的地方
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'

export const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
        link: new HttpLink({
            // uri: 'put your api endpoint here',
            uri: 'https://flyby-router-demo.herokuapp.com/', // the URL of our GraphQL server.
        }),
        cache: new InMemoryCache(),
    })
})
