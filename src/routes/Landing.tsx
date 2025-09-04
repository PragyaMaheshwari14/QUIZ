import { Brain, Trophy, Lightbulb, Zap } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white px-6 sm:px-12 lg:px-20 py-20 text-gray-900">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-fade-in">
          Quiz Master
        </h1>
        <p className="text-gray-600 text-lg sm:text-xl animate-fade-in [animation-delay:200ms]">
          Challenge yourself with engaging quizzes. Test your knowledge, track your progress, and compete against time — all in one beautifully designed platform.
        </p>
      </div>

      {/* Features */}
      <section className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: <Brain className="h-12 w-12 text-indigo-500" />,
            title: "Instant Quizzes, Anytime",
            desc: "Play offline with zero load time – questions are ready instantly.",
          },
          {
            icon: <Trophy className="h-12 w-12 text-yellow-500" />,
            title: "Challenge Your Friends",
            desc: "Compete, track your best scores, and stay on top of the leaderboard.",
          },
          {
            icon: <Lightbulb className="h-12 w-12 text-green-500" />,
            title: "Smart & Accessible",
            desc: "Bright ideas with intuitive design, keyboard shortcuts, and smooth navigation.",
          },
          {
            icon: <Zap className="h-12 w-12 text-pink-500" />,
            title: "Lightning-Fast",
            desc: "Mobile-first design, smooth animations, and clutter-free UI.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 animate-fade-in"
            style={{ animationDelay: `${600 + i * 200}ms` }}
          >
            <div className="mb-4">{f.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Stats */}
      <section className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center animate-fade-in [animation-delay:1400ms]">
        <div className="space-y-2">
          <p className="text-4xl font-extrabold text-indigo-600">100+</p>
          <p className="text-gray-600 text-sm">Questions Available</p>
        </div>
        <div className="space-y-2">
          <p className="text-4xl font-extrabold text-purple-600">3</p>
          <p className="text-gray-600 text-sm">Difficulty Levels</p>
        </div>
        <div className="space-y-2">
          <p className="text-4xl font-extrabold text-pink-600">5 min</p>
          <p className="text-gray-600 text-sm">Average Time</p>
        </div>
      </section>
    </div>
  );
}
