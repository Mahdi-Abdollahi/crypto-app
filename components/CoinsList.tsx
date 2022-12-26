import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { getCurrencies } from "../pages";

const checkNumberSign = (number: number) =>
  Math.sign(number) === 0 || Math.sign(number) === -1 ? false : true;

function addCommaToPrice(number: number) {
  if (number) return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return 0;
}

export default function CoinsList() {
  const {
    data: currencies,
    isLoading,
    isError,
    error,
  } = useQuery(["currencies"], getCurrencies);
  const router = useRouter();
  const handleRowClick = (currencyId: number) => {
    router.push(`/currencies/${currencyId}`);
  };

  return (
    <main className="bg-sky w-full p-4 overflow-hidden">
      {isLoading && <h3 className="text-white">Loading...</h3>}
      {isError && <h3 className="text-error">Error: {error?.message}</h3>}
      {currencies?.length && (
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
            {currencies.map((currency, index) => {
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
                  <td className="rounded-l">{index + 1}</td>
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
    </main>
  );
}
