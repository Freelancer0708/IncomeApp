"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { IncomeData } from "@/types";

// 色のパレット
const COLORS = ["#8884d8", "#82ca9d", "#ff7300", "#ff0000", "#00aaff", "#aa00ff", "#ff00aa"];

type Props = {
  data: IncomeData[];
};

export default function IncomeChart({ data }: Props) {
  if (data.length === 0) return <p className="text-center text-gray-500">データがありません</p>;

  // 選択された年のリストを取得（すべての国で共通のX軸を持つ）
  const years = [...new Set(data.map((d) => d.year))].sort((a, b) => Number(a) - Number(b));

  // グラフ用の統一データフォーマット
  const formattedData = years.map((year) => {
    const yearData: { year: number } & { [country: string]: number | null } = { year: Number(year) };

    // 各国のデータを追加
    data.forEach(({ country, year: dataYear, averageIncome }) => {
      if (Number(dataYear) === Number(year)) {
        yearData[country] = averageIncome;
      }
    });

    return yearData;
  });

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={formattedData}>
          <XAxis dataKey="year" reversed={false} /> {/* 右を最新に */}
          <YAxis tickFormatter={(value) => `${value.toLocaleString()} 円`} />
          <Tooltip formatter={(value) => `${value.toLocaleString()} 円`} />
          <Legend />

          {/* 選択された国ごとに線を描画 */}
          {[...new Set(data.map((d) => d.country))].map((country, index) => (
            <Line
              key={country}
              type="monotone"
              dataKey={country} // 統一フォーマットのデータを利用
              name={country} // 凡例に国名を表示
              stroke={COLORS[index % COLORS.length]} // 色を適用
              strokeWidth={2}
              connectNulls={true} // データがない場合に線を途切れさせない
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
