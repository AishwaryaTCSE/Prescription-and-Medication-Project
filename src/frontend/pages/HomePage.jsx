import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Menu,
    X,
    CheckCircle,
    ChevronDown,
    Loader2,
    Zap,
    HelpCircle,
    Users,
    Repeat,
    Ruler,
    Activity,
    Clock,
    Bell,
    LifeBuoy,
    TrendingUp,
    Pill,
    LogOut,
    User,
    Home,
    Settings,
    MessageCircle,
    ArrowRight,
    Lock,
    Calendar,
    Wallet
} from 'lucide-react';

// Logo image
import Logo from '../../assets/Health-Medical-Logo-design.png';

// --- Utility Components ---

/**
 * 1. Gradient Button Component
 */
const GradientButton = ({ children, onClick, className = '', isActive = true, primary = true }) => {
    const baseClasses = "font-medium py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2 whitespace-nowrap";
    const primaryClasses = "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-emerald-500/50";
    const secondaryClasses = "bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-none border border-gray-200";

    const selectedClasses = primary ? primaryClasses : secondaryClasses;
    const activeClasses = isActive ? selectedClasses : 'opacity-70 cursor-not-allowed';

    return (
        <button
            onClick={isActive ? onClick : undefined}
            className={`${baseClasses} ${activeClasses} ${className}`}
            disabled={!isActive}
        >
            {children}
        </button>
    );
};

/**
 * 2. Standard Button Component
 */
const Button = ({ children, onClick, className = '', primary = true, icon: Icon }) => (
    <GradientButton onClick={onClick} className={className} primary={primary}>
        {Icon && <Icon className="w-5 h-5" />}
        <span>{children}</span>
    </GradientButton>
);

/**
 * 3. Header Component
 */
const navLinks = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'Features', href: '#features', icon: Activity },
    { name: 'Analytics', href: '#analytics', icon: TrendingUp },
    { name: 'FAQ', href: '#faq', icon: HelpCircle },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const authLinks = [
        { name: 'Log In', onClick: () => navigate('/login'), desktopClass: 'text-gray-700 bg-white hover:bg-gray-100 shadow-none border border-gray-200', primary: false, isActive: true },
        { name: 'Sign Up', onClick: () => navigate('/signup'), desktopClass: 'primary', primary: true, isActive: true },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <a href="#home" className="flex items-center space-x-2">
                        <img src={Logo} alt="MediManage logo" className="h-8 w-8 object-contain animate-pulse" />
                        <span className="text-2xl font-extrabold text-gray-900">
                            Medi<span className="font-light text-emerald-600">Manage</span>
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {navLinks.map(link => (
                            <a key={link.name} href={link.href} className="text-gray-600 hover:text-emerald-600 transition duration-150 font-medium text-lg">
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop Auth Links */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {authLinks.map(link => (
                            <GradientButton
                                key={link.name}
                                className={`${link.desktopClass} text-base`}
                                isActive={link.isActive}
                                onClick={link.onClick}
                                primary={link.primary}
                            >
                                {link.name}
                            </GradientButton>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-gray-600 hover:text-emerald-600 transition"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 pb-3 space-y-2 sm:px-6">
                    {navLinks.map(link => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                        >
                            <link.icon className="w-5 h-5 mr-3" /> {link.name}
                        </a>
                    ))}
                    <div className="pt-4 border-t border-gray-100 space-y-2">
                        {authLinks.map(link => (
                            <GradientButton
                                key={link.name}
                                isActive={link.isActive}
                                className={`w-full text-base ${link.primary ? '' : 'bg-gray-100 text-gray-700 shadow-none hover:bg-gray-200'}`}
                                onClick={link.onClick}
                                primary={link.primary}
                            >
                                {link.name}
                            </GradientButton>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

/**
 * 4. Collapsible FAQ Item Component
 */
const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200">
            <button
                className="flex justify-between items-center w-full py-4 text-left font-semibold text-lg text-gray-800 hover:text-emerald-600 transition duration-150"
                onClick={() => setIsOpen(!isOpen)}
            >
                {question}
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-emerald-500' : ''}`} />
            </button>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
            >
                <p className="text-gray-600 pr-6">{answer}</p>
            </div>
        </div>
    );
};

/**
 * 5. Section Title Component
 */
const SectionTitle = ({ subtitle, title, centered = true }) => (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
        <p className="text-base font-semibold text-emerald-500 uppercase tracking-wide mb-2">{subtitle}</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            {title}
        </h2>
    </div>
);

/**
 * 6. Feature Card Component
 */
const FeatureCard = ({ icon: Icon, title, description, children, interactive = true }) => (
    <div className={`p-4 md:p-6 rounded-2xl bg-white shadow-md border border-gray-100 h-full flex flex-col
    ${interactive ? 'hover:shadow-2xl hover:border-emerald-200 transform hover:-translate-y-1 transition duration-500 ease-out' : ''}`}>
        <div className="p-3 bg-emerald-50 rounded-lg inline-block mb-4">
            <Icon className="w-7 h-7 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 flex-grow-0">{title}</h3>
        <p className="text-gray-600 flex-grow">
            {description}
        </p>
        {children && <div className="mt-6 flex-grow-0">{children}</div>}
    </div>
);

/**
 * 7. Animated Counter Component (Simulation)
 */
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const start = 0;

    // Simple animation logic triggered once the component is rendered (simulating visibility)
    useEffect(() => {
        let current = start;
        const increment = (end - start) / (duration / 16); // 16ms per frame
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(parseFloat(current.toFixed(1)));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [end, duration, start]);

    const formattedCount = count.toLocaleString('en-US', { minimumFractionDigits: suffix.includes('%') ? 1 : 0 });

    return (
        <span ref={ref} className="text-6xl font-extrabold text-emerald-600">
            {formattedCount}{suffix}
        </span>
    );
};

/**
 * 8. Testimonial Card
 */
const TestimonialCard = ({ quote, name, title }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-full flex flex-col transition duration-300 hover:shadow-xl hover:border-emerald-300">
        <MessageCircle className="w-8 h-8 text-emerald-400 mb-4" />
        <p className="text-lg italic text-gray-700 flex-grow">"{quote}"</p>
        <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="font-semibold text-gray-900">{name}</p>
            <p className="text-sm text-emerald-600">{title}</p>
        </div>
    </div>
);

/**
 * 9. AI Loading Placeholder
 */
const AILoader = () => (
    <div className="space-y-3 p-4 bg-white rounded-lg shadow-inner">
        <div className="flex items-center">
            <Loader2 className="w-5 h-5 text-emerald-500 animate-spin mr-3" />
            <span className="text-sm font-medium text-emerald-600">Analyzing medication data...</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full w-full"></div>
        <div className="h-2 bg-gray-100 rounded-full w-5/6"></div>
        <div className="h-2 bg-gray-50 rounded-full w-2/3"></div>
    </div>
);

/**
 * 10. Simulated Scroll Reveal Wrapper
 */
const ScrollRevealWrapper = ({ children, delay = 0, className = '' }) => {
    const [isVisible, setIsVisible] = useState(false);

    // Simulate visibility after initial render delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div
            className={`transition-all duration-1000 ease-out ${className}
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

// --- Section Components ---

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section id="home" className="pt-24 md:pt-32 pb-20 bg-gradient-to-br from-white to-emerald-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">

                {/* Left Content (Text) */}
                <ScrollRevealWrapper delay={0}>
                    <div className="lg:w-1/2 text-center lg:text-left mb-16 lg:mb-0">
                        <p className="text-lg text-emerald-600 font-bold mb-4 uppercase tracking-wider">
                            The Future of Patient Care
                        </p>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                            Manage Your Health, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Intuitively</span>.
                        </h1>
                        <p className="text-base md:text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                            Never miss a dose, forget a renewal, or risk an interaction. MediManage is your intelligent medication copilot.
                        </p>
                        <div className="flex justify-center lg:justify-start space-x-4">
                            <Button primary icon={Zap} onClick={() => navigate('/signup')} className="px-4 py-2 text-sm">Start Tracking Free</Button>
                            <Button primary={false} icon={ArrowRight} onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="px-4 py-2 text-sm">Explore Features</Button>
                        </div>
                    </div>
                </ScrollRevealWrapper>

                {/* Right Content: Embedded Health Logo Section */}
                <div className="lg:w-1/2 relative flex justify-center lg:justify-end mt-10 lg:mt-0">
                    <ScrollRevealWrapper delay={300}>
                        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-4 border border-emerald-100">
                            <div className="rounded-2xl overflow-hidden ring-1 ring-emerald-200/60">
                                <img
                                    src={Logo}
                                    alt="Health Monitor"
                                    className="w-full h-[260px] md:h-[300px] object-contain p-8 bg-gray-50"
                                />
                            </div>
                            <p className="mt-3 text-center text-sm text-gray-600">Your trusted healthcare companion</p>
                        </div>
                    </ScrollRevealWrapper>
                </div>
            </div>
        </section>
    );
};


const AboutSection = () => (
    <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealWrapper>
                <SectionTitle subtitle="About MediManage" title="Focusing on Patient Wellbeing" centered={true} />
            </ScrollRevealWrapper>

            <div className="grid md:grid-cols-2 gap-16 items-center">
                <ScrollRevealWrapper>
                    <div className="space-y-6 p-6 bg-gray-50 rounded-2xl shadow-inner border border-gray-100">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Seamless Integration into Your Life</h3>
                        <p className="text-base md:text-lg text-gray-600">
                            We understand that managing chronic conditions is a burden. MediManage is designed to lift that weight, offering proactive reminders and intelligent insights so you can focus on wellness, not logistics.
                        </p>

                        <ul className="space-y-4">
                            {[
                                { icon: Lock, text: "HIPAA Compliant Security & Data Protection" },
                                { icon: Users, text: "Family Profiles for Dependent Management" },
                                { icon: Repeat, text: "Seamless Integration with Pharmacy APIs for renewals" },
                            ].map((item, index) => (
                                <ScrollRevealWrapper key={item.text} delay={index * 150 + 100}>
                                    <li className="flex items-center text-gray-700 font-medium">
                                        <item.icon className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0" />
                                        {item.text}
                                    </li>
                                </ScrollRevealWrapper>
                            ))}
                        </ul>
                    </div>
                </ScrollRevealWrapper>

                <ScrollRevealWrapper delay={400}>
                    <div className="p-6 bg-emerald-50 rounded-3xl shadow-lg border border-emerald-100 flex justify-center items-center h-full min-h-[300px] relative">
                        <Ruler className="w-full h-auto text-emerald-200 opacity-70" style={{ height: '300px' }} />
                        <p className="absolute text-center text-emerald-800 font-medium">Data Visualization Mockup</p>
                    </div>
                </ScrollRevealWrapper>
            </div>
        </div>
    </section>
);

const FeaturesSection = () => {
    // State to simulate AI data fetching
    const [isLoading, setIsLoading] = useState(true);
    const [aiData, setAiData] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAiData({
                suggestion: "Based on recent sleep patterns and morning dose timing, our AI suggests shifting your 8:00 AM reminder to 8:15 AM for better consistency.",
                riskLevel: "Low Interaction Risk Detected"
            });
            setIsLoading(false);
        }, 3500);

        return () => clearTimeout(timer);
    }, []);

    const featuresData = [
        { icon: Activity, title: "Personalized Health Dashboard", description: "Monitor your real-time adherence score, log symptoms, and view upcoming appointments in one central, customizable view." },
        { icon: Clock, title: "Context-Aware Smart Reminders", description: "Reminders that know when you are home, traveling, or busy. Adjustable snooze and confirmation logging ensures accuracy." },
    ];

    return (
        <section id="features" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollRevealWrapper>
                    <SectionTitle subtitle="Core Capabilities" title="Intelligent, Interactive Features" />
                </ScrollRevealWrapper>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Map Static Features */}
                    {featuresData.map((feature, index) => (
                        <ScrollRevealWrapper key={feature.title} delay={index * 150}>
                            <FeatureCard {...feature}>
                                <div className="p-3 bg-emerald-100 rounded-xl text-center">
                                    <p className="text-xs font-medium text-emerald-800">Key Metric Today:</p>
                                    <p className="text-2xl font-extrabold text-emerald-700">94.5% Adherence</p>
                                </div>
                            </FeatureCard>
                        </ScrollRevealWrapper>
                    ))}

                    {/* Feature 3: AI Suggestions (Dynamic/Loading) */}
                    <ScrollRevealWrapper delay={300}>
                        <FeatureCard
                            icon={Zap}
                            title="Proactive AI Health Suggestions"
                            description="Harness the power of AI to cross-reference medications, check for interactions, and offer personalized wellness advice."
                            interactive={false}
                        >
                            <div className={`p-3 rounded-xl border transition duration-500 ${isLoading ? 'bg-gray-50 border-gray-200' : 'bg-teal-50 border-teal-300'}`}>
                                <h4 className="font-semibold text-sm mb-2 text-gray-700">AI Insight Center:</h4>
                                {isLoading ? (
                                    <AILoader />
                                ) : (
                                    <div className="space-y-2">
                                        <p className="text-teal-800 font-medium text-sm">
                                            <ArrowRight className="w-4 h-4 inline mr-1" />
                                            {aiData.suggestion}
                                        </p>
                                        <p className="text-xs text-gray-600 border-t pt-1 mt-2">
                                            Status: {aiData.riskLevel}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </FeatureCard>
                    </ScrollRevealWrapper>
                </div>

                {/* Expanded Feature Grid (For line count and detail) */}
                <div className="mt-20">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-8">More Tools Included in Your Subscription</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Calendar, text: "Integrated Appointment Scheduling" },
                            { icon: Lock, text: "Secure Data Sharing with Clinicians" },
                            { icon: Pill, text: "Visual Medication Inventory Tracker" },
                            { icon: Wallet, text: "Prescription Cost Comparison Tool" },
                            { icon: Users, text: "Caregiver Access & Delegation" },
                            { icon: CheckCircle, text: "Dose Confirmation Log" },
                            { icon: Bell, text: "Critical Refill Alerts" },
                            { icon: LifeBuoy, text: "24/7 Symptom Checker" },
                        ].map((item, index) => (
                            <ScrollRevealWrapper key={item.text} delay={400 + index * 50}>
                                <div className="flex items-center p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:border-emerald-300 transition duration-300">
                                    <item.icon className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0" />
                                    <span className="text-gray-700 text-sm font-medium">{item.text}</span>
                                </div>
                            </ScrollRevealWrapper>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const RenewalSection = () => {
    // Sample renewal data
    const renewalStatus = {
        name: 'Amoxicillin',
        expiring: '10 Days',
        status: 'Expiring Soon',
        statusClass: 'bg-yellow-100 text-yellow-800'
    };

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">

                    {/* Visual Renewal Element */}
                    <ScrollRevealWrapper delay={0}>
                        <div className="p-10 bg-emerald-50 rounded-3xl shadow-2xl border-4 border-emerald-300 relative overflow-hidden flex items-center justify-center min-h-[400px]">
                            <Repeat className="w-20 h-20 text-emerald-400 opacity-20 absolute transition duration-700 animate-spin-slow" />
                            <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-xl border border-gray-100">
                                <h4 className="text-lg font-semibold text-gray-800 mb-4">Renewal Request Dashboard</h4>
                                <div className="p-3 bg-red-100 border border-red-300 rounded-lg mb-4 text-sm text-red-800 font-medium">
                                    <Clock className="w-4 h-4 inline mr-2" /> Refill needed in 48 hours. ACTION REQUIRED.
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-1">{renewalStatus.name} ({renewalStatus.expiring} left)</p>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${renewalStatus.statusClass}`}>
                                        {renewalStatus.status}
                                    </span>
                                </div>

                                <GradientButton className="w-full mt-3 py-3 animate-pulse">
                                    Send One-Click Renewal
                                </GradientButton>
                            </div>
                        </div>
                    </ScrollRevealWrapper>

                    {/* Content */}
                    <ScrollRevealWrapper delay={300}>
                        <SectionTitle subtitle="Logistics Simplified" title="Effortless, One-Click Renewals" centered={false} />
                        <p className="text-xl text-gray-600 mb-8">
                            MediManage connects directly with your pharmacy and healthcare provider to automate the tedious renewal process. Approve the request with a single tap, ensuring continuity of care.
                        </p>
                        <ul className="space-y-4 mb-10">
                            <li className="flex items-start text-gray-700 font-medium"><CheckCircle className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0" /> Automated Alerts based on current inventory levels and usage tracking.</li>
                            <li className="flex items-start text-gray-700 font-medium"><CheckCircle className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0" /> Track renewal status from initial request submission to pharmacy fulfillment.</li>
                            <li className="flex items-start text-gray-700 font-medium"><CheckCircle className="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0" /> Secure digital signatures and consent process for clinical compliance.</li>
                        </ul>
                        <Button primary icon={Repeat}>Initiate Refill</Button>
                    </ScrollRevealWrapper>
                </div>
            </div>
        </section>
    );
};

const AnalyticsSection = () => (
    <section id="analytics" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealWrapper>
                <SectionTitle subtitle="Performance Metrics" title="Data-Driven Health Tracking" />
            </ScrollRevealWrapper>

            <div className="grid md:grid-cols-3 gap-12 items-center">
                {/* Stats */}
                <div className="space-y-10">
                    <ScrollRevealWrapper delay={0}>
                        <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-emerald-500">
                            <p className="text-lg text-gray-500 mb-1">Average Adherence</p>
                            <AnimatedCounter end={98.3} suffix="%" />
                        </div>
                    </ScrollRevealWrapper>
                    <ScrollRevealWrapper delay={200}>
                        <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-teal-500">
                            <p className="text-lg text-gray-500 mb-1">Doses Tracked (Total)</p>
                            <AnimatedCounter end={458000} suffix="+" />
                        </div>
                    </ScrollRevealWrapper>
                    <ScrollRevealWrapper delay={400}>
                        <div className="p-6 bg-white rounded-xl shadow-lg border-l-4 border-gray-400">
                            <p className="text-lg text-gray-500 mb-1">Active Users</p>
                            <AnimatedCounter end={34.5} suffix="K+" />
                        </div>
                    </ScrollRevealWrapper>
                </div>

                {/* Chart Illustration (Interactive Placeholder) */}
                <ScrollRevealWrapper delay={600} className="md:col-span-2">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <TrendingUp className="w-6 h-6 text-emerald-500 mr-3" />
                        Adherence Score Trend (Last 6 Months)
                    </h3>

                    <div className="p-6 bg-white rounded-xl shadow-2xl h-80 flex items-end justify-between space-x-4 border border-gray-100">
                        {/* Data points for the chart simulation */}
                        {[78, 85, 92, 88, 95, 98].map((score, index) => (
                            <div
                                key={`score-${index}`}
                                className="relative w-full h-full flex flex-col justify-end group cursor-pointer"
                            >
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 p-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    {score}%
                                </div>
                                <div
                                    className={`w-full rounded-t-lg transition-all duration-700 ease-out
                                            bg-gradient-to-t ${score > 90 ? 'from-emerald-500 to-teal-400' : 'from-emerald-300 to-teal-200'}
                                            group-hover:shadow-lg group-hover:scale-y-[1.03] origin-bottom`}
                                    style={{ height: `${score}%` }}
                                ></div>
                                <span className="text-xs text-gray-500 mt-1 text-center">Month {index + 1}</span>
                            </div>
                        ))}
                    </div>
                </ScrollRevealWrapper>
            </div>
        </div>
    </section>
);

const TestimonialsSection = () => (
    <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealWrapper>
                <SectionTitle subtitle="Loved by Users" title="What Patients Are Saying" />
            </ScrollRevealWrapper>
            
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { quote: "MediManage has completely changed how I handle my complex medication schedule. I haven't missed a dose in six months!", name: "Sarah M.", title: "Chronic Illness Patient" },
                    { quote: "The AI interaction risk checker gave me peace of mind when my doctor added a new prescription. Invaluable tool.", name: "Robert K.", title: "Geriatric Caregiver" },
                    { quote: "Seamless renewal requests and the cost comparison tool saved me time and money. Highly recommend this app.", name: "Aisha P.", title: "Busy Professional" },
                ].map((testimonial, index) => (
                    <ScrollRevealWrapper key={index} delay={index * 150}>
                        <TestimonialCard {...testimonial} />
                    </ScrollRevealWrapper>
                ))}
            </div>
        </div>
    </section>
);

const FAQSection = () => (
    <section id="faq" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollRevealWrapper>
                <SectionTitle subtitle="Need Help?" title="Frequently Asked Questions" />
            </ScrollRevealWrapper>

            <div className="space-y-4">
                {[
                    { question: "Is my medical data secure and private?", answer: "Yes. We use industry-leading encryption and are fully HIPAA compliant. Your data is never shared without your explicit consent." },
                    { question: "Can I manage multiple family members on one account?", answer: "Absolutely. MediManage supports 'Family Profiles' allowing you to manage and track medication for dependents or elderly relatives." },
                    { question: "How does the AI interaction checker work?", answer: "Our AI model cross-references your current medication list against a comprehensive drug database, flagging known and potential risks in real-time." },
                    { question: "What happens if I miss a dose reminder?", answer: "The system provides escalating reminders and logs the missed dose in your adherence report, which you can easily share with your clinician." },
                ].map((item, index) => (
                    <ScrollRevealWrapper key={index} delay={index * 150 + 100}>
                        <FAQItem {...item} />
                    </ScrollRevealWrapper>
                ))}
            </div>
        </div>
    </section>
);

const CtaSection = () => {
    const navigate = useNavigate();
    return (
        <section className="py-20 bg-emerald-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <ScrollRevealWrapper delay={0}>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        Ready to Take Control of Your Health?
                    </h2>
                    <p className="text-xl text-emerald-100 mb-10">
                        Join thousands of patients who trust MediManage to simplify their medication routine.
                    </p>
                    <GradientButton 
                        onClick={() => navigate('/signup')} 
                        className="text-lg px-8 py-4 bg-white text-emerald-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl"
                        primary={false}
                    >
                        Sign Up for Free Trial Today <ArrowRight className="w-5 h-5 ml-2" />
                    </GradientButton>
                </ScrollRevealWrapper>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-5 gap-8 border-b border-gray-700 pb-8 mb-8">
                <div className="md:col-span-2">
                    <a href="#home" className="flex items-center space-x-2 mb-4">
                        <img src={Logo} alt="MediManage logo" className="h-8 w-8 object-contain" />
                        <span className="text-2xl font-extrabold text-white">
                            Medi<span className="font-light text-emerald-400">Manage</span>
                        </span>
                    </a>
                    <p className="text-gray-400 text-sm">Your intelligent copilot for a healthier life.</p>
                </div>
                
                <div>
                    <h5 className="text-lg font-semibold mb-4 text-emerald-400">Product</h5>
                    <ul className="space-y-3 text-gray-300 text-sm">
                        <li><a href="#features" className="hover:text-emerald-300 transition">Features</a></li>
                        <li><a href="#analytics" className="hover:text-emerald-300 transition">Analytics</a></li>
                        <li><a href="#faq" className="hover:text-emerald-300 transition">FAQ</a></li>
                        <li><a href="/pricing" className="hover:text-emerald-300 transition">Pricing</a></li>
                    </ul>
                </div>
                
                <div>
                    <h5 className="text-lg font-semibold mb-4 text-emerald-400">Company</h5>
                    <ul className="space-y-3 text-gray-300 text-sm">
                        <li><a href="/about" className="hover:text-emerald-300 transition">About Us</a></li>
                        <li><a href="/careers" className="hover:text-emerald-300 transition">Careers</a></li>
                        <li><a href="/contact" className="hover:text-emerald-300 transition">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h5 className="text-lg font-semibold mb-4 text-emerald-400">Legal</h5>
                    <ul className="space-y-3 text-gray-300 text-sm">
                        <li><a href="/privacy" className="hover:text-emerald-300 transition">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-emerald-300 transition">Terms of Service</a></li>
                        <li><a href="/hipaa" className="hover:text-emerald-300 transition">HIPAA Compliance</a></li>
                    </ul>
                </div>
            </div>

            <div className="text-center md:flex md:justify-between items-center pt-8">
                <p className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} MediManage. All rights reserved.
                </p>
                <div className="flex justify-center md:justify-start space-x-4 mt-4 md:mt-0">
                    <LogOut className="w-5 h-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition" />
                    <Settings className="w-5 h-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition" />
                    <User className="w-5 h-5 text-gray-400 hover:text-emerald-400 cursor-pointer transition" />
                </div>
            </div>
        </div>
    </footer>
);

  // **THE MAIN COMPONENT IS RENAMED AND EXPORTED HERE**
  const HomePage = () => {
      return (
          <div className="min-h-screen antialiased">
              <Header />
              <main>
                  <HeroSection />
                  <AboutSection />
                  <FeaturesSection />
                  <RenewalSection />
                  <AnalyticsSection />
                  <TestimonialsSection />
                  <FAQSection />
                  <CtaSection />
              </main>
              <Footer />
          </div>
      );
  };

export default HomePage;