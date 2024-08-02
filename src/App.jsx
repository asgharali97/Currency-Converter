import { useState } from 'react'
import Input from './componets/Input'
import useCurrencyInfo from './hooks/useCurrencyInfo'
function App() {
    const [amount , setAmount] = useState(0);
    const [from , setFrom] = useState('usd')
    const [to , setTo] = useState('pkr')
    const [convertedAmount , setConvertedAmount] = useState(0);
    const currencyInfo = useCurrencyInfo(from);

    const options = Object.keys(currencyInfo)

    const swap = ()=>{
        setFrom(to)
        setTo(from)
        setConvertedAmount(amount)
        setAmount(convertedAmount)
    }
    const convertCurrency = ()=>{
        setConvertedAmount((amount * currencyInfo[to]).toFixed(2))
    }
  return (
    <>
<div
        className="bg-gray-700 w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
           backgroundImage:'url("https://plus.unsplash.com/premium_photo-1675198764235-2dc2b37146c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJlJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D")'
        }}
    >
<div className="w-full">
    <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <form
            
            onSubmit={(e)=> { 
                e.preventDefault()
                convertCurrency()
            }}
        >
            <div className="w-full mb-1">
                <Input
                label='From'
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency)=> setAmount(amount)}
                selectCurrency={from}
                onAmountChange={(amount)=> setAmount(amount)}
            />
            </div>
            <div className="relative w-full h-0.5">
                <button
                    type="button"
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                    onClick={swap}
                >
                    swap
                </button>
            </div>
            <div className="w-full mt-1 mb-4">
                <Input
                amount={amount}
                onAmountChange={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency)=> setTo(currency)}
                selectCurrency= {from}
                amountDisable
                />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                Convert {from.toUpperCase()} to {to.toUpperCase()} 
            </button>
        </form>
    </div>
</div>
</div>
    </>
  )
}

export default App
