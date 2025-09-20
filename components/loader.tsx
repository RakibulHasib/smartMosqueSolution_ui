type LoaderProps = {
  message?: string;
};

export default function Loader({ message = "Loading..." }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      {/* Animated Gradient Message */}
      <p className="mt-3 text-xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
        {message}
      </p>
    </div>
  );
}
