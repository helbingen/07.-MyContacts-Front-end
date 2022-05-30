import delay from '../../utils/delay';
import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    await delay(500); // faz um delay de 500ms

    const response = await fetch(`${this.baseURL}${path}`);

    let body = null;
    const contentType = response.headers.get('Content-Type');
    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) { // verifica se o status de resposta está entre 200 a 299, possui um valor booleano
      return body;
    }

    throw new APIError(response, body);
  }
}

export default HttpClient;
