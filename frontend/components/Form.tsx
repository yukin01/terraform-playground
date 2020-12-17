import React, { FC, useState } from 'react'
import { Editor } from './Editor'

type Props = {
  content: string
}

export const Form: FC<Props> = ({ content: initialContent }) => {
  const [content, setContent] = useState<string>(initialContent)

  // TODO: submit button

  return <Editor language="hcl" content={content} setContent={setContent} />
}
