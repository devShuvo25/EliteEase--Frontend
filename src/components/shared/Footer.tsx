"use client"
import { FC, useState } from "react";
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer: FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder: integrate with newsletter API
    if (!email) return;
    setEmail("");
  };

  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-primary text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* About + Newsletter */}
        <div className="md:col-span-4 space-y-4">
          <h1 className="text-2xl font-bold text-yellow-500">
            ASI<span className="text-white">MART</span>
          </h1>
          <p className="text-sm text-gray-300">
            Tech-first ecommerce marketplace for premium electronics,
            accessories and smart devices — curated, fast shipping,
            warranty-backed.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="mt-4 flex items-center gap-2"
          >
            <label htmlFor="newsletter" className="sr-only">
              Subscribe to newsletter
            </label>
            <input
              id="newsletter"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full rounded-md bg-[#0b1630] border border-gray-700 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
              aria-label="Email for newsletter"
            />
            <button
              type="submit"
              className="bg-brand-accent px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-md"
            >
              Subscribe
            </button>
          </form>

          <div className="flex items-center gap-3 mt-4">
            <a
              aria-label="Facebook"
              href="#"
              className="text-gray-300 hover:text-white"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              aria-label="Instagram"
              href="#"
              className="text-gray-300 hover:text-white"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              aria-label="Youtube"
              href="#"
              className="text-gray-300 hover:text-white"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              aria-label="LinkedIn"
              href="#"
              className="text-gray-300 hover:text-white"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2">
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/products?filter=new" className="hover:text-white">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="/deals" className="hover:text-white">
                Deals
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="md:col-span-2">
          <h3 className="font-semibold mb-3">Top Categories</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link href="/category/laptops" className="hover:text-white">
                Laptops
              </Link>
            </li>
            <li>
              <Link href="/category/monitors" className="hover:text-white">
                Monitors
              </Link>
            </li>
            <li>
              <Link href="/category/headphones" className="hover:text-white">
                Headphones
              </Link>
            </li>
            <li>
              <Link href="/category/accessories" className="hover:text-white">
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* Support & Contact */}
        <div className="md:col-span-2">
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-gray-300 text-sm mb-4">
            <li>
              <Link href="/help" className="hover:text-white">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-white">
                Shipping & Delivery
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-white">
                Returns & Warranty
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact Support
              </Link>
            </li>
          </ul>

          <div className="space-y-2 text-gray-300 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1" />{" "}
              <div>
                Asiamart Samsur Nahar Complex, Topkhana Road, Dhaka-1000
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />{" "}
              <a href="tel:+8801322920885" className="hover:text-white">
                +8801322-920885
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />{" "}
              <a href="mailto:info@asiamart.com" className="hover:text-white">
                info@asiamart.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Partners & Copyright */}
      <div className="max-w-7xl mx-auto mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row md:justify-between items-center gap-6 text-sm text-gray-300">
        <p>© {year}. Asiamart. All rights reserved.</p>

        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-300">
              Payment Partners:
            </span>
            <Image
              src="/partners/bkash.png"
              alt="Bkash"
              width={50}
              height={20}
            />
            <Image
              src="/partners/nagad.png"
              alt="Nagad"
              width={50}
              height={20}
            />
            <Image src="/partners/dbbl.png" alt="DBBL" width={50} height={20} />
            <Image
              src="/partners/rocket.png"
              alt="Rocket"
              width={50}
              height={20}
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-300">
              Delivery Partners:
            </span>
            <Image src="/partners/redx.png" alt="RedX" width={60} height={24} />
            <Image
              src="/partners/pathao.png"
              alt="Pathao"
              width={60}
              height={24}
            />
            <Image
              src="/partners/steadfast.png"
              alt="SteadFast"
              width={60}
              height={24}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
