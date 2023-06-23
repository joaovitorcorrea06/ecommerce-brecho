import axios from 'axios';

export default async (req, res) => {

  const { cepDestino } = req.query;

  try {
    const response = await axios.get(`https://www.cepcerto.com/ws/json-frete/88810020/${cepDestino}/500`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer a requisição' });
  }
};
