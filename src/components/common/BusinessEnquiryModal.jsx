import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const BusinessEnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    businessType: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const modalContentRef = useRef(null);

  // Email API endpoint
  const emailApiUrl = "https://vocoxp.staffhandler.com/vocoxp/tenant/tenant_backend/api/tenant/email";

  // Prevent body scroll when modal is open and reset modal scroll position
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Reset modal content scroll to top when opened
      if (modalContentRef.current) {
        modalContentRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Generate HTML email body
      const emailHtml = `
        <p>Dear Plannix Team,</p>
        <p>You have received a new business partnership enquiry from your website. Please find the details below:</p>
        <h4>Business Partner Details:</h4>
        <ul>
            <li><strong>Name:</strong> ${formData.name}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Phone:</strong> ${formData.phone || "N/A"}</li>
            <li><strong>Company/Business Name:</strong> ${formData.companyName}</li>
            <li><strong>Business Type:</strong> ${formData.businessType}</li>
        </ul>
        <h4>About Their Business:</h4>
        <p>${formData.message || "No additional information provided."}</p>
        <p>Please review this partnership request and respond at your earliest convenience.</p>
        <p><b>Plannix Website<br>Automated Enquiry System</b></p>
      `;

      // Send email via API
      const response = await fetch(emailApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "contact@plannix.in",
          subject: `New Business Partnership Enquiry from ${formData.companyName} - ${formData.businessType}`,
          html: emailHtml,
          from: '"Plannix Website" <transactions@staffhandler.com>',
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset after showing success
      setTimeout(() => {
        setIsSubmitted(false);
        setSubmitError(null);
        setFormData({
          name: "",
          email: "",
          phone: "",
          companyName: "",
          businessType: "",
          message: "",
        });
        onClose();
      }, 2500);
    } catch (error) {
      console.error("Email API Error:", error);
      setIsSubmitting(false);
      setSubmitError("Failed to send enquiry. Please try again.");
    }
  };

  const businessTypes = [
    "Event Venue",
    "Catering Service",
    "Photography/Videography",
    "Decoration & Florist",
    "Entertainment & Music",
    "Transportation",
    "Other Services",
  ];

  if (!isOpen) return null;

  // Use Portal to render modal at document body level
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        ref={modalContentRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 rounded-3xl border border-white/10 shadow-2xl animate-scaleIn"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-3">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm font-medium">
                Business Partnership
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Join Our
              <span className="block mt-1 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                Business Network
              </span>
            </h2>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Partner with plannix and grow your business by connecting with our extensive network of event organizers.
            </p>
          </div>

          {/* Success overlay */}
          {isSubmitted && (
            <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Inquiry Received!
                </h3>
                <p className="text-gray-400">
                  Our team will contact you shortly.
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name & Email row */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* Name field */}
              <div className="relative">
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === "name" || formData.name
                      ? "-top-2.5 text-xs text-green-400 bg-gray-900 px-2"
                      : "top-3.5 text-gray-500 text-sm"
                  }`}
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                  required
                />
              </div>

              {/* Email field */}
              <div className="relative">
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === "email" || formData.email
                      ? "-top-2.5 text-xs text-green-400 bg-gray-900 px-2"
                      : "top-3.5 text-gray-500 text-sm"
                  }`}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Phone & Company row */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* Phone field */}
              <div className="relative">
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === "phone" || formData.phone
                      ? "-top-2.5 text-xs text-green-400 bg-gray-900 px-2"
                      : "top-3.5 text-gray-500 text-sm"
                  }`}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                />
              </div>

              {/* Company Name field */}
              <div className="relative">
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === "companyName" || formData.companyName
                      ? "-top-2.5 text-xs text-green-400 bg-gray-900 px-2"
                      : "top-3.5 text-gray-500 text-sm"
                  }`}
                >
                  Company/Business Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("companyName")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                  required
                />
              </div>
            </div>

            {/* Business Type */}
            <div className="relative">
              <label className="block text-gray-400 text-sm mb-2">
                Business Type *
              </label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 appearance-none cursor-pointer"
                required
              >
                <option value="" disabled className="bg-gray-900">
                  Select your business type
                </option>
                {businessTypes.map((type) => (
                  <option key={type} value={type} className="bg-gray-900">
                    {type}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute right-4 top-[42px] pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Message field */}
            <div className="relative">
              <label className="block text-gray-400 text-sm mb-2">
                Tell us about your business
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                placeholder="Describe your services, experience, and how you'd like to partner with us..."
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 resize-none"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full py-4 px-8 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 disabled:opacity-70"
            >
              {/* Button background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 transition-transform duration-500 group-hover:scale-105" />

              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Button content */}
              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </span>

              {/* Button shadow */}
              <div className="absolute inset-0 rounded-xl shadow-lg shadow-green-500/30 group-hover:shadow-xl group-hover:shadow-green-500/40 transition-shadow duration-300" />
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>,
    document.body
  );
};

export default BusinessEnquiryModal;
