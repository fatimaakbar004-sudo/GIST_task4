function Loading() {
  return (
    <div className="loading-state">
      <div className="spinner"></div>

      <h3>Loading posts</h3>

      <p>
        Fetching the latest posts from the API.
      </p>
    </div>
  );
}

export default Loading;