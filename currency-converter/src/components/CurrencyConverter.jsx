import React, { useEffect, useState } from "react";

export default function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const response = await fetch(
          `https://api.exchangeratesapi.io/v1/latest?access_key=${process.env.REACT_APP_API_KEY}`
        );
        const data = await response.json();
        if (data && data.rates) {
          setCurrencies(Object.keys(data.rates)); // <-- THIS IS CRUCIAL
        }
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    }

    fetchCurrencies();
  }, []);

  const handleConvert = async () => {
    if (!fromCurrency || !toCurrency || !amount) return;
    try {
      const response = await fetch(
        `https://api.exchangeratesapi.io/v1/latest?access_key=${process.env.REACT_APP_API_KEY}&base=${fromCurrency}`
      );
      const data = await response.json();
      if (data && data.rates) {
        const rate = data.rates[toCurrency];
        setResult((amount * rate).toFixed(2));
      }
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">Currency Converter</h1>

      <div>
        <label className="block mb-1 font-medium">From:</label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="">Select Currency</option>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">To:</label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="border rounded p-2 w-full"
        >
          <option value="">Select Currency</option>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border rounded p-2 w-full"
          placeholder="Enter amount"
        />
      </div>

      <button
        onClick={handleConvert}
        className="bg-blue-600 text-white rounded p-2 w-full hover:bg-blue-700"
      >
        Convert
      </button>

      {result && (
        <div className="text-center text-lg font-semibold">
          Result: {result} {toCurrency}
        </div>
      )}
    </div>
  );
}
