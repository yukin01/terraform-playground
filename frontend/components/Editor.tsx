import React, { FC, DOMAttributes, useEffect, useState, useRef } from 'react'
import Prism from 'prismjs'

type SetContent = React.Dispatch<React.SetStateAction<string>>
type OnKeyDown = NonNullable<DOMAttributes<HTMLTextAreaElement>['onKeyDown']>
type EventTargetElement = React.KeyboardEvent<HTMLTextAreaElement>['currentTarget']

type Props = {
  language: string
  content: string
  setContent: SetContent
}

type Handler = {
  execute: () => void
}

class TabHandler implements Handler {
  private done = false
  constructor(private target: EventTargetElement, private position: number) {}
  execute() {
    if (this.done) return
    this.target.selectionStart = this.position
    this.target.selectionEnd = this.position
    this.done = true
  }
}

export const Editor: FC<Props> = ({ language, content, setContent }) => {
  const [handler, setHandler] = useState<Handler>()
  const containerRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    Prism.highlightAll()
    handler?.execute()
    if (containerRef.current && codeRef.current) {
      containerRef.current.style.height = `${codeRef.current.scrollHeight + 20}px`
    }
  }, [content])

  // handle 2-space indent on
  const onKeyDown: OnKeyDown = event => {
    if (event.key !== 'Tab') return
    event.preventDefault()

    const { selectionStart, selectionEnd } = event.currentTarget

    setContent(prev => prev.substring(0, selectionStart) + '  ' + prev.substring(selectionEnd))
    setHandler(new TabHandler(event.currentTarget, selectionStart + 2))
  }

  return (
    <div className="code-edit-container" ref={containerRef}>
      <textarea
        className="code-input"
        value={content}
        onChange={event => setContent(event.target.value)}
        onKeyDown={onKeyDown}
      />
      <pre className="code-output">
        <code className={`language-${language}`} ref={codeRef}>{content}</code>
      </pre>
    </div>
  )
}
