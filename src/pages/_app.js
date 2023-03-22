import {ChakraProvider} from '@chakra-ui/react'
import Head from "next/head";

export default function App({Component, pageProps}) {
    return (
        <ChakraProvider>
            <Head>
                <title>Engineering project</title>
            </Head>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}
