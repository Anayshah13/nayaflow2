import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ScoreCard from "@/components/ScoreCard";
import { Link } from "react-router-dom";

import {
  RefreshCw,
  Upload,
  TrendingUp,
  AlertTriangle,
  Calendar,
  DollarSign,
  PieChart,
  Brain,
  LineChart,
} from "lucide-react";

const DUMMY_SESSION_KEY = "nayaflow_demo_user";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in real app this would come from API
  const mockData = {
    score: 720,
    previousScore: 695,
    incomeStability: 0.78,
    expenseVolatility: 0.32,
    dsr: 0.28,
    monthlyIncome: 45000,
    monthlyExpenses: 32000,
    alerts: [
      {
        id: 1,
        type: "warning",
        message: "Spending spike detected in Food delivery this week",
        timestamp: "2 hours ago",
      },
      {
        id: 2,
        type: "info",
        message: "Your typical payout is due in 2 days - keep ₹3,000 buffer",
        timestamp: "1 day ago",
      },
    ],
    nudges: [
      "Set aside ₹2,500 this week to keep DSR < 35%",
      "Consider shifting auto-debits to 2 days after payout dates",
      "Your food spending is 18% above average - try a weekly cap of ₹1,200",
    ],
  };

  const handleRunAgent = async () => {
    setIsLoading(true);
    // Simulate AI agent processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Dashboard Navbar with quick links */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="LOGO.png"
              alt="NayaFlow Logo"
              className="h-10 w-10 rounded"
            />
            <div>
              <div className="text-lg font-bold">Dashboard</div>
              <div className="text-sm text-muted-foreground">
                {localStorage.getItem(DUMMY_SESSION_KEY) ?? "Guest"}
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-3">
            <Button
              asChild
              variant="fintech"
              className="flex items-center gap-2"
            >
              <Link to="/ai" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span>AI Scoring</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="flex items-center gap-2"
            >
              <Link to="/planner" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                <span>Payment Planner</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Link to="/offers" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Loan Offers</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              onClick={() => {
                localStorage.removeItem(DUMMY_SESSION_KEY);
                window.location.href = "/";
              }}
            >
              Sign out
            </Button>
          </nav>
        </div>
      </header>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          background:
            "linear-gradient(to right, rgba(239,68,68,0.2), rgba(185,28,28,0.25))",
          whiteSpace: "nowrap",
          fontWeight: "bold",
          color: "rgba(255,255,255,0.5)",
          overflow: "hidden", // 🔥 ensures no scrollbars
        }}
      >
        <div
          style={{
            display: "inline-block",
            paddingLeft: "20%",
            animation: "marquee 15s linear infinite",
          }}
        >
          This is demo data — values are placeholders for preview.
        </div>

        <style>
          {`
            @keyframes marquee {
              0%   { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
          `}
        </style>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Score Card */}
          <div className="lg:col-span-1">
            <ScoreCard
              score={mockData.score}
              previousScore={mockData.previousScore}
              incomeStability={mockData.incomeStability}
              expenseVolatility={mockData.expenseVolatility}
              dsr={mockData.dsr}
            />
          </div>

          {/* Right Column - Insights and Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cashflow Snapshot */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  Cashflow Snapshot (Last 30 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total Income
                      </span>
                      <span className="font-semibold text-secondary">
                        ₹{mockData.monthlyIncome.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total Expenses
                      </span>
                      <span className="font-semibold">
                        ₹{mockData.monthlyExpenses.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-sm font-medium">Net Cashflow</span>
                      <span className="font-bold text-secondary">
                        ₹
                        {(
                          mockData.monthlyIncome - mockData.monthlyExpenses
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-1">
                        71%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Expense Ratio
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Coaching Nudges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  AI Coaching Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockData.nudges.map((nudge, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="h-2 w-2 bg-secondary rounded-full mt-2" />
                      <span className="text-sm">{nudge}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-accent" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockData.alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                    >
                      <Badge
                        variant={
                          alert.type === "warning" ? "destructive" : "secondary"
                        }
                        className="mt-0.5"
                      >
                        {alert.type}
                      </Badge>
                      <div className="flex-1">
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {alert.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start" asChild>
                    <Link to="/offers">
                      <DollarSign className="h-4 w-4 mr-2" />
                      View Loan Offers
                    </Link>
                  </Button>
                  <Button variant="outline" className="justify-start" asChild>
                    <Link to="/planner">
                      <Calendar className="h-4 w-4 mr-2" />
                      Payment Planner
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
