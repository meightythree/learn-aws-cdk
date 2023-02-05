import { SpaceStack } from "./SpaceStack";
import { App } from "aws-cdk-lib";

const app = new App();

const spaceStack = new SpaceStack(app, "space-stack", {
  stackName: "SpaceFinder",
});
