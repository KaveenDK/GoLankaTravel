import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, Loader2, MessageSquare } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Card from '../../components/ui/Card'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API Call behavior
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset success message after 5 seconds to allow sending another
      setTimeout(() => setSuccess(false), 5000)
    }, 1500)
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions about your trip? Want to partner with us? Or just want to say hi? 
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Phone Card */}
            <Card className="p-6 flex items-start space-x-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Call Us</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Mon-Fri from 8am to 5pm.</p>
                <a href="tel:+94112345678" className="text-purple-600 font-medium hover:underline mt-2 block">
                  +94 11 234 5678
                </a>
              </div>
            </Card>

            {/* Email Card */}
            <Card className="p-6 flex items-start space-x-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Email Us</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Our friendly team is here to help.</p>
                <a href="mailto:hello@golanka.com" className="text-purple-600 font-medium hover:underline mt-2 block">
                  hello@golanka.com
                </a>
              </div>
            </Card>

            {/* Address Card */}
            <Card className="p-6 flex items-start space-x-4 hover:shadow-md transition-shadow">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Visit Us</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Come say hello at our office HQ.</p>
                <p className="text-gray-800 dark:text-gray-200 mt-2 text-sm">
                  123 Galle Road, Colombo 03,<br />Sri Lanka
                </p>
              </div>
            </Card>

            {/* FAQ Box */}
            <div className="bg-purple-900 rounded-2xl p-6 text-white text-center shadow-lg">
              <MessageSquare className="w-10 h-10 mx-auto mb-4 text-purple-300" />
              <h3 className="text-lg font-bold mb-2">Frequently Asked Questions</h3>
              <p className="text-purple-100 text-sm mb-4">
                Can't find the answer you're looking for? Check out our comprehensive FAQ section.
              </p>
              <button className="text-sm font-semibold bg-white text-purple-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition shadow-sm">
                Visit FAQ Center
              </button>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 h-full border border-gray-200 dark:border-gray-800 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h2>
              
              {success ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 min-h-[400px]">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                    <Send className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
                    Thank you for contacting us. We have received your message and will get back to you within 24 hours.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSuccess(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Your Name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Input
                    label="Subject"
                    name="subject"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button 
                      type="submit" 
                      className="w-full md:w-auto px-8 py-3"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>

        </div>

        {/* Embedded Map Section */}
        <div className="mt-16 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 h-96">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.80385597899!2d79.82118589359334!3d6.921922576115984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2suk!4v1715433214522!5m2!1sen!2suk" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="GoLanka Office Location"
          ></iframe>
        </div>

      </div>
    </div>
  )
}

export default Contact