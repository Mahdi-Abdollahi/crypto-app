import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useRef, useCallback, useMemo } from "react";
import {
  getCurrenciesDetails,
  getCurrenciesList,
} from "../pages/api/currencies";
import { addCommaToPrice, checkNumberSign } from "../utils/helper";
import Button from "./Button";
import Selector from "./Selector";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";

export default function CoinsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [vsCurrenecy, setVsCurrenecy] = useState("usd");

  const myRef = useRef<HTMLElement>(null);

  // Queries
  const {
    data: currenciesDetails = [],
    isLoading: isCurrenciesDetailsLoading,
    isError: isCurrenciesDetailsError,
    error: currenciesDetailsError,
    isPreviousData,
    isFetching,
  } = useQuery({
    queryKey: ["currenciesDetails", currentPage, vsCurrenecy],
    queryFn: () => getCurrenciesDetails(currentPage, vsCurrenecy),
    keepPreviousData: true,
    // Refetch data at 1 minute frequency(Get Updated data of Coins)
    refetchInterval: 60 * 1000,
  });

  const { data: currenciesList = [], isLoading: currenciesListIsloading } =
    useQuery({
      queryKey: ["currenciesList"],
      queryFn: getCurrenciesList,
      staleTime: 360 * 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  const selectorOptions = useMemo(() => {
    if (currenciesListIsloading) {
      return [];
    }
    return [...currenciesList];
  }, [currenciesList]);

  // Handlers

  const scrollToTop = () => {
    if (myRef.current) myRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const nextPageHandler = useCallback(() => {
    setCurrentPage((previousState: number) => previousState + 1);
    scrollToTop();
  }, []);

  const previousPageHandler = useCallback(() => {
    setCurrentPage((previousState: number) => previousState - 1);
    scrollToTop();
  }, []);

  const changeVsCurrencyHandler = useCallback((option: string) => {
    setVsCurrenecy(option);
  }, []);

  return (
    <main ref={myRef} className="bg-sky w-full p-4 overflow-x-auto">
      <Selector
        options={selectorOptions}
        changeVsCurrency={changeVsCurrencyHandler}
      />

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
                  className="text-white  hover:bg-gray cursor-pointer"
                  key={currency.id}
                >
                  <td className="rounded-l font-bold">
                    {/* Find index of coins by page number */}
                    {index + 1 + (currentPage - 1) * 20}
                  </td>
                  <td className="flex flex-row items-center">
                    <div className="w-7 h-7">
                      <Image
                        src={currency.image}
                        alt="currency-logo"
                        width={30}
                        height={30}
                        className="w-7 h-7"
                      />
                    </div>
                    <div className="flex flex-col items-start ml-2">
                      <h3 className="font-md font-bold">{currency.name}</h3>
                      <p className="text-gray">{currency.symbol}</p>
                    </div>
                  </td>
                  <td>{"$" + addCommaToPrice(currency.current_price)}</td>
                  <td>
                    <div
                      className={`flex flex-row justify-content-center items-center ${
                        priceChangeIn24HoursSign ? "text-success" : "text-error"
                      }`}
                    >
                      {priceChangeIn24HoursSign ? (
                        <AiOutlineUp className="text-success" />
                      ) : (
                        <AiOutlineDown className="text-error" />
                      )}
                      <p>
                        {currency.price_change_percentage_24h_in_currency.toFixed(
                          4
                        )}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div
                      className={`flex flex-row justify-content-center items-center ${
                        priceChangeIn7DaysSign ? "text-success" : "text-error"
                      }`}
                    >
                      <div>
                        {priceChangeIn7DaysSign ? (
                          <AiOutlineUp className="text-success" />
                        ) : (
                          <AiOutlineDown className="text-error" />
                        )}
                      </div>
                      <p>
                        {currency.price_change_percentage_7d_in_currency.toFixed(
                          4
                        )}
                      </p>
                    </div>
                  </td>
                  <td>{"$" + addCommaToPrice(currency.market_cap)}</td>
                  <td>{"$" + addCommaToPrice(currency.total_volume)}</td>
                  <td className="rounded-r">
                    <>
                      {addCommaToPrice(currency.circulating_supply)}
                      <span className="text-gray">
                        {currency.symbol.toUpperCase()}
                      </span>
                    </>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className="w-4/6 mx-auto flex flex-row items-center justify-between mt-6">
        <Button
          handler={previousPageHandler}
          text="<Previous"
          isDisabled={currentPage === 1}
          classes="w-20 rounded border text-white disabled:text-gray border-gray"
        />
        <div className="text-white">{currentPage}</div>
        <Button
          handler={nextPageHandler}
          text="Next>"
          isDisabled={currenciesDetails?.length < 20}
          classes="w-20 rounded border text-white disabled:text-gray border-gray"
        />
      </div>
    </main>
  );
}
