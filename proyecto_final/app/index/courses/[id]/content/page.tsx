import PaginaCurso from '@/app/components/Courses/[id]/page'

interface CourseContentPageProps {
  params: { id: string }
}

export default async function CourseContentPage({ params }: CourseContentPageProps) {
  return <PaginaCurso params={Promise.resolve(params)} />
}
