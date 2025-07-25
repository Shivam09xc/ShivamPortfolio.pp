
export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type SocialLink = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  dataAiHint?: string;
  techStack: string[];
  liveLink?: string;
  repoLink?: string;
};

export type Skill = {
  name: string;
  level: number; // Percentage 0-100
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  imageUrl?: string;
  dataAiHint?: string;
};

import { Github, Linkedin, Twitter } from 'lucide-react';

export const siteConfig = {
  name: "Shivam's Portfolio",
  portfolioOwnerName: "Shivam Soni",
  navItems: [
    { title: "Home", href: "#home" },
    { title: "Projects", href: "#projects" },
    { title: "Resume", href: "#resume" },
    { title: "Blog", href: "#blog" },
    { title: "Contact", href: "#contact" },
  ] as NavItem[],
  socialLinks: [
    { name: "GitHub", href: "https://github.com/your-github-username-placeholder", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com/in/your-linkedin-profile-placeholder", icon: Linkedin },
    { name: "Twitter", href: "https://twitter.com/placeholder", icon: Twitter },
  ] as SocialLink[],
  projects: [
    {
      id: "smart-print",
      title: "SmartPrint AI",
      description: "AI-powered 3D printing optimization for reduced waste and faster prints.",
      longDescription: "SmartPrint AI leverages machine learning algorithms to analyze 3D models and printing parameters, providing real-time suggestions for optimizing orientation, infill, and support structures. This results in significant material savings and reduced print times without compromising structural integrity.",
      image: "https://placehold.co/600x400.png?text=SmartPrint+AI",
      dataAiHint: "3d printer",
      techStack: ["Python", "TensorFlow", "Flask", "React", "Docker"],
      liveLink: "https://example.com/smartprint-ai-demo-placeholder",
      repoLink: "https://github.com/your-github-username-placeholder/smartprint-ai-placeholder",
    },
    {
      id: "task-manager",
      title: "Nexus Task Manager",
      description: "A collaborative task management platform with real-time updates.",
      longDescription: "Nexus Task Manager is a feature-rich application designed for teams to organize, track, and collaborate on projects. It features Kanban boards, task assignments, real-time notifications, and progress tracking, all built on a scalable cloud architecture.",
      image: "https://placehold.co/600x400.png?text=Nexus+Task+Manager",
      dataAiHint: "team collaboration",
      techStack: ["Node.js", "Express", "MongoDB", "React", "Socket.IO", "Next.js"],
      liveLink: "https://example.com/nexus-task-manager-demo-placeholder",
      repoLink: "https://github.com/your-github-username-placeholder/nexus-task-manager-placeholder",
    },
    {
      id: "iot-home",
      title: "AuraHome IoT",
      description: "Control and automate your home devices with this intuitive IoT system.",
      longDescription: "AuraHome IoT provides a centralized platform to manage and automate various smart home devices. It supports a wide range of protocols and offers features like custom scene creation, voice control integration, and energy consumption monitoring.",
      image: "https://placehold.co/600x400.png?text=AuraHome+IoT",
      dataAiHint: "smart home",
      techStack: ["ESP32", "MQTT", "Node-RED", "InfluxDB", "Grafana", "Flutter"],
      liveLink: "https://example.com/aurahome-iot-demo-placeholder",
      repoLink: "https://github.com/your-github-username-placeholder/aurahome-iot-placeholder",
    },
    {
      id: "smart-sprints",
      title: "Smart-Sprints",
      description: "A productivity application built with the MERN stack to streamline workflow and collaboration.",
      longDescription: "Smart-Sprints is designed to empower individuals and teams to manage tasks efficiently and collaborate seamlessly. It offers features like project boards, task assignments, progress tracking, and real-time updates to enhance productivity.",
      image: "https://placehold.co/600x400.png?text=Smart-Sprints",
      dataAiHint: "agile sprint",
      techStack: ["MongoDB", "Express", "React", "Node.js", "Socket.IO"],
      liveLink: "https://smart-sprints.vercel.app/",
      repoLink: "https://github.com/Shivam09xc/Smart-Sprints.git",
    },
    {
      id: "textrefine-ai",
      title: "TextRefine.AI",
      description: "An AI-powered text refinement tool for grammar, style, and clarity.",
      longDescription: "TextRefine.AI is an intelligent writing assistant designed to help users improve their written content. It goes beyond basic spell-checking by offering suggestions for grammar correction, style enhancement, tone adjustment, and overall clarity. Leveraging advanced natural language processing, it aims to make your writing more impactful and professional.",
      image: "https://placehold.co/600x400.png?text=TextRefine.AI",
      dataAiHint: "text editor",
      techStack: ["Python", "NLTK", "FastAPI", "Next.js", "Genkit"],
      repoLink: "https://github.com/Shivam09xc/TextRefine.AI",
      liveLink: "https://text-refine-ai.vercel.app/"
    },
  ] as Project[],
  skills: [
    { name: "JavaScript (ES6+)", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "React & Next.js", level: 92 },
    { name: "Node.js & Express", level: 88 },
    { name: "Python (Flask/Django)", level: 85 },
    { name: "Cloud (Firebase/AWS)", level: 80 },
    { name: "Databases (SQL/NoSQL)", level: 87 },
    { name: "DevOps (Docker/CI/CD)", level: 75 },
  ] as Skill[],
  articles: [
    {
      id: "1",
      title: "The Future of Web Development: Server Components",
      slug: "future-of-web-dev-server-components",
      date: "2024-07-15",
      excerpt: "Exploring the shift towards server components and their impact on performance and developer experience.",
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "code abstract",
    },
    {
      id: "2",
      title: "Demystifying Quantum Computing for Developers",
      slug: "quantum-computing-for-devs",
      date: "2024-06-28",
      excerpt: "A primer on quantum computing concepts and how they might influence the future of software development.",
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "quantum computer",
    },
    {
      id: "3",
      title: "Ethical AI: Building Responsible Technology",
      slug: "ethical-ai-responsible-tech",
      date: "2024-05-10",
      excerpt: "Discussing the importance of ethical considerations in AI development and deployment.",
      imageUrl: "https://placehold.co/600x400.png",
      dataAiHint: "ai ethics",
    },
  ] as Article[],
};
