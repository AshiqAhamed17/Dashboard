import {
  Check,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Search,
} from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import "./Coding.css";

const DSATopics = [
  {
    name: "Arrays & Hashing",
    problems: [
      {
        id: 1,
        name: "Two Sum",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/two-sum/",
        completed: false,
      },
      {
        id: 217,
        name: "Contains Duplicate",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/contains-duplicate/",
        completed: false,
      },
      {
        id: 242,
        name: "Valid Anagram",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/valid-anagram/",
        completed: false,
      },
    ],
  },
  {
    name: "Implementation - CF",
    problems: [
      {
        id: 125,
        name: "Next Round",
        difficulty: "Easy",
        link: "https://codeforces.com/problemset/problem/158/A",
        completed: false,
      },
      {
        id: 15,
        name: "Tram",
        difficulty: "Medium",
        link: "https://codeforces.com/problemset/problem/116/A",
        completed: false,
      },
      {
        id: 11,
        name: "Container With Most Water",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/container-with-most-water/",
        completed: false,
      },
    ],
  },
  {
    name: "Stack",
    problems: [
      {
        id: 20,
        name: "Valid Parentheses",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/valid-parentheses/",
        completed: false,
      },
      {
        id: 155,
        name: "Min Stack",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/min-stack/",
        completed: false,
      },
      {
        id: 22,
        name: "Generate Parentheses",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/generate-parentheses/",
        completed: false,
      },
    ],
  },
  {
    name: "Linked List",
    problems: [
      {
        id: 20,
        name: "Reverse Linked List",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/reverse-linked-list/description/",
        completed: false,
      },
      {
        id: 155,
        name: "Merge Two Sorted List",
        difficulty: "Easy",
        link: "https://leetcode.com/problems/merge-two-sorted-lists/description/",
        completed: false,
      },
      {
        id: 22,
        name: "Remove Nth Node From End of List",
        difficulty: "Medium",
        link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
        completed: false,
      },
      {
        id: 23,
        name: "Merge K Sorted Lists",
        difficulty: "Hard",
        link: "https://leetcode.com/problems/merge-k-sorted-lists/description/",
        completed: false,
      },
    ],
  },
];

const DifficultyBadge = ({ difficulty }) => {
  const colors = {
    Easy: "bg-green-500/10 text-green-500",
    Medium: "bg-yellow-500/10 text-yellow-500",
    Hard: "bg-red-500/10 text-red-500",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${colors[difficulty]}`}
    >
      {difficulty}
    </span>
  );
};

DifficultyBadge.propTypes = {
  difficulty: PropTypes.oneOf(["Easy", "Medium", "Hard"]).isRequired,
};

export default function Coding() {
  const [expandedTopics, setExpandedTopics] = useState({});
  const [completedProblems, setCompletedProblems] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const toggleTopic = (topicName) => {
    setExpandedTopics((prev) => ({ ...prev, [topicName]: !prev[topicName] }));
  };

  const toggleProblem = (problemId) => {
    setCompletedProblems((prev) => {
      const newSet = new Set(prev);
      newSet.has(problemId) ? newSet.delete(problemId) : newSet.add(problemId);
      return newSet;
    });
  };

  const filteredTopics = DSATopics.map((topic) => ({
    ...topic,
    problems: topic.problems.filter((problem) => {
      const matchesSearch = problem.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesDifficulty =
        selectedDifficulty === "all" ||
        problem.difficulty === selectedDifficulty;
      return matchesSearch && matchesDifficulty;
    }),
  })).filter((topic) => topic.problems.length > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            DSA Problem List
          </h1>
          <p className="text-muted-foreground">
            Track your progress and solve problems systematically
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search problems..."
              className="pl-8 pr-4 py-2 rounded-md border bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-3 py-2 rounded-md border bg-background"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredTopics.map((topic) => (
          <Card key={topic.name} className="overflow-hidden">
            <CardHeader className="p-4">
              <button
                onClick={() => toggleTopic(topic.name)}
                className="flex items-center justify-between w-full group"
              >
                <div className="flex items-center space-x-3">
                  {expandedTopics[topic.name] ? (
                    <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  )}
                  <CardTitle className="text-xl">{topic.name}</CardTitle>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {
                      topic.problems.filter((p) => completedProblems.has(p.id))
                        .length
                    }{" "}
                    / {topic.problems.length} completed
                  </span>
                  <div className="h-2 w-24 rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full bg-primary transition-all"
                      style={{
                        width: `${
                          (topic.problems.filter((p) =>
                            completedProblems.has(p.id)
                          ).length /
                            topic.problems.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </button>
            </CardHeader>

            {expandedTopics[topic.name] && (
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  {topic.problems.map((problem) => (
                    <div
                      key={problem.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleProblem(problem.id)}
                          className={`w-8 h-8 p-0 ${
                            completedProblems.has(problem.id)
                              ? "bg-primary text-primary-foreground"
                              : "border border-input"
                          }`}
                        >
                          {completedProblems.has(problem.id) && (
                            <Check className="w-4 h-4" />
                          )}
                        </Button>
                        <a
                          href={problem.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
                        >
                          <span>
                            {problem.id}. {problem.name}
                          </span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <DifficultyBadge difficulty={problem.difficulty} />
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
