import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { motion } from "framer-motion";
import {
  BookOpen,
  Briefcase,
  Code,
  Download,
  Edit2,
  Github,
  Globe,
  Linkedin,
  Mail,
  Plus,
  Trash2,
  Trophy,
  Twitter,
  Upload,
  X,
} from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import Masonry from "react-masonry-css";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import "../styles/profile.css";

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Achievement Badge Component
const AchievementBadge = ({ title, description, icon, earned, progress }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative p-4 rounded-lg ${
        earned ? "bg-primary/10" : "bg-muted/50"
      }`}
    >
      <div className="flex items-center space-x-3">
        <div
          className={`p-2 rounded-full ${earned ? "bg-primary" : "bg-muted"}`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
          {progress !== undefined && (
            <div className="mt-2 h-1 bg-muted rounded-full">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

AchievementBadge.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  earned: PropTypes.bool.isRequired,
  progress: PropTypes.number,
};

// Skill Radar Chart Component
const SkillRadarChart = ({ skills }) => {
  const categories = {
    Frontend: [
      "React",
      "Vue",
      "Angular",
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "Tailwind",
      "Bootstrap",
    ],
    Backend: [
      "Node.js",
      "Python",
      "Java",
      "PHP",
      "Ruby",
      "Express",
      "Django",
      "Spring",
      "Laravel",
      "SQL",
      "NoSQL",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Firebase",
      "SQLite",
      "Cassandra",
    ],
    Web3: [
      "Solidity",
      "Ethers.js",
      "Web3.js",
      "Truffle",
      "Hardhat",
      "OpenZeppelin",
      "ZeppelinOS",
      "Foundry",
      "Ethereum",
      "Solana",
      "Polygon",
      "Avalanche",
      "BSC",
      "Fantom",
      "Smart Contracts",
    ],
    DevOps: [
      "Docker",
      "Kubernetes",
      "AWS",
      "CI/CD",
      "Linux",
      "Jenkins",
      "Terraform",
      "Ansible",
      "Nginx",
    ],
    Tools: [
      "Git",
      "VS Code",
      "Figma",
      "Jira",
      "Postman",
      "Webpack",
      "Babel",
      "ESLint",
      "Prettier",
      "Selenium",
      "Slither",
      "Burp Suite",
      "Metasploit",
      "Nmap",
      "Wireshark",
      "Fiddler",
      "Charles",
    ],
  };

  const calculateCategoryScore = (categorySkills, userSkills) => {
    const matchingSkills = userSkills.filter((skill) =>
      categorySkills.some((catSkill) =>
        skill.name.toLowerCase().includes(catSkill.toLowerCase())
      )
    );
    return (matchingSkills.length / categorySkills.length) * 100;
  };

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Skill Distribution",
        data: Object.values(categories).map((categorySkills) =>
          calculateCategoryScore(categorySkills, skills)
        ),
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(99, 102, 241, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(99, 102, 241, 1)",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const category = context.label;
            const value = context.raw;
            const categorySkills = categories[category];
            const matchingSkills = skills.filter((skill) =>
              categorySkills.some((catSkill) =>
                skill.name.toLowerCase().includes(catSkill.toLowerCase())
              )
            );
            return [
              `${category}: ${value.toFixed(1)}%`,
              `Matching skills: ${matchingSkills
                .map((s) => s.name)
                .join(", ")}`,
            ];
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px]">
      <Radar data={data} options={options} />
    </div>
  );
};

SkillRadarChart.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Project Card Component
const ProjectCard = ({ project, onDelete, onImageClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-lg bg-card"
    >
      <div
        className="aspect-video relative cursor-pointer"
        onClick={() => onImageClick(project)}
      >
        <img
          src={project.image || "https://via.placeholder.com/400x225"}
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-white text-lg font-bold">{project.name}</h3>
              <p className="text-white/80 text-sm mt-1">
                {project.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-white/20 rounded-full text-white text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => onDelete(project.id)}
        className="absolute top-2 right-2 text-white hover:text-red-500"
      >
        <Trash2 size={16} />
      </button>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

const SkillCard = ({ skill, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full h-16 cursor-pointer perspective-1000"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden bg-black rounded-lg p-2 flex items-center justify-center">
          <h3 className="text-white text-sm font-medium">{skill.name}</h3>
        </div>
        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden bg-black rounded-lg p-2 rotate-y-180">
          <p className="text-white text-xs line-clamp-2">{skill.description}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(skill.id);
            }}
            className="absolute bottom-1 right-1 text-white hover:text-red-500"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

SkillCard.propTypes = {
  skill: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

const EditableField = ({ value, onSave, type = "text" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onSave(tempValue);
    setIsEditing(false);
  };

  return (
    <div className="relative group">
      {isEditing ? (
        <div className="flex items-center space-x-2">
          {type === "textarea" ? (
            <Textarea
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full"
            />
          ) : (
            <Input
              type={type}
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full"
            />
          )}
          <Button onClick={handleSave} size="sm">
            Save
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setTempValue(value);
              setIsEditing(false);
            }}
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <span>{value}</span>
          <button
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit2 size={16} className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
};

EditableField.propTypes = {
  value: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["text", "textarea"]),
};

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "Your Name",
    title: "Your Title",
    bio: "Your bio goes here...",
    avatar: "https://via.placeholder.com/150",
    links: [
      { id: 1, platform: "github", url: "https://github.com/AshiqAhamed17" },
      {
        id: 2,
        platform: "linkedin",
        url: "https://linkedin.com/in/ashiq-n17",
      },
    ],
    skills: [
      { id: 1, name: "React", description: "Frontend development with React" },
      {
        id: 2,
        name: "Node.js",
        description: "Backend development with Node.js",
      },
    ],
    projects: [
      {
        id: 1,
        name: "Project 1",
        description: "Description of project 1",
        image: "https://via.placeholder.com/400x225",
        technologies: ["React", "Node.js", "MongoDB"],
      },
      {
        id: 2,
        name: "Project 2",
        description: "Description of project 2",
        image: "https://via.placeholder.com/400x225",
        technologies: ["Python", "Django", "PostgreSQL"],
      },
    ],
  });

  const [newLink, setNewLink] = useState({ platform: "", url: "" });
  const [newSkill, setNewSkill] = useState({ name: "", description: "" });
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    technologies: [],
  });

  // State for lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // State for project filters
  const [selectedTechnology, setSelectedTechnology] = useState("all");

  useEffect(() => {
    // Load profile data from localStorage
    const savedData = localStorage.getItem("profileData");
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    }
  }, []);

  const saveProfileData = (newData) => {
    setProfileData(newData);
    localStorage.setItem("profileData", JSON.stringify(newData));
  };

  const handleAddLink = () => {
    if (newLink.platform && newLink.url) {
      const newLinks = [...profileData.links, { id: Date.now(), ...newLink }];
      saveProfileData({ ...profileData, links: newLinks });
      setNewLink({ platform: "", url: "" });
    }
  };

  const handleAddSkill = () => {
    if (newSkill.name && newSkill.description) {
      const newSkills = [
        ...profileData.skills,
        { id: Date.now(), ...newSkill },
      ];
      saveProfileData({ ...profileData, skills: newSkills });
      setNewSkill({ name: "", description: "" });
    }
  };

  const handleAddProject = () => {
    if (newProject.name && newProject.description) {
      const newProjects = [
        ...profileData.projects,
        { id: Date.now(), ...newProject },
      ];
      saveProfileData({ ...profileData, projects: newProjects });
      setNewProject({ name: "", description: "", technologies: [] });
    }
  };

  const getPlatformName = (url) => {
    try {
      const hostname = new URL(url).hostname;
      if (hostname.includes("github.com")) return "GitHub";
      if (hostname.includes("linkedin.com")) return "LinkedIn";
      if (hostname.includes("twitter.com")) return "Twitter";
      if (hostname.includes("mailto:")) return "Email";
      return hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        saveProfileData({
          ...profileData,
          avatar: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      saveProfileData({
        ...profileData,
        resume: file.name,
      });
    }
  };

  // Get unique technologies from all projects
  const allTechnologies = Array.from(
    new Set(
      profileData.projects.flatMap((project) => project.technologies || [])
    )
  );

  // Filter projects based on selected technology
  const filteredProjects =
    selectedTechnology === "all"
      ? profileData.projects
      : profileData.projects.filter((project) =>
          project.technologies?.includes(selectedTechnology)
        );

  // Remove the static achievements state and create a function to calculate achievements
  const calculateAchievements = () => {
    const skillCount = profileData.skills.length;
    const projectCount = profileData.projects.length;
    const hasCompleteProfile =
      profileData.name !== "Your Name" &&
      profileData.title !== "Your Title" &&
      profileData.bio !== "Your bio goes here..." &&
      profileData.links.length > 0;

    return [
      {
        id: 1,
        title: "Profile Complete",
        description: "Complete your profile with all sections",
        icon: <Trophy size={20} />,
        earned: hasCompleteProfile,
        progress: hasCompleteProfile ? 100 : 0,
      },
      {
        id: 2,
        title: "Skill Master",
        description: `Add ${skillCount}/10 skills`,
        icon: <Code size={20} />,
        earned: skillCount >= 10,
        progress: (skillCount / 10) * 100,
      },
      {
        id: 3,
        title: "Project Showcase",
        description: `Add ${projectCount}/5 projects`,
        icon: <Briefcase size={20} />,
        earned: projectCount >= 5,
        progress: (projectCount / 5) * 100,
      },
      {
        id: 4,
        title: "Learning Path",
        description: "Complete 10 courses",
        icon: <BookOpen size={20} />,
        earned: false,
        progress: 0,
      },
    ];
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card className="border bg-card text-card-foreground shadow-sm">
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <img
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-background shadow-lg"
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <Upload size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Avatar</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="bg-white text-black"
                      />
                      <Button
                        onClick={() =>
                          document.querySelector('input[type="file"]').click()
                        }
                        className="bg-white text-black hover:bg-gray-100"
                      >
                        Upload Avatar
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground">
                    <EditableField
                      value={profileData.name}
                      onSave={(value) =>
                        saveProfileData({
                          ...profileData,
                          name: value,
                        })
                      }
                    />
                  </h1>
                  <p className="text-xl text-muted-foreground mt-1">
                    <EditableField
                      value={profileData.title}
                      onSave={(value) =>
                        saveProfileData({
                          ...profileData,
                          title: value,
                        })
                      }
                    />
                  </p>
                </div>
                <p className="text-muted-foreground">
                  <EditableField
                    value={profileData.bio}
                    onSave={(value) =>
                      saveProfileData({ ...profileData, bio: value })
                    }
                    type="textarea"
                  />
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Links Section */}
          <Card className="border bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-xl font-semibold">
                <span>Links</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Plus size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Link</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Input
                        placeholder="Platform (e.g., GitHub)"
                        value={newLink.platform}
                        onChange={(e) =>
                          setNewLink({
                            ...newLink,
                            platform: e.target.value,
                          })
                        }
                        className="bg-white text-black placeholder:text-gray-500"
                      />
                      <Input
                        placeholder="URL"
                        value={newLink.url}
                        onChange={(e) =>
                          setNewLink({
                            ...newLink,
                            url: e.target.value,
                          })
                        }
                        className="bg-white text-black placeholder:text-gray-500"
                      />
                      <Button
                        onClick={handleAddLink}
                        className="bg-white text-black hover:bg-gray-100"
                      >
                        Add Link
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData.links.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      {link.platform === "github" && (
                        <Github size={20} className="text-foreground" />
                      )}
                      {link.platform === "linkedin" && (
                        <Linkedin size={20} className="text-blue-600" />
                      )}
                      {link.platform === "twitter" && (
                        <Twitter size={20} className="text-blue-400" />
                      )}
                      {link.platform === "email" && (
                        <Mail size={20} className="text-red-500" />
                      )}
                      {link.platform === "website" && (
                        <Globe size={20} className="text-green-500" />
                      )}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-primary truncate"
                      >
                        {getPlatformName(link.url)}
                      </a>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newLinks = profileData.links.filter(
                          (l) => l.id !== link.id
                        );
                        saveProfileData({
                          ...profileData,
                          links: newLinks,
                        });
                      }}
                      className="hover:bg-destructive/10"
                    >
                      <Trash2 size={16} className="text-white" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card className="border bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-xl font-semibold">
                <span>Skills</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Plus size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Skill</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Input
                        placeholder="Skill Name"
                        value={newSkill.name}
                        onChange={(e) =>
                          setNewSkill({
                            ...newSkill,
                            name: e.target.value,
                          })
                        }
                        className="bg-white text-black placeholder:text-gray-500"
                      />
                      <Textarea
                        placeholder="Skill Description"
                        value={newSkill.description}
                        onChange={(e) =>
                          setNewSkill({
                            ...newSkill,
                            description: e.target.value,
                          })
                        }
                        className="bg-white text-black placeholder:text-gray-500"
                      />
                      <Button
                        onClick={handleAddSkill}
                        className="bg-white text-black hover:bg-gray-100"
                      >
                        Add Skill
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <SkillRadarChart skills={profileData.skills} />
                <div className="grid grid-cols-2 gap-4">
                  {profileData.skills.map((skill) => (
                    <SkillCard
                      key={skill.id}
                      skill={skill}
                      onDelete={(id) => {
                        const newSkills = profileData.skills.filter(
                          (s) => s.id !== id
                        );
                        saveProfileData({
                          ...profileData,
                          skills: newSkills,
                        });
                      }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Projects Section */}
          <Card className="border bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-xl font-semibold">
                <span>Projects</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Plus size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Project</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Input
                        placeholder="Project Name"
                        value={newProject.name}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            name: e.target.value,
                          })
                        }
                        className="bg-white text-black placeholder:text-gray-500"
                      />
                      <Textarea
                        placeholder="Project Description"
                        value={newProject.description}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            description: e.target.value,
                          })
                        }
                        className="bg-white text-black placeholder:text-gray-500"
                      />
                      <Input
                        placeholder="Technologies (comma-separated)"
                        value={newProject.technologies.join(", ")}
                        onChange={(e) =>
                          setNewProject({
                            ...newProject,
                            technologies: e.target.value
                              .split(",")
                              .map((t) => t.trim()),
                          })
                        }
                        className="bg-white text-black placeholder:text-gray-500"
                      />
                      <Button
                        onClick={handleAddProject}
                        className="bg-white text-black hover:bg-gray-100"
                      >
                        Add Project
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Technology Filter */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTechnology("all")}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTechnology === "all"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    All
                  </button>
                  {allTechnologies.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => setSelectedTechnology(tech)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedTechnology === tech
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>

                {/* Masonry Grid */}
                <Masonry
                  breakpointCols={{
                    default: 2,
                    1100: 2,
                    700: 1,
                  }}
                  className="flex -ml-4 w-auto"
                  columnClassName="pl-4 bg-clip-padding"
                >
                  {filteredProjects.map((project) => (
                    <div key={project.id} className="mb-4">
                      <ProjectCard
                        project={project}
                        onDelete={(id) => {
                          const newProjects = profileData.projects.filter(
                            (p) => p.id !== id
                          );
                          saveProfileData({
                            ...profileData,
                            projects: newProjects,
                          });
                        }}
                        onImageClick={(project) => {
                          setSelectedProject(project);
                          setLightboxOpen(true);
                        }}
                      />
                    </div>
                  ))}
                </Masonry>
              </div>
            </CardContent>
          </Card>

          {/* Achievements Section */}
          <Card className="border bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {calculateAchievements().map((achievement) => (
                  <AchievementBadge
                    key={achievement.id}
                    title={achievement.title}
                    description={achievement.description}
                    icon={achievement.icon}
                    earned={achievement.earned}
                    progress={achievement.progress}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resume Section */}
          <Card className="border bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Resume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-white text-black hover:bg-gray-100">
                      <Upload size={16} className="mr-2" />
                      Upload Resume
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Resume</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="bg-white text-black"
                      />
                      <Button
                        onClick={() =>
                          document.querySelector('input[type="file"]').click()
                        }
                        className="bg-white text-black hover:bg-gray-100"
                      >
                        Upload Resume
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Download size={16} className="mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && selectedProject && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={[
            {
              src: selectedProject.image,
              title: selectedProject.name,
              description: selectedProject.description,
            },
          ]}
        />
      )}
    </div>
  );
};

export default Profile;
