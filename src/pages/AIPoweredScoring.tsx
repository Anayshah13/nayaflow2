import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/Theme/ThemeToggle";
import { Brain, LineChart, Shield, Zap, ArrowRight } from "lucide-react";

/**
 * Small local simulator to demo scoring and sub-scores.
 * Self-contained and safe for the demo site.
 */
const ScoreSimulator: React.FC = () => {
  const [score, setScore] = useState(685);
  const [running, setRunning] = useState(false);
  const [sub, setSub] = useState({
    incomeStability: 72,
    onTimePayments: 80,
    cashBuffer: 60,
    spendingPattern: 68,
  });

  useEffect(() => {
    let t: number | undefined;
    if (running) {
      t = window.setInterval(() => {
        setScore((s) => {
          const delta = Math.floor(Math.random() * 7) - 3;
          return Math.max(300, Math.min(850, s + delta));
        });
        setSub((prev) => {
          const jitter = () =>
            Math.max(
              35,
              Math.min(
                100,
                prev.incomeStability + Math.floor(Math.random() * 7) - 3
              )
            );
          return {
            incomeStability: jitter(),
            onTimePayments: Math.max(
              35,
              Math.min(
                100,
                prev.onTimePayments + (Math.floor(Math.random() * 5) - 2)
              )
            ),
            cashBuffer: Math.max(
              20,
              Math.min(
                100,
                prev.cashBuffer + (Math.floor(Math.random() * 7) - 3)
              )
            ),
            spendingPattern: Math.max(
              30,
              Math.min(
                100,
                prev.spendingPattern + (Math.floor(Math.random() * 5) - 2)
              )
            ),
          };
        });
      }, 900);
    }
    return () => {
      if (t) window.clearInterval(t);
    };
  }, [running]);

  const quickScan = () => {
    setRunning(false);
    // quick animation: bump score and sub-scores
    setScore((s) => Math.min(850, s + 12));
    setSub((s) => ({
      incomeStability: Math.min(100, s.incomeStability + 8),
      onTimePayments: Math.min(100, s.onTimePayments + 6),
      cashBuffer: Math.min(100, s.cashBuffer + 5),
      spendingPattern: Math.min(100, s.spendingPattern + 7),
    }));
  };

  const reset = () => {
    setRunning(false);
    setScore(685);
    setSub({
      incomeStability: 72,
      onTimePayments: 80,
      cashBuffer: 60,
      spendingPattern: 68,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold">{score}</h3>
          <p className="text-sm text-muted-foreground">
            NayaFlow Score (simulated)
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="hero" onClick={() => setRunning((r) => !r)}>
            {running ? "Pause" : "Live Update"}
          </Button>
          <Button variant="outline" onClick={quickScan}>
            Quick Scan
          </Button>
          <Button variant="ghost" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          {
            key: "incomeStability",
            label: "Income Stability",
            val: sub.incomeStability,
            icon: Brain,
          },
          {
            key: "onTimePayments",
            label: "On-time Payments",
            val: sub.onTimePayments,
            icon: Shield,
          },
          {
            key: "cashBuffer",
            label: "Cash Buffer",
            val: sub.cashBuffer,
            icon: LineChart,
          },
          {
            key: "spendingPattern",
            label: "Spending Pattern",
            val: sub.spendingPattern,
            icon: Zap,
          },
        ].map(({ key, label, val, icon: Icon }) => (
          <Card key={key} className="border-0 bg-gradient-card shadow-sm">
            <CardHeader className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-primary">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-sm">{label}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">{val}%</div>
                <div className="text-xs text-muted-foreground">Impact</div>
              </div>
              <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-3 bg-gradient-to-r from-primary to-accent transition-all"
                  style={{ width: `${val}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        This page demonstrates how our scoring decomposes into sub-metrics. For
        production scoring, connect real statements and let the agent run a full
        analysis.
      </p>

      <div className="flex items-center gap-3">
        <Button asChild variant="fintech">
          <Link to="/auth">Use My Data</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <a href="#learn-more">Learn More</a>
        </Button>
        <div className="ml-auto text-sm text-muted-foreground">
          Estimated APR impact: 16–20%
        </div>
      </div>
    </div>
  );
};

const AIPoweredScoring: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="favicon.ico" alt="NayaFlow" className="h-8 w-8 rounded" />
            <h1 className="text-lg font-bold">AI-Powered Scoring</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button asChild variant="ghost" size="sm">
              <Link to="/">Back</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-start gap-6">
          <div className="w-full max-w-3xl">
            <div className="mb-4 flex items-center gap-2">
              <Badge className="bg-gradient-primary text-white">
                AI Scoring
              </Badge>
              <span className="text-sm text-muted-foreground">
                Transparent · Privacy-first · Actionable
              </span>
            </div>

            <h2 className="mb-2 text-3xl font-bold">
              Understand Your Financial Profile
            </h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Our models analyze income volatility, payment behavior, buffers,
              and spending to produce a fair score for gig workers. Below is a
              simulated preview — connect your data for real results.
            </p>

            <ScoreSimulator />

            <section id="learn-more" className="mt-10">
              <h3 className="mb-3 text-xl font-semibold">
                How the Score is Built
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-0 bg-gradient-card shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Brain className="h-5 w-5 text-white" />
                      <CardTitle className="text-sm">Income Modeling</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm text-muted-foreground">
                    Time-series analysis of inflows to detect consistency and
                    seasonal patterns.
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-card shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <LineChart className="h-5 w-5 text-white" />
                      <CardTitle className="text-sm">Cashflow Lens</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm text-muted-foreground">
                    Models compute surplus, burn-rate, and resilience to shocks.
                  </CardContent>
                </Card>

                <Card className="border-0 bg-gradient-card shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-white" />
                      <CardTitle className="text-sm">
                        Privacy & Guardrails
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm text-muted-foreground">
                    PII minimization, encryption, and policy checks before any
                    scoring.
                  </CardContent>
                </Card>
              </div>
            </section>

            <div className="mt-10 flex items-center gap-3">
              <Button variant="secondary" size="xl" asChild>
                <Link to="/auth">
                  Get My Score
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:hello@nayaflow.example">Contact Sales</a>
              </Button>
            </div>
          </div>

          <aside className="hidden w-80 shrink-0 md:block">
            <Card className="border-0 bg-gradient-card shadow-md">
              <CardHeader>
                <CardTitle className="text-base">Why it matters</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                A fair score increases access to affordable credit, lowers
                default risk, and helps you plan your finances. Our
                explainability tools surface the actions that improve your
                score.
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default AIPoweredScoring;
