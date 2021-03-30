import React from 'react'

import { Response, ResponseStatus, ResponseMessage } from 'api'
import { useIsMounted } from './useIsMounted'

export const useAsyncRequest = <T>(fn: () => Promise<Response<T>>) => {
  const checkIsMounted = useIsMounted()
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [status, setStatus] = React.useState<ResponseStatus | null>(null)
  const [payload, setPayload] = React.useState<T | null>(null)
  const [message, setMessage] = React.useState<ResponseMessage>(null)

  const removeMessage = React.useCallback(() => setMessage(null), [])

  const makeRequest = React.useCallback(async () => {
    if (checkIsMounted()) {
      setLoading(true)
    }
    try {
      const response = await fn()
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
      setLoading(false)
    }
  }, [checkIsMounted, fn])

  React.useEffect(() => {
    makeRequest()
  }, [makeRequest])

  return [
    {
      status,
      payload,
      message,
      isLoading,
      removeMessage
    },
    makeRequest
  ] as const
}
