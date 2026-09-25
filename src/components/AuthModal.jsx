import { useEffect, useState } from "react";
import { Eye, EyeOff, LogIn, UserPlus, X } from "lucide-react";

export default function AuthModal({ mode, onClose, onSwitch, onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  const isLogin = mode === "login";

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="auth-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="auth-modal-close" type="button" aria-label="Close dialog" onClick={onClose}><X size={19} /></button>
        <div className="auth-modal-icon">{isLogin ? <LogIn size={24} /> : <UserPlus size={24} />}</div>
        <span className="auth-modal-eyebrow">FreshFind account</span>
        <h2 id="auth-modal-title">{isLogin ? "Welcome back" : "Join FreshFind"}</h2>
        <p>{isLogin ? "Sign in to keep your favourite markets and produce close at hand." : "Create a demo account to save your FreshFind discoveries."}</p>
        <form className="auth-form" onSubmit={(event) => { event.preventDefault(); onSubmit(isLogin ? "login" : "signup"); }}>
          {!isLogin ? <label>Full name<input type="text" name="name" placeholder="Your name" autoComplete="name" required /></label> : null}
          <label>Email address<input type="email" name="email" placeholder="you@example.com" autoComplete="email" required /></label>
          <label>Password<span className="auth-password-field"><input type={showPassword ? "text" : "password"} name="password" placeholder="Enter your password" autoComplete={isLogin ? "current-password" : "new-password"} minLength="6" required /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((current) => !current)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>
          <button className="auth-modal-submit" type="submit">{isLogin ? "Login" : "Create demo account"}</button>
        </form>
        <p className="auth-modal-switch">{isLogin ? "New to FreshFind?" : "Already have a demo account?"}{" "}<button type="button" onClick={() => onSwitch(isLogin ? "signup" : "login")}>{isLogin ? "Sign up" : "Login"}</button></p>
      </section>
    </div>
  );
}
