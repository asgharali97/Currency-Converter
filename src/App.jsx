import { useState,useEffect } from "react";
import Input from "./componets/Input";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { ThemeProvider } from "./Context/ThemeContext";
import Btn from "./componets/Btn";
function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("pkr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  
  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };
  const convertCurrency = () => {
    setConvertedAmount((amount * currencyInfo[to]).toFixed(2))
  };

  // Theme Function 
  const [ThemeMode,setThemeMode] = useState("light")

  const darkTheme = ()=>{
    setThemeMode('dark')
  }
  const lightTheme = ()=>{
    setThemeMode('light')
  }
  useEffect(() => {
    document.querySelector('html').classList.remove('light','dark')
    document.querySelector('html').classList.add(ThemeMode)
  },[ThemeMode])
  return (
    <>
    <ThemeProvider value={{ThemeMode,darkTheme,lightTheme}}>
      <div
        className="bg-gray-700 w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat dark:bg-gray-800 dark:border-gray-700"
        style={{
          backgroundImage:
            'url("https://t3.ftcdn.net/jpg/05/74/79/80/360_F_574798026_iEIdURVR3yieUYcn2tQYakrSYB999s5k.jpg")',
        }}
      >
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <Btn/>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convertCurrency();
              }}
            >
              <div className="w-full mb-1">
                <Input
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  selectCurrency={from}
                  onAmountChange={(amount) => setAmount(amount)}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-[#384f5b] text-white px-2 py-0.5"
                  onClick={swap}
                  >
                  swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <Input
                  label='To'
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisable
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#384f5b] text-white px-4 py-3 rounded-lg"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
                  </ThemeProvider>
    </>
  );
}

export default App;
