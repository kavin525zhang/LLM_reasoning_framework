import axios from 'axios';

async function search(query) {
  const apiKey = process.env.TAVILY_API_KEY;
  const url = `https://api.tavily.com/v1/search`;

  try {
    const response = await axios.post(url, { query }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

search(process.argv[2]);