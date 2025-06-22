export default async (req, res) => {
  const { tiktok_click_id, conversion_id, revenue } = req.query;

  if (!tiktok_click_id) {
    return res.status(400).send('Missing tiktok_click_id');
  }

  const pixelCode = 'D1BOKVBC77U8DLILC8M0';
  const accessToken = 'afbc4a3ba41ad61f4a69fb6d77f9e8097176d631';

  try {
    const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/pixel/track/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': accessToken,
      },
      body: JSON.stringify({
        pixel_code: pixelCode,
        event: 'Purchase',
        timestamp: Math.floor(Date.now() / 1000),
        context: {},
        properties: {
          revenue: revenue || '0',
          currency: 'USD',
        },
        external_id: tiktok_click_id,
      }),
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
