# CDK commands

cdk init [app-name] --language=typescript

$ cdk bootstrap

- prepares the ground for deployment
- needs to be run only once
- creates cloudformation stack in our account

$ cdk synth

- generates template.json
- deploy the project

$ cdk deploy [stack-name]

- deploy our app

$ cdk list

- listing our stacks

$ cdk diff

- checks difference between deployed and local

$ cdk destroy [stack-name]

- removes stack

$ cdk doctor

- points to possible errors
