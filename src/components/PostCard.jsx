import {
  Edit3,
  Trash2
} from "lucide-react";

function PostCard({
  post,
  onEdit,
  onDelete,
  disabled
}) {
  return (
    <article className="post-card">
      <div className="post-top">
        <span className="post-id">
          POST #{post.id}
        </span>

        <span className="user-badge">
          USER {post.userId}
        </span>
      </div>

      <h3>{post.title}</h3>

      <p>{post.body}</p>

      <div className="card-actions">
        <button
          className="edit-btn"
          onClick={() => onEdit(post)}
          disabled={disabled}
        >
          <Edit3 size={16} />
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(post.id)}
          disabled={disabled}
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </article>
  );
}

export default PostCard;