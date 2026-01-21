"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MapPin,
  Eye,
  Loader2,
  Bed,
  Bath,
  Square,
  Users,
  Phone,
  Mail,
  ArrowRight,
  Link,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";
import { useBlogService } from "@/lib/blogService";
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
  description: string;
  photo: string;
  certificates: string[];
  email: string;
  contactNumber: string;
}

const realEstateConsultants: Consultant[] = [
  {
    name: "Mr. Puskar Shrestha",
    role: "Co-Founder, Director",
    description:
      "With over 10 years of experience in real estate investment and development, Mr. Shrestha specializes in luxury properties, commercial land acquisitions, and residential developments.",
    photo: "/Pushkar_Shrestha.png",
    certificates: [
      "Licensed Real Estate Agent",
      "Certified Property Manager",
      "Real Estate Investment Specialist",
    ],
    email: "busines@dsailorgroup.com.au/ properties@dsailorgroup.com.au",
    contactNumber: "+61-406704062 / 0406204071",
  },
  {
    name: "Ms. Saglina Shrestha",
    role: "Founder/ Managing Director",
    description:
      "Expert in residential and commercial property sales with over 15 years of experience. She has successfully closed deals worth over $50 million in property transactions.",
    photo: "/Salina_Shrestha.png",
    certificates: [
      "Master Real Estate Broker",
      "Luxury Property Specialist",
      "Commercial Real Estate Certification",
    ],
    email: "busines@dsailorgroup.com.au/ properties@dsailorgroup.com.au",
    contactNumber: "+61-406704062 / 0406204071",
  },
  {
    name: "Mr. Sohil Shrestha",
    role: "Property Investment Consultant",
    description:
      "Specializing in land development, property valuations, and investment strategies. He helps clients identify lucrative opportunities in residential and commercial real estate markets.",
    photo: "/Sohil_Shrestha.png",
    certificates: [
      "Certified Property Appraiser",
      "Real Estate Investment Analyst",
      "Land Development Specialist",
    ],
    email: "busines@dsailorgroup.com.au/ properties@dsailorgroup.com.au",
    contactNumber: "+61-406704062 / 0406204071",
  },
  {
    name: "Mr. Chitra Raj Bhattarai",
    role: "Property Investment Consultant",
    description:
      "Specializing in land development, property valuations, and investment strategies. He helps clients identify lucrative opportunities in residential and commercial real estate markets.",
    photo: "/Chitra_Raj.jpg",
    certificates: [
      "Certified Property Appraiser",
      "Real Estate Investment Analyst",
      "Land Development Specialist",
    ],
    email: "busines@dsailorgroup.com.au/ property@dsailorgroup.com.au",
    contactNumber: "+61-406704062 / 0406204071",
  },

];

// ------------------- Custom Hook -------------------
function useInView(options = { threshold: 0.1 }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return { ref, isVisible };
}

export function LandHomesSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { getBlogByService, getBlogById } = useBlogService();

  const properties = [
    {
      id: 1,
      title: "Luxury Villa in Prime Location",
      price: "$850,000",
      location: "Downtown District",
      bedrooms: 4,
      bathrooms: 3,
      area: "2,500 sq ft",
      image: "/placeholder-3gh8d.png",
      featured: true,
    },
    {
      id: 2,
      title: "Modern Apartment Complex",
      price: "$320,000",
      location: "Business Quarter",
      bedrooms: 2,
      bathrooms: 2,
      area: "1,200 sq ft",
      image: "/modern-apartment-building.png",
      featured: false,
    },
    {
      id: 3,
      title: "Commercial Land Plot",
      price: "$1,200,000",
      location: "Industrial Zone",
      bedrooms: null,
      bathrooms: null,
      area: "5,000 sq ft",
      image: "/placeholder-frzqf.png",
      featured: true,
    },
  ];

  const fetchBlogs = async () => {
    try {
      const response = await getBlogByService("Lands_and_Home");
      if (response.success && response.data) {
        setBlogs([...response.data]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section id="land-homes" className="pb-20 bg-muted/30">
      <section className="relative py-20 md:py-28 flex items-center justify-center overflow-hidden mb-20">
        <div className="absolute inset-0 z-0 animate-scale-in">
          <img
            src="/darmau-gKEiDaAtK4o-unsplash.jpg"
            alt="Luxury real estate properties"
            className="w-full h-full object-cover animate-fade-in"
          />
          <div className="absolute inset-0 bg-primary/70 animate-fade-in"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-slide-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance animate-fade-in">
            Discover Your Dream Home or{" "}
            <span className="text-secondary">Investment Property</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto text-pretty animate-fade-in delay-100">
            From luxury homes to prime commercial land, our expert real estate consultants 
            will help you find the perfect property that matches your vision and investment goals.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            
            <Link href="/book-consultation">
            Schedule Property Viewing
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-3 hover:scale-105 transition-transform"
              >
                
                <FileText className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">


{/* Services Section */}
<section id="services" className="py-5">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
      <p className="text-muted-foreground text-pretty max-w-2xl mx-auto">
        We offer tailored solutions to help you buy, sell and invest with confidence.
      </p>
    </div>

    {/* Services Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Card 1 */}
      <div
        className="
          p-8 min-h-[240px] rounded-xl border
          bg-card text-card-foreground
          flex flex-col items-center justify-center text-center
          transition-all duration-300 ease-out
          hover:bg-primary hover:text-primary-foreground
          hover:-translate-y-2 hover:shadow-lg
        "
      >
        <h4 className="font-semibold text-lg mb-3">
          Find Properties
        </h4>
        <p className="text-sm leading-relaxed max-w-xs">
          We find you the best land or home along with investment properties within your budget inside Australia.
        </p>
      </div>

      {/* Card 2 */}
      <div
        className="
          p-8 min-h-[240px] rounded-xl border
          bg-card text-card-foreground
          flex flex-col items-center justify-center text-center
          transition-all duration-300 ease-out
          hover:bg-primary hover:text-primary-foreground
          hover:-translate-y-2 hover:shadow-lg
        "
      >
        <h4 className="font-semibold text-lg mb-3">
          Investment & Mortgages
        </h4>
        <p className="text-sm leading-relaxed max-w-xs">
          Tailored investment plans and mortgage services to match your financial goals.
        </p>
      </div>

      {/* Card 3 */}
      <div
        className="
          p-8 min-h-[240px] rounded-xl border
          bg-card text-card-foreground
          flex flex-col items-center justify-center text-center
          transition-all duration-300 ease-out
          hover:bg-primary hover:text-primary-foreground
          hover:-translate-y-2 hover:shadow-lg
        "
      >
        <h4 className="font-semibold text-lg mb-3">
          Buy & Sell
        </h4>
        <p className="text-sm leading-relaxed max-w-xs">
          End-to-end support for buying and selling properties, handled by our expert agents.
        </p>
      </div>
    </div>
  </div>
</section>


{/* Agents / Partners Section */}
<section id="partners" className="py-16 overflow-hidden">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    {/* Header */}
    <h3 className="text-2xl font-semibold mb-3">
      Trusted Listing Partners
    </h3>
    <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
      Smart investment through our certified real estate listing platforms.
    </p>

    {/* Slideshow Wrapper */}
    <div className="relative w-full overflow-hidden">
      {/* Gradient fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Sliding Track */}
      <div className="flex gap-6 animate-scroll hover:[animation-play-state:paused]">
        {[
          { name: "CommercialProperty", url: "https://commercialproperty.com.au" },
          { name: "Realestate.com.au", url: "https://www.realestate.com.au" },
          { name: "Allhomes", url: "https://www.allhomes.com.au" },
          { name: "Property.com.au", url: "https://www.property.com.au" },
        ]
          // duplicate for seamless loop
          .concat([
            { name: "CommercialProperty", url: "https://commercialproperty.com.au" },
            { name: "Realestate.com.au", url: "https://www.realestate.com.au" },
            { name: "Allhomes", url: "https://www.allhomes.com.au" },
            { name: "Property.com.au", url: "https://www.property.com.au" },
          ])
          .map((partner, index) => (
            <a
              key={`${partner.name}-${index}`}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center justify-center
                min-w-[220px] h-16
                rounded-lg border
                bg-card text-card-foreground
                font-medium
                transition-all duration-300
                hover:bg-primary hover:text-primary-foreground
              "
            >
              {partner.name}
            </a>
          ))}
      </div>
    </div>
  </div>
</section>



        {/* Consultants Section */}
    {/* Consultants Section */}
<section id="team" className="py-20">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="text-center mb-16 animate-fade-in-up">
      <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4 flex items-center justify-center">
        <Users className="h-8 w-8 mr-2 text-accent" />
        Our Real Estate Expert
      </h2>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
        Dedicated guidance from an experienced professional to help you buy,
        sell, and invest with confidence.
      </p>
    </div>

    {/* Horizontal Card */}
    <div className="flex flex-col lg:flex-row items-center bg-white border border-primary/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      
      {/* Rectangular Photo */}
      <div className="w-full lg:w-1/3 flex justify-center p-8">
        <div className="relative w-full h-64 lg:h-80 rounded-lg overflow-hidden border border-primary/10">
          <img
            src={realEstateConsultants[3].photo}
            alt={realEstateConsultants[3].name}
            className="w-full h-full object-cover bg-white"
          />
        </div>
      </div>

      {/* Info */}
      <div className="w-full lg:w-2/3 px-8 py-8 text-center lg:text-left">
        <h3 className="font-semibold text-2xl mb-2">
          {realEstateConsultants[3].name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {realEstateConsultants[3].role}
        </p>
        <p className="text-sm text-pretty mb-6">
          {realEstateConsultants[3].description}
        </p>

        <div className="space-y-2 text-sm text-muted-foreground mb-6">
          <p>
            <strong>Email:</strong> {realEstateConsultants[3].email}
          </p>
          <p>
            <strong>Contact:</strong> {realEstateConsultants[3].contactNumber}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {realEstateConsultants[3].certificates.map((cert) => (
            <Badge key={cert} variant="secondary">
              {cert}
            </Badge>
          ))}
        </div>
      </div>

    </div>
  </div>
</section>


        {/* Blog Section */}
        {blogs.length > 0 && (
          <BlogSection
            blogs={blogs}
            title="Land and Homes Insights"
            subtitle="Stay updated with the latest Real Estate blogs."
            linkPrefix="land-homes/blogs"
          />
        )}
      </div>
    </section>
  );
}