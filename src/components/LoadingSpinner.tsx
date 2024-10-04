import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      <span className="ml-2 text-gray-500">Analyzing video...</span>
    </div>
  );
}