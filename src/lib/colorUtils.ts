// Helper function to get background color from text color
export const getBackgroundColorFromTextColor = (color: string): string => {
  if (!color.includes('text-')) return 'bg-gray-100';
  
  // Map text colors to background colors with opacity
  const colorMap: Record<string, string> = {
    'text-blue-600': 'bg-blue-100/80',
    'text-blue-500': 'bg-blue-100/70',
    'text-blue-400': 'bg-blue-50/80',
    'text-purple-600': 'bg-purple-100/80',
    'text-purple-500': 'bg-purple-100/70',
    'text-green-600': 'bg-green-100/80',
    'text-green-500': 'bg-green-100/70',
    'text-red-600': 'bg-red-100/80',
    'text-red-500': 'bg-red-100/70',
    'text-yellow-600': 'bg-yellow-100/80',
    'text-yellow-500': 'bg-yellow-100/70',
    'text-orange-500': 'bg-orange-100/70',
    'text-pink-500': 'bg-pink-100/70',
    'text-gray-800': 'bg-gray-100/80',
    'text-gray-600': 'bg-gray-100/70',
    'text-amber-600': 'bg-amber-100/80',
    'text-amber-500': 'bg-amber-100/70',
    'text-indigo-600': 'bg-indigo-100/80',
    'text-cyan-600': 'bg-cyan-100/80',
    'text-emerald-600': 'bg-emerald-100/80',
    'text-rose-600': 'bg-rose-100/80',
    'text-sky-600': 'bg-sky-100/80',
    'text-violet-600': 'bg-violet-100/80',
    'text-slate-600': 'bg-slate-100/80',
  };

  return colorMap[color] || 'bg-gray-100';
};
