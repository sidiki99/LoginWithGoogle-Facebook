
import { useGoogleLogin } from "@react-oauth/google";


export default function GoogleLogin() {


  const handleFacebookLogin = () => {
    window.location.href = "http://localhost:8001/facebook";
  };

  const googleLogin = useGoogleLogin({
    flow: "auth-code",

    onSuccess: (authResult) => {
      console.log("Google authorization code:", authResult.code);

      window.location.href =
        `http://localhost:8001/google?code=${encodeURIComponent(
          authResult.code
        )}`;
    },

    onError: (error) => {
      console.log("Google Login Error:", error);
    },
  });



  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-white to-indigo-100 px-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl shadow-indigo-200/50">
        
        {/* Top Design */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 px-8 py-10 text-center">
          
          {/* Decorative circles */}
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/10" />
          <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-white/10" />

          <div className="relative">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg">
              👋
            </div>

            <h1 className="text-3xl font-bold text-white">
              Welcome Back!
            </h1>

            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-indigo-100">
              We're happy to see you again. Sign in with your Google account
              to continue to your dashboard.
            </p>
          </div>
        </div>

        {/* Card Content */}
        <div className="px-8 py-9">
          
          <div className="mb-7 text-center">
            <h2 className="text-xl font-bold text-slate-900">
              Sign in to your account
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Fast, secure and simple authentication
            </p>
          </div>

          {/* Google Login Button */}
          <button
            onClick={googleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition duration-200 hover:border-indigo-200 hover:bg-slate-50 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100 active:scale-[0.98]"
          >
            {/* Google Icon */}
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M21.35 12.27c0-.79-.07-1.55-.23-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
              />
              <path
                fill="#34A853"
                d="M12 21.7c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.7Z"
              />
              <path
                fill="#FBBC05"
                d="M6.54 13.78a5.85 5.85 0 0 1 0-3.56V7.69H3.3a9.74 9.74 0 0 0 0 8.62l3.24-2.53Z"
              />
              <path
                fill="#EA4335"
                d="M12 6.19c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.24 14.63 2.3 12 2.3a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53C7.31 7.91 9.46 6.19 12 6.19Z"
              />
            </svg>

            Continue with Google
          </button>

          {/* Facebook Login Button */}
            <button
              onClick={handleFacebookLogin}
              className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition duration-200 hover:border-indigo-200 hover:bg-slate-50 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-100 active:scale-[0.98]"
            >
              {/* Facebook Icon */}
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="#1877F2"
                aria-hidden="true"
              >
                <path d="M24 12a12 12 0 1 0-13.875 11.85v-8.38H7.078V12h3.047V9.412c0-3.008 1.792-4.67 4.533-4.67 1.312 0 2.686.234 2.686.234v2.953h-1.513c-1.49 0-1.954.925-1.954 1.874V12h3.328l-.532 3.47h-2.796v8.38A12.003 12.003 0 0 0 24 12Z" />
              </svg>

              Continue with Facebook
            </button>

          {/* Divider */}
          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium text-slate-400">
              SECURE LOGIN
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <div className="text-lg">🔒</div>
              <p className="mt-1 text-xs font-medium text-slate-600">
                Secure
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <div className="text-lg">⚡</div>
              <p className="mt-1 text-xs font-medium text-slate-600">
                Fast
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <div className="text-lg">✓</div>
              <p className="mt-1 text-xs font-medium text-slate-600">
                Simple
              </p>
            </div>
          </div>

          <p className="mt-7 text-center text-xs leading-5 text-slate-400">
            By continuing, you agree to use your Google account
            for secure authentication.
          </p>
        </div>
      </div>
    </div>
  );
}