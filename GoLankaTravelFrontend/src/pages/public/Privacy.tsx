import { Shield, Lock, Eye, FileText, Server, Globe } from 'lucide-react'

const Privacy = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last Updated: January 15, 2026
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 md:p-12 space-y-10">
          
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-500" />
              1. Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              At GoLanka Travel, we collect information to provide better services to all our users. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
              <li><strong>Personal Information:</strong> Name, email address, phone number, and billing details provided during registration or booking.</li>
              <li><strong>Travel Preferences:</strong> Interests, budget ranges, and dietary requirements used to generate AI itineraries.</li>
              <li><strong>Usage Data:</strong> Information on how you use our website, such as pages visited and time spent.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-blue-500" />
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-600 dark:text-gray-300">
              <li>To provide and maintain our Service, including monitoring the usage of our Service.</li>
              <li>To manage your Account: The personal data you provide can give you access to different functionalities of the Service.</li>
              <li>To contact you: To contact you by email, telephone calls, SMS, or other equivalent forms of electronic communication.</li>
              <li>To provide you with news, special offers, and general information about other goods, services, and events.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-green-500" />
              3. Data Security
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              The security of your Personal Data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security. We use industry-standard encryption (SSL) to protect your data during transmission.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Globe className="w-6 h-6 text-orange-500" />
              4. Third-Party Sharing
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Payment processing (Stripe, PayHere).</li>
              <li>Data analysis and email delivery (Google Analytics, Gmail).</li>
              <li>Hosting services (AWS, Vercel).</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Server className="w-6 h-6 text-red-500" />
              5. Retention of Data
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              GoLanka Travel will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
            </p>
          </section>

          {/* Divider */}
          <hr className="border-gray-200 dark:border-gray-700" />

          {/* Contact Section */}
          <div className="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-xl border border-purple-100 dark:border-purple-900/30">
            <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-2">Questions about this policy?</h3>
            <p className="text-purple-700 dark:text-purple-300 mb-4">
              If you have any questions about our Privacy Policy, please contact us:
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition shadow-sm"
            >
              Contact Support
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Privacy