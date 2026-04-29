"use client";
import React, { useEffect, useState, forwardRef } from "react";
import { FaMapMarkerAlt, FaWhatsapp, FaEnvelope, FaExternalLinkAlt } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

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

       const socialLinks = [
        { icon: <FaLinkedin size={22} />, link: ensureHttps(contact?.linkedin), label: "LinkedIn" },
        { icon: <FaGithub size={22} />, link: ensureHttps(contact?.github), label: "GitHub" },
        { icon: <FaFacebook size={22} />, link: ensureHttps(contact?.facebook), label: "Facebook" },
        { icon: <FaInstagram size={22} />, link: ensureHttps(contact?.instagram), label: "Instagram" },


    ];

    return (
        <section ref={ref} className="relative py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 w-full overflow-hidden">
            <div className="absolute right-[10%] bottom-0 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-[120px] -z-10 animate-pulse" />

            <div className="mb-12">
                <div className="animate-fadeInUp relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accent-2 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 p-6 sm:p-8 md:p-12 bg-bg-card border border-border-color rounded-[2rem] shadow-sm group-hover:shadow-custom overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent z-0"></div>
                        
                        <div className="relative z-10 flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                                <span className="relative flex h-2.5 sm:h-3 w-2.5 sm:w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 sm:h-3 w-2.5 sm:w-3 bg-accent-2"></span>
                                </span>
                                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-text-secondary">Status</span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-text-primary mb-3">Current Availability</h3>
                            <p className="text-sm sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto md:mx-0">
                                I am currently open to <span className="text-text-primary font-bold">freelance projects</span> and <span className="text-text-primary font-bold">full-time roles</span> as an Elite Developer.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mb-12 sm:mb-16 animate-fadeInUp">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-text-primary tracking-tight mb-4 sm:mb-6">
                    Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-2">Connect</span>
                </h2>
                <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto font-medium px-4">
                    "Ready to build the future? I'm just a message away."
                </p>
                <div className="flex justify-center items-center gap-2 mt-6 sm:mt-8">
                    <span className="w-8 sm:w-12 h-1 bg-gradient-to-r from-transparent to-accent rounded-full"></span>
                    <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-accent rounded-full animate-glowPulse"></span>
                    <span className="w-8 sm:w-12 h-1 bg-gradient-to-l from-transparent to-accent rounded-full"></span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
                <ContactCard 
                    icon={<FaEnvelope size={24} />}
                    title="Email Me"
                    value={email}
                    link={`mailto:${email}`}
                    delay="0s"
                />
                <ContactCard 
                    icon={<FaWhatsapp size={24} />}
                    title="WhatsApp"
                    value={phone}
                    link={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
                    delay="1s"
                />
                <ContactCard 
                    icon={<FaMapMarkerAlt size={24} />}
                    title="Location"
                    value={address}
                    link={mapLink}
                    delay="2s"
                />
            </div>

            <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <div className="relative p-8 sm:p-12 bg-bg-card border border-border-color rounded-[3rem] overflow-hidden shadow-sm hover:shadow-custom transition-all duration-500">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2"></div>
                    
                    <div className="relative z-10 text-center">
                        <h3 className="text-1xl sm:text-3xl font-heading font-extrabold text-text-primary mb-8">
                            Follow me on <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-2">Social Media</span>
                        </h3>
                        
                        <div className="flex flex-nowrap overflow-x-auto justify-center sm:justify-center gap-4 sm:gap-6 pb-4 sm:pb-0 [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.link || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex items-center gap-3 p-3 sm:px-6 sm:py-3 bg-bg-primary border border-border-color rounded-2xl shadow-sm hover:shadow-custom hover:-translate-y-1 transition-all duration-300 overflow-hidden text-text-secondary hover:text-accent hover:border-accent/30 flex-shrink-0"
                                    aria-label={social.label}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative z-10 animate-blueBlink" style={{ animationDelay: `${index * 1.5}s` }}>
                                        {social.icon}
                                    </span>
                                    <span className="relative z-10 font-bold tracking-wide text-sm hidden sm:block">
                                        {social.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
           
        </section>
    );
});

const ContactCard = ({ icon, title, value, link, delay = "0s" }) => (
    <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group relative rounded-3xl bg-bg-card border border-border-color shadow-sm hover:shadow-custom hover:-translate-y-2 transition-all duration-500 ease-out p-8 h-full flex flex-col items-center text-center overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
        
        <div 
            className="relative z-10 w-16 h-16 mb-6 rounded-2xl bg-bg-primary text-accent border border-border-color/50 flex items-center justify-center transform group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm"
        >
            <span className="flex items-center justify-center animate-blueBlink" style={{ animationDelay: delay }}>
                {icon}
            </span>
        </div>
        
        <h4 className="relative z-10 text-xl font-heading font-bold text-text-primary mb-2 group-hover:text-accent transition-colors duration-300">
            {title}
        </h4>
        
        <p className="relative z-10 text-text-secondary mb-8 break-all max-w-[200px] line-clamp-2">
            {value}
        </p>

        <div className="relative z-10 mt-auto flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent border-b border-transparent group-hover:border-accent pb-1 transition-all">
            Connect Now <FaExternalLinkAlt size={12} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
    </a>
)

Contact.displayName = "Contact";
export default Contact;
