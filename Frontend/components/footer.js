import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0E1117] text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Branding */}
        <div>
          <Image src="/images/logo.png" alt="GlowGuide" width={120} height={40} />
          <p className="mt-4 text-sm text-gray-400">
            Connecting top hair professionals with clients looking for exceptional service.
          </p>
        </div>

        {/* For Clients */}
        <div>
          <h4 className="text-white font-semibold mb-3">For Clients</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Find a Stylist</a></li>
            <li><a href="#" className="hover:text-white">Book Appointments</a></li>
            <li><a href="#" className="hover:text-white">Browse Services</a></li>
            <li><a href="#" className="hover:text-white">Gift Cards</a></li>
          </ul>
        </div>

        {/* For Professionals */}
        <div>
          <h4 className="text-white font-semibold mb-3">For Professionals</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">List Your Business</a></li>
            <li><a href="#" className="hover:text-white">Business Dashboard</a></li>
            <li><a href="#" className="hover:text-white">Marketing Tools</a></li>
            <li><a href="#" className="hover:text-white">Pricing Plans</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/service/about" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="/service/contact" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © 2025 GlowGuide. All rights reserved.
      </div>
    </footer>
  );
}
