import { useEffect, useMemo, useState } from "react";
import { api } from "./api";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import PostForm from "./components/PostForm";
import PostCard from "./components/PostCard";
import Loading from "./components/Loading";
import ErrorState from "./components/ErrorState";
import EmptyState from "./components/EmptyState";

const PAGE_SIZE = 6;

function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("task4_user")) || null;
    } catch {
      return null;
    }
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const [editingPost, setEditingPost] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [toast, setToast] = useState("");

  useEffect(() => {
    if (user) {
      localStorage.setItem("task4_user", JSON.stringify(user));
      loadPosts();
    } else {
      localStorage.removeItem("task4_user");
    }
  }, [user]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  async function loadPosts() {
    setLoading(true);
    setError("");

    try {
      const data = await api.getPosts();
      setPosts(data);
    } catch (err) {
      setError(
        "Unable to load posts. Please check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(credentials) {
    const loggedInUser = {
      name: credentials.name,
      email: credentials.email
    };

    setUser(loggedInUser);
    setToast("Login successful");
  }

  function handleLogout() {
    setUser(null);
    setPosts([]);
    setToast("You have been logged out");
  }

  async function handleCreate(values) {
    setActionLoading(true);

    try {
      const created = await api.createPost({
        title: values.title,
        body: values.body,
        userId: 1
      });

      setPosts((current) => [
        {
          ...created,
          id: Date.now()
        },
        ...current
      ]);

      setShowForm(false);
      setToast("Post created successfully");
      setPage(1);
    } catch {
      setToast("Could not create the post");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleUpdate(values) {
    setActionLoading(true);

    try {
      const updated = await api.updatePost(editingPost.id, {
        title: values.title,
        body: values.body,
        userId: editingPost.userId || 1
      });

      setPosts((current) =>
        current.map((post) =>
          post.id === editingPost.id
            ? {
                ...post,
                ...updated
              }
            : post
        )
      );

      setEditingPost(null);
      setShowForm(false);

      setToast("Post updated successfully");
    } catch {
      setToast("Could not update the post");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) return;

    setActionLoading(true);

    try {
      await api.deletePost(id);

      setPosts((current) =>
        current.filter((post) => post.id !== id)
      );

      setToast("Post deleted successfully");
    } catch {
      setToast("Could not delete the post");
    } finally {
      setActionLoading(false);
    }
  }

  function openCreate() {
    setEditingPost(null);
    setShowForm(true);
  }

  function openEdit(post) {
    setEditingPost(post);
    setShowForm(true);
  }

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return posts;
    }

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(normalized) ||
        post.body.toLowerCase().includes(normalized)
    );
  }, [posts, query]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / PAGE_SIZE)
  );

  const visiblePosts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;

    return filteredPosts.slice(
      start,
      start + PAGE_SIZE
    );
  }, [filteredPosts, page]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-shell">
      <Navbar
        user={user}
        onLogout={handleLogout}
      />

      <main className="container">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">
              Signed in as {user.name}
            </span>

            <h1>Every post, in one place</h1>

            <p>
              Create, edit, search, and remove posts backed by a
              live REST API, with pagination and clear feedback
              at every step.
            </p>
          </div>

          <div className="hero-actions">
            <div className="hero-stat">
              <strong className="mono">{posts.length}</strong>
              <span>Posts loaded</span>
            </div>

            <button
              className="primary-btn"
              onClick={openCreate}
            >
              New post
            </button>
          </div>
        </section>

        <section className="toolbar">
          <div className="search-box">
            <span>⌕</span>

            <input
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Search by title or content..."
              aria-label="Search posts"
            />
          </div>

          <button
            className="secondary-btn"
            onClick={loadPosts}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </section>

        {showForm && (
          <PostForm
            initialValues={editingPost}
            loading={actionLoading}
            onSubmit={
              editingPost
                ? handleUpdate
                : handleCreate
            }
            onCancel={() => {
              setShowForm(false);
              setEditingPost(null);
            }}
          />
        )}

        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorState
            message={error}
            onRetry={loadPosts}
          />
        ) : filteredPosts.length === 0 ? (
          <EmptyState
            query={query}
            onCreate={openCreate}
          />
        ) : (
          <>
            <div className="result-info">
              <span>
                Showing {visiblePosts.length} of{" "}
                {filteredPosts.length} posts
              </span>

              {query && (
                <span>
                  Filtered by: "{query}"
                </span>
              )}
            </div>

            <section className="post-grid">
              {visiblePosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                  disabled={actionLoading}
                />
              ))}
            </section>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </main>

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onPageChange
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        className="page-btn"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        ← Previous
      </button>

      <div className="page-numbers">
        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((number) => (
          <button
            key={number}
            className={`number-btn ${
              number === page ? "active" : ""
            }`}
            onClick={() =>
              onPageChange(number)
            }
          >
            {number}
          </button>
        ))}
      </div>

      <button
        className="page-btn"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next →
      </button>
    </div>
  );
}

export default App;