import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CertificateCard({ name, tagline, link, description }) {
  return (
    <Card className="flex flex-col h-full transition-transform duration-300 hover:scale-105 bg-gray-100">
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{tagline}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          ) : (
            <span>Learn More</span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
