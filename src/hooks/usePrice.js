import { useEffect } from "react";
import { useState } from "react";

export const usePrice = () => {
  const [value, setValue] = useState("");
  const [coinName, setCoinName] = useState("Bolivianos");
  const [coinAbreviation, setCoinAbreviation] = useState("Bs");
  const [coinAbreviationList, setCoinAbreviationList] = useState([]);


  const listOfCoins = [
    { coinName: "Bolivianos", coinAbreviation: "Bs." },
    // { coinName: "Dolares", coinAbreviation: "USD." },
  ];

  useEffect(() => {
    const list = listOfCoins.map((coin) => coin.coinAbreviation);
    setCoinAbreviationList(list);
  }, []);
  
  const calculatePrice = (element, amount) => {
      
  }

  return {
    value,
    setValue,
    coinName,
    setCoinName,
    coinAbreviation,
    setCoinAbreviation,
    coinAbreviationList,
  };
};
