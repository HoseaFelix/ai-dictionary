'use client'

import { useFeedbackStore, useErrorStore, useWordStore } from '@/store/store'
import { FeedbackData } from '@/types'
import React, { useEffect, useState } from 'react'

const AnimatedContent = () => {
  const word = useWordStore(state => state.word)

  const { error } = useErrorStore()
  const {
    overview,
    keyPoints,
    bestPractices,
    warnings,
    summary,
  } = useFeedbackStore() as FeedbackData

  const hasFeedback =
    overview.trim() !== '' ||
    keyPoints.length > 0 ||
    bestPractices.length > 0 ||
    warnings.length > 0 ||
    summary.trim() !== ''

  

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-Speech not supported on your browser.")
      return
    }

    if (!word) return

    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = 'en-US'
    utterance.rate = 0.9
    utterance.pitch = 1
    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)
  }

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 py-6 text-white">
      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      {!hasFeedback && (
        <p className="text-sm sm:text-base">
          This is an AI powered dictionary <br />Enter the word below...
        </p>
      )}

      {hasFeedback && (
        <div className="space-y-6 text-sm sm:text-base">
          <div className='w-full font-bold flex items-end justify-end text-white gap-2'>
            <div
              onClick={handleSpeak}
              className='w-fit px-2 py-0.5 bg-white text-black rounded hover:cursor-pointer'
            >
              🔊 Speak
            </div>
            <div className='text-2xl'>
              {word}
            </div>
          </div>

          {/* Overview */}
          <div>
            <h2 className="text-lg font-semibold mb-1">Overview</h2>
            <p className="leading-relaxed">{overview}</p>
          </div>

          {/* Key Points */}
          {keyPoints.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Key Points to note:</h2>
              <ul className="list-disc list-inside space-y-1">
                {keyPoints.map((item, index) => (
                  <li key={index}>{item.comment}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Best Practices */}
          {bestPractices.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Best Practices:</h2>
              <ul className="list-disc list-inside space-y-1">
                {bestPractices.map((item, index) => (
                  <li key={index}>{item.comment}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings */}
          {warnings.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Warnings:</h2>
              <ul className="list-disc list-inside space-y-1 text-red-600">
                {warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Summary */}
          <div>
            <h2 className="text-lg font-semibold mb-1">Summary</h2>
            <p className="leading-relaxed">{summary}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnimatedContent
