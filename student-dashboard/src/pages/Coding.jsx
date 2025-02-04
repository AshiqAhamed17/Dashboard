import  { useState } from 'react';
import { ChevronDown, ChevronRight, Check, ExternalLink } from 'lucide-react';

const DSATopics = [
  {
    name: "Arrays & Hashing",
    problems: [
      { id: 1, name: "Two Sum", difficulty: "Easy", link: "https://leetcode.com/problems/two-sum/", completed: false },
      { id: 217, name: "Contains Duplicate", difficulty: "Easy", link: "https://leetcode.com/problems/contains-duplicate/", completed: false },
      { id: 242, name: "Valid Anagram", difficulty: "Easy", link: "https://leetcode.com/problems/valid-anagram/", completed: false },
    ]
  },
  {
    name: "Implementation - CF",
    problems: [
      { id: 125, name: "Next Round", difficulty: "Easy", link: "https://codeforces.com/problemset/problem/158/A", completed: false },
      { id: 15, name: "Tram", difficulty: "Medium", link: "https://codeforces.com/problemset/problem/116/A", completed: false },
      { id: 11, name: "Container With Most Water", difficulty: "Medium", link: "https://leetcode.com/problems/container-with-most-water/", completed: false },
    ]
  },
  {
    name: "Stack",
    problems: [
      { id: 20, name: "Valid Parentheses", difficulty: "Easy", link: "https://leetcode.com/problems/valid-parentheses/", completed: false },
      { id: 155, name: "Min Stack", difficulty: "Medium", link: "https://leetcode.com/problems/min-stack/", completed: false },
      { id: 22, name: "Generate Parentheses", difficulty: "Medium", link: "https://leetcode.com/problems/generate-parentheses/", completed: false },
    ]
  },
  {
    name: "Linked List",
    problems: [
      { id: 20, name: "Reverse Linked List", difficulty: "Easy", link: "https://leetcode.com/problems/reverse-linked-list/description/", completed: false },
      { id: 155, name: "Merge Two Sorted List", difficulty: "Easy", link: "https://leetcode.com/problems/merge-two-sorted-lists/description/", completed: false },
      { id: 22, name: "Remove Nth Node From End of List", difficulty: "Medium", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", completed: false },
      { id: 23, name: "Merge K Sorted Lists", difficulty: "Hard", link: "https://leetcode.com/problems/merge-k-sorted-lists/description/", completed: false },
    ]
  }
];

const DifficultyBadge = ({ difficulty }) => {
  const colors = {
    Easy: 'bg-green-500/20 text-green-400',
    Medium: 'bg-yellow-500/20 text-yellow-400',
    Hard: 'bg-red-500/20 text-red-400'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[difficulty]}`}>
      {difficulty}
    </span>
  );
};

export default function Coding() {
  const [expandedTopics, setExpandedTopics] = useState({});
  const [completedProblems, setCompletedProblems] = useState(new Set());

  const toggleTopic = (topicName) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicName]: !prev[topicName]
    }));
  };

  const toggleProblem = (problemId) => {
    setCompletedProblems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(problemId)) {
        newSet.delete(problemId);
      } else {
        newSet.add(problemId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          DSA Problem List
        </h1>

        <div className="space-y-6">
          {DSATopics.map((topic) => (
            <div 
              key={topic.name}
              className="bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-700/50"
            >
              <button
                onClick={() => toggleTopic(topic.name)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {expandedTopics[topic.name] ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                  <h3 className="text-lg font-medium text-white">{topic.name}</h3>
                  <span className="text-sm text-gray-400">
                    ({topic.problems.length} problems)
                  </span>
                </div>
                <span className="text-sm text-gray-400">
                  {topic.problems.filter(p => completedProblems.has(p.id)).length} / {topic.problems.length} completed
                </span>
              </button>

              {/* Problems List */}
              {expandedTopics[topic.name] && (
                <div className="divide-y divide-gray-700/50">
                  {topic.problems.map((problem) => (
                    <div 
                      key={problem.id}
                      className="px-6 py-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleProblem(problem.id)}
                          className={`w-5 h-5 rounded border transition-colors ${
                            completedProblems.has(problem.id)
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-600 hover:border-gray-400'
                          } flex items-center justify-center`}
                        >
                          {completedProblems.has(problem.id) && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </button>
                        <a 
                          href={problem.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                        >
                          {problem.id}. {problem.name}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <DifficultyBadge difficulty={problem.difficulty} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}