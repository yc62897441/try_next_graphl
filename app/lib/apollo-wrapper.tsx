// apollo-wrapper.ts 是我們可以為 client component 配置 apollo config 的地方
// 創建一個 provider 並用該 provider 包裹我們的 app(這不會將我們的 app 變成客戶端元件，您仍然可以使用伺服器元件)
'use client'

import { ApolloClient, ApolloLink, HttpLink } from '@apollo/client'
import { NextSSRApolloClient, ApolloNextAppProvider, NextSSRInMemoryCache, SSRMultipartLink } from '@apollo/experimental-nextjs-app-support/ssr'

function makeClient() {
    const httpLink = new HttpLink({
        // uri: 'put your api endpoint here',
        uri: 'https://flyby-router-demo.herokuapp.com/', // the URL of our GraphQL server.
    })

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link:
            typeof window === 'undefined'
                ? ApolloLink.from([
                      new SSRMultipartLink({
                          stripDefer: true,
                      }),
                      httpLink,
                  ])
                : httpLink,
    })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}
