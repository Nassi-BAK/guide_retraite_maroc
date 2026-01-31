import { ReactNode, forwardRef } from 'react';

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  variant?: 'default' | 'highlight';
}

const InfoCard = forwardRef<HTMLDivElement, InfoCardProps>(({ icon, title, children, variant = 'default' }, ref) => {
  const baseClasses = "rounded-xl p-6 card-shadow transition-smooth";
  const variantClasses = variant === 'highlight' 
    ? "bg-primary/5 border-2 border-primary/20" 
    : "bg-card";

  return (
    <div ref={ref} className={`${baseClasses} ${variantClasses}`}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
          <div className="text-muted-foreground space-y-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});

InfoCard.displayName = 'InfoCard';

export default InfoCard;
