export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 shadow-sm">
        <div className="text-2xl font-bold tracking-tight">
          Trippligo
        </div>
        <nav className="hidden md:flex gap-8 text-lg">
          <a href="#features" className="hover:text-blue-600">Features</a>
          <a href="#vision" className="hover:text-blue-600">Vision</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="px-8 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Smarter Travel Decisions,<br />
            <span className="text-blue-600">Powered by Insight</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-xl">
            Trippligo helps travelers choose better routes, timings, and journeys
            using real-world data and intelligent analysis.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 rounded-xl bg-blue-600 text-white text-lg font-medium hover:bg-blue-700">
              Get Started
            </button>
            <button className="px-8 py-3 rounded-xl border border-gray-300 text-lg hover:border-gray-400">
              Learn More
            </button>
          </div>
        </div>

        {/* Visual placeholder */}
        <div className="flex justify-center">
          <div className="w-96 h-96 rounded-3xl bg-gradient-to-br from-blue-100 to-blue-300 shadow-xl" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 px-8 py-24">
        <h2 className="text-4xl font-bold text-center mb-16">
          Why Trippligo?
        </h2>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-4">Data-Driven</h3>
            <p className="text-gray-600">
              Decisions powered by real travel patterns, delays, and trends —
              not assumptions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-4">Simple Experience</h3>
            <p className="text-gray-600">
              Designed for clarity and speed. No clutter, no confusion.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-4">Built to Scale</h3>
            <p className="text-gray-600">
              A platform architecture that can grow from a landing page
              into a full travel intelligence system.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="px-8 py-24 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          Trippligo aims to become the intelligence layer for travel —
          helping individuals and businesses make confident decisions
          before they begin their journey.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t px-8 py-10 text-center text-gray-500">
        © {new Date().getFullYear()} Trippligo. All rights reserved.
      </footer>

    </div>
  )
}
