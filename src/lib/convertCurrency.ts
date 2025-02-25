// lib/convertCurrency.ts
export async function convertToJPY(amount: number, date: string): Promise<number> {
    // 為替レート取得APIのエンドポイント（例）
    const response = await fetch(`https://api.exchangerate.host/convert?from=USD&to=JPY&date=${date}`);
    const data = await response.json();
    const rate = data.info.rate;
  
    return amount * rate;
  }
  