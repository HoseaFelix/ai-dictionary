import { z } from 'zod';
import { useErrorStore, useFeedbackStore } from '@/store/store';





export const feedbackSchema = z.object({
  overview: z.string(),
  keyPoints: z.array(z.object({ comment: z.string() })),
  bestPractices: z.array(z.object({ comment: z.string() })),
  warnings: z.array(z.string()),
  summary: z.string(),
});

export const generateDefiniiton = async (word)=>{

  const res = await fetch('/api/create-feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word }),
  });  

  const data = await res.json();

  if(data.feedback) {
    useFeedbackStore.setState(data.feedback)
    useErrorStore.getState().clearError()
  } else{
    useErrorStore.getState().setError(data.error || 'unknown error' )
  }

}



