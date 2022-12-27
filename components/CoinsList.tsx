import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import {
  getCurrenciesDetails,
  getCurrenciesList,
} from "../pages/api/currencies";
import { Query } from "../types";

const checkNumberSign = (number: number) =>
  Math.sign(number) === 0 || Math.sign(number) === -1 ? false : true;

function addCommaToPrice(number: number) {
  if (number) return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return 0;
}

export default function CoinsList() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const myRef = useRef<HTMLElement>(null);
  const {
    data: currenciesDetails = [],
    isLoading: isCurrenciesDetailsLoading,
    isError: isCurrenciesDetailsError,
    error: currenciesDetailsError,
    isPreviousData,
    isFetching,
  } = useQuery(
    ["currenciesDetails", currentPage, "usd"],
    () => getCurrenciesDetails(currentPage, "usd"),
    { keepPreviousData: true }
  );

  const {
    data: currenciesList = [],
    isLoading: isCurrenciesListLoading,
    isError: isCurrencieslistError,
  } = useQuery(["currenciesList"], getCurrenciesList);
  console.log(currenciesList);
  const handleRowClick = (currencyId: string) => {
    router.push(`/currencies/${currencyId}`);
  };
  const scrollToTop = () => {
    if (myRef.current) myRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const nextPageHandler = () => {
    setCurrentPage((previousState: number) => previousState + 1);
    scrollToTop();
  };
  const previousPageHandler = () => {
    setCurrentPage((previousState: number) => previousState - 1);
    scrollToTop();
  };

  return (
    <main ref={myRef} className="bg-sky w-full p-4 overflow-hidden">
      {isCurrenciesDetailsLoading && <h3 className="text-white">Loading...</h3>}
      {isCurrenciesDetailsError && <h3 className="text-error">Error</h3>}
      {currenciesDetails?.length && (
        <table className="table-focus border-separate border-spacing-y-3 w-full text-left">
          <thead>
            <tr className="text-gray">
              <th scope="col">#</th>
              <th scope="col">CONS</th>
              <th scope="col">PRICE</th>
              <th scope="col">24H</th>
              <th scope="col">7D</th>
              <th scope="col">MARKET CAP</th>
              <th scope="col">TOTAL VOLUME</th>
              <th scope="col">CIRCULATING SUPPLY</th>
            </tr>
          </thead>
          <tbody>
            {currenciesDetails.map((currency, index) => {
              const priceChangeIn24HoursSign = checkNumberSign(
                currency.price_change_percentage_24h_in_currency
              );
              const priceChangeIn7DaysSign = checkNumberSign(
                currency.price_change_percentage_7d_in_currency
              );
              return (
                <tr
                  onClick={() => handleRowClick(currency.id)}
                  className="text-white  hover:bg-gray cursor-pointer"
                  key={currency.id}
                >
                  <td className="rounded-l font-bold">
                    {/* Find index of coins by page number */}
                    {index + 1 + (currentPage - 1) * 20}
                  </td>
                  <td className="flex flex-row items-center">
                    <div>
                      <Image
                        src={currency.image}
                        alt="currency-logo"
                        width={30}
                        height={30}
                      />
                    </div>
                    <div className="flex flex-col items-start ml-2">
                      <h3 className="font-md font-bold">{currency.name}</h3>
                      <p className="text-gray">{currency.symbol}</p>
                    </div>
                  </td>
                  <td>${addCommaToPrice(currency.current_price)}</td>
                  <td>
                    <div
                      className={`flex flex-row justify-items-center ${
                        priceChangeIn24HoursSign ? "text-success" : "text-error"
                      }`}
                    >
                      <Image
                        src="/images/increase.svg"
                        alt="up"
                        width={16}
                        height={16}
                      />
                      <p>
                        {currency.price_change_percentage_24h_in_currency.toFixed(
                          4
                        )}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div
                      className={`flex flex-row justify-items-center ${
                        priceChangeIn7DaysSign ? "text-success" : "text-error"
                      }`}
                    >
                      <Image
                        src="/images/decrease.svg"
                        alt="up"
                        width={16}
                        height={16}
                      />
                      <p>
                        {currency.price_change_percentage_7d_in_currency.toFixed(
                          4
                        )}
                      </p>
                    </div>
                  </td>
                  <td>${addCommaToPrice(currency.market_cap)}</td>
                  <td>${addCommaToPrice(currency.total_volume)}</td>
                  <td className="rounded-r">
                    {addCommaToPrice(currency.circulating_supply)}{" "}
                    <span className="text-gray">
                      {currency.symbol.toUpperCase()}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className="w-4/6 mx-auto flex flex-row items-center justify-between mt-6">
        <button
          onClick={previousPageHandler}
          disabled={currentPage === 1}
          className="w-20 rounded border text-white disabled:text-gray border-gray"
        >
          {"<" + "Previous"}
        </button>
        <div className="text-white">{currentPage}</div>
        <button
          onClick={nextPageHandler}
          disabled={currenciesDetails?.length < 20}
          className="w-20 rounded border text-white disabled:text-gray border-gray"
        >
          {"Next" + ">"}
        </button>
      </div>
    </main>
  );
}
