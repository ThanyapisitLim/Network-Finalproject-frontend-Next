"use client";

const suggestions = [
  {
    icon: "✨",
    title: "Explain a concept",
    prompt: "Explain how neural networks work in simple terms",
  },
  {
    icon: "💻",
    title: "Write some code",
    prompt: "Write a Python function to sort a list using merge sort",
  },
  {
    icon: "📝",
    title: "Help me write",
    prompt: "Help me draft a professional email to my professor",
  },
  {
    icon: "🔍",
    title: "Analyze data",
    prompt: "What are the key factors to consider when analyzing data?",
  },
];

interface WelcomeScreenProps {
  onSelect: (prompt: string) => void;
}

export default function WelcomeScreen({ onSelect }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      {/* Logo / Title */}
      <div className="relative mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
            />
          </svg>
        </div>
        <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/10 to-violet-600/10 rounded-3xl blur-2xl -z-10" />
      </div>

      <h1 className="text-3xl font-bold text-zinc-100 tracking-tight mb-2">
        Smart Chatbot
      </h1>
      <p className="text-zinc-500 text-center max-w-md mb-12 leading-relaxed">
        Powered by AI — ask me anything about coding, writing, analysis, or
        creative projects.
      </p>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
        {suggestions.map((s) => (
          <button
            key={s.title}
            onClick={() => onSelect(s.prompt)}
            className="
              text-left p-4 rounded-xl border border-zinc-800 bg-zinc-900/50
              hover:bg-zinc-800/80 hover:border-zinc-700 transition-all group
              active:scale-[0.98]
            "
          >
            <span className="text-lg mb-1 block">{s.icon}</span>
            <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
              {s.title}
            </span>
            <span className="text-xs text-zinc-600 block mt-1 line-clamp-1">
              {s.prompt}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
