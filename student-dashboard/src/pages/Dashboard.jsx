import { Card } from "@tremor/react";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Dashboard() {
  const [githubStats, setGithubStats] = useState(null);
  const [leetcodeStats, setLeetcodeStats] = useState(null);
  const [codeforcesStats, setCodeforcesStats] = useState(null);

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/github');
        setGithubStats(response.data);
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      }
    };

    const fetchLeetcodeStats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/leetcode');
        setLeetcodeStats(response.data);
      } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
      }
    };

    const fetchCodeforcesStats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/codeforces');
        setCodeforcesStats(response.data);
      } catch (error) {
        console.error('Error fetching Codeforces stats:', error);
      }
    };

    fetchGithubStats();
    fetchLeetcodeStats();
    fetchCodeforcesStats();
  }, []);

  return (
    <div className="space-y-6 text-cyan-600">
      <h1 className="text-2xl font-bold">WELCOME BACK!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* GitHub Stats Card */}
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

        {/* LeetCode Stats Card */}
        <Card className="bg-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">LeetCode Progress</h3>
          {leetcodeStats && (
            <div className="space-y-2 text-white">
              <p>Problems Solved: {leetcodeStats.solved}</p>
              <p>Global Ranking: {leetcodeStats.ranking}</p>
              <p>Acceptance Rate: {leetcodeStats.acceptanceRate}%</p>
              <p>Contribution Points: {leetcodeStats.contributionPoints}</p>
              <p>Reputation: {leetcodeStats.reputation}</p>
            </div>
          )}
        </Card>

        {/* CodeForces Stats Card */}
        <Card className="bg-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">CodeForces Progress</h3>
          {codeforcesStats && (
            <div className="space-y-2 text-white">
              <p>Problems Solved: {codeforcesStats.solved}</p>
              <p>Contest Rating: {codeforcesStats.rating}</p>
            </div>
          )}
        </Card>

        {/* Academic Overview Card */}
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