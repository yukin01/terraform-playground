import React, { FC, useEffect } from 'react'
import Prism from 'prismjs'

type Props = {
  language: string
  content: string
}

export const Code: FC<Props> = ({ content, language }) => {
  useEffect(() => {
    Prism.highlightAll()
  })
  return (
    <pre>
      <code className={`language-${language}`}>{content}</code>
    </pre>
  )
}
