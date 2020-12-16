import { Layout } from '../components/Layout'
import { Code } from '../components/Code'

const code = `
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
}

# Create a VPC
resource "aws_vpc" "example" {
  cidr_block = "10.0.0.0/16"
}
`.trim()

const IndexPage = () => (
  <Layout title="The Terraform Playground">
    <h1 className="hoge">The Terraform Playground 😎</h1>
    <Code code={code} language="hcl" />
  </Layout>
)

export default IndexPage
