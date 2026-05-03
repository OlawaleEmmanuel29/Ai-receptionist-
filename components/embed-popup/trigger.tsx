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
  title = "TALK TO AI RECEPTIONIST", 
  color = "#F3D371" // This matches the "Book Your Stay" gold color
}: TriggerProps) {
  const { state: agentState } = useVoiceAssistant();

  const isAgentConnecting =
    popupOpen && (agentState === 'connecting' || agentState === 'initializing');

  const isAgentConnected =
    popupOpen &&
    agentState !== 'disconnected' &&
    agentState !== 'connecting' &&
    agentState !== 'initializing';

  // Dynamic button color: Gold for standby, Red for active/error
  const buttonColor = (isAgentConnected || (error && popupOpen)) ? '#EF4444' : color;
  
  // Dynamic text color: Dark Charcoal for gold background, White for red/error
  const textColor = (isAgentConnected || (error && popupOpen)) ? 'text-white' : 'text-[#1a1a1a]';

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <AnimatePresence mode="wait">
        <AnimatedButton
          key={popupOpen ? 'open' : 'closed'}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          onClick={onToggle}
          style={{ backgroundColor: buttonColor }}
          className={cn(
            "flex items-center justify-center gap-2 px-7 py-3 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95",
            "h-auto w-auto min-w-[220px] border-none font-extrabold tracking-wider",
            textColor
          )}
        >
          <span className="text-sm md:text-base whitespace-nowrap flex items-center gap-2 uppercase">
            {popupOpen ? (
              <>
                {error ? <XIcon size={20} /> : <PhoneDisconnectIcon size={20} />}
                <span>{error ? "Close Error" : "End Call"}</span>
              </>
            ) : (
              <>
                <span className="text-xl">🗨️</span>
                <span>{title}</span>
              </>
            )}
          </span>

          {/* Status Indicator */}
          {isAgentConnecting && (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="absolute -top-1 -right-1 size-4 bg-white rounded-full border-2 border-[#F3D371]"
            />
          )}
        </AnimatedButton>
      </AnimatePresence>
    </div>
  );
}
