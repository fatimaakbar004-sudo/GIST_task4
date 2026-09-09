import {
  LogOut,
  Send,
  UserCircle
} from "lucide-react";

function Navbar({ user, onLogout }) {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <div className="logo">
          <span className="logo-mark">
            <Send size={16} />
          </span>
          Dispatch
        </div>

        <div className="nav-user">
          <div className="user-info">
            <UserCircle size={20} />

            <div>
              <strong>
                {user.name}
              </strong>

              <small>
                {user.email}
              </small>
            </div>
          </div>

          <button
            className="logout-btn"
            onClick={onLogout}
          >
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;