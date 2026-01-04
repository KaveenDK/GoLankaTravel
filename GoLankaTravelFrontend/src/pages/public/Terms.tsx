import { FileText, ShieldAlert, CheckCircle, Scale, AlertOctagon, HelpCircle } from 'lucide-react'

const Terms = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scale className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last Updated: January 15, 2026
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12 space-y-10">
          
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-50 dark:bg-blue-900/10 py-2">
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the GoLanka Travel website (the "Service") operated by GoLanka Travel ("us", "we", or "our").
          </p>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-500" />
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service. These Terms apply to all visitors, users and others who access or use the Service.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-orange-500" />
              2. Accounts
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li>You are responsible for safeguarding the password that you use to access the Service.</li>
              <li>You agree not to disclose your password to any third party.</li>
              <li>You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              3. Purchases & Bookings
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
              We reserve the right to refuse or cancel your order at any time for certain reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order or other reasons.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertOctagon className="w-6 h-6 text-red-500" />
              4. Termination
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-500" />
              5. Changes
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          {/* Divider */}
          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Contact Section */}
          <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Have questions about our Terms?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our support team is here to help clarify any points.
            </p>
            <a 
              href="/contact" 
              className="inline-block px-6 py-2 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-sm"
            >
              Contact Us
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Terms