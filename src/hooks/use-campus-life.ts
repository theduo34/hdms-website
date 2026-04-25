import {
  schoolDaySchedule,
  workCyclePillars,
  mealsInfo,
  sportsActivities,
  learningSpaces,
  outdoorSpaces,
  supportSpaces,
  pastoralPillars,
  healthFacts,
  nutritionFacts,
} from '@/features/campus-life/campus-life'

export function useSchoolDay() {
  return {
    schedule: schoolDaySchedule,
    pillars: workCyclePillars,
    meals: mealsInfo,
  }
}

export function useSportsClubs() {
  return {
    sports: sportsActivities,
  }
}

export function useFacilities() {
  return {
    learning: learningSpaces,
    outdoor: outdoorSpaces,
    support: supportSpaces,
  }
}

export function useWellbeing() {
  return {
    pastoral: pastoralPillars,
    health: healthFacts,
    nutrition: nutritionFacts,
  }
}
