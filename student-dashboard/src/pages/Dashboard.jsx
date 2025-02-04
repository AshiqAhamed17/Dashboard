import { Card } from "@tremor/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"; // Import Recharts components

export default function Dashboard() {
  const [githubStats, setGithubStats] = useState(null);
  const [leetcodeStats, setLeetcodeStats] = useState(null);
  const [codeforcesStats, setCodeforcesStats] = useState(null);
  const [codeChefStats, setCodeChefStats] = useState(null);

  const [loading, setLoading] = useState({
    github: true,
    leetcode: true,
    codeforces: true,
    codechef: true,
  });
  const [error, setError] = useState({
    github: null,
    leetcode: null,
    codeforces: null,
    codechef: null,
  });

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/github");
        setGithubStats(response.data);
      } catch (error) {
        setError((prev) => ({ ...prev, github: "Failed to load GitHub stats." }));
      } finally {
        setLoading((prev) => ({ ...prev, github: false }));
      }
    };

    const fetchLeetcodeStats = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/leetcode");
        setLeetcodeStats(response.data);
      } catch (error) {
        setError((prev) => ({
          ...prev,
          leetcode: "Failed to load LeetCode stats.",
        }));
      } finally {
        setLoading((prev) => ({ ...prev, leetcode: false }));
      }
    };

    const fetchCodeforcesStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/codeforces"
        );
        setCodeforcesStats(response.data);
      } catch (error) {
        setError((prev) => ({
          ...prev,
          codeforces: "Failed to load Codeforces stats.",
        }));
      } finally {
        setLoading((prev) => ({ ...prev, codeforces: false }));
      }
    };

    const fetchCodeChefStats = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/codechef");
        setCodeChefStats(response.data);
      } catch (error) {
        setError((prev) => ({ ...prev, codechef: "Failed to load CodeChef stats." })); // Fix error state
      } finally {
        setLoading((prev) => ({ ...prev, codechef: false })); // Fix loading state
      }
    };


    fetchGithubStats();
    fetchLeetcodeStats();
    fetchCodeforcesStats();
    fetchCodeChefStats();
  }, []);

  // Data for line charts
  const githubData = [
    { name: "Repositories", value: githubStats?.repos || 0 },
    { name: "Contributions", value: githubStats?.contributions || 0 },
    { name: "Followers", value: githubStats?.followers || 0 },
  ];

  const leetcodeData = [
    { name: "Problems Solved", value: leetcodeStats?.solved || 0 },
    { name: "Global Ranking", value: leetcodeStats?.ranking || 0 },
    { name: "Acceptance Rate", value: leetcodeStats?.acceptanceRate || 0 },
  ];

  const codeforcesData = [
    { name: "Rating", value: codeforcesStats?.CurrentRating || 0 },
    { name: "Max Rating", value: codeforcesStats?.MaxRating || 0 },
    {name: "Problems Solved", value: codeforcesStats?.TotalSolved}
  ];

  const codechefData = [
    { name: "Rating", value: codeChefStats?.currentRating || 0 },
    { name: "Max Rating", value: codeChefStats?.highestRating || 0 },
    {name: "Problems Solved", value: codeChefStats?.globalRank}
  ];
  // Add fot other Coding profiles to calcualte the total solved count 
  const totalSolved = leetcodeStats?.solved || 0;
  

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-cyan-400 p-8">
      <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Welcome Back!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* GitHub Stats Card */}
        <Card className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transform transition duration-500 hover:-translate-y-2 border border-white/20">
          <h3 className="text-xl font-semibold mb-4 text-gradient bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500">
            GitHub Stats
          </h3>
          {loading.github ? (
            <p>Loading...</p>
          ) : error.github ? (
            <p className="text-red-500">{error.github}</p>
          ) : (
            <>
              <div className="space-y-2 text-white">
                <p>
                  Repositories: <span className="font-bold">{githubStats.repos}</span>
                </p>
                <p>
                  Contributions:{" "}
                  <span className="font-bold">{githubStats.contributions}</span>
                </p>
                <p>
                  Followers: <span className="font-bold">{githubStats.followers}</span>
                </p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={githubData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </>
          )}
        </Card>

        {/* LeetCode Stats Card */}
        <Card className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transform transition duration-500 hover:-translate-y-2 border border-white/20">
          <h3 className="text-xl font-semibold mb-4 text-gradient bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            LeetCode Progress
          </h3>
          {loading.leetcode ? (
            <p>Loading...</p>
          ) : error.leetcode ? (
            <p className="text-red-500">{error.leetcode}</p>
          ) : (
            <>
              <div className="space-y-2 text-white">
                <p>
                  Problems Solved: <span className="font-bold">{leetcodeStats.solved}</span>
                </p>
                <p>
                  Global Ranking:{" "}
                  <span className="font-bold">{leetcodeStats.ranking}</span>
                </p>
                <p>
                  Acceptance Rate:{" "}
                  <span className="font-bold">{leetcodeStats.acceptanceRate}%</span>
                </p>
                <p>
                  Contribution Points:{" "}
                  <span className="font-bold">{leetcodeStats.contributionPoints}</span>
                </p>
                <p>
                  Reputation: <span className="font-bold">{leetcodeStats.reputation}</span>
                </p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={leetcodeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </>
          )}
        </Card>

        {/* CodeForces Stats Card */}
        <Card className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transform transition duration-500 hover:-translate-y-2 border border-white/20">
          <h3 className="text-xl font-semibold mb-4 text-gradient bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
            CodeForces Progress
          </h3>
          {loading.codeforces ? (
            <p>Loading...</p>
          ) : error.codeforces ? (
            <p className="text-red-500">{error.codeforces}</p>
          ) : (
            <>
              <div className="space-y-2 text-white">
                <p>
                  User: <span className="font-bold">{codeforcesStats.User}</span>
                </p>
                <p>
                  Contest Rating:{" "}
                  <span className="font-bold">{codeforcesStats.CurrentRating}</span>
                </p>
                <p>
                  Max Rating:{" "}
                  <span className="font-bold">{codeforcesStats.MaxRating}</span>
                </p>
                <p>
                  Max Rank: <span className="font-bold">{codeforcesStats.MaxRank}</span>
                </p>
                <p>
                  Total Solved: <span className="font-bold">{codeforcesStats.TotalSolved}</span>
                </p>
                <p>
                  Country: <span className="font-bold">{codeforcesStats.Country}</span>
                </p>
                <p>
                  Organization:{" "}
                  <span className="font-bold">{codeforcesStats.Organization}</span>
                </p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={codeforcesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </>
          )}
        </Card>

        
        {/* CodeChef Stats Card */}
<Card className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transform transition duration-500 hover:-translate-y-2 border border-white/20">
  <h3 className="text-xl font-semibold mb-4 text-gradient bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
    CodeChef Progress
  </h3>
  {loading?.codechef ? (
    <p>Loading...</p>
  ) : error?.codechef ? (
    <p className="text-red-500">{error.codechef}</p>
  ) : codeChefStats ? (
    <>
      <div className="space-y-2 text-white">
        <p>
          Contest Rating:{" "}
          <span className="font-bold">{codeChefStats.currentRating}</span>
        </p>
        <p>
          Max Rating:{" "}
          <span className="font-bold">{codeChefStats.highestRating}</span>
        </p>
        <p>
          Global Rank:{" "}
          <span className="font-bold">{codeChefStats.globalRank}</span>
        </p>
      </div>
      {codechefData?.length > 0 ? (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={codechefData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-400 text-sm">No rating data available.</p>
      )}
    </>
  ) : (
    <p className="text-gray-400 text-sm">No data found.</p>
  )}
</Card>

        {/* Academic Overview Card */}
        <Card className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transform transition duration-500 hover:-translate-y-2 border border-white/20">
          <h3 className="text-xl font-semibold mb-4 text-gradient bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            Academic Overview
          </h3>
          <div className="space-y-2 text-white">
            <p>
              Current GPA: <span className="font-bold">8.2</span>
            </p>
            <p>
              Major: <span className="font-bold">Computer Science</span>
            </p>
          </div>
        </Card>

        {/* Testing */}
        <Card className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transform transition duration-500 hover:-translate-y-2 border border-white/20">
          <h3 className="text-xl font-semibold mb-4 text-gradient bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            Total Solved
          </h3>
          <div className="space-y-2 text-white">
            <p>
              Total Solved: <span className="font-bold">{totalSolved}</span>
            </p>
          
          </div>
        </Card>
        


      </div>
    </div>
  );
}