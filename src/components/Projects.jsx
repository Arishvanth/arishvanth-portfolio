import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Award, X, Lightbulb, Rocket, FolderOpen, Heart, Activity, Cpu, Thermometer, ShieldCheck } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import ImageCarousel from './ImageCarousel';

// Simulated Telemetry Feed Component for Case Studies
function TelemetryWidget({ type }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const getInitialData = () => {
      switch (type) {
        case 'fishnet':
          return { rpm: 1240, volts: 12.1, flow: 1.6, packets: 1042 };
        case 'suss':
          return { fill: 42, co2: 380, parking: 12, traffic: 'AUTO_OPT' };
        case 'care':
          return { hr: 78, spo2: 98, temp: 37.1, status: 'STABLE' };
        case 'bovine':
          return { class: 'Gir Cow', prob: 98.4, speed: 78, frame: 104 };
        default:
          return {};
      }
    };

    setData(getInitialData());

    const interval = setInterval(() => {
      setData(prev => {
        switch (type) {
          case 'fishnet':
            return {
              rpm: Math.floor(1200 + Math.random() * 80),
              volts: +(11.8 + Math.random() * 0.6).toFixed(2),
              flow: +(1.4 + Math.random() * 0.4).toFixed(2),
              packets: prev.packets + 1
            };
          case 'suss':
            return {
              fill: Math.max(10, Math.min(100, Math.floor(prev.fill + (Math.random() - 0.5) * 4))),
              co2: Math.floor(370 + Math.random() * 20),
              parking: Math.max(2, Math.min(30, Math.floor(prev.parking + (Math.random() - 0.5) * 2))),
              traffic: Math.random() > 0.85 ? 'CONGEST_CLR' : 'AUTO_OPT'
            };
          case 'care':
            return {
              hr: Math.floor(74 + Math.random() * 8),
              spo2: Math.max(95, Math.min(100, Math.floor(prev.spo2 + (Math.random() - 0.5) * 1.5))),
              temp: +(36.8 + Math.random() * 0.4).toFixed(1),
              status: Math.random() > 0.9 ? 'WARNING' : 'STABLE'
            };
          case 'bovine':
            const breeds = ['Gir Cow', 'Sahiwal', 'Red Sindhi', 'Tharparkar'];
            const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
            return {
              class: Math.random() > 0.85 ? randomBreed : prev.class,
              prob: +(96.5 + Math.random() * 3).toFixed(1),
              speed: Math.floor(74 + Math.random() * 8),
              frame: prev.frame + 1
            };
          default:
            return {};
        }
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [type]);

  return (
    <div className="font-mono text-[9px] text-gray-400 bg-black/80 border border-white/5 rounded-xl p-3 shadow-inner relative overflow-hidden flex flex-col justify-between h-28 group-hover:border-red-500/20 transition-all select-none">
      <div className="flex justify-between items-center border-b border-white/10 pb-1 mb-2">
        <span className="text-red-500 font-bold tracking-widest text-[8px] uppercase">Telemetry Link</span>
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
      </div>

      {type === 'fishnet' && (
        <div className="space-y-1">
          <div className="flex justify-between"><span>TURBINE ROTATION:</span><span className="text-white font-bold">{data.rpm} RPM</span></div>
          <div className="flex justify-between"><span>INDUCED EMF:</span><span className="text-white font-bold">{data.volts} V</span></div>
          <div className="flex justify-between"><span>TIDAL VELOCITY:</span><span className="text-white font-bold">{data.flow} m/s</span></div>
          <div className="flex justify-between text-[8px] text-red-500/80"><span>TX_BUFFER_SIZE:</span><span>{data.packets} PKTS</span></div>
        </div>
      )}

      {type === 'suss' && (
        <div className="space-y-1">
          <div className="flex justify-between"><span>BIN FILL RATIO:</span><span className="text-white font-bold">{data.fill}%</span></div>
          <div className="flex justify-between"><span>CO2 POLLUTANTS:</span><span className="text-white font-bold">{data.co2} PPM</span></div>
          <div className="flex justify-between"><span>OPEN BAYS:</span><span className="text-white font-bold">{data.parking} SLOTS</span></div>
          <div className="flex justify-between text-[8px] text-red-500/80"><span>TRAFFIC_CORE:</span><span>{data.traffic}</span></div>
        </div>
      )}

      {type === 'care' && (
        <div className="space-y-1">
          <div className="flex justify-between flex-wrap"><span>PATIENT VITAL TEMP:</span><span className="text-white font-bold">{data.temp}°C</span></div>
          <div className="flex justify-between"><span>HEART FREQUENCY:</span><span className="text-white font-bold flex items-center gap-1"><Heart className="w-2.5 h-2.5 text-red-500 animate-pulse" /> {data.hr} BPM</span></div>
          <div className="flex justify-between"><span>BLOOD OX-SPO2:</span><span className="text-white font-bold">{data.spo2}%</span></div>
          <div className="flex justify-between text-[8px] text-red-500/80"><span>PRIORITY_STATE:</span><span className={data.status === 'WARNING' ? 'text-yellow-400 font-bold' : 'text-green-400'}>{data.status}</span></div>
        </div>
      )}

      {type === 'bovine' && (
        <div className="space-y-1">
          <div className="flex justify-between flex-wrap"><span>DETECTED BREED:</span><span className="text-white font-bold">{data.class}</span></div>
          <div className="flex justify-between"><span>CNN PROBABILITY:</span><span className="text-white font-bold">{data.prob}%</span></div>
          <div className="flex justify-between"><span>INFERENCE TIME:</span><span className="text-white font-bold">{data.speed} ms</span></div>
          <div className="flex justify-between text-[8px] text-red-500/80"><span>ANALYZED_FRAMES:</span><span>{data.frame}</span></div>
        </div>
      )}
    </div>
  );
}

// Interactive Signal Flow Diagram
function ArchitectureFlow({ steps }) {
  return (
    <div className="w-full overflow-x-auto scrollbar-none py-2 select-none">
      <div className="flex items-center gap-2 min-w-[340px] px-1">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center flex-1">
            <div className="p-2 border border-white/10 bg-zinc-950/80 rounded-lg text-center flex-1 hover:border-red-500/30 transition-colors shadow">
              <span className="text-[8px] font-mono tracking-wider text-gray-300 block uppercase font-bold">{step}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className="w-6 flex items-center justify-center shrink-0">
                <svg width="24" height="6" viewBox="0 0 24 6" className="text-red-600">
                  <path d="M0,3 L24,3" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="animate-pulse" />
                  <polygon points="20,0 24,3 20,6" fill="currentColor" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const featuredProjects = [
  {
    title: "Tidal Energy Powered Smart Fishnet",
    category: "Sustainable Marine Energy",
    images: ["/images/Fishnet project.jpeg"],
    telemetryType: "fishnet",
    problem: "Overfishing of unvetted species, high operating fuel costs, and absence of clean off-grid energy sources at sea.",
    solution: "A self-powering fishnet using mini hydro-induction turbines harvesting ocean currents to drive targeted LED arrays.",
    tech: ["Embedded C", "IoT Architecture", "Hydro-induction Generators", "Energy Harvesters"],
    flow: ["Hydrocurrents", "Core Turbine", "Power Harvester", "ESP32 + LEDs"],
    metrics: [
      { label: "Bycatch Avoidance", value: "45%" },
      { label: "Power Output", value: "120Wh/hr" },
      { label: "System Uptime", value: "99.8%" }
    ],
    longDesc: "This system addresses clean energy challenges in modern marine hardware. By integrating hydro-induction turbines inside fishnet structures, the flow of ocean currents generates sustainable voltage. This powers targeted light arrays that attract specific target fish species and repel endangered ones. Telemetry packets are generated locally and transmitted to the vessel hub."
  },
  {
    title: "Smart Urban Sustainability System",
    category: "IoT + Smart Infrastructure",
    images: ["/images/Smart Urban Sustainability System (SUSS).jpeg", "/images/Smart Urban Sustainability System (SUSS) price.jpeg"],
    telemetryType: "suss",
    problem: "Inefficient waste pickups, air quality drops, grid power loss, and lack of real-time multi-module urban telemetry.",
    solution: "An ESP32-WROOM edge controller managing integrated sensor nodes for smart waste, traffic loops, and solar grids.",
    tech: ["ESP32 Controller", "Python", "Data Processing", "Blynk System Integration"],
    flow: ["Urban Sensors", "ESP32 Node", "MQTT Gateway", "Central Dashboard"],
    metrics: [
      { label: "Waste Efficiency", value: "+35%" },
      { label: "Sensory Response", value: "<15ms" },
      { label: "Carbon Monitored", value: "100%" }
    ],
    longDesc: "SUSS bridges physical urban grids and central databases. Using low-latency ESP32 microcontrollers, the system aggregates ultrasonic trash metrics, air particulate values, smart parking grids, and ambient street light signals, processing them locally before cloud synchronisation to trigger active route optimisation and grid alerts."
  },
  {
    title: "CarePriority – Smart Patient Vitals System",
    category: "Healthcare + Bio-IoT System",
    images: [
      "/images/CarePriority.jpeg", 
      "/images/CarePriority old dashboard.jpeg", 
      "/images/CarePriority – Smart Patient Prioritization System working.jpeg", 
      "/images/CarePriority – Smart Patient Prioritization System hardware.jpeg",
      "/images/CarePriority – Smart Patient Prioritization System hardware1.jpeg"
    ],
    telemetryType: "care",
    problem: "Hospital triage rooms operating on first-come-first-serve, leading to delays for critical patient vital anomalies.",
    solution: "A bio-sensor priority node analyzing temp, SpO2, and heart rates to dynamically allocate emergency responses.",
    tech: ["Bio-Sensors", "Priority Algorithms", "UART Interface", "Diagnostic Hub"],
    flow: ["Bio Sensors", "Microcontroller", "Vitals Priority Log", "Nurse Alert Hub"],
    metrics: [
      { label: "Response Latency", value: "-60%" },
      { label: "Priority Speed", value: "< 1.2s" },
      { label: "Signal Precision", value: "99.4%" }
    ],
    longDesc: "CarePriority evaluates patient conditions dynamically. By mapping vital-sign signals (Heart Rate, SpO2, and Body Temperature) through a specialized hardware board, the system analyzes health severity levels in real time. It automatically pushes warnings to nursing dashboards, preventing critical oversights."
  },
  {
    title: "AI-Powered Indian Bovine Breed Classifier",
    category: "Computer Vision & Edge ML",
    images: [],
    telemetryType: "bovine",
    problem: "Manual cattle breed identification is slow, error-prone, and lacks integration with digital supply chain ledgers.",
    solution: "Using custom CNN classification layers running edge inference to detect cattle breeds from live camera feeds.",
    tech: ["Deep Learning", "Tensor Processing", "Computer Vision", "Python Architecture"],
    flow: ["Cam Sensor Feed", "Neural Edge Block", "CNN Probability", "Breed Ledger ID"],
    metrics: [
      { label: "Inference Speed", value: "78ms" },
      { label: "Model Accuracy", value: "98.4%" },
      { label: "Dataset Size", value: "10k Imgs" }
    ],
    longDesc: "An AI-driven classification pipeline built to automate cattle breed classification. By capturing live frames, normalising image matrices, and invoking a custom convolutional network (CNN), the system differentiates between indigenous Indian bovine breeds, logging coordinates and classification variables into agricultural management records."
  }
];

const otherProjects = [
  {
    title: "Enhancing Body Detection in CSSR Operations",
    category: "AI + Embedded Security",
    images: ["/images/Enhancing Body Detection in CSSR Operations using Advanced Technology (SIH Project) demo1.jpeg", "/images/Enhancing Body Detection in CSSR Operations using Advanced Technology (SIH Project) demo2.jpeg"],
    problem: "Rescue teams struggle to detect survivors in disaster zones due to low visibility, debris, and time constraints.",
    solution: "Use thermal drones + AI to detect human presence and prioritize rescue operations.",
    tech: ["Computer Vision", "Thermal AI", "Hardware Setup"],
    longDesc: "A smart disaster response system that integrates thermal imaging and AI to identify human heat signatures in real time. The system differentiates between live and non-live bodies, enabling faster and safer rescue operations."
  },
  { 
    title: "Cheek Gesture-Controlled Wheelchair System", 
    category: "Healthcare + Assistive AI",
    images: ["/images/Cheek Gesture based wheelchair.jpeg"],
    problem: "Paralysed individuals cannot use traditional wheelchair controls.",
    solution: "Control wheelchair using cheek/facial gestures.",
    tech: ["Gesture Recognition", "Hardware Integ", "Wireless Comm"],
    longDesc: "This assistive system uses sensors to detect facial movements and convert them into navigation commands, enabling hands-free mobility for individuals with severe physical limitations."
  },
  { 
    title: "Cheek Gesture-Based Health Monitoring Wheelchair", 
    category: "Healthcare + Embedded IoT",
    images: [],
    problem: "Wheelchairs lack health monitoring and emergency alert systems.",
    solution: "Combine gesture control + real-time health monitoring.",
    tech: ["Sensors", "IoT Data", "Alert Algorithms", "Microcontroller"],
    longDesc: "An advanced wheelchair system integrating movement control with health sensors. It monitors vital parameters and triggers alerts emergencies, improving safety for elderly and paralysed users."
  },
  { 
    title: "Crop Health Detection System", 
    category: "Smart Agriculture",
    images: [],
    problem: "Farmers struggle to detect diseases early, leading to crop loss.",
    solution: "Use image processing and ML to detect plant diseases.",
    tech: ["Image Processing", "ML", "Edge Compute", "Vision"],
    longDesc: "A smart agriculture system that analyzes leaf images to identify diseases at early stages. It helps farmers take timely action and improve crop yield."
  },
  { 
    title: "Smart Environment Monitoring System", 
    category: "IoT Systems",
    images: ["/images/Smart Enviromental monitoring system.jpeg", "/images/IoT-Based Smart Environment Monitoring & Alert System blynk setup.jpeg"],
    problem: "Environmental conditions are not monitored continuously, leading to pollution risks and unsafe conditions.",
    solution: "Use IoT sensors to monitor and alert in real time.",
    tech: ["Arduino", "Sensors", "Cloud Sync", "Data Logging"],
    longDesc: "An IoT-based system that tracks environmental parameters like temperature, humidity, and air quality. It provides real-time alerts and supports data-driven environmental monitoring."
  },
  { 
    title: "High-Speed Line Follower Robot", 
    category: "Robotics",
    images: [
      "/images/Fastest line following robot Gyan mitra pic.jpeg", 
      "/images/Fastest line following robot Gyan mitra price.jpeg", 
      "/images/Fastest line following robot erode.jpeg"
    ],
    problem: "Traditional robots lack speed and efficiency in path tracking.",
    solution: "Develop a high-speed, optimized line-following robot.",
    tech: ["PID Tuning", "Motor Calibration", "Embedded C"],
    longDesc: "A fast autonomous robot that uses sensor feedback and control algorithms to follow paths accurately at high speeds, improving efficiency in robotic navigation tasks."
  },
  { 
    title: "AQUA-SENSE: Water Quality & Disease Alert System", 
    category: "IoT + Public Health",
    images: ["/images/IoT-Based Smart Environment Monitoring & Alert System hardware setup.jpeg", "/images/IoT-Based Smart Environment Monitoring & Alert System email alert.jpeg"],
    problem: "Unsafe water leads to waterborne diseases and health risks.",
    solution: "Monitor water quality and provide early alerts using IoT.",
    tech: ["ESP32", "Hardware Integration", "Algorithms"],
    longDesc: "AQUA-SENSE is an IoT-driven system that monitors water parameters like pH and turbidity. It predicts potential health risks and alerts users, ensuring safe water consumption."
  },
  { 
    title: "Low-Voltage Line Breakage Detection System", 
    category: "Hardware Grid Security",
    images: [],
    problem: "Electrical faults go unnoticed, causing power loss and safety hazards.",
    solution: "Detect voltage drops and trigger instant alerts.",
    tech: ["Grid Sensors", "Signal Analysys", "Telemetry"],
    longDesc: "A safety system that continuously monitors electrical lines and detects breakages or faults. It enhances reliability and prevents accidents in power systems."
  },
  { 
    title: "AI-Powered Receipt Management Platform", 
    category: "FinTech + AI",
    images: ["/images/Backend With Java working.jpeg", "/images/Backend With Java.jpeg", "/images/Backend With Java1.jpeg"],
    problem: "Manual expense tracking is time-consuming and inaccurate.",
    solution: "Use AI to extract and analyze receipt data automatically.",
    tech: ["Computer Vision", "OCR", "Data Analytics Workflows"],
    longDesc: "A fintech platform that uses OCR and AI to extract data from receipts, categorize expenses, and provide financial insights. It simplifies expense tracking and improves financial awareness."
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Lock body scroll when modal is open
  if (selectedProject) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <section id="projects" className={`py-24 px-6 lg:px-12 xl:px-20 relative w-full max-w-7xl mx-auto ${selectedProject ? 'z-[100]' : 'z-10'}`}>
      
      {/* Patent & Publications Highlight */}
      <div className="mb-12">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold flex items-center gap-4 text-white"
        >
          <Lightbulb className="text-red-500 w-8 h-8 md:w-10 md:h-10" />
          <span>Patent <span className="text-gradient">& Research</span></span>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-red-900/40 to-transparent max-w-xs rounded hidden md:block"></div>
        </motion.h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
        {/* Patent Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative hover:scale-[1.01] transition-transform cursor-pointer h-full"
          onClick={() => setSelectedProject({
            title: "RFID-Based Access Control System",
            category: "Patent & Innovation",
            problem: "Traditional access control systems lack robust and scalable hardware integration.",
            solution: "A robust embedded security solution utilizing RFID-based authentication for secure, real-world access control applications.",
            tech: ["RFID Reader", "SPI bus protocols", "Microcontrollers", "EEPROM registers"],
            images: ["/images/Patent.jpeg"],
            longDesc: "This patent (No: 202541021013 A) outlines an innovative approach to embedded security. By tying raw RFID authentication into a highly scalable microcontroller framework, it presents a robust method for real-world access control applications and facilities management."
          })}
        >
          <div className="absolute -inset-[1px] bg-gradient-to-r from-red-950 via-red-600/40 to-red-950 rounded-2xl blur-sm opacity-50"></div>
          <div className="relative bg-black/60 border border-white/10 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 group h-full hover:border-red-500/40 shadow-2xl transition-all">
            {/* Scanned Badge Grid */}
            <div className="w-24 h-24 overflow-hidden rounded-xl border border-red-500/30 flex items-center justify-center bg-black/80 shadow-[0_0_20px_rgba(255,26,26,0.3)] group-hover:scale-105 transition-transform relative">
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 via-transparent to-red-500/20 z-10 animate-pulse pointer-events-none" />
              <img src="/images/Patent.jpeg" alt="Patent Image" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-red-500 mb-2">
                <Award className="w-5 h-5" />
                <span className="font-mono font-bold tracking-widest uppercase text-xs">Official Patent Approved</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-100 transition-colors">RFID-Based Access Control System</h3>
              <p className="text-red-400 font-mono text-xs mb-3">ID: 202541021013 A</p>
              <p className="text-gray-400 font-light text-sm">
                Vetted embedded authentication network designed to encrypt and manage access signals.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Journal Publication Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="relative hover:scale-[1.01] transition-transform cursor-pointer h-full"
          onClick={() => setSelectedProject({
            title: "AQUA-SENSE Water Quality Monitoring",
            category: "Academic Journal",
            problem: "Contributions to the academic community often lack practical hardware validation.",
            solution: "Published comprehensive research detailing the intersection of IoT arrays and predictive algorithms.",
            tech: ["Data Synthesis", "AQUA-SENSE Nodes", "Environmental Science"],
            images: ["/images/Journal Publication.jpeg"],
            longDesc: "A rigorously vetted academic contribution that formalizes my experimental findings in the scalable IoT analytics sector, pushing the boundary of documented knowledge in my university cohort."
          })}
        >
          <div className="absolute -inset-[1px] bg-gradient-to-r from-red-950 via-red-600/40 to-red-950 rounded-2xl blur-sm opacity-50"></div>
          <div className="relative bg-black/60 border border-white/10 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 group h-full hover:border-red-500/40 shadow-2xl transition-all">
            <div className="w-24 h-24 overflow-hidden rounded-xl border border-red-500/30 flex items-center justify-center bg-black/80 shadow-[0_0_20px_rgba(255,26,26,0.3)] group-hover:scale-105 transition-transform relative">
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 via-transparent to-red-500/20 z-10 animate-pulse pointer-events-none" />
              <img src="/images/Journal Publication.jpeg" alt="Journal Image" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-red-500 mb-2">
                <Award className="w-5 h-5" />
                <span className="font-mono font-bold tracking-widest uppercase text-xs">Research Journal Published</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-100 transition-colors">AQUA-SENSE Water Analytics</h3>
              <p className="text-red-400 font-mono text-xs mb-3">Academic Vetted Paper</p>
              <p className="text-gray-400 font-light text-sm">
                Documented study detailing low-latency sensor grids linked with predictive water safety logs.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Featured Projects Header */}
      <div className="mb-16">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-4 text-white"
        >
          <Rocket className="text-red-500 w-8 h-8 md:w-10 md:h-10" />
          <span>Featured <span className="text-gradient">Case Studies</span></span>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-red-900/40 to-transparent max-w-xs rounded hidden md:block"></div>
        </motion.h2>
        <p className="text-gray-400 font-light max-w-2xl text-sm mt-2">
          Explore complete hardware-software co-designs bridging edge controllers, active machine learning classifiers, and remote dashboards.
        </p>
      </div>

      {/* Featured Projects - Immersive Horizontal Layouts */}
      <div className="space-y-24 mb-32">
        {featuredProjects.map((project, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 items-stretch group bg-black/40 border border-white/5 p-6 sm:p-8 md:p-10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.4)] hover:border-red-500/20 transition-all`}
          >
            {/* Visual Panel: Image & Telemetry console */}
            <div className="w-full lg:w-[45%] flex flex-col gap-6 justify-between shrink-0">
              
              {/* Project Image Carousel Wrapper */}
              <div 
                className="w-full aspect-video relative overflow-hidden rounded-2xl border border-white/10 group-hover:border-red-500/30 transition-colors shadow-2xl bg-zinc-950 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="absolute inset-0 bg-red-900/10 group-hover:bg-transparent transition-colors z-20 pointer-events-none mix-blend-overlay"></div>
                
                {project.images && project.images.length > 0 ? (
                  <ImageCarousel images={project.images} />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 font-mono text-xs p-4 bg-zinc-950">
                    <Cpu className="w-10 h-10 text-red-500/40 mb-3 animate-pulse" />
                    <span>NEURAL STACK ACTIVE // IMAGE UNAVAILABLE</span>
                  </div>
                )}
                
                {/* Tech tag overlay */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded border border-red-500/20 text-[9px] font-mono text-red-500 z-30 uppercase font-bold tracking-widest">
                  {project.category}
                </div>
              </div>

              {/* Simulated active telemetry screen */}
              <TelemetryWidget type={project.telemetryType} />
            </div>

            {/* Content Panel: Details & System diagram */}
            <div className="w-full lg:w-[55%] flex flex-col justify-between space-y-6 pt-4 lg:pt-0">
              
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <h3 
                    className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-red-200 transition-colors cursor-pointer leading-tight"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.title}
                  </h3>
                </div>

                {/* Split Problems & Solutions blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-white/5 bg-zinc-950/40 relative">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-red-500 block mb-2 uppercase">CORE DILEMMA</span>
                    <p className="text-gray-400 font-light text-xs leading-relaxed">{project.problem}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-zinc-950/40 relative">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-green-400 block mb-2 uppercase">ENGINEERED INTEGRATION</span>
                    <p className="text-gray-400 font-light text-xs leading-relaxed">{project.solution}</p>
                  </div>
                </div>

                {/* Interactive Signal Flow Diagram */}
                <div className="pt-2">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-gray-500 block mb-2 uppercase">PIPELINE ROUTING STACK</span>
                  <ArchitectureFlow steps={project.flow} />
                </div>
              </div>

              {/* Bottom footer: Tech pills, metrics, and launch */}
              <div className="space-y-5 pt-4 border-t border-white/5">
                {/* Visual Impact Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {project.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="text-center p-2 bg-red-950/10 border border-red-500/10 rounded-lg group-hover:border-red-500/20 transition-all">
                      <span className="text-white font-mono font-extrabold text-base sm:text-lg block tracking-tighter">{metric.value}</span>
                      <span className="text-[8px] font-mono text-gray-500 uppercase tracking-wider block">{metric.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills & case study button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5 max-w-sm">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-[9px] font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded border border-white/10 hover:border-red-500/20 transition-all">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-red-900/60 text-xs font-mono text-white tracking-widest uppercase hover:bg-red-950/30 hover:border-red-500/50 transition-all shadow-[0_0_15px_rgba(255,26,26,0.05)] cursor-pointer group shrink-0"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    <span>Open Case Diagnostics</span>
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

      {/* Other Projects Grid */}
      <div className="mb-16">
        <motion.h3 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-white mb-8 border-l-4 border-red-500 pl-4 flex items-center gap-3"
        >
          <FolderOpen className="text-red-500 w-6 h-6" />
          <span>Other Notable <span className="text-gradient">Hardware Operations</span></span>
        </motion.h3>

        {/* 2 COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherProjects.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedProject(project)}
              className="bg-[#070707] border border-white/10 p-6 rounded-2xl hover:border-red-500/40 hover:shadow-[0_0_25px_rgba(139,0,0,0.15)] transition-all cursor-pointer group flex flex-col gap-4 shadow-xl relative"
            >
              {/* Scanline circuit overlay */}
              <div className="hud-scanline" />
              
              {/* Image Carousel integrated right into the card! */}
              <div className="w-full aspect-video overflow-hidden rounded-xl border border-white/5 relative bg-zinc-900">
                <div className="absolute inset-0 bg-red-900/10 group-hover:bg-transparent transition-colors z-20 pointer-events-none mix-blend-overlay"></div>
                {project.images && project.images.length > 0 ? (
                  <ImageCarousel images={project.images} />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 font-mono text-[10px]">
                    <Cpu className="w-6 h-6 text-red-500/30 mb-2 animate-pulse" />
                    <span>SYSTEM COMPONENT</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2 flex-grow">
                <p className="text-red-500 font-mono text-[9px] uppercase tracking-widest font-bold">{project.category}</p>
                <h4 className="font-bold text-lg text-gray-100 group-hover:text-white transition-colors">{project.title}</h4>
                <p className="text-gray-400 font-light text-xs line-clamp-2 leading-relaxed">{project.problem}</p>
              </div>
              
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-[8px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 99999 }}
            className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedProject(null)}
            ></div>
            
            <motion.div 
              initial={{ y: 50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-2xl overflow-y-auto max-h-[90vh] shadow-[0_0_50px_rgba(255,26,26,0.3)] flex flex-col md:flex-row z-10"
            >
              {/* HUD scan overlay */}
              <div className="hud-scanline" />
              
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/60 hover:bg-red-600 rounded-full transition-colors backdrop-blur-md border border-white/10 cursor-pointer text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-full md:w-1/2 bg-black relative border-b md:border-b-0 md:border-r border-white/10 min-h-[300px]">
                {selectedProject.images && selectedProject.images.length > 0 ? (
                  <div className="absolute inset-0">
                    <ImageCarousel images={selectedProject.images} />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/80 text-gray-500 font-mono text-xs">
                    <Cpu className="w-12 h-12 text-red-500/20 mb-3 animate-pulse" />
                    <span>DIAGNOSTIC VISUAL UNAVAILABLE</span>
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-10 space-y-6 flex flex-col justify-center bg-black/90">
                <div>
                  <p className="text-red-500 font-mono text-xs tracking-wider uppercase mb-2 font-bold">{selectedProject.category}</p>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">{selectedProject.title}</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-red-500 font-mono text-[9px] font-bold uppercase block mb-1">THE DILEMMA</span>
                    <p className="text-gray-300 font-light text-xs leading-relaxed">{selectedProject.problem}</p>
                  </div>
                  <div>
                    <span className="text-green-400 font-mono text-[9px] font-bold uppercase block mb-1">ENGINEERED OUTCOME</span>
                    <p className="text-gray-300 font-light text-xs leading-relaxed">{selectedProject.solution}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="text-white font-mono text-[9px] font-bold uppercase block mb-2">COMPLETE CASE SPECS</span>
                  <p className="text-gray-400 font-light text-xs leading-relaxed">
                    {selectedProject.longDesc || "System description is active. This project incorporates custom PCB circuitry design, low-level firmware integration, telemetry serialization and multi-sensor calibration protocols."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedProject.tech && selectedProject.tech.map((t, i) => (
                    <span key={i} className="text-[8px] font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
