import { Card } from '@tremor/react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [githubStats, setGithubStats] = useState(null);
  const [leetcodeStats, setLeetcodeStats] = useState(null);

  // Simulated data - replace with actual API calls
  useEffect(() => {
    setGithubStats({
      repos: 12,
      contributions: 450,
      followers: 25
    });
    
    setLeetcodeStats({
      solved: 150,
      ranking: 50000,
      contestRating: 1500
    });
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome back, Student!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4">GitHub Statistics</h3>
          {githubStats && (
            <div className="space-y-2">
              <p>Repositories: {githubStats.repos}</p>
              <p>Contributions: {githubStats.contributions}</p>
              <p>Followers: {githubStats.followers}</p>
            </div>
          )}
        </Card>

        <Card className="bg-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4">LeetCode Progress</h3>
          {leetcodeStats && (
            <div className="space-y-2">
              <p>Problems Solved: {leetcodeStats.solved}</p>
              <p>Global Ranking: {leetcodeStats.ranking}</p>
              <p>Contest Rating: {leetcodeStats.contestRating}</p>
            </div>
          )}
        </Card>

        <Card className="bg-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4">Academic Overview</h3>
          <div className="space-y-2">
            <p>Current GPA: 3.8</p>
            <p>Credits Completed: 90</p>
            <p>Major: Computer Science</p>
          </div>
        </Card>
      </div>
    </div>
  );
}