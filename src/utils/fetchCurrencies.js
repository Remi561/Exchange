export const fetchCurrencies = async() => {
    const res = await fetch("https://api.frankfurter.dev/v1/currencies");
    if (!res.ok) {
        throw ('something is wrong ')
    }

    return res.json()
}