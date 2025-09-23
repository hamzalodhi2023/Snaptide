import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowLeft,
  FaEnvelope,
  FaRedo,
} from "react-icons/fa";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { sendOtp } from "../redux/slices/authSlice";

function Otp() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = searchParams.get("token");
  const { verifyLoading, verifyError, verifySuccess } = useSelector(
    (state) => state.auth
  );

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [canResend, setCanResend] = useState(true);
  const [resendCooldown, setResendCooldown] = useState(0);

  const inputRefs = useRef([]);

  // Initialize cooldown from cookies on component mount
  useEffect(() => {
    const otpCooldown = Cookies.get("otpCooldown");
    if (otpCooldown) {
      const remainingTime = Math.max(
        0,
        parseInt(otpCooldown) - Math.floor(Date.now() / 1000)
      );
      if (remainingTime > 0) {
        setResendCooldown(remainingTime);
        setCanResend(false);
      } else {
        Cookies.remove("otpCooldown");
      }
    }
  }, []);

  useEffect(() => {
    if (!token) {
      toast.error("Invalid verification link");
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (verifySuccess) {
      setShowSuccessDialog(true);
      toast.success("OTP verified successfully! You are now logged in.");
    }
  }, [verifySuccess]);

  useEffect(() => {
    if (verifyError) {
      setErrorMessage(verifyError);
      setShowError(true);
      toast.error(verifyError);
    }
  }, [verifyError]);

  // Resend cooldown timer with cookie persistence
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            Cookies.remove("otpCooldown");
            return 0;
          }

          // Update cookie with remaining time
          const newCooldown = prev - 1;
          const cooldownEndTime = Math.floor(Date.now() / 1000) + newCooldown;
          Cookies.set("otpCooldown", cooldownEndTime.toString(), {
            expires: new Date(Date.now() + newCooldown * 1000),
            secure: true,
            sameSite: "strict",
          });

          return newCooldown;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (/^\d{6}$/.test(pastedData)) {
      const pastedOtp = pastedData.split("");
      setOtp(pastedOtp);
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setErrorMessage("Please enter a complete 6-digit OTP");
      setShowError(true);
      return;
    }

    try {
      await dispatch(sendOtp({ token, otp: otpString })).unwrap();
      setShowSuccessDialog(true);
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error(err.msg);
    }
  };

  const handleResendOtp = () => {
    if (!canResend) return;

    // Set cooldown in cookie (60 seconds)
    const cooldownEndTime = Math.floor(Date.now() / 1000) + 60;
    Cookies.set("otpCooldown", cooldownEndTime.toString(), {
      expires: new Date(Date.now() + 60 * 1000),
      secure: true,
      sameSite: "strict",
    });

    setCanResend(false);
    setResendCooldown(60);
    toast.info("OTP resent to your email");

    // Implement actual resend logic here
    // dispatch(resendOtp({ token }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Success Dialog
  if (showSuccessDialog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-mint-900 to-mint-950">
        <div className="bg-mint-800 p-8 rounded-2xl shadow-2xl border border-green-500/30 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-500/20 p-4 rounded-full">
              <FaCheckCircle className="w-12 h-12 text-green-400" />
            </div>
          </div>
          <h1 className="text-2xl font-nunito font-bold text-green-400 mb-4">
            Verification Successful!
          </h1>
          <p className="text-mint-300 mb-6">
            Your email has been successfully verified and you are now logged in.
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Error Dialog
  if (showError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-mint-900 to-mint-950">
        <div className="bg-mint-800 p-8 rounded-2xl shadow-2xl border border-red-500/30 max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-red-500/20 p-4 rounded-full">
              <FaExclamationTriangle className="w-12 h-12 text-red-400" />
            </div>
          </div>
          <h1 className="text-2xl font-nunito font-bold text-red-400 mb-4">
            Verification Failed
          </h1>
          <p className="text-mint-300 mb-6">{errorMessage}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setShowError(false)}
              className="bg-mint-600 hover:bg-mint-500 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={handleResendOtp}
              disabled={!canResend}
              className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-mint-900 to-mint-950">
      <div className="bg-mint-800 p-8 rounded-2xl shadow-2xl border border-mint-600 max-w-md w-full">
        <Link
          to="/login"
          className="inline-flex items-center text-mint-300 hover:text-mint-100 mb-6 transition-colors"
        >
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Link>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-mint-700 p-4 rounded-full">
              <FaEnvelope className="w-8 h-8 text-mint-300" />
            </div>
          </div>
          <h1 className="text-3xl font-nunito font-bold text-mint-100 mb-2">
            Verify Your Email
          </h1>
          <p className="text-mint-300 mb-2">
            Enter the 6-digit code sent to your email
          </p>
          <p className="text-mint-400 text-sm">
            Check your inbox for the verification code
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input Boxes */}
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 bg-mint-700 border-2 border-mint-600 rounded-lg text-center text-white text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-mint-400 focus:border-mint-400 transition-all duration-200"
                autoFocus={index === 0}
              />
            ))}
          </div>

          {/* Resend OTP */}
          <div className="text-center">
            {canResend ? (
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-mint-400 hover:text-mint-300 text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <FaRedo className="w-3 h-3" />
                Didn't receive the code? Resend OTP
              </button>
            ) : (
              <p className="text-mint-400 text-sm flex items-center justify-center gap-1">
                <FaRedo className="w-3 h-3" />
                Resend OTP in {formatTime(resendCooldown)}
              </p>
            )}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={verifyLoading || otp.join("").length !== 6}
            className={`w-full bg-mint-600 hover:bg-mint-500 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 ${
              verifyLoading || otp.join("").length !== 6
                ? "opacity-75 cursor-not-allowed"
                : ""
            }`}
          >
            {verifyLoading ? (
              <>
                <PulseLoader color="#ffffff" size={8} />
                <span>Verifying...</span>
              </>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-mint-700/30 rounded-lg">
          <p className="text-mint-300 text-sm text-center">
            Having trouble? Check your spam folder or contact support if you
            don't receive the code within 5 minutes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Otp;
