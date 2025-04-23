'use client'

import { Course, Participation } from '@/payload-types'
import { useState } from 'react'
import CourseModule from './CourseModule'
import Curriculum from './Curriculum'

export default function CourseViewer({ participation }: { participation: Participation }) {
  const [currentProgress, setCurrentProgress] = useState(participation?.progress ?? 0)

  const course: Course = participation.course as Course

  async function handleCompleted(nextIndex: number) {
    setCurrentProgress(nextIndex)
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {course.curriculum ? (
        <CourseModule
          participation={participation}
          module={course.curriculum[currentProgress]}
          onCompleted={handleCompleted}
        />
      ) : (
        <p>Nothing to show</p>
      )}
      <Curriculum course={course} currentProgress={currentProgress} />
    </div>
  )
}
