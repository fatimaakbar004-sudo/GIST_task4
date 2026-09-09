import { useState } from "react";
import {
  LockKeyhole,
  Mail,
  Send,
  UserRound
} from "lucide-react";

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError(
        "Please enter your name and email."
      );
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    setError("");

    onLogin({
      name: name.trim(),
      email: email.trim()
    });
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand-mark">
          <Send size={20} />
        </div>

        <span className="eyebrow">
          Dispatch console
        </span>

        <h1>Sign in to continue</h1>

        <p className="muted">
          Enter your details to open your post
          dashboard.
        </p>

        <form
          onSubmit={handleSubmit}
          className="login-form"
        >
          <label>
            <span>Name</span>

            <div className="input-wrap">
              <UserRound size={18} />

              <input
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Your name"
              />
            </div>
          </label>

          <label>
            <span>Email</span>

            <div className="input-wrap">
              <Mail size={18} />

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
              />
            </div>
          </label>

          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          <button
            className="primary-btn full-btn"
            type="submit"
          >
            <LockKeyhole size={18} />
            Sign in
          </button>
        </form>

        <p className="demo-note">
          Demo authentication — details are stored
          locally for this project only.
        </p>
      </section>
    </main>
  );
}

export default Login;