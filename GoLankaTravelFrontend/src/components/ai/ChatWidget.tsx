import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Sparkles, User, Bot } from 'lucide-react'
import { cn } from '../../utils/cn'
import Button from '../ui/Button'

// Types
interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Ayubowan! I'm your AI Travel Guide. Ask me anything about planning your trip to Sri Lanka! 🇱🇰",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  
  // Auto-scroll to bottom of chat
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isOpen, isTyping])

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()
    
    if (!inputValue.trim()) return

    // 1. Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    // 2. Simulate AI Response (Replace this with actual API call later)
    // const response = await api.post('/ai/chat', { message: inputValue })
    
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: getMockResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 1500)
  }

  // Temporary Mock Logic for Demo
  const getMockResponse = (input: string): string => {
    const lower = input.toLowerCase()
    if (lower.includes('weather') || lower.includes('rain')) return "The best time to visit the south coast (Mirissa, Galle) is Dec-April. For the east coast (Trincomalee), go between May-Sept!"
    if (lower.includes('price') || lower.includes('cost')) return "Our trips range from $500 to $2000 depending on the duration and luxury level. You can filter by price on the 'All Trips' page."
    if (lower.includes('visa')) return "Most visitors need an ETA (Electronic Travel Authorization) before arrival. It's an easy online process."
    return "That sounds like a great adventure! I'd recommend checking our 'Adventure' category for more details. Anything else you'd like to know?"
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* --- CHAT WINDOW --- */}
      <div 
        className={cn(
          "bg-white dark:bg-gray-800 w-[350px] md:w-[400px] h-[500px] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right mb-4",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none absolute bottom-0 right-0"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">GoLanka AI</h3>
              <p className="text-xs text-purple-100 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/> Online
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={cn(
                "flex gap-3 max-w-[85%]",
                msg.sender === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              {/* Avatar */}
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white shadow-sm",
                msg.sender === 'user' ? "bg-gray-500" : "bg-purple-600"
              )}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Bubble */}
              <div className={cn(
                "p-3 rounded-2xl text-sm shadow-sm",
                msg.sender === 'user' 
                  ? "bg-purple-600 text-white rounded-tr-none" 
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-tl-none"
              )}>
                {msg.text}
                <div className={cn(
                  "text-[10px] mt-1 opacity-70",
                  msg.sender === 'user' ? "text-purple-200" : "text-gray-400"
                )}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shrink-0 text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about your trip..."
            className="flex-1 bg-gray-100 dark:bg-gray-900 border-0 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 outline-none dark:text-white"
          />
          <Button type="submit" size="sm" disabled={!inputValue.trim() || isTyping}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>

      {/* --- TOGGLE BUTTON --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95",
          isOpen ? "bg-gray-800 text-white rotate-90" : "bg-gradient-to-r from-purple-600 to-blue-600 text-white animate-bounce-subtle"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
        
        {/* Notification Badge (Optional) */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
          </span>
        )}
      </button>
    </div>
  )
}

export default ChatWidget