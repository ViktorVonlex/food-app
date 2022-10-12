import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import Layout from '../components/Layout'
import '../styles/globals.css'
import store from "../redux/store"
import { Provider } from 'react-redux'
import React from 'react';
import { RouterTransition } from '../components/RouterTransition';

export default function MyApp(props: AppProps) {
    const { Component, pageProps } = props;

    return (
        <>
            <Head>
                <title>Vonlex pizza</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>

            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    /** Put your mantine theme override here */
                    colorScheme: 'light',
                }}
            >
                
                <Provider store={store}>
                    <RouterTransition />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
                
            </MantineProvider>
        </>
    );
}