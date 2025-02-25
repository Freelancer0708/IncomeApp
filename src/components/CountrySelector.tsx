import { useState } from "react";

const countries = [
  { name: "日本", code: "JP" },
  { name: "アメリカ", code: "US" },
  { name: "イギリス", code: "GB" },
  { name: "フランス", code: "FR" },
  { name: "ドイツ", code: "DE" },
  { name: "イタリア", code: "IT" },
  { name: "オーストラリア", code: "AU" },
];

type Props = {
  onChange: (selected: string[]) => void;
};

export default function CountrySelector({ onChange }: Props) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const toggleCountry = (code: string) => {
    const updated = selectedCountries.includes(code)
      ? selectedCountries.filter((c) => c !== code)
      : [...selectedCountries, code];

    setSelectedCountries(updated);
    onChange(updated);
  };

  return (
    <section>
      {countries.map(({ name, code }) => (
        <label key={code}>
          <input
            type="checkbox"
            checked={selectedCountries.includes(code)}
            onChange={() => toggleCountry(code)}
          />
          {name}
        </label>
      ))}
    </section>
  );
}
