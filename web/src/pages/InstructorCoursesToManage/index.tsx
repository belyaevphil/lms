import React from 'react'

import { InstructorCoursesToManageType } from 'types'
import { InstructorCoursesToManageUI } from './InstructorCoursesToManageUI'
import { API } from 'api'
import { useAsyncRequest } from 'hooks/useAsyncRequest'

export const InstructorCoursesToManage: React.FunctionComponent = () => {
  // const [courses, setCourses] = React.useState<InstructorCoursesToManageType[]>([
  //   {
  //     id: 1,
  //     name: 'Математика'
  //   },
  //   {
  //     id: 2,
  //     name: 'Русский язык'
  //   },
  //   {
  //     id: 3,
  //     name: 'ОБЖ'
  //   },
  //   {
  //     id: 4,
  //     name: 'История'
  //   },
  //   {
  //     id: 5,
  //     name: 'География'
  //   }
  // ])
  const getInstructorCoursesToManage = React.useCallback(
    () => API.courses.getInstructorCoursesToManage(),
    []
  )
  const [instructorCoursesToManage] = useAsyncRequest<{ courses: InstructorCoursesToManageType[] }>(
    getInstructorCoursesToManage
  )

  return <InstructorCoursesToManageUI instructorCoursesToManage={instructorCoursesToManage} />
}
