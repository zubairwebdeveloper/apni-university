import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { images } from "@/data/university";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Contact us</h1>
      <p className="mt-2 text-slate-600">Questions about admissions, fees or scholarships? Send us a message.</p>
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <ContactForm />
        <div>
          <Image src={images.campus} alt="Main campus building" width={1200} height={800} className="rounded-xl" />
          <ul className="mt-4 space-y-1 text-sm text-slate-600">
            <li>Address: University Road, Your City</li>
            <li>Email: info@apnauniversity.edu</li>
            <li>Phone: +92 300 0000000</li>
            <li>Office hours: Monday to Friday, 9:00 AM to 4:00 PM</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
