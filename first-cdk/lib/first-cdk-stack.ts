import * as cdk from "aws-cdk-lib";
import { CfnOutput, Duration } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class FirstCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myBucket = new Bucket(this, "myBucket", {
      lifecycleRules: [{ expiration: Duration.days(5) }],
    });

    new CfnOutput(this, "myBucketCfnOutput", {
      value: myBucket.bucketName,
    });
  }
}
