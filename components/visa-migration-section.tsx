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
} from "lucide-react";
import Link from "next/link";
import { useBlogService } from "@/lib/blogService";
import BlogCardView from "./ui/blog-card-view";
import { useInView } from "@/hooks/use-in-view";
import BlogSection from "./ui/blog-card-view";

interface Blog {
  blogId: string;
  title: string;
  content: string;
  type: string;
  createdAt: string;
}

interface Consultant {
  name: string;
  role: string;
  bio: string;
  photo: string;
  email: string;
  contactNumber: string;
}

const migrationConsultants: Consultant[] = [
  {
    name: "Mr. Puskar Shrestha",
    role: "Co/Founder, Director",
    bio: "Puskar Shrestha is the visionary Co-Founder and Director of D Sailor Group, bringing over a decade of expertise in international recruitment and migration services. With a proven track record of successfully placing professionals across Australia and globally, Puskar specializes in navigating complex visa processes and matching exceptional talent with career-defining opportunities. His strategic approach and deep understanding of Australian immigration policies have made him a trusted advisor for individuals and organizations seeking seamless migration solutions.",
    photo: "/Pushkar_Shrestha.png",
    email: "busines@dsailorgroup.com.au / recruitment@dsailorgroup.com.au",
    contactNumber: "+61-406704062 / 0406204071"
  },
  {
    name: "Ms. Saglina Shrestha",
    role: "Founder/ Managing Director",
    bio: "Saglina Shrestha is the driving force behind D Sailor Group as its Founder and Managing Director. With an impressive portfolio of over 500 successful executive placements in multinational corporations, she has established herself as a leading authority in talent acquisition and migration services. Her expertise lies in identifying and securing opportunities for skilled professionals seeking to build their careers in Australia. Saglina's commitment to excellence and personalized client service has positioned D Sailor Group as a premier destination for comprehensive migration and recruitment solutions.",
    photo: "/Salina_Shrestha.png",
    email: "busines@dsailorgroup.com.au / recruitment@dsailorgroup.com.au",
    contactNumber: "+61-406704062 / 0406204071"
  },
  {
    name: "Mr. Sohil Shrestha",
    role: "International Placement Specialist",
    bio: "Sohil Shrestha serves as the International Placement Specialist at D Sailor Group, where he excels in facilitating visa-sponsored roles and cross-border placements with a particular focus on Australian immigration. His expertise in navigating the intricate requirements of skilled migration visas, including the points-based system and employer-sponsored programs, has helped countless professionals realize their Australian dream. Sohil's meticulous attention to detail and comprehensive knowledge of immigration regulations ensure that clients receive tailored guidance throughout their entire migration journey.",
    photo: "/Sohil_Shrestha.png",
    email: "busines@dsailorgroup.com.au / recruitment@dsailorgroup.com.au",
    contactNumber: "+61-406704062 / 0406204071"
  },
];

export function VisaMigrationSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
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
      description: "For international students pursuing education in Australia and abroad",
      countries: ["Australia", "USA", "Canada", "UK"],
      processingTime: "4-8 weeks",
      icon: <Globe className="h-6 w-6 text-primary" />,
      link: "https://edupi.com.au",
      linkText: "Visit Edupi Migration"
    },
    {
      title: "Work Visa",
      description: "For professionals seeking employment opportunities in Australia and globally",
      countries: ["Australia", "Germany", "Netherlands", "Singapore"],
      processingTime: "6-12 weeks",
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      link: "https://edupi.com.au",
      linkText: "Visit Edupi Migration"
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
      description: "For investors and entrepreneurs looking to migrate to Australia",
      countries: ["Australia"],
      processingTime: "12-24 weeks",
      icon: <DollarSign className="h-6 w-6 text-primary" />,
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
            Your Australian <span className="text-secondary">Dream</span> Starts Here
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto text-pretty animate-fade-in delay-100">
            Navigate your path to Australia with our expert visa and migration services 
            designed to make your dreams a reality.
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
              <span className="font-medium text-white">2000+</span> successful visa applications to Australia
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
              Embark on your journey to Australia with our expert visa and migration
              services, tailored to make your dreams a reality with DreamSailor.
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
                          index % 2 === 0 ? "md:justify-end" : "md:justify-start"
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
                          {visa.link ? (
                            <a href={visa.link} target="_blank" rel="noopener noreferrer">
                              <Button className="w-full bg-primary hover:bg-blue-900 text-white transition-all">
                                {visa.linkText} <ExternalLink className="ml-2 h-4 w-4" />
                              </Button>
                            </a>
                          ) : (
                            <Link href="/book-consultation">
                              <Button className="w-full bg-primary hover:bg-blue-900 text-white transition-all">
                                Get Started
                              </Button>
                            </Link>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              );
            })()}
          </div>

          {/* Australian Skilled Migration Section */}
          <section id="skilled-migration" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl">
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
                      Unlock your pathway to permanent residency in Australia through our expert skilled migration services with DreamSailor.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <Card className="border-2 border-primary/20 shadow-xl">
                      <CardHeader>
                        <CardTitle className="text-2xl text-primary flex items-center">
                          <Award className="h-6 w-6 mr-2 flex-shrink-0" />
                          Skilled Independent Visa (Subclass 189)
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                          A points-based permanent residency visa for skilled workers who are not sponsored by an employer, state, or family member.
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span>No employer sponsorship required</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Permanent residency from day one</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Work and live anywhere in Australia</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Include family members in your application</span>
                          </li>
                        </ul>
                        <a href="https://australianskilledmigration.com.au" target="_blank" rel="noopener noreferrer">
                          <Button className="w-full mt-4 bg-primary hover:bg-blue-900">
                            Learn More <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </a>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-primary/20 shadow-xl">
                      <CardHeader>
                        <CardTitle className="text-2xl text-primary flex items-center">
                          <Globe className="h-6 w-6 mr-2 flex-shrink-0" />
                          Skilled Nominated Visa (Subclass 190)
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                          A points-based permanent residency visa for skilled workers nominated by an Australian state or territory government.
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Additional 5 points for state nomination</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Permanent residency pathway</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Access to Medicare and social services</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Pathway to Australian citizenship</span>
                          </li>
                        </ul>
                        <a href="https://australianskilledmigration.com.au" target="_blank" rel="noopener noreferrer">
                          <Button className="w-full mt-4 bg-primary hover:bg-blue-900">
                            Learn More <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="border-2 border-accent/30 bg-white shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-2xl text-primary flex items-center justify-center">
                        <Star className="h-6 w-6 mr-2" />
                        Points Assessment System
                      </CardTitle>
                      <CardDescription className="text-center text-lg">
                        Calculate your eligibility for Australian skilled migration
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-primary">Key Factors:</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                              <Badge variant="outline" className="mr-2">Age</Badge>
                              <span>25-32 years (maximum points)</span>
                            </li>
                            <li className="flex items-center">
                              <Badge variant="outline" className="mr-2">English</Badge>
                              <span>Superior English (IELTS 8.0+)</span>
                            </li>
                            <li className="flex items-center">
                              <Badge variant="outline" className="mr-2">Experience</Badge>
                              <span>8+ years skilled employment</span>
                            </li>
                            <li className="flex items-center">
                              <Badge variant="outline" className="mr-2">Education</Badge>
                              <span>Australian degree or equivalent</span>
                            </li>
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-primary">Additional Points:</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                              <Badge variant="outline" className="mr-2">Partner</Badge>
                              <span>Skilled partner (5-10 points)</span>
                            </li>
                            <li className="flex items-center">
                              <Badge variant="outline" className="mr-2">State</Badge>
                              <span>State nomination (5 points)</span>
                            </li>
                            <li className="flex items-center">
                              <Badge variant="outline" className="mr-2">Regional</Badge>
                              <span>Regional study (5 points)</span>
                            </li>
                            <li className="flex items-center">
                              <Badge variant="outline" className="mr-2">STEM</Badge>
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
                          Higher points increase your chances of receiving an invitation
                        </p>
                        <a href="https://australianskilledmigration.com.au" target="_blank" rel="noopener noreferrer">
                          <Button size="lg" className="bg-accent hover:bg-accent/90">
                            Calculate Your Points <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="mt-12 text-center">
                    <p className="text-muted-foreground mb-4">
                      For comprehensive information about Australian skilled migration pathways
                    </p>
                    <a href="https://australianskilledmigration.com.au" target="_blank" rel="noopener noreferrer">
                      <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                        Visit Australian Skilled Migration <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
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
                      Trusted by thousands of clients seeking Australian migration
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
                        <div className="text-sm text-white/80">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Consultants Section */}
          <section id="team" className="py-20">
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
                      <Users className="h-8 w-8 mr-2 text-accent" /> 
                      Meet Our Migration Consultants
                    </h2>
                    <p
                      className={`text-xl text-muted-foreground max-w-3xl mx-auto text-pretty ${
                        isVisible ? "animate-fade-in delay-100" : "opacity-0"
                      }`}
                    >
                      Our expert team provides personalized support and guidance for your Australian visa and migration journey.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {migrationConsultants.map((consultant, index) => (
                      <Card
                        key={consultant.name}
                        className={`relative bg-white border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                          isVisible ? "animate-slide-up" : "opacity-0"
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CardHeader className="pt-8 pb-4">
                          <div className="flex justify-center mb-4">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/10">
                              <img
                                src={consultant.photo}
                                alt={consultant.name}
                                className={`w-full h-full object-contain bg-white ${
                                  isVisible ? "animate-scale-in" : "opacity-0"
                                }`}
                              />
                            </div>
                          </div>
                          <CardTitle className="text-center text-xl font-bold text-primary">
                            {consultant.name}
                          </CardTitle>
                          <CardDescription className="text-center text-sm font-medium text-accent">
                            {consultant.role}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground text-pretty leading-relaxed">
                            {consultant.bio}
                          </p>
                          <div className="pt-4 border-t border-primary/10 space-y-2">
                            <div className="flex items-start">
                              <span className="font-semibold text-xs text-primary mr-2">Email:</span>
                              <span className="text-xs text-muted-foreground break-all">{consultant.email}</span>
                            </div>
                            <div className="flex items-start">
                              <span className="font-semibold text-xs text-primary mr-2">Contact:</span>
                              <span className="text-xs text-muted-foreground">{consultant.contactNumber}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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