import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { downloadFile, getOneLessonById, selectStudentLesson } from '../../store/studentLesson'
import { Breadcrumbs, Button } from '../../components'

import c from './style.module.scss'

export const StudentLesson: FC = () => {
  const { id } = useParams<{
    id: string
  }>()
  const { isLoading, studentLesson } = useSelector(selectStudentLesson)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOneLessonById({ lessonId: Number(id) }))
  }, [])

  const handleFileDownload = (filePath: string, fileOriginalName: string) => () => {
    dispatch(downloadFile(filePath, fileOriginalName))
  }

  if (isLoading) return <h1>Loading...</h1>

  return (
    <>
      <Breadcrumbs>Уроки / {studentLesson?.name}</Breadcrumbs>
      <div className={c.lessonContainer}>
        {studentLesson ? (
          <>
            <div className={c.lessonHeading}>Описание урока</div>
            <div className={c.lessonContent}>{studentLesson.description}</div>
            <div className={c.lessonHeading}>Материалы к уроку</div>
            <div className={c.lessonContent}>
              {studentLesson.files.map(file => (
                <Button key={file.path} onClick={handleFileDownload(file.path, file.originalName)}>
                  {file.originalName}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <div>Что-то пошло не так</div>
        )}
      </div>
    </>
  )
}
