import React, { useEffect, useState } from "react";

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");

  const API_KEY = "4366b214d54dea8c4065cf3c3f32f408";
  const API_URL = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`;

  // Fetch currency list
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.rates) {
          const currencyKeys = Object.keys(data.rates);
          setCurrencies(currencyKeys);
          setFromCurrency(data.base); // Default "from" currency
          setToCurrency(currencyKeys[0]); // Default "to" currency
        } else {
          console.error("Unexpected API response:", data);
        }
      })
      .catch((err) => console.error("Error fetching currency list:", err));
  }, [API_URL]);

  // Convert currency
  const handleConvert = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.rates) {
          const rateFrom = fromCurrency === data.base ? 1 : data.rates[fromCurrency];
          const rateTo = data.rates[toCurrency];
          const converted = (amount / rateFrom) * rateTo;
          setResult(`${amount} ${fromCurrency} = ${converted.toFixed(2)} ${toCurrency}`);
        } else {
          console.error("Unexpected API response:", data);
        }
      })
      .catch((err) => console.error("Error converting currency:", err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Currency Converter</h1>

        <div className="mb-4">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex space-x-4 mb-4">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>

          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleConvert}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Convert
        </button>

        {result && <p className="mt-4 text-center font-medium">{result}</p>}
      </div>
    </div>
  );
}

export default App;
