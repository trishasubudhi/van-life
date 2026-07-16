import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function Error() {
  const error = useRouteError()

  return (
    <>
      <p class="error-heading red">
        <span class="error-icon">⚠️</span>
        {error.message}
      </p>
      <pre>{error.status} - {error.statusText}</pre>
    </>
  )
}
