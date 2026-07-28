import { useState } from 'react';

// Status badges: mint acts, ice informs, functional colors for warning/error.
// On light surfaces badges keep ink text over tinted fills (bright-fill rule);
// on dark surfaces the ramp colors carry the text.
export function Badge({ status, text, hoverText }) {
    const [isHovered, setIsHovered] = useState(false);

    const getStatusStyles = (status) => {
        switch (status) {
            case 'info':
                return 'text-ice-800 dark:text-ice-500';
            case 'warning':
                return 'text-zinc-900 dark:text-warning';
            case 'error':
                return 'text-zinc-900 dark:text-danger';
            case 'cloud-only':
                return 'text-primary-800 dark:text-primary-500';
            case 'experimental':
                return 'text-ice-900 dark:text-ice-400';
            default:
                return 'text-zinc-600 dark:text-zinc-400';
        }
    };

    const getStatusBorder = (status) => {
        switch (status) {
            case 'info':
                return 'border-ice-800 dark:border-ice-500';
            case 'warning':
                return 'border-warning';
            case 'error':
                return 'border-danger';
            case 'cloud-only':
                return 'border-primary-800 dark:border-primary-500';
            case 'experimental':
                return 'border-ice-900 dark:border-ice-400';
            default:
                return 'border-zinc-400';
        }
    };

    const getBadgeBg = (status) => {
        switch (status) {
            case 'info':
                return 'bg-ice-200/50 dark:bg-ice-500/10';
            case 'warning':
                return 'bg-warning/25 dark:bg-warning/10';
            case 'error':
                return 'bg-danger/20 dark:bg-danger/10';
            case 'cloud-only':
                return 'bg-primary-200/50 dark:bg-primary-500/10';
            case 'experimental':
                return 'bg-ice-200/50 dark:bg-ice-400/10';
            default:
                return 'bg-zinc-200/50 dark:bg-zinc-400/10';
        }
    };

    const baseStyle = 'relative inline-block rounded-sm py-0.5 px-2 text-sm font-mono';
    const textColor = getStatusStyles(status);
    const bgColor = getBadgeBg(status);
    const borderStyle = getStatusBorder(status);

    return (
        <span
            className={`${baseStyle} ${bgColor} ${textColor}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {text}
            {hoverText && isHovered && (
                <div className={`
                    absolute z-10 left-1/2 -translate-x-1/2 mt-2 w-max max-w-xs p-3
                    rounded-sm whitespace-pre-line
                    bg-zinc-50/90 dark:bg-dark-lighter/90 backdrop-blur-md border ${borderStyle}
                    ${textColor} shadow-lg
                `}>
                    {hoverText}
                </div>
            )}
        </span>
    );
}
