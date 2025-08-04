import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center py-16">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse"></div>
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin absolute top-0 left-0" />
      </div>
      <p className="text-gray-600 mt-4 font-medium">Loading students...</p>
    </div>
  );
};

export default LoadingSpinner;