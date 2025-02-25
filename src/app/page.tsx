"use client";

import { useEffect, useState } from "react";
import CountrySelector from "@/components/CountrySelector";
import IncomeChart from "@/components/IncomeChart";
import { fetchIncomeData } from "@/lib/fetchIncome";
import { IncomeData } from "@/types";

export default function Home() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [incomeData, setIncomeData] = useState<IncomeData[]>([]);

  useEffect(() => {
    if (selectedCountries.length === 0) {
      setIncomeData([]);
      return;
    }

    fetchIncomeData(selectedCountries)
      .then(setIncomeData)
      .catch(console.error);
  }, [selectedCountries]);

  return (
    <main>
      <h1>過去50年の平均年収</h1>
      <CountrySelector onChange={setSelectedCountries} />
      {incomeData.length > 0 ? <IncomeChart data={incomeData} /> : <p>データなし</p>}
    </main>
  );
}
