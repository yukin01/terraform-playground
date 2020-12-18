import React, { FC, useState } from 'react'
import { Editor } from './Editor'
import { Code } from './Code'

type Props = {
  content: string
}

export const Form: FC<Props> = ({ content: initialContent }) => {
  const [content, setContent] = useState<string>(initialContent)

  return (
    <div>
      <button className="button mr-2">Apply</button>
      <button className="button mr-2" onClick={() => setContent(initialContent)}>Reset</button>
      <div className="select">
        <select>
          <option>Terraform version (v0.14.2)</option>
          <option>v0.14.1</option>
          <option>v0.14.0</option>
        </select>
      </div>
      <Editor language="hcl" content={content} setContent={setContent} />
      <hr />
      <Code language="hcl" content="output"/>
    </div>
  )
}
