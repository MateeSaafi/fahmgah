import React from 'react'
import { getPayload } from 'payload'

import configPromise from '@payload-config'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Course } from '@/payload-types'

// If you need to support draft or preview modes, you can add draftMode from 'next/headers'
// For now, we assume that courses are published and accessible publicly.

type Args = {
  params: {
    courseId: string
  }
}

export default async function CoursePage({ params }: Args) {
  const { courseId } = params
  const payload = getPayload({ config: configPromise })
  let course: Course | null = null

  try {
    const res = await payload.find({
      collection: 'courses',
      limit: 1,
      where: {
        id: courseId,
      },
    })

    course = res
  } catch (error) {
    console.error('Error fetching course:', error)
    return notFound()
  }

  if (!course) {
    return <div>Course not found</div>
  }

  return (
    <article className="pt-16 pb-16">
      <div className="container">
        <h1 className="text-3xl font-bold">{course.title}</h1>
        <p className="mt-4">{course.description}</p>
        {course.image && typeof course.image === 'object' && course.image.url && (
          <Image
            src={course.image.url}
            alt={course.title}
            width={800}
            height={400}
            className="mt-4 rounded-lg"
          />
        )}
      </div>
    </article>
  )
}
