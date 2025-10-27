export const fetchCurrencies = async() => {
    const res = await fetch(
      `https://api.exchangerate.host/list?access_key=${import.meta.env.VITE_API_KEY}`,
    );
    if (!res.ok) {
        throw "something is wrong";
    }

    return res.json()
}