import { Button } from "@/components/ui/button";
import { PenTool, Smartphone, BarChart, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Home() {

  const features = [
    {
      icon: <PenTool className="w-6 h-6 text-indigo-600" />,
      title: "Intuitive Writing",
      description: "Focus on your words with our clean, distraction-free writing environment."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-indigo-600" />,
      title: "Mobile First",
      description: "Write and edit on the go with our beautifully designed mobile experience."
    },
    {
      icon: <BarChart className="w-6 h-6 text-indigo-600" />,
      title: "Powerful Analytics",
      description: "Gain insights into your writing habits and reader engagement."
    },
    {
      icon: <Zap className="w-6 h-6 text-indigo-600" />,
      title: "AI Enhancements",
      description: "Get smart suggestions to improve your writing in real-time."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="Logo" width={20} />
            <span className="text-2xl font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              WordScribe
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition-colors">How It Works</a>
            <Button variant="outline" className="ml-4">Sign In</Button>
          </div>
          <Button className="md:hidden" size="sm">Menu</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Write Better, <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Write Smarter</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            WordScribe is the ultimate writing companion that helps you create, edit, and publish your best work—anytime, anywhere.
          </p>
          
          <div className="max-w-md mx-auto">
            <a 
              href="/signup" 
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
            <p className="mt-3 text-sm text-gray-500">
              Start your writing journey with WordScribe today.
            </p>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to take your writing to the next level.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to transform your writing?</h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of writers who have already elevated their craft with WordScribe.
          </p>
            <a 
              href="/download" 
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-indigo-600 bg-white border border-transparent rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Download Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <PenTool className="h-6 w-6 text-indigo-400" />
                <span className="text-xl font-bold">WordScribe</span>
              </div>
              <p className="text-gray-400">The ultimate writing companion for modern creators.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Templates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} WordScribe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
