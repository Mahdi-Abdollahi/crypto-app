import React from "react";
import { GetStaticProps, NextPage } from "next";
import CoinsList from "../components/CoinsList";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getCurrenciesDetails } from "./api/currencies";
import { Currency } from "../types";
import Head from "next/head";

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  // Store as CurrenciesDetails with page number(1 as default first request) and vs_currency(usd as default in first request)
  await queryClient.prefetchQuery<Currency[]>(
    ["currenciesDetails", 1, "usd"],
    () => getCurrenciesDetails()
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      revalidate: 10, // Get the most Updated data
    },
  };
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Crypto App</title>
        <meta property="og:title" content="Crypto App" key="title" />
      </Head>
      <CoinsList />
    </>
  );
};

export default Home;
