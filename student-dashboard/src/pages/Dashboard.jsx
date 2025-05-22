import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Award,
  Calendar,
  Clock,
  Code2,
  GitCommit,
  GitFork,
  Github,
  GitPullRequest,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import config from '../config';

// Platform-specific components
const PlatformStats = ({ title, icon: Icon, stats, trend }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <Icon className="w-5 h-5" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {trend && (
        <div
          className={`flex items-center ${
            trend > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {trend > 0 ? (
            <ArrowUpRight className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDownRight className="w-4 h-4 mr-1" />
          )}
          <span className="text-sm">{Math.abs(trend)}%</span>
        </div>
      )}
    </div>
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="space-y-1">
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  </Card>
);

PlatformStats.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
  trend: PropTypes.number,
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [platformData, setPlatformData] = useState({
    leetcode: null,
    github: null,
    codeforces: null,
    codechef: null,
  });

  const fetchPlatformData = async () => {
    try {
      setLoading(true);

      // Fetch GitHub data
      const githubResponse = await fetch(`${config.apiUrl}/api/github`);
      const githubData = await githubResponse.json();

      // Fetch LeetCode data
      const leetcodeResponse = await fetch(`${config.apiUrl}/api/leetcode`);
      const leetcodeData = await leetcodeResponse.json();

      // Fetch CodeForces data
      const codeforcesResponse = await fetch(`${config.apiUrl}/api/codeforces`);
      const codeforcesData = await codeforcesResponse.json();

      // Fetch CodeChef data
      const codechefResponse = await fetch(`${config.apiUrl}/api/codechef`);
      const codechefData = await codechefResponse.json();

      console.log("LeetCode Data:", leetcodeData);
      console.log("CodeForces Data:", codeforcesData);
      console.log("CodeChef Data:", codechefData);

      setPlatformData({
        github: {
          followers: githubData.followers || 0,
          repositories: githubData.repos || 0,
          contributions: githubData.contributions || 0,
        },
        leetcode: {
          totalSolved: leetcodeData.solved || 0,
          ranking: leetcodeData.ranking || 0,
          acceptanceRate: leetcodeData.acceptanceRate || 0,
          contributionPoints: leetcodeData.contributionPoints || 0,
          easySolved: leetcodeData.easySolved || 0,
          mediumSolved: leetcodeData.mediumSolved || 0,
          hardSolved: leetcodeData.hardSolved || 0,
          arraySolved: leetcodeData.arraySolved || 0,
          dpSolved: leetcodeData.dpSolved || 0,
          graphSolved: leetcodeData.graphSolved || 0,
          stringSolved: leetcodeData.stringSolved || 0,
          treeSolved: leetcodeData.treeSolved || 0,
          mathSolved: leetcodeData.mathSolved || 0,
        },
        codeforces: {
          rating: codeforcesData.CurrentRating || 0,
          maxRating: codeforcesData.MaxRating || 0,
          rank: codeforcesData.MaxRank || "Unrated",
          problemsSolved: codeforcesData.TotalSolved || 0,
          country: codeforcesData.Country || "N/A",
          organization: codeforcesData.Organization || "N/A",
        },
        codechef: {
          rating: codechefData.rating || 0,
          highestRating: codechefData.highestRating || 0,
          globalRank: codechefData.globalRank || 0,
          countryRank: codechefData.countryRank || 0,
          stars: codechefData.stars || 0,
        },
      });
    } catch (error) {
      console.error("Error fetching platform data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlatformData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Real data for visualizations
  const ratingHistory = [
    {
      month: "Jan",
      leetcode: platformData.leetcode?.rating || 0,
      codeforces: platformData.codeforces?.rating || 0,
      codechef: platformData.codechef?.rating || 0,
    },
    {
      month: "Feb",
      leetcode: platformData.leetcode?.rating || 0,
      codeforces: platformData.codeforces?.rating || 0,
      codechef: platformData.codechef?.rating || 0,
    },
    {
      month: "Mar",
      leetcode: platformData.leetcode?.rating || 0,
      codeforces: platformData.codeforces?.rating || 0,
      codechef: platformData.codechef?.rating || 0,
    },
    {
      month: "Apr",
      leetcode: platformData.leetcode?.rating || 0,
      codeforces: platformData.codeforces?.rating || 0,
      codechef: platformData.codechef?.rating || 0,
    },
    {
      month: "May",
      leetcode: platformData.leetcode?.rating || 0,
      codeforces: platformData.codeforces?.rating || 0,
      codechef: platformData.codechef?.rating || 0,
    },
  ];

  const problemDistribution = [
    {
      name: "Easy",
      value: platformData.leetcode?.easySolved || 0,
      color: "#22c55e",
    },
    {
      name: "Medium",
      value: platformData.leetcode?.mediumSolved || 0,
      color: "#eab308",
    },
    {
      name: "Hard",
      value: platformData.leetcode?.hardSolved || 0,
      color: "#ef4444",
    },
  ];

  const topicDistribution = [
    { subject: "Arrays", A: platformData.leetcode?.arraySolved || 0 },
    { subject: "DP", A: platformData.leetcode?.dpSolved || 0 },
    { subject: "Graph", A: platformData.leetcode?.graphSolved || 0 },
    { subject: "String", A: platformData.leetcode?.stringSolved || 0 },
    { subject: "Tree", A: platformData.leetcode?.treeSolved || 0 },
    { subject: "Math", A: platformData.leetcode?.mathSolved || 0 },
  ];

  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Coding Profile Overview</h1>
          <p className="text-muted-foreground">
            Your coding journey across platforms
          </p>
        </div>
        <Button variant="outline" onClick={fetchPlatformData}>
          Refresh Stats
        </Button>
      </div>

      {/* Platform Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LeetCode Stats */}
        <PlatformStats
          title="LeetCode"
          icon={Code2}
          stats={[
            {
              label: "Total Solved",
              value: platformData.leetcode?.totalSolved || 0,
            },
            {
              label: "Global Rank",
              value: `#${platformData.leetcode?.ranking || 0}`,
            },
            {
              label: "Acceptance Rate",
              value: `${platformData.leetcode?.acceptanceRate || 0}%`,
            },
            {
              label: "Contribution Points",
              value: platformData.leetcode?.contributionPoints || 0,
            },
          ]}
        />

        {/* GitHub Stats */}
        <PlatformStats
          title="GitHub"
          icon={Github}
          stats={[
            { label: "Followers", value: platformData.github?.followers || 0 },
            {
              label: "Repositories",
              value: platformData.github?.repositories || 0,
            },
            {
              label: "Contributions",
              value: platformData.github?.contributions || 0,
            },
          ]}
        />

        {/* CodeForces Stats */}
        <PlatformStats
          title="CodeForces"
          icon={Trophy}
          stats={[
            {
              label: "Current Rating",
              value: platformData.codeforces?.rating || 0,
            },
            {
              label: "Max Rating",
              value: platformData.codeforces?.maxRating || 0,
            },
            {
              label: "Rank",
              value: platformData.codeforces?.rank || "Unrated",
            },
            {
              label: "Problems Solved",
              value: platformData.codeforces?.problemsSolved || 0,
            },
          ]}
        />

        {/* CodeChef Stats */}
        <PlatformStats
          title="CodeChef"
          icon={Trophy}
          stats={[
            {
              label: "Current Rating",
              value: platformData.codechef?.rating || 0,
            },
            {
              label: "Highest Rating",
              value: platformData.codechef?.highestRating || 0,
            },
            {
              label: "Global Rank",
              value: `#${platformData.codechef?.globalRank || 0}`,
            },
            { label: "Stars", value: platformData.codechef?.stars || 0 },
          ]}
        />
      </div>

      {/* Rating History Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Rating History</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ratingHistory}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-sm" />
              <YAxis className="text-sm" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Line
                type="monotone"
                dataKey="leetcode"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="codeforces"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="codechef"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Achievements */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
            <div className="p-2 rounded-full bg-green-500/10">
              <Target className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="font-medium">Reached Expert on CodeForces</p>
              <p className="text-sm text-muted-foreground">
                Rating: {platformData.codeforces?.rating || 0}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
            <div className="p-2 rounded-full bg-blue-500/10">
              <Star className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="font-medium">
                CodeChef {platformData.codechef?.stars || 0} Star
              </p>
              <p className="text-sm text-muted-foreground">
                Rating: {platformData.codechef?.rating || 0}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
            <div className="p-2 rounded-full bg-purple-500/10">
              <Code2 className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="font-medium">LeetCode Global Rank</p>
              <p className="text-sm text-muted-foreground">
                #{platformData.leetcode?.ranking || 0}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Additional Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CodeForces Details */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">CodeForces Details</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="text-muted-foreground">Country</span>
              <span className="font-medium">
                {platformData.codeforces?.country || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="text-muted-foreground">Organization</span>
              <span className="font-medium">
                {platformData.codeforces?.organization || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="text-muted-foreground">Max Rating</span>
              <div className="flex items-center space-x-2">
                <span className="font-medium">
                  {platformData.codeforces?.maxRating || 0}
                </span>
                <Award className="w-4 h-4 text-yellow-500" />
              </div>
            </div>
          </div>
        </Card>

        {/* CodeChef Details */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">CodeChef Details</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="text-muted-foreground">Country Rank</span>
              <span className="font-medium">
                #{platformData.codechef?.countryRank || 0}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="text-muted-foreground">Stars</span>
              <div className="flex items-center">
                {[...Array(platformData.codechef?.stars || 0)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="text-muted-foreground">Highest Rating</span>
              <div className="flex items-center space-x-2">
                <span className="font-medium">
                  {platformData.codechef?.highestRating || 0}
                </span>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
            </div>
          </div>
        </Card>

        {/* Problem Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Problem Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={problemDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {problemDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Topic Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Topic Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={topicDistribution}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar
                  name="Problems Solved"
                  dataKey="A"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
