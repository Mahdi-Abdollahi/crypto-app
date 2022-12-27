import axios from "axios";
import { Currency } from "../../../types";

export const axiosCurrency = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

export const getCurrenciesDetails = async (
  page: number | undefined = 1,
  vs_currency: string | undefined = "usd"
): Promise<Currency[]> => {
  const res = await axiosCurrency.get(
    `coins/markets?vs_currency=${vs_currency}&amp;page=${page}&amp;per_page=20&amp;price_change_percentage=24h,7d`
  );
  return res.data;
};

export const getCurrenciesList = async (): Promise<string[]> => {
  const res = await axiosCurrency.get("simple/supported_vs_currencies");
  return res.data;
};
