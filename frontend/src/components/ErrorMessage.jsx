import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center shadow-lg">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-xl font-bold text-red-800 mb-3">Oops! Something went wrong</h3>
      <p className="text-red-600 mb-6 text-lg">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-all duration-200 flex items-center mx-auto font-semibold shadow-lg hover:shadow-xl"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;