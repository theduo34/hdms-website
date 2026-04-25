// supabase/seed/08_admissions_faqs.ts
// Seeds admissions_faqs from the admissions.ts feature data.

import type { SupabaseClient } from '@supabase/supabase-js'

export async function seedAdmissionsFaqs(db: SupabaseClient) {
  console.log('  → seeding admissions_faqs...')

  const rows = [
    {
      question:   'What age does my child need to be to join HDM?',
      answer:     "We accept children from 18 months (Little Angels / Toddler programme) through to Year 7 (JHS). Each programme has a specific age range – please see our Programmes page or contact our admissions office for details on the right entry point for your child.",
      sort_order: 1,
    },
    {
      question:   'Do you accept mid-term enrolments?',
      answer:     "Yes, we do accept mid-term enrolments subject to availability. We recommend contacting our admissions office as early as possible to discuss your child's needs and confirm whether a place is available in the relevant year group.",
      sort_order: 2,
    },
    {
      question:   'Is HDM accredited by the Ghana Education Service?',
      answer:     "Yes. Heaven's Dew Montessori is fully recognised by the Ghana Education Service. Our curriculum meets national requirements while incorporating the Montessori method, and our students sit the appropriate national assessments at the relevant stages.",
      sort_order: 3,
    },
    {
      question:   'Do you offer any financial assistance or scholarships?',
      answer:     "We do not currently offer formal scholarships. However, we encourage families with specific financial circumstances to speak directly with our Director to discuss options. Our priority is always to ensure that no child misses out on the HDM experience due to financial barriers, where this is possible.",
      sort_order: 4,
    },
    {
      question:   'How do I arrange a school tour before applying?',
      answer:     "The best way to experience HDM is to attend one of our regular Open Days. The next Open Day is on Saturday 15 March 2026. Alternatively, you can contact our admissions office to arrange a private visit.",
      sort_order: 5,
    },
    {
      question:   'What happens after I submit my application?',
      answer:     "Our admissions team will review your application and contact you within 3 working days to schedule a brief visit and informal assessment. You will receive a formal offer letter upon successful completion of this stage.",
      sort_order: 6,
    },
  ]

  const { error } = await db
    .from('admissions_faqs')
    .upsert(rows, { onConflict: 'id' })

  if (error) throw new Error(`admissions_faqs seed failed: ${error.message}`)
  console.log(`     ✓ ${rows.length} FAQs`)
}
