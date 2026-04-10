import { AnimatePresence, motion } from 'motion/react';
import { useVoiceAssistant } from '@livekit/components-react';
import { PhoneDisconnectIcon, XIcon } from '@phosphor-icons/react';
import { EmbedErrorDetails } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const AnimatedButton = motion.create(Button);

interface TriggerProps {
  error: EmbedErrorDetails | null;
  popupOpen: boolean;
  onToggle: () => void;
  title?: string; 
  color?: string;
}

export function Trigger({ 
  error = null, 
  popupOpen, 
  onToggle, 
  title = "Talk to AI Receptionist", // Updated writing
  color = "#7C3AED"                   // Professional Purple hex
}: TriggerProps) {
  const { state: agentState } = useVoiceAssistant();

  const isAgentConnecting =
    popupOpen && (agentState === 'connecting' || agentState === 'initializing');

  const isAgentConnected =
    popupOpen &&
    agentState !== 'disconnected' &&
    agentState !== 'connecting' &&
    agentState !== 'initializing';

  return (
    <div className="fixed right-4 bottom-4 z-50 flex items-center gap-3">
      {/* Floating text bubble next to the button */}
      {!popupOpen && (
        <motion.span 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white px-4 py-2 rounded-xl shadow-lg text-sm font-semibold text-gray-800 border border-gray-100"
        >
          {title}
        </motion.span>
      )}

      <AnimatePresence>
        <AnimatedButton
          key="trigger-button"
          size="lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', duration: 1, bounce: 0.2 }}
          onClick={onToggle}
          style={{ backgroundColor: !popupOpen ? color : undefined }}
          className={cn(
            'relative m-0 block size-14 p-0.5 drop-shadow-xl', // Increased size slightly for visibility
            'scale-100 transition-[scale] duration-300 hover:scale-110 focus:scale-105',
            (isAgentConnected || (error && popupOpen)) && 'bg-destructive'
          )}
        >
          {/* Ring animation with your purple color */}
          <motion.div
            className={cn(
              'absolute inset-0 z-10 rounded-full transition-colors',
              !error && isAgentConnecting && 'animate-spin opacity-40'
            )}
            style={{ 
              backgroundColor: !popupOpen ? color : undefined,
              backgroundImage: isAgentConnecting ? `conic-gradient(from 0deg, transparent 0%, transparent 30%, ${color} 50%, transparent 70%, transparent 100%)` : undefined
            }}
          />
          
          <div className="relative z-20 grid size-full place-items-center rounded-full">
            <AnimatePresence mode="wait">
              {!popupOpen && (
                <motion.div
                  key="lk-logo"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute"
                >
                  <div
                    className="size-6 bg-white"
                    style={{
                      // Pointing to your Vercel URL to fix the 404 error on WordPress
                      maskImage: 'url(https://ai-receptionist-vert-pi.vercel.app/lk-logo.svg)',
                      maskSize: 'contain',
                      maskRepeat: 'no-repeat'
                    }}
                  />
                </motion.div>
              )}
              {(isAgentConnecting || (error && popupOpen)) && (
                <XIcon size={24} weight="bold" className="text-white" />
              )}
              {!error && isAgentConnected && (
                <PhoneDisconnectIcon size={24} weight="bold" className="text-white" />
              )}
            </AnimatePresence>
          </div>
        </AnimatedButton>
      </AnimatePresence>
    </div>
  );
      }
