import React, {  useState} from 'react'
import Button from './Button';
import Loading from "./Loading";
import { FaExchangeAlt, FaExclamationTriangle } from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";
import { fetchCurrencies } from "../utils/fetchCurrencies";
import { fetchRate } from "../utils/fetchRate";

const FormInput = () => {
  const [currencyObj, setCurrencyObj] = useState({
    to: "AUD",
    from: "USD",
    amount: "",
  });

  const {
    data: lists,
    isLoading,
    isError: currIsError,
    error: currenciesErr,
  } = useQuery({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const {
    data: exchange,
    isFetching,
    isError: exIsError,

    error: exchangeError,
  } = useQuery({
    queryKey: ["exchange", { to: currencyObj.to, from: currencyObj.from }],
    queryFn: ({ queryKey }) => fetchRate(queryKey[1]),
    enabled: !!currencyObj.amount,
  });

  const handleSwap = () => {
    setCurrencyObj((prev) => ({ ...prev, to: prev.from, from: prev.to }));
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setCurrencyObj((prev) => ({ ...prev, [name]: value }));
  };

  const currencyTag = lists
    ? Object.keys(lists.currencies).map((currency, idx) => (
        <option
          key={idx}
          value={currency}
          className="flex items-center gap-3 outline-none py-1"
        >
          [ {currency} ] <>{lists.currencies[currency]} </>
        </option>
      ))
    : null;
  return (
    <form method="POST" className="flex flex-col gap-2 items-center relative">
      <p className="flex items-center gap-2 text-red-600 dark:text-red-800 text-md">
        {(currIsError || exIsError) && (
          <>
            {" "}
            <FaExclamationTriangle />
            {exchangeError?.message || currenciesErr?.message}
          </>
        )}
      </p>
      <section className=" p-3 bg-white rounded-md shadow-md space-y-3 max-w-100 w-full dark:bg-slate-800 dark:shadow-black ">
        <div className="flex justify-end w-full">
          <select
            name={"from"}
            value={currencyObj.from}
            onChange={handleForm}
            id=""
            disabled={isLoading || isFetching}
            className="text-light-text dark:text-dark-text border border-accent-light dark:border-accent-dark py-1 px-2 outline-none w-full"
          >
            {currencyTag}
          </select>
        </div>
        <input
          type="number"
          name="amount"
          value={currencyObj.amount}
          onChange={handleForm}
          required
          className="h-20 w-full border border-accent-light dark:border-accent-dark outline-0 text-3xl font-bold font-sans text-light-text dark:text-dark-text px-2 rounded-md "
        />
      </section>
      <section className=" p-3 bg-white rounded-md shadow-md space-y-3 max-w-100 w-full dark:bg-slate-800 dark:shadow-black ">
        <div className="flex justify-end w-full">
          <select
            name="to"
            value={currencyObj.to}
            onChange={handleForm}
            id=""
            disabled={isLoading || isFetching}
            className="text-light-text dark:text-dark-text border border-accent-light dark:border-accent-dark py-1 px-2 outline-none w-full"
          >
            {currencyTag}
          </select>
        </div>
        <input
          type="text"
          readOnly
          value={
            exchange?.success === true
              ? (currencyObj.amount * exchange.result).toFixed(2)
              : (0).toFixed(2)
          }
          className="h-20 w-full border border-accent-light dark:border-accent-dark outline-0 text-3xl font-bold font-sans text-light-text dark:text-dark-text px-2  "
        />
        {exchange?.success === true ? (
          <p className="text-sm text-light-text font-semibold dark:text-dark-text">
            {exchange.query["amount"]} {exchange.query["from"]} ={" "}
            {exchange.result.toFixed(2)} {exchange.query["to"]}
          </p>
        ) : null}
      </section>
      <section className="flex items-center justify-between w-full">
        <Button
          type={"button"}
          className={"rounded-full p-3 "}
          onClick={handleSwap}
        >
          <FaExchangeAlt className="rotate-90 text-sm" />
        </Button>
        {(isLoading || isFetching) && <Loading />}
      </section>
    </form>
  );
};

export default FormInput