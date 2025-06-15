import PageContainer from '@/components/layout/page-container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className='text-muted-foreground space-y-6 text-sm leading-relaxed'>
          <section>
            <h2 className='text-foreground mb-1 text-base font-semibold'>
              1. Introduction
            </h2>
            <p>
              ServantBot is committed to protecting your privacy. This Privacy
              Policy outlines how we collect, use, and safeguard your
              information.
            </p>
          </section>

          <section>
            <h2 className='text-foreground mb-1 text-base font-semibold'>
              2. Information We Collect
            </h2>
            <p>
              We may collect personal information such as your name, email
              address, device data, and usage patterns to provide and improve
              our services.
            </p>
          </section>

          <section>
            <h2 className='text-foreground mb-1 text-base font-semibold'>
              3. How We Use Your Information
            </h2>
            <p>
              We use your data to personalize your experience, maintain system
              functionality, enhance security, and inform you about updates or
              features.
            </p>
          </section>

          <section>
            <h2 className='text-foreground mb-1 text-base font-semibold'>
              4. Data Sharing
            </h2>
            <p>
              We do not sell your data. We may share information with trusted
              partners strictly for operational purposes (e.g., cloud hosting,
              analytics), under confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className='text-foreground mb-1 text-base font-semibold'>
              5. Your Rights
            </h2>
            <p>
              You have the right to access, modify, or delete your personal
              data. You may also object to certain uses or request a data export
              by contacting us.
            </p>
          </section>

          <section>
            <h2 className='text-foreground mb-1 text-base font-semibold'>
              6. Data Security
            </h2>
            <p>
              We use encryption, access control, and regular audits to keep your
              data secure. However, no system is 100% immune to risks, so we
              advise caution when sharing sensitive data.
            </p>
          </section>

          <section>
            <h2 className='text-foreground mb-1 text-base font-semibold'>
              7. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. You’ll be
              notified of major changes via our app or website.
            </p>
          </section>

          <section>
            <h2 className='text-foreground mb-1 text-base font-semibold'>
              8. Contact Us
            </h2>
            <p>
              For privacy-related questions, contact us at
              privacy@servantbot.ai.
            </p>
          </section>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
