import * as cdk from "aws-cdk-lib";
import { CfnOutput, CfnParameter, Duration } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class FirstCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const duration = new CfnParameter(this, "duration", {
      type: "Number",
      default: 6,
      minValue: 1,
      maxValue: 10,
    });

    const myBucket = new Bucket(this, "myBucket", {
      lifecycleRules: [
        { expiration: Duration.days(duration.value as unknown as number) },
      ],
    });

    new CfnOutput(this, "myBucketCfnOutput", {
      value: myBucket.bucketName,
    });
  }
}
