import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-2xl">
          <div className="flex items-center gap-2 text-ruveron-navy font-bold text-lg">
            <ShieldCheck className="w-5 h-5 text-ruveron-royal" />
            <span>Privacy Policy - RUVERON SOLUTIONS PRIVATE LIMITED</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-4 text-slate-600 text-sm leading-relaxed">
          <p>
            <strong>RUVERON SOLUTIONS PRIVATE LIMITED</strong> (&quot;RUVERON&quot;, &quot;We&quot;, &quot;Us&quot;) respects the privacy of our website visitors, clients, and candidates. This Privacy Policy details our practices concerning data collection and usage.
          </p>
          <h4 className="font-semibold text-slate-900">1. Information Collection</h4>
          <p>
            We collect personal information voluntarily provided through our enquiry forms, including Full Name, Email Address, Phone Number, Company Name, and Service Requirements.
          </p>
          <h4 className="font-semibold text-slate-900">2. Use of Information</h4>
          <p>
            Information collected is strictly utilized to process business inquiries, deliver recruitment and payroll management services, provide support, and manage client communications.
          </p>
          <h4 className="font-semibold text-slate-900">3. Data Protection</h4>
          <p>
            We employ industry-standard administrative, physical, and technical safeguards to protect your personal data against unauthorized access, disclosure, or misuse.
          </p>
          <h4 className="font-semibold text-slate-900">4. Third-Party Sharing</h4>
          <p>
            We do not sell, rent, or trade your personal information to third parties for marketing purposes. Data is shared only with statutory regulatory authorities when mandated by Indian labor laws.
          </p>
          <h4 className="font-semibold text-slate-900">5. Contact Us</h4>
          <p>
            For privacy inquiries, please contact us at RUVERONSOLUTIONSPVTLTD@GMAIL.COM or call +91-9985965566.
          </p>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end bg-slate-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-ruveron-navy text-white font-medium rounded-xl hover:bg-ruveron-blue transition text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const TermsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-2xl">
          <div className="flex items-center gap-2 text-ruveron-navy font-bold text-lg">
            <ShieldCheck className="w-5 h-5 text-ruveron-royal" />
            <span>Terms & Conditions - RUVERON SOLUTIONS PRIVATE LIMITED</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-4 text-slate-600 text-sm leading-relaxed">
          <p>
            Welcome to <strong>RUVERON SOLUTIONS PRIVATE LIMITED</strong>. By accessing or using this website, you agree to comply with and be bound by the following terms and conditions.
          </p>
          <h4 className="font-semibold text-slate-900">1. Intellectual Property</h4>
          <p>
            All content, brand assets, text, design, and graphics on this website are the intellectual property of RUVERON SOLUTIONS PRIVATE LIMITED. Unauthorized copying or redistribution is strictly prohibited.
          </p>
          <h4 className="font-semibold text-slate-900">2. Service Delivery Terms</h4>
          <p>
            Engagements for Recruitment, Contract Staffing, Payroll Management, and Statutory Compliance are governed by specific client agreements executed directly with RUVERON SOLUTIONS PRIVATE LIMITED.
          </p>
          <h4 className="font-semibold text-slate-900">3. Website Use</h4>
          <p>
            Users agree to use this site strictly for lawful corporate inquiries. Any attempt to compromise site functionality or security is prohibited.
          </p>
          <h4 className="font-semibold text-slate-900">4. Jurisdiction</h4>
          <p>
            These terms are governed by the laws of India. Any legal proceedings shall be subject to the exclusive jurisdiction of the courts in Vijayawada, Andhra Pradesh.
          </p>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end bg-slate-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-ruveron-navy text-white font-medium rounded-xl hover:bg-ruveron-blue transition text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
