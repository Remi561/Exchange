import React, {  useState} from 'react'
import Button from './Button';
import { FaExchangeAlt, FaExclamationTriangle } from 'react-icons/fa';


import { useQuery } from '@tanstack/react-query';
import { fetchCurrencies } from '../utils/fetchCurrencies'; 
import { fetchRate } from '../utils/fetchRate';


const FormInput = () => {
    const [currencyObj, setCurrencyObj] = useState({
        to: 'AUD',
        from: 'USD', 
        amount: ''
    })

    


    
    

    const handleSwap = () => {
        setCurrencyObj((prev) => ({...prev, to:prev.from, from: prev.to}))
       

    }
    console.log(currencyObj)

    const handleForm = (e) => {
        const {name, value} = e.target
       setCurrencyObj(prev => ({...prev, [name]: value}))
    }
   

    
    const { data:currencies, isLoading , isError:currIsError, error:currenciesErr} = useQuery({
        queryKey: ['currencies'],
        queryFn: fetchCurrencies, 
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    const { data:exchange, isPending, isError:exIsError, error:exchangeError } = useQuery({
        queryKey: ['exchange', { to: currencyObj.to, from: currencyObj.from }],
        queryFn: ({ queryKey }) => fetchRate(queryKey[1]), 
        enabled: !!currencyObj.amount,
        
    });

 

   
    

    
    const currencyTag = currencies
    ? Object.keys(currencies).map((currency, idx) => (
        <option key={idx} value={currency} className='flex items-center gap-3 outline-none py-1'>
            [ {currency} ] <>{currencies[currency]} </>
        </option>
      ))
        : null
    console.log(isPending)
    
    return (
      <form
         
           
        className="flex flex-col gap-2 items-center relative"
        >
            {isLoading && <p className='text-dark-text'>loading</p>}
            {(currIsError || exIsError) && <p className='text-red-600 dark:text-red-700 text-xl mb-3 flex items-center gap-2'> <FaExclamationTriangle/> {exchangeError.message || currenciesErr.message}</p>}
        <section className=" p-3 bg-white rounded-md shadow-md space-y-3 max-w-100 w-full dark:bg-slate-800 dark:shadow-black ">
          <div className="flex justify-end w-full">
            <select
              name={"from"}
              value={currencyObj.from}
              onChange={handleForm}
                        id=""
                        disabled={isLoading|| isPending}
              className="text-light-text dark:text-dark-text border border-accent-light dark:border-accent-dark py-1 px-2 outline-none"
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
                        disabled={isLoading || isPending}
                       
              className="text-light-text dark:text-dark-text border border-accent-light dark:border-accent-dark py-1 px-2 outline-none"
            >
              {currencyTag}
            </select>
          </div>
          <input
            type="text"
            readOnly
            value={
              exchange?.rates[currencyObj.to]
                ? (currencyObj.amount * exchange.rates[currencyObj.to]).toFixed(2)
                : (0).toFixed(2)
            }
            className="h-20 w-full border border-accent-light dark:border-accent-dark outline-0 text-3xl font-bold font-sans text-light-text dark:text-dark-text px-2  "
                />
                {exchange ? <p className="text-sm text-light-text font-semibold dark:text-dark-text">
            {exchange.amount} {exchange.base} = {exchange.rates[currencyObj.to]} {currencyObj.to}
          </p> : null}
         
        </section>
        <Button
          type={"button"}
          className={"rounded-full p-3 absolute top-[43%] left-0"}
          onClick={handleSwap}
        >
          <FaExchangeAlt className="rotate-90 text-sm" />
        </Button>
       
      </form>
    );
}

export default FormInput