"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  FileText,
  Users,
  Plane,
  Globe,
  Briefcase,
  Heart,
  DollarSign,
  Star,
  ExternalLink,
  Award,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useBlogService } from "@/lib/blogService";
import { useInView } from "@/hooks/use-in-view";
import BlogSection from "./ui/blog-card-view";

interface Blog {
  blogId: string;
  title: string;
  content: string;
  type: string;
  createdAt: string;
}

export function VisaMigrationSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { getBlogByService } = useBlogService();

  const steps = [
    {
      step: 1,
      title: "Initial Consultation",
      description:
        "Free assessment of your eligibility and discussion of your migration goals to Australia.",
      icon: (
        <Users className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
      ),
    },
    {
      step: 2,
      title: "Documentation",
      description:
        "Comprehensive assistance with gathering and preparing all required documents for Australian immigration.",
      icon: (
        <FileText className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
      ),
    },
    {
      step: 3,
      title: "Application Processing",
      description:
        "Expert handling of your Australian visa application with regular updates on progress.",
      icon: (
        <CheckCircle className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
      ),
    },
    {
      step: 4,
      title: "Approval & Travel",
      description:
        "Final approval assistance and pre-departure support for your journey to Australia.",
      icon: (
        <Plane className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
      ),
    },
  ];

  const visaTypes = [
    {
      title: "Student Visa",
      description:
        "For international students pursuing education in Australia and abroad",
      countries: ["Australia", "USA", "Canada", "UK"],
      processingTime: "4-8 weeks",
      icon: <Globe className="h-6 w-6 text-primary" />,
    },
    {
      title: "Work Visa",
      description:
        "For professionals seeking employment opportunities in Australia and globally",
      countries: ["Australia", "Germany", "Netherlands"],
      processingTime: "6-12 weeks",
      icon: <Briefcase className="h-6 w-6 text-primary" />,
    },
    {
      title: "Family Visa",
      description: "For family reunification and dependent visas in Australia",
      countries: ["Australia"],
      processingTime: "8-16 weeks",
      icon: <Heart className="h-6 w-6 text-primary" />,
    },
    {
      title: "Investment Visa",
      description:
        "For investors and entrepreneurs looking to migrate to Australia",
      countries: ["Australia"],
      processingTime: "12-24 weeks",
      icon: <DollarSign className="h-6 w-6 text-primary" />,
    },
  ];

  const skilledVisaTypes = [
    {
      subclass: "189",
      title: "Skilled Independent Visa",
      description:
        "A points-based permanent residency visa for skilled workers who are not sponsored by an employer, state, or family member.",
      features: [
        "No employer sponsorship required",
        "Permanent residency from day one",
        "Work and live anywhere in Australia",
        "Include family members in your application",
        "Pathway to Australian citizenship",
      ],
      icon: <Award className="h-6 w-6" />,
    },
    {
      subclass: "190",
      title: "Skilled Nominated Visa",
      description:
        "A points-based permanent residency visa for skilled workers nominated by an Australian state or territory government.",
      features: [
        "Additional 5 points for state nomination",
        "Permanent residency pathway",
        "Access to Medicare and social services",
        "Pathway to Australian citizenship",
        "Must live in nominating state for 2 years",
      ],
      icon: <Globe className="h-6 w-6" />,
    },
    {
      subclass: "489",
      title: "Skilled Regional (Provisional) Visa",
      description:
        "A provisional visa for skilled workers willing to live and work in regional Australia (Note: Now replaced by subclass 491, but existing holders can apply for 887).",
      features: [
        "4-year provisional visa",
        "Sponsored by state/territory or family",
        "Live and work in regional Australia",
        "Pathway to permanent residency (subclass 887)",
        "Include family members",
      ],
      icon: <Star className="h-6 w-6" />,
    },
    {
      subclass: "491",
      title: "Skilled Work Regional (Provisional) Visa",
      description:
        "A 5-year provisional visa for skilled workers willing to live and work in regional Australia, nominated by a state/territory or sponsored by an eligible family member.",
      features: [
        "5-year provisional visa",
        "15 points for regional nomination",
        "Live, work and study in regional Australia",
        "Pathway to permanent residency (subclass 191)",
        "Access to Medicare",
        "Include family members",
      ],
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      subclass: "191",
      title: "Permanent Residence (Skilled Regional) Visa",
      description:
        "A permanent residency visa for holders of subclass 491 or 494 visas who have lived and worked in regional Australia for at least 3 years.",
      features: [
        "Permanent residency status",
        "For subclass 491/494 visa holders",
        "Must have lived in regional Australia for 3 years",
        "Meet minimum income requirement",
        "Live anywhere in Australia after grant",
        "Pathway to Australian citizenship",
      ],
      icon: <CheckCircle className="h-6 w-6" />,
    },
  ];

  const fetchBlogs = async () => {
    try {
      const response = await getBlogByService("Migration_and_Visa");

      if (response.success && response.data) {
        setBlogs(response.data);
      } else {
        console.error("Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % skilledVisaTypes.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + skilledVisaTypes.length) % skilledVisaTypes.length,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-20 flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 animate-scale-in">
          <img
            src="/australia.jpg"
            alt="Australia Migration"
            className="w-full h-full object-cover animate-fade-in"
          />
          <div className="absolute inset-0 bg-primary/70 animate-fade-in"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-slide-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance animate-fade-in">
            Your Australian <span className="text-secondary">Dream</span> Starts
            Here
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto text-pretty animate-fade-in delay-100">
            Navigate your path to Australia with our expert visa and migration
            services designed to make your dreams a reality.
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up delay-150">
            <Link href="/book-consultation">
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-3 animate-pulse-slow"
              >
                Free Assessment
                <Globe className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#skilled-migration">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 hover:text-white hover:border-white/50"
              >
                Skilled Migration
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex items-center space-x-3 justify-center animate-fade-in-up delay-200">
            <span className="text-sm text-white/80">
              <span className="font-medium text-white">2000+</span> successful
              visa applications to Australia
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="visa-migration" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4 tracking-tight flex items-center justify-center">
              <Globe className="h-8 w-8 mr-2 text-accent" />
              Australian Visa & Migration Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Embark on your journey to Australia with our expert visa and
              migration services, tailored to make your dreams a reality with
              DreamSailor.
            </p>
          </div>

          {/* Our Process Section - Timeline Style */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12 text-primary flex items-center justify-center">
              <CheckCircle className="h-6 w-6 mr-2 text-accent" />
              Our Seamless Process
            </h3>
            {(() => {
              const { ref, isVisible } = useInView<HTMLDivElement>();
              return (
                <div
                  ref={ref}
                  className={`relative ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                >
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {steps.map((step, index) => (
                      <div
                        key={step.step}
                        className={`group relative flex items-center ${
                          index % 2 === 0
                            ? "md:justify-end"
                            : "md:justify-start"
                        } mb-8 md:mb-12`}
                      >
                        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
                        <Card
                          className={`w-full md:w-5/12 bg-white border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 ${
                            isVisible ? "animate-slide-up" : "opacity-0"
                          }`}
                          style={{ animationDelay: `${index * 150}ms` }}
                        >
                          <CardContent className="p-6 flex items-center gap-4">
                            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                              {step.icon}
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-primary mb-2">
                                {step.title}
                              </h4>
                              <p className="text-sm text-muted-foreground text-pretty">
                                {step.description}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Visa Types Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12 text-primary flex items-center justify-center">
              <Briefcase className="h-6 w-6 mr-2 text-accent" />
              Visa Types We Handle
            </h3>
            {(() => {
              const { ref, isVisible } = useInView<HTMLDivElement>();
              return (
                <div
                  ref={ref}
                  className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                >
                  {visaTypes.map((visa, index) => (
                    <Card
                      key={index}
                      className={`bg-white border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                        isVisible ? "animate-slide-up" : "opacity-0"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          {visa.icon}
                          <CardTitle className="text-xl text-primary">
                            {visa.title}
                          </CardTitle>
                        </div>
                        <CardDescription className="text-pretty text-muted-foreground">
                          {visa.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-semibold text-sm mb-2 text-foreground">
                              Destinations:
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {visa.countries.map((country) => (
                                <Badge
                                  key={country}
                                  variant="secondary"
                                  className="bg-primary/10 text-primary text-xs"
                                >
                                  {country}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Processing Time:
                            </span>
                            <span className="font-semibold text-primary">
                              {visa.processingTime}
                            </span>
                          </div>
                          <Link href="/book-consultation">
                            <Button className="w-full bg-primary hover:bg-blue-900 text-white transition-all">
                              Get Started
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              );
            })()}
          </div>

          {/* Australian Skilled Migration Section with Slider */}
          <section
            id="skilled-migration"
            className="py-20 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl"
          >
            {(() => {
              const { ref, isVisible } = useInView<HTMLDivElement>();
              return (
                <div
                  ref={ref}
                  className={`container mx-auto px-4 sm:px-6 lg:px-8 ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                >
                  <div className="text-center mb-16">
                    <h2
                      className={`text-3xl sm:text-4xl font-bold text-primary mb-4 flex items-center justify-center ${
                        isVisible ? "animate-slide-up" : "opacity-0"
                      }`}
                    >
                      <Star className="h-8 w-8 mr-2 text-accent" />
                      Australian Skilled Migration Program
                    </h2>
                    <p
                      className={`text-xl text-muted-foreground max-w-3xl mx-auto text-pretty ${
                        isVisible ? "animate-fade-in delay-100" : "opacity-0"
                      }`}
                    >
                      Unlock your pathway to permanent residency in Australia
                      through our expert skilled migration services with
                      DreamSailor.
                    </p>
                  </div>

                  {/* Visa Types Slider */}
                  <div className="relative mb-12">
                    <div className="overflow-hidden">
                      <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                          transform: `translateX(-${currentSlide * 100}%)`,
                        }}
                      >
                        {skilledVisaTypes.map((visa, index) => (
                          <div
                            key={index}
                            className="w-full flex-shrink-0 px-4"
                          >
                            <Card className="border-2 border-primary/20 shadow-xl max-w-4xl mx-auto">
                              <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                  <Badge className="bg-primary text-white text-lg px-4 py-1">
                                    Subclass {visa.subclass}
                                  </Badge>
                                  <div className="text-primary">
                                    {visa.icon}
                                  </div>
                                </div>
                                <CardTitle className="text-2xl text-primary">
                                  {visa.title}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <p className="text-muted-foreground text-lg">
                                  {visa.description}
                                </p>
                                <div className="pt-4">
                                  <h4 className="font-semibold text-lg mb-4 text-primary">
                                    Key Features:
                                  </h4>
                                  <ul className="space-y-3">
                                    {visa.features.map((feature, idx) => (
                                      <li
                                        key={idx}
                                        className="flex items-start"
                                      >
                                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm">
                                          {feature}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="pt-6">
                                  <Link href="/book-consultation">
                                    <div className="flex justify-center">
                                      <Button className="w-64 bg-primary hover:bg-primary/90 text-white">
                                        Get Expert Consultation
                                      </Button>
                                    </div>
                                  </Link>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                      onClick={prevSlide}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-primary hover:text-white transition-all z-10"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:bg-primary hover:text-white transition-all z-10"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                      {skilledVisaTypes.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          className={`h-3 rounded-full transition-all ${
                            currentSlide === index
                              ? "w-8 bg-primary"
                              : "w-3 bg-primary/30 hover:bg-primary/50"
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  <Card className="border-2 border-accent/30 bg-white shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-2xl text-primary flex items-center justify-center">
                        <Star className="h-6 w-6 mr-2" />
                        Points Assessment System
                      </CardTitle>
                      <CardDescription className="text-center text-lg">
                        Calculate your eligibility for Australian skilled
                        migration
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-primary">
                            Key Factors:
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                              <Badge variant="outline" className="mr-2">
                                Age
                              </Badge>
                              <span>25-32 years (maximum points)</span>
                            </li>
                            <li className="flex items-center">
                              <Badge variant="outline" className="mr-2">
                                English
                              </Badge>
                              <span>Superior English (IELTS 8.0+)</span>
                            </li>
                            <li className="flex items-center">
                              <Badge variant="outline" className="mr-2">
                                Experience
                              </Badge>
                              <span>8+ years skilled employment</span>
                            </li>
                            <li className="flex items-center">
                              <Badge variant="outline" className="mr-2">
                                Education
                              </Badge>
                              <span>Australian degree or equivalent</span>
                            </li>
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-primary">
                            Additional Points:
                          </h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                              <Badge variant="outline" className="mr-2">
                                Partner
                              </Badge>
                              <span>Skilled partner (5-10 points)</span>
                            </li>
                            <li className="flex items-center">
                              <Badge variant="outline" className="mr-2">
                                State
                              </Badge>
                              <span>State nomination (5 points)</span>
                            </li>
                            <li className="flex items-center">
                              <Badge variant="outline" className="mr-2">
                                Regional
                              </Badge>
                              <span>Regional study/work (5-15 points)</span>
                            </li>
                            <li className="flex items-center">
                              <Badge variant="outline" className="mr-2">
                                STEM
                              </Badge>
                              <span>STEM qualification (10 points)</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-8 p-6 bg-primary/5 rounded-lg text-center">
                        <p className="text-lg font-semibold text-primary mb-2">
                          Minimum Points Required: 65
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Higher points increase your chances of receiving an
                          invitation
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })()}
          </section>

          {/* Success Record Section */}
          <div className="mt-16 bg-primary text-white rounded-2xl p-8">
            {(() => {
              const { ref, isVisible } = useInView<HTMLDivElement>();
              return (
                <div
                  ref={ref}
                  className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                >
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-2 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 mr-2" />
                      Our Success Record
                    </h3>
                    <p className="text-white/80 text-lg">
                      Trusted by thousands of clients seeking Australian
                      migration
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                      { value: "98%", label: "Approval Rate" },
                      { value: "2,000+", label: "Visas Processed" },
                      { value: "15+", label: "Years Experience" },
                      { value: "500+", label: "Happy Clients" },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className={`${
                          isVisible ? "animate-slide-up" : "opacity-0"
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="text-4xl font-bold mb-2 animate-pulse">
                          {stat.value}
                        </div>
                        <div className="text-sm text-white/80">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
          {/* Consultant Info Section */}
          <section id="consultant-info" className="py-20">
            {(() => {
              const { ref, isVisible } = useInView<HTMLDivElement>();
              return (
                <div
                  ref={ref}
                  className={`container mx-auto px-4 sm:px-6 lg:px-8 ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                >
                  <div className="text-center mb-12">
                    <h2
                      className={`text-3xl sm:text-4xl font-bold text-primary mb-4 flex items-center justify-center ${
                        isVisible ? "animate-slide-up" : "opacity-0"
                      }`}
                    >
                      <Users className="h-8 w-8 mr-2 text-accent" />
                      Meet Our Expert Consultant
                    </h2>
                    <p
                      className={`text-lg text-muted-foreground max-w-2xl mx-auto ${
                        isVisible ? "animate-fade-in delay-100" : "opacity-0"
                      }`}
                    >
                      Our MARA registered migration agent is here to guide you
                      through your Australian visa journey
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <Card
                      className={`max-w-2xl w-full bg-white border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                        isVisible ? "animate-slide-up" : "opacity-0"
                      }`}
                    >
                      <div className="grid md:grid-cols-[200px_1fr] gap-6 p-6">
                        {/* Image Section */}
                        <div className="flex justify-center md:justify-start">
                          <div className="relative w-48 h-48 md:w-full md:h-full rounded-lg overflow-hidden bg-muted border-2 border-primary/10">
                            <img
                              src="/team/Lilash Yadav.jpeg"
                              alt="Lilash Yadav"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex flex-col justify-center text-center md:text-left space-y-3">
                          <div>
                            <h3 className="text-2xl font-bold text-primary mb-1">
                              Lilash Yadav
                            </h3>
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                              <Badge className="bg-accent text-white">
                                MARA Registered
                              </Badge>
                              <Badge
                                variant="outline"
                                className="border-primary text-primary"
                              >
                                2318244
                              </Badge>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-start justify-center md:justify-start gap-2">
                              <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <a
                                href="mailto:dreamsailor@4acs.com.au"
                                className="text-muted-foreground hover:text-primary transition-colors"
                              >
                                dreamsailor@4acs.com.au
                              </a>
                            </div>

                            <div className="flex items-start justify-center md:justify-start gap-2">
                              <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <div className="text-muted-foreground">
                                <p>Level 4, 17-21 University Avenue</p>
                                <p>ACT 2601, Australia</p>
                              </div>
                            </div>

                            <div className="flex items-start justify-center md:justify-start gap-2">
                              <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <div className="text-muted-foreground">
                                <p>Level 6, 379-383 Pitt Street</p>
                                <p>Sydney 2000, Australia</p>
                              </div>
                            </div>
                          </div>

                          <div className="pt-4">
                            <Link href="/book-consultation">
                              <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white">
                                Book Consultation
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })()}
          </section>

          {blogs.length > 0 && (
            <BlogSection
              blogs={blogs}
              title="Australian Visa & Migration Insights"
              subtitle="Stay updated with the latest Australian visa and migration tips."
              linkPrefix="/visa-migration/blogs"
            />
          )}
        </div>
      </section>
    </>
  );
}
