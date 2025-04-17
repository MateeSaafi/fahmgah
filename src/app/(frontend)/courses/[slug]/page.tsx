import type { Metadata } from 'next'

import React, { cache } from 'react'
import { getPayload } from 'payload'

import configPromise from '@payload-config'
import Image from 'next/image'

// If you need to support draft or preview modes, you can add draftMode from 'next/headers'
// For now, we assume that courses are published and accessible publicly.

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const courses = await payload.find({
    collection: 'courses',
    limit: 10,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = courses.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: {
    slug: string
  }
}

export default async function CoursePage({ params }: Args) {
  const { slug } = params
  const course = await queryCourseBySlug({ slug })

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

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = params
  const course = await queryCourseBySlug({ slug })

  return {
    title: course ? course.title : 'Course Not Found',
  }
}

// Cache the query function for performance
const queryCourseBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'courses',
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
