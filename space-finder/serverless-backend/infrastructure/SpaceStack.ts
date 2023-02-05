import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { join } from "path";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { GenericTable } from "./GenericTable";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

export class SpaceStack extends Stack {
  private api = new RestApi(this, "SpaceApi");
  private spacesTable = new GenericTable("SpacesTable", "spaceId", this);

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const helloLambda = new LambdaFunction(this, "helloLambda", {
      runtime: Runtime.NODEJS_18_X,
      code: Code.fromAsset(join(__dirname, "../services/hello")),
      handler: "hello.main",
    });

    const helloLambdaNodejs = new NodejsFunction(this, "helloLambdaNodejs", {
      entry: join(__dirname, "../services/node-lambda/hello.ts"),
      handler: "handler",
    });
    const s3ListPolicyStatement = new PolicyStatement();
    s3ListPolicyStatement.addActions("s3:ListAllMyBuckets");
    s3ListPolicyStatement.addResources("*");
    helloLambdaNodejs.addToRolePolicy(s3ListPolicyStatement);

    // Hello LambdaIntegration
    const helloLambdaIntegration = new LambdaIntegration(helloLambdaNodejs);
    const helloLambdaResource = this.api.root.addResource("hello");
    helloLambdaResource.addMethod("GET", helloLambdaIntegration);
  }
}
