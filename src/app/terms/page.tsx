import PageContainer from '@/components/layout/page-container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className='text-muted-foreground space-y-6 text-sm leading-relaxed'>
          <section>
            <h2 className='text-foreground mb-1 text-base font-semibold'>
              1. Acceptance of Terms
            </h2>
            <p>
              By using ServantBot, you agree to be bound by these Terms of
              Service and all applicable laws and regulations. If you do not
              agree, please refrain from using the service.
            </p>
          </section>

          <section>
            <h2 className='text-foreground mb-1 text-base font-semibold'>
              2. Description of Service
            </h2>
            <p>
              ServantBot is a smart automation system designed to assist with
              household tasks, manage devices, and enhance home comfort and
              security. It is not a physical servant and should not be used in
              critical safety contexts.
            </p>
          </section>

          <section>
            <h2 className='text-foreground mb-1 text-base font-semibold'>
              3. User Responsibilities
            </h2>
            <p>
              You agree not to misuse the service, attempt unauthorized access,
              or interfere with system operations. You are responsible for
              ensuring the devices you connect to ServantBot are secure and
              properly configured.
            </p>
          </section>

          <section>
            <h2 className='text-foreground mb-1 text-base font-semibold'>
              4. Privacy
            </h2>
            <p>
              We value your privacy. Please refer to our Privacy Policy for
              details on how we collect, use, and protect your data.
            </p>
          </section>

          <section>
            <h2 className='text-foreground mb-1 text-base font-semibold'>
              5. Modifications
            </h2>
            <p>
              We reserve the right to update these terms at any time. Continued
              use of ServantBot after changes implies acceptance of the updated
              terms.
            </p>
          </section>

          <section>
            <h2 className='text-foreground mb-1 text-base font-semibold'>
              6. Contact
            </h2>
            <p>
              For any questions regarding these Terms, contact us at
              support@servantbot.ai.
            </p>
          </section>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
