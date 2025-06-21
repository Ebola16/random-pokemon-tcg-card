export default async function handler(req, res) {
  try {
    const totalRes = await fetch('https://api.pokemontcg.io/v2/cards?pageSize=1');
    const totalJson = await totalRes.json();
    const total = totalJson.totalCount;
    const randomPage = Math.floor(Math.random() * total) + 1;
    const cardRes = await fetch(`https://api.pokemontcg.io/v2/cards?pageSize=1&page=${randomPage}`);
    const cardJson = await cardRes.json();
    const card = cardJson.data[0];
    const setCode = card.set.id;
    const number = card.number;

    if (!card || !setCode || !number) {
      res.status(404).send('Card not found');
      return;
    }

    const imgUrl = `https://images.pokemontcg.io/${setCode}/${number}_hires.png`;

    res.writeHead(302, { Location: imgUrl });
    res.end();

  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching card');
  }
}
