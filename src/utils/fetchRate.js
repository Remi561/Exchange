export const fetchRate = async({from, to }) => {
    const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`);
    if (!res.ok) {
        throw('the responds in not okay')
    }
    return res.json()
}