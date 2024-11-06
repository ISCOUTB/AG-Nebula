import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle
} from "@/components/ui/card";

const ModelResults = () => {
  return (
    <Card className="mt-6">
        <CardHeader>
            <CardTitle>Model Results</CardTitle>
            <CardDescription>
                <p>The metrics of your model will be displayed here.</p>
            </CardDescription>
        </CardHeader>
    </Card>
  );
};

export default ModelResults;
