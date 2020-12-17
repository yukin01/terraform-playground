import React, { FC, DOMAttributes, useEffect, useState } from 'react'
import Prism from 'prismjs'

type SetContent = React.Dispatch<React.SetStateAction<string>>
type OnKeyDown = NonNullable<DOMAttributes<HTMLTextAreaElement>['onKeyDown']>
type EventTargetElement = React.KeyboardEvent<HTMLTextAreaElement>['currentTarget']

type Props = {
  language: string
  content: string
  setContent: SetContent
}

// type NewTabHandler = (state: { target: EventTargetElement, position: number }) => () => void

// const newTabHandler: NewTabHandler = (state) => {
//   const { target, position } = state
//   let done = false
//   return () => {
//     if (done) return
//     target.selectionStart = position
//     target.selectionEnd = position
//     done = true
//   }
// }
class TabHandler {
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
  // const [handler, setHandler] = useState<ReturnType<NewTabHandler>>()
  const [handler, setHandler] = useState<TabHandler>()

  useEffect(() => {
    Prism.highlightAll()
    // handler && handler()
    handler?.execute()
  }, [content])

  // handle 2-space indent on
  const onKeyDown: OnKeyDown = event => {
    if (event.key !== 'Tab') return
    event.preventDefault()

    const { selectionStart, selectionEnd } = event.currentTarget

    setContent(prev => prev.substring(0, selectionStart) + '  ' + prev.substring(selectionEnd))
    // setHandler(newTabHandler({ target: event.currentTarget, position: selectionStart + 2 }))
    setHandler(new TabHandler(event.currentTarget, selectionStart + 2))
  }

  return (
    <div className="code-edit-container">
      <textarea
        className="code-input"
        value={content}
        onChange={event => setContent(event.target.value)}
        onKeyDown={onKeyDown}
        style={{ width: 1000, height: 200 }}
      />
      <pre className="code-output">
        <code className={`language-${language}`}>{content}</code>
      </pre>
    </div>
  )
}
