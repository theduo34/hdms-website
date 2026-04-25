import {
  houseSystemIntro,
  houseActivities,
  partnershipPillars,
  ptaFacts,
  involvementWays,
  servicePhilosophyQuote,
  communityInitiatives,
  culturalEvents,
} from '@/features/community/community'

export function useHouseSystem() {
  return {
    intro: houseSystemIntro,
    activities: houseActivities,
  }
}

export function useParents() {
  return {
    pillars: partnershipPillars,
    pta: ptaFacts,
    involvement: involvementWays,
  }
}

export function useService() {
  return {
    quote: servicePhilosophyQuote,
    initiatives: communityInitiatives,
    cultural: culturalEvents,
  }
}
