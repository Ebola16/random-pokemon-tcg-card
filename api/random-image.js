import https from 'https';

export default async function handler(req, res) {
  try {
    const totalRes = await fetch('https://api.pokemontcg.io/v2/cards?pageSize=1');
    const totalJson = await totalRes.json();
    const total = totalJson.totalCount;
    const randomPage = Math.floor(Math.random() * total) + 1;
    const cardRes = await fetch(`https://api.pokemontcg.io/v2/cards?pageSize=1&page=${randomPage}`);
    const cardJson = await cardRes.json();
    const card = cardJson.data?.[0];
    const setCode = card?.set?.id;
    const number = card?.number;

    if (!card || !setCode || !number) {
      res.status(404).send('Card not found');
      return;
    }

    const imgUrl = `https://images.pokemontcg.io/${setCode}/${number}_hires.png`;

    // Check if it's an image embed (from <img src="..."> or CSS background)
    const isImageEmbed = req.headers['sec-fetch-dest'] === 'image';

    if (isImageEmbed) {
      // Proxy image to bypass hotlinking/CORS
      https.get(imgUrl, (imgRes) => {
        if (imgRes.statusCode !== 200) {
          res.status(imgRes.statusCode).send('Image fetch failed');
          return;
        }

        res.setHeader('Content-Type', imgRes.headers['content-type'] || 'image/png');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Access-Control-Allow-Origin', '*');

        imgRes.pipe(res);
      }).on('error', (err) => {
        console.error('Proxy error:', err);
        res.status(500).send('Error proxying image');
      });

    } else {
      res.writeHead(302, { Location: imgUrl });
      res.end();
    }

  } catch (err) {
    console.error('Handler error:', err);
    res.status(500).send('Server error');
  }
}
