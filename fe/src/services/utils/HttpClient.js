import delay from '../../utils/delay';

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

    throw new Error(
      body?.error || `${response.status} - ${response.statusText}`,
    );
  }
}

export default HttpClient;
