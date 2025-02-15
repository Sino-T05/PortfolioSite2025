import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Briefcase, User, Moon, Sun, Menu, X, Instagram, Trash, ThumbsUp, ThumbsDown } from 'lucide-react';
import { TwitterIcon, FacebookIcon, InstagramIcon } from '@heroicons/react/outline';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const menuRef = useRef(null);

  const [projects, setProjects] = useState([
    {
      title: "E-Commerce Platform",
      description: "A full-featured online store built with Next.js, Stripe, and MongoDB",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
      likes: 0,
      dislikes: 0,
    },
    // ... other projects
  ]);




  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Update class on document element
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.querySelector('.flex.overflow-x-auto');
      const boxWidth = document.querySelector('.project-card')?.clientWidth || 0;
      const scrollPosition = scrollContainer?.scrollLeft || 0;

      // Calculate the new index based on the scroll position
      const newIndex = Math.floor(scrollPosition / boxWidth);

      // Ensure the index does not exceed the number of dots (4)
      if (newIndex >= 0 && newIndex < 4) {
        setCurrentIndex(newIndex);
      }
    };

    const scrollContainer = document.querySelector('.flex.overflow-x-auto');
    scrollContainer?.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, [projects]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'd') {  // Check if the "D" key is pressed
        setDarkMode(prevMode => !prevMode);  // Toggle dark mode state
      }
    };

    window.addEventListener('keydown', handleKeyPress);  // Add event listener

    return () => {
      window.removeEventListener('keydown', handleKeyPress);  // Clean up event listener
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg backdrop-saturate-150 border-b border-gray-200/10 dark:border-gray-800/10 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="text-xl font-bold text-[#15BC98] dark:text-[#15BC98]">AM</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Rearranged navigation items */}
              <a href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-[#15BC98] transition-colors duration-300 relative group">
                Home
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#15BC98] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>

              <a href="#about"
                className="text-gray-700 dark:text-gray-300 hover:text-[#15BC98] transition-colors duration-300 relative group">
                About Me
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#15BC98] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>

              <a href="#projects"
                className="text-gray-700 dark:text-gray-300 hover:text-[#15BC98] transition-colors duration-300 relative group">
                Projects
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#15BC98] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>

              <a href="#experience"
                className="text-gray-700 dark:text-gray-300 hover:text-[#15BC98] transition-colors duration-300 relative group">
                Work Experience
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#15BC98] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>

              <a href="#skills"
                className="text-gray-700 dark:text-gray-300 hover:text-[#15BC98] transition-colors duration-300 relative group">
                Skills
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#15BC98] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-800/30 transition-all duration-300"
              >
                {darkMode ? (
                  <Sun className="text-[#15BC98]" size={20} />
                ) : (
                  <Moon className="text-gray-700 dark:text-gray-300" size={20} />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/30 transition-all duration-300"
              >
                {isMenuOpen ? (
                  <X className="text-green-600 dark:text-gray-300" size={24} />
                ) : (
                  <Menu className="text-white dark:text-gray-300" size={24} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg rounded-lg mt-2">
                <a href="#"
                  className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-[#15BC98]/10 hover:text-[#15BC98] transition-all duration-300">
                  Home
                </a>
                <a href="#about"
                  className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-[#15BC98]/10 hover:text-[#15BC98] transition-all duration-300">
                  About Me
                </a>
                <a href="#projects"
                  className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-[#15BC98]/10 hover:text-[#15BC98] transition-all duration-300">
                  Projects
                </a>
                <a href="#experience"
                  className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-[#15BC98]/10 hover:text-[#15BC98] transition-all duration-300">
                  Work Experience
                </a>
                <a href="#skills"
                  className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-[#15BC98]/10 hover:text-[#15BC98] transition-all duration-300">
                  Skills
                </a>

                {/* Mobile Dark Mode Toggle */}
                <div className="px-3 py-2 flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-800/30 transition-all duration-300"
                  >
                    {darkMode ? (
                      <Sun className="text-[#15BC98]" size={20} />
                    ) : (
                      <Moon className="text-gray-700 dark:text-gray-300" size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center relative px-4 sm:px-6 lg:px-8 pt-16">
        <div className="absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            backgroundImage: `
                 linear-gradient(180deg, ${darkMode ? '#1a1a1a' : '#fafafa'} 0, ${darkMode ? 'hsla(0, 0%, 10%, 0)' : 'hsla(0, 0%, 98%, 0)'} 50%), 
                 radial-gradient(51% 51% at -11% 9%, #ff57dda1 1%, #ff57dd00 100%), 
                 radial-gradient(51% 67% at 115% 96%, #ff57dda1 0, #ff57dd00 100%), 
                 radial-gradient(50% 66% at 50% 50%, #f2ff61a3 0, #f2ff6100 100%), 
                 radial-gradient(22% 117% at 2% 87%, #00f3ba00 20%, #00f3ba94 100%), 
                 linear-gradient(0deg, #61cdffa3, #61cdffa3)
               `,
            opacity: darkMode ? '0.8' : '1',
            animation: 'backgroundWave 4s infinite alternate',
          }}
        />
        <style>
          {`
            @keyframes backgroundWave {
              0% {
                background-color: #1a1a1a; /* Dark color */
              }
              100% {
                background-color: #fafafa; /* Light color */
              }
            }
          `}
        </style>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="text-center">
            {/* For desktop: inline text */}
            <div className="md:hidden">
              <h1 className="text-4xl font-bold mb-2 animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                Welcome to my Portfolio Website.
              </h1>

              




            </div>

            <h1 className="hidden md:block text-5xl font-bold">
              <span className="gradient-text">Hi, I&apos;m Ashish Muchahary</span>
            </h1>
            <h1 className="text-5xl font-bold md:hidden text-[30px]">
              <span className="gradient-text">Hi, I&apos;m Ashish Muchahary</span>
            </h1>
          </div>
          <p className="text-xl sm:text-2xl text-white mb-8">
            Full Stack Developer passionate about creating impactful web solutions
          </p>

          {/* Social Media Icons Section */}
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://github.com/Sino-T05" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
              <Github size={32} />
            </a>
            <a href="https://linkedin.com/in/ashish-muchahary" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
              <Linkedin size={32} />
            </a>
            <a href="mailto:ashish.muchahary@example.com" className="hover:text-green-600">
              <Mail size={32} />
            </a>
            <a href="https://instagram.com/your-username" target="_blank" rel="noopener noreferrer" className="hover:text-green-600">
              <Instagram size={32} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900 px-4 sm:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">About Me</h2>
        <div className="flex flex-col md:flex-row items-center gap-12 mt-8">
          <div className="relative w-72 h-72 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#15BC98] via-emerald-400 to-teal-400 animate-spin-slow 
                         group-hover:from-teal-400 group-hover:to-[#15BC98] group-hover:animate-spin transition-all duration-500"></div>
            <div className="absolute inset-[3px] rounded-full bg-white dark:bg-gray-900 group-hover:scale-[0.98] transition-transform duration-300"></div>
            <img
              src="/public/images/IMG_20231231_102740.jpg"
              alt="Profile"
              className="absolute inset-[6px] rounded-full object-cover w-[calc(100%-12px)] h-[calc(100%-12px)]
                       group-hover:scale-[1.02] transition-transform duration-300 animate-float"
              style={{
                objectPosition: "center 20%"  // Adjust this to better frame your face
              }}
            />
            <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#15BC98] blur-[1px]"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-[#15BC98] blur-[1px]"></div>
          </div>

          <div className="flex-1 text-center">
            <p className="text-lg leading-relaxed glow-text dark:text-white">
              I'm Ashish Muchahary....and i am currently a final year computer science student. Currently exploring full Stack Development with a strong foundation in frontend technologies.
              My expertise lies in creating responsive web applications using modern frameworks and best practices.
              I'm passionate about writing clean, efficient code and building user-friendly interfaces.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-500 text-white p-4 rounded-md max-w-xs">
                <h3 className="text-lg font-bold">Frontend</h3>
                <p>Expertise in HTML, CSS, JavaScript, and frameworks like React.</p>
              </div>
              <div className="bg-green-500 text-white p-4 rounded-md max-w-xs">
                <h3 className="text-lg font-bold">Backend</h3>
                <p>Proficient in Node.js, Express, and database management.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}

      <section id="projects" className="relative py-20 bg-white dark:bg-gray-900">


        {/* Background with gradient - adjusts for dark mode */}
        <div className="absolute inset-0 transition-opacity duration-300"
          style={{
            backgroundImage: `
                 linear-gradient(180deg, ${darkMode ? '#1a1a1a' : '#fafafa'} 0, ${darkMode ? 'hsla(0, 0%, 10%, 0)' : 'hsla(0, 0%, 98%, 0)'} 50%), 
                 radial-gradient(51% 51% at -11% 9%, #ff57dda1 1%, #ff57dd00 100%), 
                 radial-gradient(51% 67% at 115% 96%, #ff57dda1 0, #ff57dd00 100%), 
                 radial-gradient(50% 66% at 50% 50%, #f2ff61a3 0, #f2ff6100 100%), 
                 radial-gradient(22% 117% at 2% 87%, #00f3ba00 20%, #00f3ba94 100%), 
                 linear-gradient(0deg, #61cdffa3, #61cdffa3)
               `,
            opacity: darkMode ? '0.8' : '1',
          }}
        />

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center z-10">
            Projects</h2>
          {/* Projects grid with glass effect */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-Commerce Platform",
                description: "A full-featured online store built with Next.js, Stripe, and MongoDB",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
                likes: 0,
                dislikes: 0,
              },
              {
                title: "Task Management App",
                description: "Real-time task management application using React and Firebase",
                image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80",
                likes: 0,
                dislikes: 0,
              },
              {
                title: "Weather Dashboard",
                description: "Interactive weather application using React and OpenWeather API",
                image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80",
                likes: 0,
                dislikes: 0,
              },
              {
                title: "Social Media Analytics",
                description: "Analytics dashboard for social media metrics using MERN stack",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
                likes: 0,
                dislikes: 0,
              }
            ].map((project, index) => (
              <div key={index} className="project-card bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-xl p-6 
                                    shadow-lg hover:shadow-xl transition-all duration-300
                                    border border-white/20 dark:border-gray-800/20
                                    animate-float">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex gap-2">
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-800"
                    >
                      <Github size={16} />
                      Source
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-sm text-green-600 hover:text-green-800 ml-4"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  </div>
                </div>
                {/* Like and Dislike Buttons with Counters */}
                <div className="flex justify-end mt-4">
                  <button
                    className="flex items-center text-green-600 hover:text-green-800 hover:scale-110 transition-transform duration-300"
                    onClick={() => {
                      project.likes += 1; // Increment likes
                      setProjects([...projects]); // Update state
                    }}
                  >
                    👍 {project.likes}
                  </button>
                  <button
                    className="flex items-center text-red-600 hover:text-red-800 hover:scale-110 transition-transform duration-300"
                    onClick={() => {
                      project.dislikes += 1; // Increment dislikes
                      setProjects([...projects]); // Update state
                    }}
                  >
                    👎 {project.dislikes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-white dark:bg-gray-900" id="experience">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 flex items-center gap-2 justify-center">
            <Briefcase className="text-green-600" />
            Work Experience
          </h2>
          <div className="space-y-8">
            {[
              {
                company: '-----',
                role: 'Full Stack',
                period: '2024 - 2025',
                description: 'Developed a full-stack event management system using the MERN stack, enabling seamless event creation, management, and user engagement. Designed an intuitive UI with React, built a scalable backend with Node.js and Express, and implemented a robust database structure with MongoDB. Integrated authentication, real-time updates, and responsive design for an enhanced user experience.',
              },
              {
                company: '-----',
                role: 'Frontend',
                period: '2023 - present',
                description: 'Developed and maintained client-facing applications using React, Next.js.',
              },
            ].map((job, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 p-6 bg-gray-50 rounded-lg">
                <div className="md:w-1/4">
                  <h3 className="font-bold text-gray-900">{job.company}</h3>
                  <p className="text-green-600">{job.period}</p>
                </div>
                <div className="md:w-3/4">
                  <h4 className="font-semibold text-gray-900 mb-2">{job.role}</h4>
                  <p className="text-gray-600">{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 bg-white dark:bg-gray-900">

        {/* Background with gradient - adjusts for dark mode */}
        <div className="absolute inset-0 transition-opacity duration-300"
          style={{
            backgroundImage: `
                 linear-gradient(180deg, ${darkMode ? '#1a1a1a' : '#fafafa'} 0, ${darkMode ? 'hsla(0, 0%, 10%, 0)' : 'hsla(0, 0%, 98%, 0)'} 50%), 
                 radial-gradient(51% 51% at -11% 9%, #ff57dda1 1%, #ff57dd00 100%), 
                 radial-gradient(51% 67% at 115% 96%, #ff57dda1 0, #ff57dd00 100%), 
                 radial-gradient(50% 66% at 50% 50%, #f2ff61a3 0, #f2ff6100 100%), 
                 radial-gradient(22% 117% at 2% 87%, #00f3ba00 20%, #00f3ba94 100%), 
                 linear-gradient(0deg, #61cdffa3, #61cdffa3)
               `,
            opacity: darkMode ? '0.8' : '1',
          }}
        />

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center z-10">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                skill: "JavaScript",
                percentage: 90,
              },
              {
                skill: "TypeScript",
                percentage: 80,
              },
              {
                skill: "React",
                percentage: 85,
              },
              {
                skill: "Node.js",
                percentage: 75,
              },
              {
                skill: "CSS",
                percentage: 80,
              },
              {
                skill: "Tailwind CSS",
                percentage: 75,
              },
            ].map(({ skill, percentage }, index) => (
              <div key={index} className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-xl p-6 
                                    shadow-lg hover:shadow-xl transition-all duration-300
                                    border border-white/20 dark:border-gray-800/20
                                    animate-float">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{skill}</h3>
                <div className="flex justify-center">
                  <svg width="80" height="80">
                    <circle cx="40" cy="40" r="35" stroke="#e0e0e0" strokeWidth="5" fill="none" />
                    <circle
                      cx="40"
                      cy="40"
                      r="35"
                      stroke={percentage < 30 ? 'red' : percentage < 75 ? 'yellow' : 'green'}
                      strokeWidth="5"
                      fill="none"
                      strokeDasharray="100 100"
                      strokeDashoffset="100"
                      className="progress-circle"
                      style={{
                        animation: `draw ${percentage / 100 * 8}s ease-in-out forwards`,
                      }}
                    />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-gray-900 dark:text-white font-bold">
                      {percentage}%
                    </text>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900" id="contact">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Get In Touch</h2>
          <p className="text-gray-600 mb-8">
            I'm currently open to new opportunities and would love to hear about your project ideas or potential collaborations.
          </p>
          <a
            href="mailto:xyz@example.com"
            className="flex items-center gap-2 px-6 py-3 bg-[#15BC98] text-white rounded-lg
                     hover:bg-[#15BC98]/90 transform hover:-translate-y-1 hover:shadow-lg
                     transition-all duration-300"
          >
            <Mail size={20} />
            Contact Me
          </a>
          <div className="flex justify-center items-center mb-8 mt-20">
            <input
              type="text"
              placeholder="Write your review..."
              className="border border-gray-300 rounded-l-lg p-2 w-1/2"
            />
            <button
              className="bg-[#15BC98] text-white rounded-r-lg px-4 py-2 hover:bg-[#15BC98]/90 transition-all duration-300"
              onClick={() => {
                // Handle submit action here
              }}
            >
              Submit
            </button>
          </div>

          {/* Review Cards Section */}
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Anonymous reviews</h3>
          <div className="relative">
            <div className="flex overflow-x-auto space-x-4 pb-4 hide-scrollbar">
              <style>
                {`
                  .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                  .hide-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                  }
                `}
              </style>
              {[
                { id: 1, text: "Great service and support!", likes: 0, dislikes: 0 },
                { id: 2, text: "Amazing experience, highly recommend!", likes: 0, dislikes: 0 },
                { id: 3, text: "Professional and efficient!", likes: 0, dislikes: 0 },
                { id: 4, text: "Loved the attention to detail!", likes: 0, dislikes: 0 },
                { id: 5, text: "Will definitely come back!", likes: 0, dislikes: 0 },
                { id: 6, text: "Fantastic experience, would use again!", likes: 0, dislikes: 0 },
              ].map((review, index) => (
                <div key={review.id} className="min-w-[200px] h-40 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between">
                  <p className="text-gray-700 dark:text-gray-300">{review.text}</p>
                  <div className="flex justify-between mt-2">
                    <div className="flex gap-2">
                      <button
                        className="text-green-600 hover:text-green-800 hover:scale-110 transition-transform duration-300"
                        onClick={() => {
                          review.likes += 1; // Increment likes
                          setReviews([...reviews]); // Update state
                        }}
                      >
                        <ThumbsUp size={16} /> {review.likes}
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 hover:scale-110 transition-transform duration-300"
                        onClick={() => {
                          review.dislikes += 1; // Increment dislikes
                          setReviews([...reviews]); // Update state
                        }}
                      >
                        <ThumbsDown size={16} /> {review.dislikes}
                      </button>
                    </div>
                    <button
                      className="bg-red-600 text-white rounded px-2 py-1"
                      style={{ hover: { backgroundColor: '#15BC98' } }}
                      onClick={() => {
                        // Handle delete review logic here
                        setReviews(reviews.filter(r => r.id !== review.id)); // Remove review
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#15BC98'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'red'}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Dot Indicators */}
            <div className="flex justify-center mt-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-green-800' : 'bg-transparent'} mx-1`}></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white">© {new Date().getFullYear()} Ashish Muchahary. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;