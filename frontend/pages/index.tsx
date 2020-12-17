import { Layout } from '../components/Layout'
import { Form } from '../components/Form'

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
    <Form content={code} />
  </Layout>
)

export default IndexPage
