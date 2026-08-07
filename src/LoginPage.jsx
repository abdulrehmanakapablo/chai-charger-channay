import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoImg from './assets/logo.png';
import { supabase } from './supabaseClient';

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Sign in with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password: password,
    });

    if (authError) {
      setErrorMsg('Invalid email or password.');
      return;
    }

    // 2. Fetch the user's profile (contains username etc.)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !profile) {
      setErrorMsg('Failed to load user profile.');
      return;
    }

    // 3. Store the full profile in AuthContext
    if (onLogin) onLogin(profile);
    navigate('/dashboard');
  };

  return (
    <div className="bg-background text-on-background min-h-screen lg:h-screen flex items-center justify-center p-4 md:p-6 font-body-md text-body-md antialiased relative overflow-y-auto lg:overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-container opacity-20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-tertiary-container opacity-20 blur-[150px]"></div>
      </div>

      <main className="w-full max-w-[500px] z-10 relative flex flex-col items-center my-auto py-4">
        <h1 className="font-display-lg text-2xl md:text-4xl font-bold text-on-surface mb-4 md:mb-6 text-center w-full">
          Chai, Charger &amp; Channay
        </h1>

        <div className="glass-panel w-full max-w-[460px] rounded-2xl p-5 md:p-6 shadow-[0px_10px_30px_rgba(0,0,0,0.4)] flex flex-col gap-4">
          <header className="flex flex-col items-center text-center gap-1">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden mb-2 border border-white/10 flex items-center justify-center bg-surface-container-low p-2">
              <img alt="Logo" className="w-full h-full object-contain rounded-xl" src={logoImg} />
            </div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-xl md:text-2xl font-bold text-primary">Welcome back</h2>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant">Enter your details to access your account.</p>
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4">
            <div className="relative w-full rounded-lg bg-surface-container-high">
              <input
                className="input-field w-full h-12 md:h-14 rounded-lg px-4 pt-2 text-on-surface font-body-md text-sm md:text-base bg-transparent placeholder-transparent"
                id="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="floating-label font-label-md text-xs md:text-sm" htmlFor="email">Email</label>
            </div>

            <div className="relative w-full rounded-lg bg-surface-container-high">
              <input
                className="input-field w-full h-12 md:h-14 rounded-lg px-4 pr-12 pt-2 text-on-surface font-body-md text-sm md:text-base bg-transparent placeholder-transparent"
                id="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="floating-label font-label-md text-xs md:text-sm" htmlFor="password">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${showPassword ? 1 : 0}` }}>
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>

            {errorMsg && <p className="text-[10px] text-error ml-1">{errorMsg}</p>}

            <button className="btn-primary w-full h-12 md:h-14 rounded-lg font-title-md text-base md:text-lg font-semibold flex items-center justify-center mt-1 cursor-pointer" type="submit">
              Login
            </button>
          </form>

          <div className="text-center mt-1">
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant">
              Don't have an account?{' '}
              <Link className="text-primary font-title-md hover:text-primary-fixed transition-colors font-semibold" to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}