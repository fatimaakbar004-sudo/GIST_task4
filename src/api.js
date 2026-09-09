const API_URL = "https://jsonplaceholder.typicode.com/posts";

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export const api = {
  getPosts: () => request(API_URL),

  createPost: (post) =>
    request(API_URL, {
      method: "POST",
      body: JSON.stringify(post)
    }),

  updatePost: (id, post) =>
    request(`${API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(post)
    }),

  deletePost: (id) =>
    request(`${API_URL}/${id}`, {
      method: "DELETE"
    })
};