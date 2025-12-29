import { useState } from 'react';
import { Case, AIRecommendation, getAIRecommendations } from '@/lib/mockData';
import { Sparkles, Phone, Mail, MessageSquare, Check, ChevronRight, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface RecoveryCopilotProps {
  caseData: Case;
}

const actionIcons = {
  call: Phone,
  email: Mail,
  sms: MessageSquare,
};

const actionLabels = {
  call: 'Phone Call',
  email: 'Email',
  sms: 'SMS',
};

export function RecoveryCopilot({ caseData }: RecoveryCopilotProps) {
  const [selectedAction, setSelectedAction] = useState<AIRecommendation | null>(null);
  const [outcome, setOutcome] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recommendations = getAIRecommendations(caseData);

  const handleAcceptRecommendation = (rec: AIRecommendation) => {
    setSelectedAction(rec);
    toast({
      title: "Recommendation Accepted",
      description: `${actionLabels[rec.type]} action selected. Complete the form below to log this action.`,
    });
  };

  const handleSubmit = () => {
    if (!selectedAction || !outcome) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Action Logged Successfully",
        description: `${actionLabels[selectedAction.type]} action has been recorded for ${caseData.id}.`,
      });
      setSelectedAction(null);
      setOutcome('');
      setNotes('');
    }, 1000);
  };

  return (
    <div className="copilot-panel animate-slide-in-right shadow-copilot">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            Recovery Copilot™
            <span className="text-[10px] px-1.5 py-0.5 bg-accent/20 text-accent rounded-full font-medium">AI</span>
          </h3>
          <p className="text-xs text-muted-foreground">AI-recommended next best actions</p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-3 mb-6">
        {recommendations.map((rec, index) => {
          const Icon = actionIcons[rec.type];
          const isSelected = selectedAction?.type === rec.type;
          const isTopRecommendation = index === 0;

          return (
            <div
              key={rec.type}
              className={cn(
                'copilot-recommendation relative transition-all duration-200',
                isSelected && 'copilot-recommendation-selected',
                isTopRecommendation && !isSelected && 'ring-1 ring-accent/30'
              )}
            >
              {isTopRecommendation && (
                <div className="absolute -top-2 -right-2">
                  <span className="text-[10px] px-2 py-0.5 bg-accent text-accent-foreground rounded-full font-medium animate-pulse-subtle">
                    Suggested
                  </span>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
                  isSelected ? 'bg-accent text-accent-foreground' : 'bg-secondary text-primary'
                )}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground">{actionLabels[rec.type]}</span>
                    <span className={cn(
                      'text-xs font-semibold px-1.5 py-0.5 rounded',
                      rec.confidence >= 80 ? 'bg-success/10 text-success' :
                      rec.confidence >= 70 ? 'bg-warning/10 text-warning' :
                      'bg-muted text-muted-foreground'
                    )}>
                      {rec.confidence}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    {rec.reason}
                  </p>
                  <p className="text-[10px] text-accent flex items-center gap-1">
                    <Lightbulb className="w-3 h-3" />
                    {rec.timing}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <Button
                  size="sm"
                  variant={isSelected ? "default" : "secondary"}
                  onClick={() => handleAcceptRecommendation(rec)}
                  className="text-xs h-8"
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3 h-3 mr-1" />
                      Selected
                    </>
                  ) : (
                    'Accept'
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Form */}
      {selectedAction && (
        <div className="border-t border-copilot-border pt-5 space-y-4 animate-fade-in">
          <h4 className="font-medium text-foreground text-sm">Log Action Outcome</h4>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Outcome</label>
            <div className="grid grid-cols-2 gap-2">
              {['Connected', 'No Answer', 'Left Message', 'Scheduled Callback'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setOutcome(opt)}
                  className={cn(
                    'text-xs py-2 px-3 rounded-lg border transition-all',
                    outcome === opt
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'bg-secondary border-border text-foreground hover:border-accent/50'
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Notes (optional)</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any relevant notes about the interaction..."
              className="text-sm min-h-[80px] bg-card border-border resize-none"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!outcome || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                Submit Action
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      )}

      {/* Choose Different */}
      {!selectedAction && (
        <p className="text-xs text-center text-muted-foreground">
          Select an action above, or choose a different approach based on your judgment.
        </p>
      )}
    </div>
  );
}
