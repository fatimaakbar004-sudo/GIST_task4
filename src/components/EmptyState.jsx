function EmptyState({
  query,
  onCreate
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        ⌕
      </div>

      <h3>
        {query ? "No matches" : "Nothing here yet"}
      </h3>

      <p>
        {query
          ? `No posts match "${query}". Try a different term.`
          : "Create your first post to get started."}
      </p>

      {!query && (
        <button
          className="primary-btn"
          onClick={onCreate}
        >
          Create first post
        </button>
      )}
    </div>
  );
}

export default EmptyState;