import { Card } from "@tremor/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [githubStats, setGithubStats] = useState(null);
  const [leetcodeStats, setLeetcodeStats] = useState(null);
  const [codeforcesStats, setCodeforcesStats] = useState(null);

  useEffect(() => {
    setGithubStats({
      repos: 49,
      contributions: 300,
      followers: 16,
    });

    setLeetcodeStats({
      solved: 330,
      ranking: 255432,
      contestRating: 1446,
    });

    setCodeforcesStats({
      solved: 76,
      rating: 973,
    });
  }, []);

  return (
    <div className="space-y-6 text-cyan-600">
      <h1 className="text-2xl font-bold">WELCOME BACK!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">GitHub Stats</h3>
          {githubStats && (
            <div className="space-y-2 text-white">
              <p>Repositories: {githubStats.repos}</p>
              <p>Contributions: {githubStats.contributions}</p>
              <p>Followers: {githubStats.followers}</p>
            </div>
          )}
        </Card>

        <Card className="bg-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">LeetCode Progress</h3>
          {leetcodeStats && (
            <div className="space-y-2 text-white">
              <p>Problems Solved: {leetcodeStats.solved}</p>
              <p>Global Ranking: {leetcodeStats.ranking}</p>
              <p>Contest Rating: {leetcodeStats.contestRating}</p>
            </div>
          )}
        </Card>

        <Card className="bg-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">CodeForces Progress</h3>
          {codeforcesStats && (
            <div className="space-y-2 text-white">
              <p>Problems Solved: {codeforcesStats.solved}</p>
              <p>Contest Rating: {codeforcesStats.rating}</p>
            </div>
          )}
        </Card>

        <Card className="bg-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">Academic Overview</h3>
          <div className="space-y-2 text-white">
            <p>Current GPA: 8.2</p>
            <p>Major: Computer Science</p>
          </div>
        </Card>

        

        
      </div>
    </div>
  );
}
