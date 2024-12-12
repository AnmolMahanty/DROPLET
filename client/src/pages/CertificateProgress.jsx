import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ClipboardCheck,
  FileCheck,
  ScrollText,
  Star,
  Truck,
  FileText,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CertificationStatus() {
  const location = useLocation();
  const navigate = useNavigate();
  let scoreData = location.state;
  let type = "";
  scoreData *= 100;
  scoreData = Number(scoreData.toFixed(2));
  if (scoreData < 60) type = "Red";
  else if (scoreData < 80) type = "yellow";
  else type = "green";

  const showCerti = () => {
    console.log("Hello wolrldsjl");
    navigate("/industry");
  };
  // This would typically come from an API or database
  const certificationData = {
    companyName: "TechCorp Solutions",
    eligibilityScore: scoreData,
    certificatetype: type,
    currentStep: 2,
    steps: [
      {
        id: 1,
        title: "Submission of Documents",
        icon: ScrollText,
        completed: true,
      },
      {
        id: 2,
        title: "Acknowledgment of Application",
        icon: FileCheck,
        completed: true,
      },
      {
        id: 3,
        title: "Initial Scrutiny",
        icon: ClipboardCheck,
        completed: false,
      },
      {
        id: 4,
        title: "On-Site Verification/Inspection",
        icon: Truck,
        completed: false,
      },
      {
        id: 5,
        title: "Report Submission",
        icon: FileText,
        completed: false,
      },
      {
        id: 6,
        title: "Issuance of Certification",
        icon: Star,
        completed: false,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Certification Status
        </h1>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="overflow-hidden shadow-lg">
            <CardHeader className="bg-primary/10 pb-2">
              <CardTitle className="text-sm font-medium text-primary">
                Company
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">
                {certificationData.companyName}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden shadow-lg">
            <CardHeader className="bg-primary/10 pb-2">
              <CardTitle className="text-sm font-medium text-primary">
                Certificate Type
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">
                {certificationData.certificatetype}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden shadow-lg">
            <CardHeader className="bg-primary/10 pb-2">
              <CardTitle className="text-sm font-medium text-primary">
                Eligibility Score
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">
                {certificationData.eligibilityScore}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="bg-primary/10">
            <CardTitle>Certification Progress</CardTitle>
          </CardHeader>
          <CardContent className="pt-8 pb-20 px-10">
            <div className="relative">
              <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-muted"></div>
              <div
                className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary transition-all duration-500"
                style={{
                  width: `${
                    (certificationData.currentStep /
                      certificationData.steps.length) *
                    100
                  }%`,
                }}
              ></div>
              <div className="relative z-10 flex justify-between">
                {certificationData.steps.map((step, index) => {
                  const isCompleted = index < certificationData.currentStep;
                  const isCurrent = index === certificationData.currentStep - 1;
                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full border-4 transition-colors ${
                          isCompleted
                            ? "border-primary bg-primary text-primary-foreground"
                            : isCurrent
                            ? "border-primary bg-white text-primary"
                            : "border-muted bg-white text-muted-foreground"
                        }`}
                      >
                        <step.icon className="h-6 w-6" />
                      </div>
                      <div className="absolute top-14 w-32 text-center">
                        <div className="text-xs font-medium">{step.title}</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {step.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="bg-primary/10">
            <CardTitle>Status Details</CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            <div className="flex items-center justify-between py-4">
              <div className="space-y-1">
                <div className="text-sm font-medium">Current Stage</div>
                <div className="text-sm text-muted-foreground">
                  {
                    certificationData.steps[certificationData.currentStep - 1]
                      .description
                  }
                </div>
              </div>
              <Badge variant="secondary" className="text-primary bg-primary/10">
                In Progress
              </Badge>
            </div>
            <div className="flex items-center justify-between py-4">
              <div className="space-y-1">
                <div className="text-sm font-medium">Estimated Completion</div>
                <div className="text-sm text-muted-foreground">4-6 weeks</div>
              </div>
              <div className="text-sm text-muted-foreground">
                Updated 2 days ago
              </div>
            </div>
          </CardContent>
        </Card>
        <button onClick={showCerti}>Show Certificate</button>
      </div>
    </div>
  );
}
