"use client";
import { useRouter } from "next/navigation";

// ข้อมูลจำลองสำหรับ Bento Grid (ดึงมาจากลายมือในรูปของคุณ)
const features = [
  {
    icon: "🧠",
    title: "Intelligence",
    description: "LLM powered by Ollama and optimized with Llama model.",
    size: "col-span-2",
  },
  {
    icon: "🔐",
    title: "Auth & Tokens",
    description: "Secure user sessions via Token and User ID (Gmail).",
    size: "col-span-1",
  },
  {
    icon: "🗄️",
    title: "Core Database",
    description: "Message and user data stored in MySQL.",
    size: "col-span-1",
  },
  {
    icon: "⚡",
    title: "Quick Cache",
    description: "High-performance caching with Redis.",
    size: "col-span-1",
  },
  {
    icon: "🔍",
    title: "Semantic Search",
    description: "Advanced context search via ChromaDB and VectorDB.",
    size: "col-span-2",
  },
];

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-[#09090b]">
      <main className="flex flex-col flex-1 w-full max-w-6xl mx-auto py-12 px-6 sm:px-10">
        {/* Modern Header Section */}
        <header className="flex flex-col items-center justify-between mb-16 sm:flex-row sm:items-start gap-8">
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-2">
              Our Chatbot Project
            </h2>
            <h1 className="text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 max-w-lg leading-[1.1]">
              Smart Architecture Overview.
            </h1>
            <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
              ยินดีต้อนรับสู่หน้ารายละเอียดระบบ แชทบอทของเราทำงานร่วมกับ AI
              ที่ล้ำสมัย และโครงสร้างพื้นฐานที่มั่นคง
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 rounded-full bg-zinc-900 text-white font-medium text-sm transition-all hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 active:scale-95">
              System Docs
            </button>
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-medium text-sm transition-all hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-200/50 dark:shadow-none"
            >
              Try Chatbot
            </button>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-zinc-900/60 p-7 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-[0_4px_12px_rgba(0,0,0,0.02)] ${feature.size}`}
            >
              <div className="text-4xl mb-5">{feature.icon}</div>
              <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}

          {/* ส่วน Tech Stack - ทำเป็น Card ใหญ่พิเศษ */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 sm:col-span-2 md:col-span-3 lg:col-span-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
            <h3 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mb-7">
              Full Technology Stack
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { title: "Frontend", techs: ["NextJS", "Ollama"] },
                { title: "Tools", techs: ["Postman", "Swagger"] },
                {
                  title: "Backend",
                  techs: [
                    "NodeJS",
                    "Typescript",
                    "ExpressJS",
                    "CORS",
                    "NGINX",
                    "Resful API",
                  ],
                },
                { title: "Database", techs: ["MySQL", "Redis", "Chroma DB"] },
                {
                  title: "Deployment",
                  techs: ["Docker", "SSH", "Github Action"],
                },
              ].map((stack, index) => (
                <div key={index}>
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                    {stack.title}
                  </h4>
                  <ul className="space-y-1.5">
                    {stack.techs.map((tech) => (
                      <li
                        key={tech}
                        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-8 text-center border-t border-zinc-100 dark:border-zinc-800">
        <p className="text-sm text-zinc-400">
          Final Project - Smart Chatbot Infrastructure
        </p>
      </footer>
    </div>
  );
}
