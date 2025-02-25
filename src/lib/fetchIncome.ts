import { IncomeData } from "@/types";

const API_URL = "https://api.worldbank.org/v2/country";
const INDICATOR = "NY.GDP.PCAP.CD"; // 1人あたりGDP (USD)
const START_YEAR = 1974; // 50年前
const END_YEAR = 2024; // 最新

export async function fetchIncomeData(selectedCountries: string[]): Promise<IncomeData[]> {
  const data: IncomeData[] = [];

  for (const country of selectedCountries) {
    const response = await fetch(
      `${API_URL}/${country}/indicator/${INDICATOR}?date=${START_YEAR}:${END_YEAR}&format=json`
    );

    if (!response.ok) {
      console.error(`Failed to fetch data for ${country}`);
      continue;
    }

    const json = await response.json();
    const countryData = json[1] as { date: string; value: number | null }[];

    if (countryData) {
      countryData.forEach((entry) => {
        if (entry.value) {
          data.push({
            country,
            year: entry.date,
            averageIncome: entry.value * 150, // 日本円換算（1ドル=150円）
          });
        }
      });
    }
  }

  // 年代順（右が最新）に並び替え
  return data.sort((a, b) => Number(a.year) - Number(b.year));
}
