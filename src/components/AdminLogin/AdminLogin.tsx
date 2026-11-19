
import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  X,
} from "lucide-react";

import "./AdminLogin.css";

/* ========================================
   MELTO - DEVELOPMENT LOGIN CREDENTIALS
======================================== */

const DEMO_EMAIL = "sheran@gmail.com";
const DEMO_PASSWORD = "123456";

/* ========================================
   PROPS
======================================== */

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

/* ========================================
   ADMIN LOGIN COMPONENT
======================================== */

function AdminLogin({
  isOpen,
  onClose,
  onLoginSuccess,
}: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");

  const demoEnabled = import.meta.env.DEV;

  /* ========================================
     MODAL HANDLING
  ======================================== */

  useEffect(() => {
    if (!isOpen) return;

    const oldOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow = oldOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isOpen, onClose]);

  /* ========================================
     LOGIN VALIDATION
  ======================================== */

  const handleLogin = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!demoEnabled) {
      setError(
        "Staff authentication is unavailable until backend integration."
      );
      return;
    }

    const validEmail =
      email.trim().toLowerCase() === DEMO_EMAIL;

    const validPassword =
      password === DEMO_PASSWORD;

    if (!validEmail || !validPassword) {
      setError("Incorrect email or password.");
      return;
    }

    // LOGIN SUCCESS

    setError("");
    setEmail("");
    setPassword("");

    // OPEN ADMIN DASHBOARD

    onLoginSuccess();
  };

  if (!isOpen) return null;

  return (
    <div
      className="melto-admin-login-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="melto-admin-login-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="melto-admin-login-title"
      >

        {/* CLOSE BUTTON */}

        <button
          type="button"
          className="melto-admin-login-close"
          onClick={onClose}
          aria-label="Close staff login"
        >
          <X size={22} />
        </button>

        {/* HEADER */}

        <div className="melto-admin-login-header">

          <div className="melto-admin-login-icon">
            <ShieldCheck size={31} />
          </div>

          <h2 id="melto-admin-login-title">
            Welcome Back!
          </h2>

          <p>
            Login to MELTO Admin Dashboard
          </p>

        </div>

        {/* LOGIN FORM */}

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <div className="melto-admin-login-field">

            <label htmlFor="melto-admin-email">
              Email Address
            </label>

            <div className="melto-admin-login-input-wrap">

              <Mail size={19} />

              <input
                id="melto-admin-email"
                type="email"
                placeholder="Enter your email"
                autoComplete="username"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                required
                autoFocus
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div className="melto-admin-login-field">

            <label htmlFor="melto-admin-password">
              Password
            </label>

            <div className="melto-admin-login-input-wrap">

              <LockKeyhole size={19} />

              <input
                id="melto-admin-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                required
              />

              <button
                type="button"
                className="melto-admin-login-eye"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>

            </div>

          </div>

          {/* ERROR MESSAGE */}

          {error && (
            <p
              className="melto-admin-login-error"
              role="alert"
            >
              {error}
            </p>
          )}

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="melto-admin-login-submit"
            disabled={!demoEnabled}
          >
            {demoEnabled
              ? "Login to Dashboard"
              : "Staff Login Unavailable"}

            <ArrowRight size={19} />
          </button>

        </form>

        {/* DEVELOPMENT NOTICE */}

        {demoEnabled ? (
          <div className="melto-admin-login-demo">

            <strong>
              Development Login
            </strong>

            <p>
              Use your configured demo credentials
              to access the admin dashboard.
            </p>

            <small>
              Local testing only. Secure backend
              authentication will be added later.
            </small>

          </div>
        ) : (
          <p className="melto-admin-login-unavailable">
            Staff login will be enabled after
            backend authentication is connected.
          </p>
        )}

      </div>
    </div>
  );
}

export default AdminLogin;
