import Image from "next/image";
import { useRouter } from "next/router";

export default function CoinsList() {
  const router = useRouter();
  const handleRowClick = () => {
    router.push("/");
  };

  return (
    <main className="bg-sky w-full p-4 overflow-hidden">
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
          <tr
            onClick={() => handleRowClick()}
            className="text-white  hover:bg-gray cursor-pointer"
          >
            <td className="rounded-l">1</td>
            <td className="flex flex-row">
              <Image
                src="/images/bitcoin.svg"
                alt="currency-logo"
                width={24}
                height={24}
              />
              <div className="flex flex-col items-start ml-2">
                <h3 className="font-md font-bold">Bitcoin</h3>
                <p className="text-gray">BTC</p>
              </div>
            </td>
            <td>$42,735,00</td>
            <td>
              <div className="flex flex-row  text-success justify-items-center">
                <Image
                  src="/images/increase.svg"
                  alt="up"
                  width={16}
                  height={16}
                />
                <p>0.63%</p>
              </div>
            </td>
            <td>
              <div className="flex flex-row  text-success justify-items-center">
                <Image
                  src="/images/decrease.svg"
                  alt="up"
                  width={16}
                  height={16}
                />
                <p>0.63%</p>
              </div>
            </td>
            <td>$42,735,00</td>
            <td>$42,735,00</td>
            <td className="rounded-r">$42,735,00</td>
          </tr>
          <tr
            onClick={() => handleRowClick()}
            className="text-white  hover:bg-gray cursor-pointer"
          >
            <td className="rounded-l">1</td>
            <td className="flex flex-row">
              <Image
                src="/images/bitcoin.svg"
                alt="currency-logo"
                width={24}
                height={24}
              />
              <div className="flex flex-col items-start ml-2">
                <h3 className="font-md font-bold">Bitcoin</h3>
                <p className="text-gray">BTC</p>
              </div>
            </td>
            <td>$42,735,00</td>
            <td>
              <div className="flex flex-row  text-success justify-items-center">
                <Image
                  src="/images/increase.svg"
                  alt="up"
                  width={16}
                  height={16}
                />
                <p>0.63%</p>
              </div>
            </td>
            <td>
              <div className="flex flex-row  text-success justify-items-center">
                <Image
                  src="/images/decrease.svg"
                  alt="up"
                  width={16}
                  height={16}
                />
                <p>0.63%</p>
              </div>
            </td>
            <td>$42,735,00</td>
            <td>$42,735,00</td>
            <td className="rounded-r">$42,735,00</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
