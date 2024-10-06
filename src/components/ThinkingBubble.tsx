import React from 'react';
import { Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const ThinkingBubble: React.FC = () => {
  return (
    <Card className="p-4 bg-secondary">
      <div className="flex items-center">
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
        <span>Thinking...</span>
      </div>
    </Card>
  );
};
