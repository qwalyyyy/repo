// lib/analytics.ts
import posthog from 'posthog-js'
import { PostHogConfig } from 'posthog-js'

const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY || ''
const POSTHOG_HOST = process.env.POSTHOG_HOST || 'http://localhost:8000'
const POSTHOG_ENABLED = process.env.POSTHOG_ENABLED !== 'false'

// Инициализация PostHog
export const initPostHog = (config?: Partial<PostHogConfig>) => {
  if (POSTHOG_ENABLED && POSTHOG_API_KEY) {
    posthog.init(POSTHOG_API_KEY, {
      api_host: POSTHOG_HOST,
      loaded: (ph) => {
        console.log('PostHog initialized')
      },
      ...config
    })
  }
}

// Трекинг событий
export const trackEvent = (
  userId: string | number,
  event: string,
  properties?: Record<string, any>
): void => {
  if (!POSTHOG_ENABLED || !posthog.__loaded) {
    return
  }

  try {
    const distinctId = String(userId)
    const eventProperties = properties || {}

    const fullProperties = {
      ...eventProperties,
      $timestamp: new Date().toISOString(),
      $lib: 'askom-service'
    }

    posthog.capture(event, fullProperties, { $set: { distinct_id: distinctId } })
  } catch (error) {
    console.error('PostHog tracking error:', error)
  }
}

export const identifyUser = (
  userId: string | number,
  userProperties?: Record<string, any>
): void => {
  if (!POSTHOG_ENABLED || !posthog.__loaded) {
    return
  }

  try {
    const distinctId = String(userId)
    posthog.identify(distinctId, userProperties)
  } catch (error) {
    console.error('PostHog identify error:', error)
  }
}

export const trackPageView = (
  userId: string | number,
  pageUrl: string,
  properties?: Record<string, any>
): void => {
  trackEvent(userId, '$pageview', {
    $current_url: pageUrl,
    ...properties
  })
}
