export const fetchRate = async ({ from, to }) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const res = await fetch(
    `https://api.exchangerate.host/convert?access_key=${apiKey}&from=${from}&to=${to}&amount=${1}`,
  );
  if (!res.ok) {
    throw "something went wrong";
  }
  return res.json();
};
