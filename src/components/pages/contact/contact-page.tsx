import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { ContactHero } from '@/features/contact/contact-hero'
import { ContactInfoSection } from '@/features/contact/contact-info-section'
import { ContactFormSection } from '@/features/contact/contact-form-section'
import { ContactCtaSection } from '@/features/contact/contact-cta-section'

export function ContactPage() {
    return (
        <main className="flex flex-col w-full min-h-screen bg-background text-foreground">
            <SmoothScroll>
                <ContactHero />
                <ContactInfoSection />
                <ContactFormSection />
                <ContactCtaSection />
            </SmoothScroll>
        </main>
    )
}
