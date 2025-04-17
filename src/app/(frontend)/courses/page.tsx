import type { Metadata } from 'next/types'
import Link from 'next/link'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import PageClient from './page.client'
import Image from 'next/image'
import { PageRange } from '@/components/PageRange'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const courses = await payload.find({
    collection: 'courses',
    depth: 1,
    limit: 10,
    overrideAccess: false,
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Courses</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="courses"
          currentPage={courses.page}
          limit={12}
          totalDocs={courses.totalDocs}
        />
      </div>

      <div className="container grid grid-cols-3 gap-6">
        <Suspense fallback={<div>Loading...</div>}>
          {courses.docs.map((course) => {
            return (
              <Link
                href={`/courses/${course.id}`}
                key={course.id}
                className="flex flex-col cursor-pointer rounded relative border border-gray-700 hover:border-white transition ease-in-out duration-100 overflow-hidden"
              >
                <div className="relative w-full aspect-video">
                  {course.image && typeof course.image === 'object' && course.image.url && (
                    <Image alt={`${course.title} thumbnail`} src={course.image.url} fill={true} />
                  )}
                </div>
              </Link>
            )
          })}
        </Suspense>
      </div>

      <div className="container">
        {courses.totalPages > 1 && courses.page && (
          <Pagination page={courses.page} totalPages={courses.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Fahmgah Courses',
  }
}
