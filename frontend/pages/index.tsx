import { Layout } from 'components/Layout'
import { Form } from 'components/Form'

const code = `
locals {
  message = "Hello, world!"
}

resource "null_resource" "this" {
  for_each = toset(split(" ", replace(local.message, "/(,|!)/", "")))
}
`.trim()

const IndexPage = () => (
  <Layout title="The Terraform Playground">
    <h1 className="title">The Terraform Playground 😎</h1>
    <Form content={code} />
  </Layout>
)

export default IndexPage
