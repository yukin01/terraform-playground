import React, { FC, useEffect } from 'react'
import Prism from 'prismjs'

type Props = {
  code: string
  language: string
}

export const Code: FC<Props> = ({ code, language }) => {
  useEffect(() => {
    Prism.highlightAll()
  })
  return (
    <pre className="line-numbers">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  )
}
