import api from 'services';

function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');

  return JSON.parse(Buffer.from(base64, 'base64').toString());
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    try {
      const {
        data: { token },
      } = await api.post('/sessions', data);

      const payload = parseJwt(token);

      payload.token = token;

      return res.status(200).json(payload);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  return res.status(404).json({
    message: 'Resource not found.',
  });
}
