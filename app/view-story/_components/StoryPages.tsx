import React from 'react'

const StoryPages = ({storyChapter}:any) => {
  return (
    <div>
      <h2 className='text-2xl font-bold text-primary'>{storyChapter?.chapter_title}</h2>
      <p className='text-xl p-10 mt-3 rounded-lg bg-slate-100'>{storyChapter?.description}</p>
    </div>
  )
}

export default StoryPages