import { Search } from "lucide-react";
import { useState } from "react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { resources } from "../data/resources";

const ResourceCard = ({ name, type, link }) => {
  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "youtube":
        return "🎥";
      case "github":
        return "💻";
      case "documentation":
        return "📚";
      case "blog":
        return "📝";
      default:
        return "🔗";
    }
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block transition-all hover:scale-[1.02]"
    >
      <Card className="p-4 hover:bg-accent/50 cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xl">{getTypeIcon(type)}</span>
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-muted-foreground">{type}</p>
            </div>
          </div>
          <span className="text-muted-foreground">→</span>
        </div>
      </Card>
    </a>
  );
};

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.type.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">🧠 Curated Tech Resources</h1>
          <p className="text-muted-foreground">
            A collection of high-quality resources for developers
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-4">
          {filteredResources.map((category) => (
            <Card key={category.title} className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{category.title}</h2>
              <div className="space-y-3">
                {category.items.map((resource) => (
                  <ResourceCard key={resource.name} {...resource} />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
