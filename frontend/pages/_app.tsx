import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Head from 'next/head'

import theme from '../src/theme';
import { Auth0Provider } from '../auth/auth0-spa'

export default function MyApp(props) {
  const onRedirectCallback = appState => {
    console.log('appState', appState)

    props.router.push(appState && appState.targetUrl ? appState.targetUrl : '/')
  }

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }, []);
  const { Component, pageProps } = props;
  return (
    <React.Fragment>
      <Head>
        <title>My App</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Auth0Provider
          domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
          clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
          redirectUri={'http://localhost:3000'}
          onRedirectCallback={onRedirectCallback}
        >
          <Component {...pageProps} />
        </Auth0Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}
