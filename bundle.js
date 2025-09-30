// ✅ ESM YOLU — tamamı import’la
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Eğer sadece hook'lar gerekliyse:
// import { useRef, useState, useEffect } from 'react';

function App() {
  const inputRef = React.useRef(null); // ✅ React namespace ESM’den geliyor
  return (
    <div className="p-6">
      <input ref={inputRef} placeholder="Hei Voon" className="border p-2" />
      <motion.button whileHover={{ scale: 1.05 }} className="ml-2 px-3 py-2 border">
        CTA
      </motion.button>
    </div>
  );
}

// root gerçekten var mı kontrol et:
const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('#root not found');
createRoot(rootEl).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);
