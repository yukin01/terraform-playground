import React, { FC, useState, useEffect } from 'react'
import { Editor } from './Editor'
import { Code } from './Code'

type Props = {
  content: string
}

const placeholder = "Terraform version"
const maxContentLength = 1024

export const Form: FC<Props> = ({ content: initialContent }) => {
  const [content, setContent] = useState<string>(initialContent)
  const [versions, setVersions] = useState<string[]>([placeholder])
  const [version, setVersion] = useState<string>()
  const [output, setOutput] = useState<string>("output")
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    fetch("/api/v1/versions")
      .then(res => res.json() as Promise<string[]>)
      .then(versions => {
        const sorted = versions.sort().reverse()
        setVersions(sorted)
        setVersion(sorted.length ? sorted[0] : undefined)
      })
  }, [])

  const onApply = () => {
    if (!version || !content) return
    if (content.length > maxContentLength) {
      return setOutput("The content is too long")
    }
    setOutput("...")
    setLoading(true)
    const body = JSON.stringify({ version, files: [{ name: "main.tf", content }]})
    const headers = {
      'Content-Type': 'application/json'
    };
    fetch("/api/v1/apply", { method: "POST", headers, body })
      .then(res => res.text() as Promise<string>)
      .then(setOutput)
      .then(() => setLoading(false))
  }

  return (
    <div>
      <button className="button mr-2" onClick={onApply}>Apply</button>
      <button className="button mr-2" onClick={() => setContent(initialContent)}>Reset</button>
      <div className="select">
        <select onChange={e => setVersion(e.target.value.substring(1))}>
          {versions.map(version => <option key={version}>v{version}</option>)}
        </select>
      </div>
      <Editor language="hcl" content={content} setContent={setContent} />
      {loading ? <progress className="progress mb-0 is-small is-primary" max="100"></progress> : <hr />}
      <Code language="hcl" content={output}/>
    </div>
  )
}
