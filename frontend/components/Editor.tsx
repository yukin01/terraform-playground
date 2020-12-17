import React, { FC, DOMAttributes, useEffect } from 'react'
import Prism from 'prismjs'

type SetContent = React.Dispatch<React.SetStateAction<string>>
type OnKeyDown = NonNullable<DOMAttributes<HTMLTextAreaElement>['onKeyDown']>

type Props = {
  language: string
  content: string
  setContent: SetContent
}

export const Editor: FC<Props> = ({ language, content, setContent }) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [content])

  // handle 2-space indent on
  const onKeyDown: OnKeyDown = event => {
    if (event.key !== 'Tab') return
    event.preventDefault()

    const { selectionStart, selectionEnd } = event.currentTarget
    // console.log(event.currentTarget.selectionStart, event.currentTarget.selectionEnd)
    // const position = event.currentTarget.selectionStart
    // const value = content.substring(0, selectionStart) + '  ' + content.substring(selectionEnd)
    // event.currentTarget.selectionStart = position + 2

    // setContent(value)
    setContent(prev => prev.substring(0, selectionStart) + '  ' + prev.substring(selectionEnd))
    // TODO: Update cursor after setContent
    event.currentTarget.selectionStart = event.currentTarget.selectionEnd = selectionStart + 2
  }

  return (
    <div className="code-edit-container">
      <textarea
        className="code-input"
        value={content}
        onChange={event => setContent(event.target.value)}
        onKeyDown={onKeyDown}
      />
      <pre className="code-output">
        <code className={`language-${language}`}>{content}</code>
      </pre>
    </div>
  )
}
