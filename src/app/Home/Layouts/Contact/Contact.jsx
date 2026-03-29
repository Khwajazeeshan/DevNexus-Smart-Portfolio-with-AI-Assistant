"use client";
import React, { useEffect, useState, forwardRef } from "react";
import { FaMapMarkerAlt, FaWhatsapp, FaEnvelope, FaExternalLinkAlt } from "react-icons/fa";

const ensureHttps = (url) => {
    if (!url) return "";
    return url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
};

const Contact = forwardRef(({ onComplete }, ref) => {
    const [contact, setContact] = useState(null);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await fetch("/api/contact/get-contact");
                if (response.ok) {
                    const data = await response.json();
                    setContact(data.contact);
                }
            } catch (error) {
                console.error("Error fetching contact info:", error);
            }
        };
        fetchContact();
    }, []);

    const address = contact?.address || "Address not provided";
    const mapLink = ensureHttps(contact?.mapLink) || "#";
    const email = contact?.email || "khawajazeeshan225@gmail.com";
    const phone = contact?.phone || "+92 345 6789101";

    return (
        <section ref={ref} className="py-10 px-6 max-w-6xl mx-auto w-full">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Get In <span className="text-gradient">Touch</span></h2>
                <div className="w-20 h-1.5 bg-brand-primary mx-auto rounded-full"></div>
                <p className="mt-6 text-slate-400">Have a project in mind or just want to say hi? Feel free to reach out!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Email Card */}
                <ContactCard 
                    icon={<FaEnvelope size={24} />}
                    title="Email Me"
                    value={email}
                    link={`mailto:${email}`}
                    color="text-brand-primary"
                />

                {/* WhatsApp Card */}
                <ContactCard 
                    icon={<FaWhatsapp size={24} />}
                    title="WhatsApp"
                    value={phone}
                    link={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
                    color="text-green-400"
                />

                {/* Location Card */}
                <ContactCard 
                    icon={<FaMapMarkerAlt size={24} />}
                    title="Location"
                    value={address}
                    link={mapLink}
                    color="text-brand-secondary"
                    isAddress={true}
                />
            </div>

            {/* Subtle Contact Form CTA or additional info could go here */}
            <div className="mt-16 text-center">
                <div className="inline-block glass px-8 py-10 rounded-3xl border border-white/5 max-w-2xl">
                    <h3 className="text-xl font-bold mb-4 text-slate-200">Current Availability</h3>
                    <p className="text-slate-400">I am currently open to freelance opportunities and new full-time positions as a Full Stack Developer.</p>
                </div>
            </div>
        </section>
    );
});

const ContactCard = ({ icon, title, value, link, color, isAddress = false }) => (
    <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group glass p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col items-center text-center"
    >
        <div className={`p-4 rounded-2xl bg-white/5 ${color} group-hover:scale-110 transition-all duration-300 mb-6 shadow-xl relative overflow-hidden`}>
            {/* Pulsing Aura/Blink Effect */}
            <div className={`absolute inset-0 bg-current opacity-10 animate-pulse`}></div>
            <div className="relative z-10">
                {icon}
            </div>
        </div>
        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">{title}</h4>
        <p className={`text-lg font-semibold text-slate-200 group-hover:text-white transition-colors line-clamp-2 ${isAddress ? "max-w-[200px]" : ""}`}>
            {value}
        </p>
        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-brand-primary opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
            Connect <FaExternalLinkAlt size={12} />
        </div>
    </a>
)

Contact.displayName = "Contact";
export default Contact;

