import {
  SignIn,
  SignUp,
  StudentCourses,
  StudentCourse,
  StudentLessonPage,
  AdminManagement,
  InstructorCoursesToManage,
  InstructorCourse,
  InstructorLessonPage,
  InstructorCourseAddLesson,
  InstructorGradeLesson,
  InstructorLessonsToGrade
} from 'pages'

export const authenticatedRoutes = [
  {
    path: '/courses',
    exact: true,
    component: StudentCourses,
    roles: ['STUDENT']
  },
  {
    path: '/courses/:studentCourseId/lessons/:studentLessonId',
    exact: false,
    component: StudentLessonPage,
    roles: ['STUDENT']
  },
  {
    path: '/courses/:studentCourseId',
    exact: false,
    component: StudentCourse,
    roles: ['STUDENT']
  },
  {
    path: '/instructor/lessons/:studentLessonId/grade',
    exact: false,
    component: InstructorGradeLesson,
    roles: ['INSTRUCTOR']
  },
  {
    path: '/instructor/courses/:courseId/lessons/add',
    exact: false,
    component: InstructorCourseAddLesson,
    roles: ['INSTRUCTOR']
  },
  {
    path: '/instructor/courses/:instructorCourseId/lessons/:instructorLessonId',
    exact: false,
    component: InstructorLessonPage,
    roles: ['INSTRUCTOR']
  },
  {
    path: '/instructor/courses/management',
    exact: true,
    component: InstructorCoursesToManage,
    roles: ['INSTRUCTOR']
  },
  {
    path: '/instructor/courses/:instructorCourseId',
    exact: false,
    component: InstructorCourse,
    roles: ['INSTRUCTOR']
  },
  {
    path: '/instructor/lessons/assessment',
    exact: true,
    component: InstructorLessonsToGrade,
    roles: ['INSTRUCTOR']
  },
  {
    path: '/admin/management',
    exact: true,
    component: AdminManagement,
    roles: ['ADMIN']
  }
]

export const unauthenticatedRoutes = [
  {
    path: '/sign-up',
    exact: true,
    component: SignUp
  },
  {
    path: '/sign-in',
    exact: true,
    component: SignIn
  }
]
