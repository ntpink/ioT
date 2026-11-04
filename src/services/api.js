const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export const apiClient = {
  baseURL: BASE_URL,

  /**
   * Phương thức GET
   */
  async get(endpoint, params = {}) {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
    const base = BASE_URL.startsWith('http') ? BASE_URL : `${origin}${BASE_URL}`;
    const url = new URL(`${base}${endpoint}`);
    
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        url.searchParams.append(key, params[key]);
      }
    });

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Phương thức POST
   */
  async post(endpoint, body = {}) {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
    const base = BASE_URL.startsWith('http') ? BASE_URL : `${origin}${BASE_URL}`;
    const response = await fetch(`${base}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Phương thức PUT
   */
  async put(endpoint, body = {}) {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
    const base = BASE_URL.startsWith('http') ? BASE_URL : `${origin}${BASE_URL}`;
    const response = await fetch(`${base}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Phương thức DELETE
   */
  async delete(endpoint) {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
    const base = BASE_URL.startsWith('http') ? BASE_URL : `${origin}${BASE_URL}`;
    const response = await fetch(`${base}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  },
};

export default apiClient;
