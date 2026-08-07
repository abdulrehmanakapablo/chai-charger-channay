import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoImg from './assets/logo.png';
import { supabase } from './supabaseClient';

export default function SignUpPage({ onSignUp }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);

  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const checkUsername = async (username) => {
    if (!username || username.length < 3) {
      setUsernameAvailable(null);
      return;
    }
    setCheckingUsername(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username.toLowerCase())
        .maybeSingle();
      if (error) {
        console.error('Username check error:', error);
        setUsernameAvailable(null);
      } else {
        setUsernameAvailable(data ? false : true);
      }
    } catch (err) {
      console.error('Username check exception:', err);
      setUsernameAvailable(null);
    } finally {
      setCheckingUsername(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'username') {
      const sanitized = value.toLowerCase().replace(/[^a-z0-9_]/g, '');
      setFormData((prev) => ({ ...prev, username: sanitized }));
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => checkUsername(sanitized), 500);
      return;
    }
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!/^[a-z0-9_]{3,20}$/.test(formData.username)) {
      newErrors.username = 'Username must be 3-20 characters (letters, numbers, underscores only).';
    }
    if (usernameAvailable === false) {
      newErrors.username = 'This username is already taken.';
    }
    if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Enter a valid phone number (10-15 digits).';
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreedToTerms) return;
    if (!validateForm()) return;
    if (usernameAvailable === false) {
      setErrors((prev) => ({ ...prev, username: 'Please choose a different username.' }));
      return;
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          username: formData.username.trim().toLowerCase(),
          phone: formData.phone.trim(),
        },
      },
    });

    if (authError) {
      alert('Signup failed: ' + authError.message);
      return;
    }

    // Build full profile
    const profile = {
      id: authData.user.id,
      email: formData.email.trim().toLowerCase(),
      username: formData.username.trim().toLowerCase(),
      first_name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
      phone: formData.phone.trim(),
    };

    if (onSignUp) onSignUp(profile);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen min-h-[100dvh] flex items-center justify-center p-4 md:p-6 relative overflow-y-auto bg-[#111412]">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-primary-container/20 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-tertiary-container/10 blur-[100px]"></div>
      </div>

      <main className="w-full max-w-[500px] z-10 relative flex flex-col items-center my-auto py-2 md:py-4">
        <div className="glass-panel w-full max-w-[480px] rounded-2xl p-4 sm:p-5 md:p-6 shadow-[0px_10px_30px_rgba(0,0,0,0.4)] flex flex-col gap-2.5">
          <header className="flex flex-col items-center text-center gap-0.5">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden mb-1 ring-1 ring-white/10 flex items-center justify-center bg-surface-container-low p-1.5">
              <img alt="Chai, Charger &amp; Channay Logo" className="w-full h-full object-contain rounded-lg" src={logoImg} />
            </div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-lg md:text-2xl font-bold text-on-surface">Create an account</h1>
            <p className="font-body-md text-xs md:text-sm text-on-surface-variant">Join Chai, Charger &amp; Channay an organic crowd-funded community.</p>
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex flex-col gap-0.5">
                <label className="font-label-sm text-[11px] text-on-surface-variant ml-1" htmlFor="firstName">First Name</label>
                <input className="w-full h-9 px-3 rounded-lg input-field font-body-md text-xs md:text-sm text-on-surface bg-surface-container-low focus:outline-none" id="firstName" placeholder="John" type="text" value={formData.firstName} onChange={handleChange} required />
                {errors.firstName && <span className="text-[10px] text-error ml-1">{errors.firstName}</span>}
              </div>
              <div className="flex flex-col gap-0.5">
                <label className="font-label-sm text-[11px] text-on-surface-variant ml-1" htmlFor="lastName">Last Name</label>
                <input className="w-full h-9 px-3 rounded-lg input-field font-body-md text-xs md:text-sm text-on-surface bg-surface-container-low focus:outline-none" id="lastName" placeholder="Doe" type="text" value={formData.lastName} onChange={handleChange} required />
                {errors.lastName && <span className="text-[10px] text-error ml-1">{errors.lastName}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              <label className="font-label-sm text-[11px] text-on-surface-variant ml-1" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-[16px]">mail</span>
                <input className="w-full h-9 pl-8 pr-3 rounded-lg input-field font-body-md text-xs md:text-sm text-on-surface bg-surface-container-low focus:outline-none" id="email" placeholder="john@example.com" type="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              <label className="font-label-sm text-[11px] text-on-surface-variant ml-1" htmlFor="phone">Phone Number</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-[16px]">call</span>
                <input className="w-full h-9 pl-8 pr-3 rounded-lg input-field font-body-md text-xs md:text-sm text-on-surface bg-surface-container-low focus:outline-none" id="phone" placeholder="+92 *** *******" type="tel" value={formData.phone} onChange={handleChange} required />
              </div>
              {errors.phone && <span className="text-[10px] text-error ml-1">{errors.phone}</span>}
            </div>

            {/* Username field */}
            <div className="flex flex-col gap-0.5">
              <label className="font-label-sm text-[11px] text-on-surface-variant ml-1 flex items-center gap-1" htmlFor="username">
                Public Username <span className="text-on-surface-variant/50 font-normal">(Publicly visible handle)</span>
                <span className={`material-symbols-outlined text-[13px] transition-colors ${isUsernameFocused ? 'text-primary' : 'text-on-surface-variant/50'}`}>info</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-[16px]">alternate_email</span>
                <input
                  className="w-full h-9 pl-8 pr-20 rounded-lg input-field font-body-md text-xs md:text-sm text-on-surface bg-surface-container-low focus:outline-none"
                  id="username"
                  placeholder="johndoe"
                  type="text"
                  maxLength={20}
                  value={formData.username}
                  onChange={handleChange}
                  onFocus={() => setIsUsernameFocused(true)}
                  onBlur={() => setIsUsernameFocused(false)}
                  required
                />
                {checkingUsername && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-blue-400">Checking...</span>
                )}
                {!checkingUsername && usernameAvailable === true && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-green-400">Available</span>
                )}
                {!checkingUsername && usernameAvailable === false && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-red-400">Taken</span>
                )}
              </div>
              {isUsernameFocused && (
                <span className="text-[10px] text-primary ml-1 leading-tight">
                  keep your username as anonymous as you can...
                </span>
              )}
              {errors.username && <span className="text-[10px] text-error ml-1">{errors.username}</span>}
            </div>

            <div className="flex flex-col gap-0.5">
              <label className="font-label-sm text-[11px] text-on-surface-variant ml-1" htmlFor="password">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-[16px]">lock</span>
                <input className="w-full h-9 pl-8 pr-9 rounded-lg input-field font-body-md text-xs md:text-sm text-on-surface bg-surface-container-low focus:outline-none" id="password" placeholder="••••••••" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[16px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
              {errors.password && <span className="text-[10px] text-error ml-1">{errors.password}</span>}
            </div>
            <div className="flex flex-col gap-0.5">
              <label className="font-label-sm text-[11px] text-on-surface-variant ml-1" htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-[16px]">lock</span>
                <input className="w-full h-9 pl-8 pr-9 rounded-lg input-field font-body-md text-xs md:text-sm text-on-surface bg-surface-container-low focus:outline-none" id="confirmPassword" placeholder="••••••••" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} required />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[16px]">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
              {errors.confirmPassword && <span className="text-[10px] text-error ml-1">{errors.confirmPassword}</span>}
            </div>

            <div className="flex items-center gap-2 my-0.5 px-1">
              <input type="checkbox" id="terms" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="w-3.5 h-3.5 rounded accent-primary bg-surface-container-low border-white/20 cursor-pointer" required />
              <label htmlFor="terms" className="font-body-md text-[11px] md:text-xs text-on-surface-variant cursor-pointer select-none">
                I agree to the{' '}
                <button type="button" onClick={() => setShowTermsModal(true)} className="text-primary hover:underline font-semibold bg-transparent border-none p-0 inline cursor-pointer">Terms &amp; Conditions</button>
              </label>
            </div>

            <button
              type="submit"
              disabled={!agreedToTerms || usernameAvailable === false}
              className="btn-primary w-full h-10 md:h-11 rounded-lg font-title-md text-xs md:text-sm font-semibold flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-1"
            >
              Create Account
            </button>
          </form>

          <div className="text-center mt-0.5">
            <p className="font-body-md text-xs text-on-surface-variant">
              Already have an account? <Link className="text-primary font-title-md hover:text-primary-fixed transition-colors font-semibold" to="/login">Log in</Link>
            </p>
          </div>
        </div>
      </main>

      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-[550px] max-h-[80vh] rounded-2xl p-5 md:p-6 shadow-2xl flex flex-col gap-4 border border-white/10 relative text-on-surface">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-lg md:text-xl font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined">gavel</span> Terms &amp; Conditions
              </h2>
              <button type="button" onClick={() => setShowTermsModal(false)} className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="overflow-y-auto pr-2 flex flex-col gap-3.5 text-xs md:text-sm text-on-surface-variant leading-relaxed custom-scrollbar">
              <p>Welcome to <strong>Chai, Charger &amp; Channay</strong>. By creating an account or using our platform, you explicitly agree to the following terms and guidelines.</p>
              <div>
                <h3 className="font-semibold text-on-surface text-sm md:text-base mb-1">1. Anti-Scraping &amp; Data Protection</h3>
                <p>Automated data extraction, web scraping, harvesting, or indexing of any user profiles, workspace data, or listings is strictly prohibited.</p>
              </div>
              <div>
                <h3 className="font-semibold text-on-surface text-sm md:text-base mb-1">2. Organic Reviews &amp; Non-Favoritism</h3>
                <p>All feedback and ratings must remain authentic and unbiased. Users and workspace owners are strictly forbidden from inflating ratings or posting deceptive reviews.</p>
              </div>
              <div>
                <h3 className="font-semibold text-on-surface text-sm md:text-base mb-1">3. Account Security &amp; Reverse Engineering</h3>
                <p>You are responsible for safeguarding your login credentials. Any attempt to exploit vulnerabilities or reverse-engineer API endpoints will result in an immediate permanent ban.</p>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
              <button type="button" onClick={() => { setAgreedToTerms(true); setShowTermsModal(false); }} className="btn-primary px-4 py-2 rounded-lg text-xs md:text-sm font-semibold cursor-pointer">
                I Agree &amp; Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}