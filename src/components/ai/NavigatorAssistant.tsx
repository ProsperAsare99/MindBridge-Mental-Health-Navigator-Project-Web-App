'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Search, 
  MessageCircle, 
  BrainCircuit, 
  X,
  ChevronUp,
  LineChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function NavigatorAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [pulse, setPulse] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    fetchPulse();
  }, []);

  const fetchPulse = async () => {
    try {
      // Re-using the nudge endpoint for a "pulse" of intelligence
      const response = await axios.get('/api/ai/nudge', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPulse(response.data);
    } catch (error) {
      console.error('Failed to fetch AI pulse:', error);
    }
  };

  const handleSearch = async (val: string) => {
    setSearchQuery(val);
    if (val.length > 2) {
      try {
        const response = await axios.get(`/api/ai/search?q=${val}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 glass rounded-[2.5rem] p-6 shadow-2xl border border-primary/20 backdrop-blur-xl overflow-hidden relative"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Search anything..."
                className="w-full bg-primary/5 border border-primary/10 rounded-2xl py-2 pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            {/* Results or Pulse */}
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar space-y-4">
              {searchResults.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-1">Search Results</p>
                  {searchResults.map((res, i) => (
                    <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-primary/5 transition-colors cursor-pointer">
                      <p className="text-xs font-bold text-foreground">{res.title || res.content.substring(0, 40) + '...'}</p>
                      <p className="text-[9px] text-muted-foreground uppercase">{res.type}</p>
                    </div>
                  ))}
                </div>
              ) : pulse ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">AI Insight</span>
                    </div>
                    <p className="text-xs font-semibold leading-relaxed italic text-foreground/90">
                      "{pulse.message}"
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="h-20 rounded-2xl flex flex-col gap-1 border-white/10 bg-white/5">
                      <MessageCircle size={16} />
                      <span className="text-[10px] font-bold">Chat</span>
                    </Button>
                    <Button variant="outline" className="h-20 rounded-2xl flex flex-col gap-1 border-white/10 bg-white/5">
                      <BrainCircuit size={16} />
                      <span className="text-[10px] font-bold">Insights</span>
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>

            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 h-6 w-6 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X size={14} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-primary shadow-xl shadow-primary/20 flex items-center justify-center text-white relative group overflow-hidden"
      >
        <Sparkles className="group-hover:rotate-12 transition-transform" />
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </motion.button>
    </div>
  );
}
