import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, UserButton, SignedIn, SignUpButton } from "@clerk/nextjs";
import { PenTool, Smartphone, BarChart, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const features = [
    {
      icon: <PenTool className="w-6 h-6 text-indigo-600" />,
      title: "RSS Reader",
      description: "Stay updated with your favorite websites and blogs through our powerful RSS reader."
    },
    {
      icon: <Smartphone className="w-6 h-6 text-indigo-600" />,
      title: "Save for Later",
      description: "Bookmark articles, posts, and content to read at your convenience."
    },
    {
      icon: <BarChart className="w-6 h-6 text-indigo-600" />,
      title: "Start Your Blog",
      description: "Create and publish your own blog with our intuitive writing and publishing tools."
    },
    {
      icon: <Zap className="w-6 h-6 text-indigo-600" />,
      title: "All-in-One Platform",
      description: "Read, save, and create content—all in one seamless experience."
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
          <div className="flex items-center space-x-2">
            {/* <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition-colors">How It Works</a> */}
            <SignedOut>
              <SignInButton>
                <Button variant="outline" className="ml-4">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button className="ml-4">Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard"><Button className="hidden md:block">Dashboard</Button></Link>
              {/* <Button className="block md:hidden">Download</Button> */}
              <div style={{ width: "10px" }}/>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Read, Save, <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">and Create</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            WordScribe is your all-in-one platform for reading RSS feeds, saving content for later, and starting your own blog—all in one place.
          </p>
          
          <div className="max-w-md mx-auto">
            <Link
              href="/dashboard" 
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              Start curating and creating content with WordScribe today.
            </p>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Content Hub</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A unified platform for all your content consumption and creation needs.
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
            Start curating and creating content with WordScribe today.
          </p>
            <Link
              href="/dashboard" 
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-indigo-600 bg-white border border-transparent rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col align-center justify-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/logo.png" alt="Logo" width={15} />
                <span className="text-xl font-bold">WordScribe</span>
              </div>
              <p className="text-gray-400">The ultimate writing companion for modern creators.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
