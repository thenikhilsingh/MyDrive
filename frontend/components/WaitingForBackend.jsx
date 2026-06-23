import { Loader2 } from "lucide-react";

export default function WaitingForBackend() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <Loader2 className="w-12 h-12 mx-auto animate-spin mb-6" />

        <h1 className="text-3xl font-bold mb-3">Starting Server...</h1>

        <p className="text-slate-400">
          Our backend is waking up and getting ready.
        </p>

        <p className="text-slate-500 text-sm mt-2">
          This may take 30–60 seconds on the free Render plan.
        </p>

        <div className="mt-6">
          <p className="text-sm text-slate-400 animate-pulse">
            Retrying connection...
          </p>
        </div>
      </div>
    </div>
  );
}
