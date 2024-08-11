import React, { useContext, useEffect, useState } from 'react';
import { createContext, useCallback } from 'react';

const Crypto = createContext({
  currency: 'INR',
  symbol: '₹',
});

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState('INR');
  const [symbol, setSymbol] = useState('₹');

  const handleCurrencyChange = useCallback((newCurrency) => {
    if (newCurrency === 'INR') {
      setSymbol('₹');
    } else {
      setSymbol('$');
    }
  }, []);

  useEffect(() => {
    handleCurrencyChange(currency);
  }, [handleCurrencyChange, currency]);

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};