export default async function handler(req, res) {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${process.env.NEWS_API_KEY}&page=1&pageSize=8`
  );
  const data = await response.json();
  res.status(200).json(data);
}