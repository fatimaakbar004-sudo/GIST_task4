import {
  useEffect,
  useState
} from "react";

import { X } from "lucide-react";

function PostForm({
  initialValues,
  loading,
  onSubmit,
  onCancel
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(
      initialValues?.title || ""
    );

    setBody(
      initialValues?.body || ""
    );

    setError("");
  }, [initialValues]);

  function handleSubmit(event) {
    event.preventDefault();

    if (title.trim().length < 3) {
      setError(
        "Title must contain at least 3 characters."
      );
      return;
    }

    if (body.trim().length < 10) {
      setError(
        "Content must contain at least 10 characters."
      );
      return;
    }

    setError("");

    onSubmit({
      title: title.trim(),
      body: body.trim()
    });
  }

  return (
    <section className="form-panel">
      <div className="form-heading">
        <div>
          <span className="eyebrow">
            {initialValues
              ? "Editing post"
              : "New post"}
          </span>

          <h2>
            {initialValues
              ? "Update post"
              : "Create a new post"}
          </h2>
        </div>

        <button
          className="icon-btn"
          onClick={onCancel}
          aria-label="Close form"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            <span>Title</span>

            <input
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Enter post title"
            />
          </label>

          <label className="full-field">
            <span>Content</span>

            <textarea
              value={body}
              onChange={(event) =>
                setBody(event.target.value)
              }
              placeholder="Write your post content..."
              rows="5"
            />
          </label>
        </div>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="secondary-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : initialValues
              ? "Update Post"
              : "Create Post"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default PostForm;