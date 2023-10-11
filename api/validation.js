export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end();
  } else {
    const query = req.query;
    const isBot = query.bot;
    const token = query.token;
    const apiUrl = 'https://discord.com/api/v10/users/@me';

    const headers = {
      Authorization: isBot ? `Bot ${token}` : token,
    };

    const discordResponse = await fetch(apiUrl, {
      method: 'GET',
      headers,
    });

    if (discordResponse.ok) {
      const discordData = await discordResponse.json();

      res.status(200).json({ success: true, data: discordData });
    } else {
      res.status(200).json({ success: false, data: null });
    }
  }
}
