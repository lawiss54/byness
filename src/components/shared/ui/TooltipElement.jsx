import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Info, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export const TooltipElement = ({ children, tooltip, icon: Icon = Info, color = 'info' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [position, setPosition] = useState('top');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const timeoutRef = useRef(null);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  const colorClasses = {
    warning: 'bg-yellow-500 border-yellow-400',
    info: 'bg-blue-500 border-blue-400',
    processing: 'bg-blue-400 border-blue-300',
    delivery: 'bg-purple-500 border-purple-400',
    blocked: 'bg-red-600 border-red-500',
    transit: 'bg-orange-500 border-orange-400',
    attention: 'bg-pink-500 border-pink-400',
    success: 'bg-green-500 border-green-400',
    error: 'bg-red-500 border-red-400',
    returned: 'bg-gray-500 border-gray-400',
    default: 'bg-gray-400 border-gray-300'
  };

  const calculateOptimalPosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return 'top';

    const trigger = triggerRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // حساب المساحة المتاحة في كل اتجاه
    const spaceAbove = trigger.top;
    const spaceBelow = viewport.height - trigger.bottom;
    const spaceLeft = trigger.left;
    const spaceRight = viewport.width - trigger.right;

    // حجم tooltip تقريبي
    const tooltipWidth = Math.min(320, viewport.width * 0.9);
    const tooltipHeight = 80; // تقدير تقريبي

    // تحديد الموضع الأمثل بناءً على المساحة المتاحة
    if (spaceAbove >= tooltipHeight && spaceAbove >= Math.max(spaceBelow, spaceLeft, spaceRight)) {
      return 'top';
    } else if (spaceBelow >= tooltipHeight && spaceBelow >= Math.max(spaceAbove, spaceLeft, spaceRight)) {
      return 'bottom';
    } else if (spaceRight >= tooltipWidth && spaceRight >= Math.max(spaceAbove, spaceBelow, spaceLeft)) {
      return 'right';
    } else if (spaceLeft >= tooltipWidth && spaceLeft >= Math.max(spaceAbove, spaceBelow, spaceRight)) {
      return 'left';
    } else {
      // إذا لم تكن هناك مساحة كافية في أي مكان، اختر الأفضل
      if (spaceBelow > spaceAbove) {
        return 'bottom';
      } else {
        return 'top';
      }
    }
  }, []);

  const getPositionClasses = (pos) => {
    const baseClasses = {
      top: 'bottom-full mb-2',
      bottom: 'top-full mt-2',
      left: 'right-full mr-2 top-1/2 transform -translate-y-1/2',
      right: 'left-full ml-2 top-1/2 transform -translate-y-1/2'
    };

    // تحديد محاذاة أفقية للمواضع العلوية والسفلية
    if (pos === 'top' || pos === 'bottom') {
      const trigger = triggerRef.current?.getBoundingClientRect();
      if (trigger) {
        const viewportWidth = window.innerWidth;
        const triggerCenter = trigger.left + trigger.width / 2;
        
        if (triggerCenter < viewportWidth * 0.25) {
          return `${baseClasses[pos]} left-0`;
        } else if (triggerCenter > viewportWidth * 0.75) {
          return `${baseClasses[pos]} right-0`;
        } else {
          return `${baseClasses[pos]} left-1/2 transform -translate-x-1/2`;
        }
      }
    }

    return baseClasses[pos];
  };

  const getArrowClasses = (pos) => {
    const trigger = triggerRef.current?.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    
    const baseArrowClasses = {
      top: 'top-full border-l-transparent border-r-transparent border-b-transparent',
      bottom: 'bottom-full border-l-transparent border-r-transparent border-t-transparent',
      left: 'left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
      right: 'right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent'
    };

    // تحديد موضع السهم للمواضع العلوية والسفلية
    if ((pos === 'top' || pos === 'bottom') && trigger) {
      const triggerCenter = trigger.left + trigger.width / 2;
      
      if (triggerCenter < viewportWidth * 0.25) {
        return `${baseArrowClasses[pos]} left-4`;
      } else if (triggerCenter > viewportWidth * 0.75) {
        return `${baseArrowClasses[pos]} right-4`;
      } else {
        return `${baseArrowClasses[pos]} left-1/2 transform -translate-x-1/2`;
      }
    }

    return baseArrowClasses[pos];
  };

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const optimalPosition = calculateOptimalPosition();
      setPosition(optimalPosition);
    }
  }, [isVisible, calculateOptimalPosition, dimensions]);

  const handleMouseEnter = () => {
    if (!isTouch) {
      clearTimeout(timeoutRef.current);
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouch) {
      timeoutRef.current = setTimeout(() => setIsVisible(false), 150);
    }
  };

  const handleClick = () => {
    setIsTouch(true);
    setIsVisible(!isVisible);
  };

  const handleTouchStart = () => {
    setIsTouch(true);
  };

  // حساب عرض tooltip المناسب للشاشة
  const getTooltipWidth = () => {
    if (dimensions.width < 640) return 'w-80 max-w-[90vw]'; // موبايل
    if (dimensions.width < 1024) return 'w-96 max-w-sm'; // تابلت
    return 'w-96 max-w-sm'; // سطح المكتب
  };

  const getTooltipText = () => {
    if (dimensions.width < 640) return 'text-xs'; // موبايل
    if (dimensions.width < 1024) return 'text-sm'; // تابلت
    return 'text-sm'; // سطح المكتب
  };

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        className="cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
      >
        {children}
      </div>

      {isVisible && (
        <div
          className={`absolute z-50 ${getPositionClasses(position)} animate-in fade-in zoom-in duration-200`}
        >
          <div
            ref={tooltipRef}
            className={`
              ${colorClasses[color] || colorClasses['default']} 
              text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl 
              shadow-lg sm:shadow-2xl border border-opacity-50 backdrop-blur-sm
              ${getTooltipWidth()} ${getTooltipText()} font-medium
              transform transition-all duration-200 ease-out
            `}
            style={{
              boxShadow: dimensions.width >= 640 
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <Icon className={`${dimensions.width < 640 ? 'w-4 h-4' : 'w-5 h-5'} mt-0.5 flex-shrink-0`} />
              <div className="leading-relaxed break-words">{tooltip}</div>
            </div>
          </div>

          {/* السهم */}
          <div 
            className={`absolute w-0 h-0 border-4 sm:border-8 ${getArrowClasses(position)}`} 
            style={{
              borderTopColor: position === 'bottom' ? (colorClasses[color]?.includes('bg-') ? 
                colorClasses[color].replace('bg-', '').split(' ')[0] : '#6b7280') : 'transparent',
              borderBottomColor: position === 'top' ? (colorClasses[color]?.includes('bg-') ? 
                colorClasses[color].replace('bg-', '').split(' ')[0] : '#6b7280') : 'transparent',
              borderLeftColor: position === 'right' ? (colorClasses[color]?.includes('bg-') ? 
                colorClasses[color].replace('bg-', '').split(' ')[0] : '#6b7280') : 'transparent',
              borderRightColor: position === 'left' ? (colorClasses[color]?.includes('bg-') ? 
                colorClasses[color].replace('bg-', '').split(' ')[0] : '#6b7280') : 'transparent'
            }} 
          />
        </div>
      )}

      {isVisible && isTouch && (
        <div className="fixed inset-0 z-40" onClick={() => setIsVisible(false)} />
      )}
    </div>
  );
};
