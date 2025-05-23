
const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-slate-100 bg-opacity-85 flex items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-teal-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingOverlay;
