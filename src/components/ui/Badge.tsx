import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

type BadgeVariant = 'new' | 'open-house' | 'sold' | 'pending' | 'for-sale' | 'for-rent' | 'default';

const variantStyles: Record<BadgeVariant, string> = {
  'new': 'bg-brass text-white',
  'open-house': 'bg-forest-500 text-white',
  'sold': 'bg-charcoal text-cream',
  'pending': 'bg-sand-dark text-charcoal',
  'for-sale': 'bg-forest-800 text-cream',
  'for-rent': 'bg-forest-400 text-white',
  'default': 'bg-gray-200 text-gray-700',
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: string;
  className?: string;
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </motion.span>
  );
}

export function getBadgeVariant(status: string): BadgeVariant {
  switch (status) {
    case 'for-sale':
      return 'for-sale';
    case 'pending':
      return 'pending';
    case 'sold':
      return 'sold';
    case 'for-rent':
      return 'for-rent';
    default:
      return 'default';
  }
}

export function getTagVariant(tag: string): BadgeVariant {
  switch (tag) {
    case 'new':
      return 'new';
    case 'open-house':
      return 'open-house';
    default:
      return 'default';
  }
}
