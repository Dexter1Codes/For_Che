import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background py-12">
      <div className="max-w-[100rem] mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-primary fill-primary" />
          <p className="font-paragraph text-base text-deep-muted">
            Made with love for someone very special
          </p>
          <Heart className="w-5 h-5 text-primary fill-primary" />
        </div>
        <p className="font-paragraph text-sm text-deep-muted">
          {new Date().getFullYear()} • A moment to cherish forever
        </p>
      </div>
    </footer>
  );
}
