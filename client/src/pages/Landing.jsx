
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Menu, X, ChevronRight, CheckCircle, Shield, Zap } from "lucide-react";
import AnimatedText from "../components/animated-text";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [count, setCount] = useState(0);

  const scrollToFeatures = () => {
    document.getElementById("features").scrollIntoView({ behavior: "smooth" });
  };

  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => (prevCount < 1000 ? prevCount + 1 : prevCount));
    }, 1);
    return () => clearInterval(timer);
  }, []);

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black overflow-hidden">
      <div className=" inset-0 z-0">
        <div className=" inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>
      <header className="px-4 lg:px-6 h-16 flex items-center fixed w-full bg-white z-50 border-b border-gray-200">
        <div
          onClick={handleHomeClick}
          className="flex items-center justify-center"
        >
          <span className="sr-only">Industry Certification Portal</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-2 text-xl font-bold">CertifyIndustry</span>
        </div>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <Button asChild variant="outline">
            <div href="/login">Log In</div>
          </Button>
        </nav>
        <Button
          variant="ghost"
          className="ml-auto md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </header>
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16">
          <nav className="flex flex-col items-center gap-4 p-4">
            <Button
              asChild
              variant="outline"
              className="w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <div href="/login">Log In</div>
            </Button>
          </nav>
        </div>
      )}
      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Streamline Your{" "}
                  <AnimatedText
                    words={["Certification", "Compliance", "Approval"]}
                  />
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Simplify the process of obtaining government certification for
                  your manufacturing processes.
                </p>
              </div>
              <div className="space-x-4">
                <Button
                  onClick={() => navigate("/certificatelinks")}
                  asChild
                  size="lg"
                  className="group z-20"
                >
                  <div>
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Button>
                <Button
                  className="z-20"
                  onClick={scrollToFeatures}
                  variant="outline"
                  size="lg"
                  asChild
                >
                  <div href="#features">Learn More</div>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              {[
                {
                  icon: CheckCircle,
                  title: "Easy Submission",
                  description:
                    "Submit your manufacturing process details with our user-friendly interface.",
                },
                {
                  icon: Shield,
                  title: "Secure Data",
                  description:
                    "Your information is protected with state-of-the-art security measures.",
                },
                {
                  icon: Zap,
                  title: "Fast Processing",
                  description:
                    "Get your certification quickly with our streamlined government approval process.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 p-4 rounded-lg transition-all hover:bg-white hover:shadow-lg group"
                >
                  <div className="p-3 rounded-full bg-black text-white transition-transform group-hover:scale-110">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-sm text-gray-500 text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="onboarding" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Start Your Certification Journey
                </h2>
                <p className="text-gray-500 md:text-xl">
                  Begin the process of certifying your manufacturing processes
                  in just a few simple steps.
                </p>
                <div className="text-4xl font-bold mb-4">
                  <span className="text-black">{count.toLocaleString()}+</span>
                  <span className="text-gray-500 ml-2">
                    Certifications Issued
                  </span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    <span>Create your account</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    <span>Input your manufacturing details</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    <span>Submit for review</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    <span>Receive your certification</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4 bg-gray-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold">Get Started Now</h3>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Enter your company name" />
                  </div>
                  <Button
                    onClick={() => navigate("/certificatelinks")}
                    className="w-full"
                  >
                    Start Certification Process
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold text-gray-900">
              CertifyIndustry
            </div>
            <div className="text-sm text-gray-500">© 2024 CertifyIndustry</div>
          </div>
        </div>
      </footer>
    </div>
  );
}