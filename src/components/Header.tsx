import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onToggleAudio: () => void;
  isMuted: boolean;
}

export default function Header({ onToggleAudio, isMuted }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="max-w-[100rem] mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="font-heading text-2xl md:text-3xl text-foreground">rFor</h1>
        <Button
          onClick={onToggleAudio}
          variant="ghost"
          size="icon"
          className="text-deep-muted hover:text-foreground transition-colors duration-300"
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </Button>
      </div>
    </header>
  );
}
