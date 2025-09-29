import React, { useState } from 'react';

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Hi! How can I help you with medications today?' }]);
  const [draft, setDraft] = useState('');

  const send = () => {
    if (!draft.trim()) return;
    setMessages([...messages, { from: 'user', text: draft }, { from: 'bot', text: 'Thanks! Our team will get back to you.' }]);
    setDraft('');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-emerald-600 text-white shadow-lg px-4 py-3 hover:bg-emerald-700"
        aria-label="Open support chat"
      >
        {open ? 'Close' : 'Chat'}
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col">
          <div className="px-4 py-3 border-b font-semibold text-gray-800">Support</div>
          <div className="p-3 h-64 overflow-y-auto space-y-2 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`px-3 py-2 rounded-lg max-w-[85%] ${m.from === 'user' ? 'bg-emerald-50 text-emerald-800 ml-auto' : 'bg-gray-100 text-gray-800'}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              className="flex-1 border rounded-md px-3 py-2 text-sm"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === 'Enter' ? send() : null}
            />
            <button className="px-3 py-2 rounded-md bg-emerald-600 text-white text-sm" onClick={send}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
