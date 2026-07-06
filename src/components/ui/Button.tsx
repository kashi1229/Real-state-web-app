import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

const variants = {
  primary: 'bg-forest-800 text-cream hover:bg-forest-700 active:bg-forest-900 shadow-sm',
  secondary: 'bg-sand text-charcoal hover:bg-sand-dark active:bg-sand-dark',
  outline: 'border-2 border-forest-800 text-forest-800 hover:bg-forest-50 active:bg-forest-100',
  ghost: 'text-forest-800 hover:bg-forest-50 active:bg-forest-100',
} as const;

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-800 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:pointer-events-none',
      variants[variant],
      sizes[size],
      className,
    );

    if (href) {
      return (
        <Link to={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
