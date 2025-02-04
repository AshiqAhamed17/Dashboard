import { useState } from "react";
import { Link } from "react-router-dom";

const problems = [
  {
    topic: "Arrays",
    questions: [
      {
        id: 1,
        title: "Two Sum",
        link: "https://leetcode.com/problems/two-sum/",
      },
      {
        id: 2,
        title: "Best Time to Buy and Sell Stock",
        link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      },
    ],
  },
  {
    topic: "Linked List",
    questions: [
      {
        id: 3,
        title: "Reverse a Linked List",
        link: "https://leetcode.com/problems/reverse-linked-list/",
      },
      {
        id: 4,
        title: "Merge Two Sorted Lists",
        link: "https://leetcode.com/problems/merge-two-sorted-lists/",
      },
    ],
  },
];

const Coding = () => {
  const [solved, setSolved] = useState({});

  const toggleSolved = (id) => {
    setSolved((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">DSA Problems</h1>
      {problems.map((category, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold">{category.topic}</h2>
          <ul className="mt-2">
            {category.questions.map((question) => (
              <li key={question.id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={solved[question.id] || false}
                  onChange={() => toggleSolved(question.id)}
                />
                <Link
                  to={question.link}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  {question.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Coding;
