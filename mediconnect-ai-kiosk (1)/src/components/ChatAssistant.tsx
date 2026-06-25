import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, RefreshCw } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I am **MediConnect AI**, your virtual healthcare kiosk companion. I can help answer questions about our certified hardware sensors, subscription prices, solutions for rural or corporate clinics, or guide you on how to book a live demonstration. How can I assist you today?",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const listEndRef = useRef<HTMLDivElement>(null);

  const scrollToEnd = () => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToEnd();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = { role: "user", content: textToSend };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.text) {
          setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "My connection to the MediConnect server-side clinical NPU was interrupted. Please try again.",
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Network issue. Please make sure the server on port 3000 is active.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(userInput);
  };

  const suggestionChips = [
    "Tell me about Kiosk Hardware",
    "How secure is patient data?",
    "What are the pricing plans?",
    "How do I book a demo?",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="floating-chat-assistant">
      {/* Closed Button Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 bg-gradient-to-tr from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-500/20 hover:scale-105 transition-all duration-200 cursor-pointer border border-white/20 relative"
          id="open-chat-bubble"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-3w-3 px-1.5 py-0.5 bg-red-500 text-white text-[8px] font-bold rounded-full animate-bounce">
            AI
          </span>
        </button>
      )}

      {/* Expanded Chat Dialog Box */}
      {isOpen && (
        <div
          className="glass rounded-3xl w-[360px] md:w-[400px] h-[520px] shadow-2xl flex flex-col justify-between overflow-hidden animate-fade-in"
          id="chat-dialog-panel"
        >
          {/* Header */}
          <div className="glass-dark text-white p-4 flex justify-between items-center border-b border-white/10">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600/25 p-1.5 rounded-xl text-teal-400">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-display font-extrabold text-sm text-slate-100">
                  MediConnect Companion
                </h4>
                <div className="flex items-center space-x-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[9px] font-mono font-bold text-teal-400 uppercase tracking-wider">
                    Online Triage Support
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 bg-slate-850 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Logs scroll list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/20 backdrop-blur-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-2.5 ${m.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                {/* avatar */}
                <div
                  className={`h-7 w-7 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                    m.role === "user" ? "bg-blue-600 text-white" : "bg-slate-900 text-teal-400"
                  }`}
                >
                  {m.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                </div>

                {/* message box */}
                <div
                  className={`p-3 rounded-2xl text-xs max-w-[75%] leading-relaxed ${
                    m.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "glass text-gray-850 rounded-tl-none shadow-xs"
                  }`}
                >
                  {/* Handle basic markdown bullet or bold parsing */}
                  {m.content.split("\n").map((line, lidx) => {
                    let formattedLine = line;
                    // basic replacement of **text** with bold spans
                    const boldRegex = /\*\*(.*?)\*\*/g;
                    const parts = [];
                    let lastIndex = 0;
                    let match;

                    while ((match = boldRegex.exec(formattedLine)) !== null) {
                      if (match.index > lastIndex) {
                        parts.push(formattedLine.substring(lastIndex, match.index));
                      }
                      parts.push(<strong key={match.index} className="font-bold">{match[1]}</strong>);
                      lastIndex = boldRegex.lastIndex;
                    }

                    if (lastIndex < formattedLine.length) {
                      parts.push(formattedLine.substring(lastIndex));
                    }

                    const finalContent = parts.length > 0 ? parts : formattedLine;

                    if (line.trim().startsWith("*") || line.trim().startsWith("-")) {
                      return (
                        <div key={lidx} className="pl-3 border-l border-blue-500/20 text-slate-500 my-1">
                          {line.replace(/^[\s*-]+/, "").trim()}
                        </div>
                      );
                    }

                    return <p key={lidx} className="my-0.5">{finalContent}</p>;
                  })}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2.5">
                <div className="h-7 w-7 rounded-lg bg-slate-900 text-teal-400 flex items-center justify-center">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="glass rounded-2xl p-3 text-[11px] text-gray-400 font-mono shadow-xs flex items-center space-x-1.5">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Clinical model responding...</span>
                </div>
              </div>
            )}

            <div ref={listEndRef} />
          </div>

          {/* Suggestions footer */}
          {messages.length === 1 && !loading && (
            <div className="p-3 bg-white/30 border-t border-white/20 space-y-1.5">
              <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider font-mono px-1">
                Frequently Queried topics:
              </span>
              <div className="flex flex-wrap gap-1">
                {suggestionChips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSendMessage(chip)}
                    className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] text-gray-600 hover:text-blue-600 hover:border-blue-100 transition-all font-semibold cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form input */}
          <form onSubmit={handleFormSubmit} className="p-3 border-t border-white/20 flex items-center space-x-2 bg-white/40 backdrop-blur-md">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 placeholder-gray-400"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!userInput.trim() || loading}
              className="p-2.5 bg-blue-600 disabled:bg-gray-100 text-white disabled:text-gray-300 rounded-xl transition-colors cursor-pointer shadow-md shadow-blue-500/10 flex-shrink-0"
              id="submit-companion-msg-btn"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
