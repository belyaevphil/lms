import React from 'react'
import { FormikHelpers } from 'formik'

import { useIsMounted } from './useIsMounted'
import { Response, ResponseMessage, ResponseStatus } from 'api'

export const useFormikRequest = <T>(fn: (dto: any) => Promise<Response<T>>) => {
  const checkIsMounted = useIsMounted()
  const [status, setStatus] = React.useState<ResponseStatus | null>(null)
  const [payload, setPayload] = React.useState<T | null>(null)
  const [message, setMessage] = React.useState<ResponseMessage>(null)

  const removeMessage = React.useCallback(() => setMessage(null), [])

  const makeRequest = React.useCallback(
    async (values: any, formikHelpers: FormikHelpers<any>) => {
      try {
        const response = await fn(values)
        const { payload, message } = response
        if (checkIsMounted()) {
          setStatus('success')
          setPayload(payload)
          setMessage(message)
        }
      } catch (e) {
        if (checkIsMounted()) {
          setStatus('error')
          setMessage(e.response ? e.response.data.message : 'Извините, кажется что-то пошло не так')
        }
      }
      if (checkIsMounted()) {
        formikHelpers.setSubmitting(false)
      }
    },
    [checkIsMounted, fn]
  )

  return [
    {
      status,
      payload,
      message,
      removeMessage
    },
    makeRequest
  ] as const
}
