import React from "react";
import { GetServerSideProps, NextPage } from "next";
import CoinsList from "../components/CoinsList";
import axios from "axios";
import { dehydrate, QueryClient } from "@tanstack/react-query";

type Currency = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  last_updated?: string;
};

export const getCurrencies = async (): Promise<Currency[]> => {
  const res = await axios(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&amp;page=1&amp;per_page=20&amp;price_change_percentage=24h,7d"
  );
  return res.data;
};

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["currencies"], getCurrencies);
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
