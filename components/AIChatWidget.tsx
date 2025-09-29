
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { ChatRole } from '../types';

const AIChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<ChatMessage[]>([
        { role: ChatRole.MODEL, text: "Hei! Olen Voon Assist. Miten voin auttaa sinua tänään markkinointiin liittyen?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;
        
        const userMessage: ChatMessage = { role: ChatRole.USER, text: input };
        setHistory(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const response = await getGeminiResponse(history, input);
        
        const modelMessage: ChatMessage = { role: ChatRole.MODEL, text: response };
        setHistory(prev => [...prev, modelMessage]);
        setIsLoading(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };
    
    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-gradient-to-r from-brand-purple to-brand-teal text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300"
                    aria-label="Avaa chat-avustaja"
                >
                    {isOpen ? (
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    ) : (
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    )}
                </button>
            </div>
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-full max-w-sm h-[60vh] bg-dark-card border border-gray-700 rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in-up">
                    <div className="p-4 border-b border-gray-700">
                        <h3 className="font-bold text-lg text-white">Voon Assist</h3>
                        <p className="text-sm text-gray-400">Tekoälyavustajasi</p>
                    </div>
                    <div className="flex-grow p-4 overflow-y-auto space-y-4">
                        {history.map((message, index) => (
                            <div key={index} className={`flex ${message.role === ChatRole.USER ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${message.role === ChatRole.USER ? 'bg-brand-purple text-white' : 'bg-gray-700 text-gray-200'}`}>
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                             <div className="flex justify-start">
                                <div className="bg-gray-700 text-gray-200 px-4 py-2 rounded-2xl flex items-center space-x-2">
                                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
                                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></span>
                                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-400"></span>
                                </div>
                             </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                    <div className="p-4 border-t border-gray-700 flex space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Kysy jotain..."
                            className="flex-grow bg-dark-bg border border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                        />
                        <button onClick={handleSendMessage} disabled={isLoading || !input.trim()} className="bg-brand-teal text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 disabled:bg-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIChatWidget;
