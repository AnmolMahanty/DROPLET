import { useState, useEffect } from 'react'

export default function AnimatedText({words}) {
  const [currentWord, setCurrentWord] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isDeleting) {
        setCurrentText((prev) => prev.slice(0, -1))
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentWord((prev) => (prev + 1) % words.length)
        }
      } else {
        setCurrentText((prev) => words[currentWord].slice(0, prev.length + 1))
        if (currentText === words[currentWord]) {
          setIsDeleting(true)
        }
      }
    }, isDeleting ? 50 : 150)

    return () => clearTimeout(timer)
  }, [currentText, currentWord, isDeleting, words])

  return (
    <span className="text-black font-bold">
      {currentText}
      <span className="animate-blink">|</span>
    </span>
  )
}