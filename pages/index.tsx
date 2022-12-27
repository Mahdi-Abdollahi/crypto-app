import React from "react";
import { GetServerSideProps, NextPage } from "next";
import CoinsList from "../components/CoinsList";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getCurrenciesDetails } from "./api/currencies";
import { Query } from "../types";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["currenciesDetails"], () =>
    getCurrenciesDetails()
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Home: NextPage = () => {
  return <CoinsList />;
};

export default Home;
