import "../styles/globals.css";
import Head from "next/head";
import { SSRProvider } from "@react-aria/ssr";
import { Provider, useSelector } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { useState } from "react";
import reducers from "@services/redux/reducers/index";
import { Router } from "next/router";

import "bootstrap/dist/css/bootstrap.min.css";
const store = createStore(
  reducers,
  // peristedState,
  applyMiddleware(thunk)
);
function MyApp({ Component, pageProps }) {
  return (
    <>
      <SSRProvider>
        <Head>
          <meta
            content="width=device-width, initial-scale=1.0"
            name="viewport"
          />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />
          <meta name="description" content="Klinik" />
          <title>JobHuntId</title>
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SSRProvider>
    </>
  );
}

export default MyApp;
