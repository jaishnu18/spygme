/**
 *
 * PrivacyPolicy
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Footer from 'components/Footer';
import CustomCard from 'components/CustomCard';
import parse from 'html-react-parser';

export function PrivacyPolicy() {
  const privacyPolicyContent = {
    content: `Your privacy is important to us. This Privacy Policy outlines how your personal information and/or video footage provided will be collected, used, and protected when you provide them to the website for research purposes. By providing your personal information and/or video footage, you acknowledge and agree to the practices described in this Privacy Policy. 

<strong>1. Collection of Information: </strong>

Video Footage Information:  
When you provide video footage to the website for research purposes, we may collect and store the footage you submit. This may include video files, metadata, descriptions, and other related information. 

Personal Information: 
In order to facilitate the submission and management of your footage, we may collect certain personal information, such as your name, email address, institutional affiliation, and any additional information you provide voluntarily. 

<strong>2. Use of Information: </strong>

Research Purposes: 
The video footage and associated information provided will be used solely for research purposes, including academic, scientific, or research-related studies and investigations. 

Internal Use: 
We may use the footage and information you provide for internal research purposes, analysis, and to improve the functionality and content of our website. 

<strong>3. Sharing and Disclosure: </strong>

Researchers and Affiliates: 
Your video footage provided may be shared with researchers, institutions, or affiliates involved in the research project for which the footage was submitted. These parties will be subject to the same privacy obligations as outlined in this Privacy Policy. 

Anonymization: 
To protect your privacy and the privacy of individuals appearing in the footage, we may anonymize or de-identify the footage before sharing it for research purposes. 

<strong>4. Data Security: </strong>

We take appropriate measures to safeguard the security and integrity of the video footage and personal information provided. However, no method of transmission or electronic storage is completely secure, and we cannot guarantee the absolute security of your data. 

<strong>5. Retention: </strong>

Your provided footage and associated information will be retained for the duration of the research project for which it was submitted, and for a reasonable period afterward for archival and reference purposes. 

<strong>6. Your Choices: </strong>

Voluntary Submission: 
Providing your video footage is voluntary. You may choose not to provide certain information or to withdraw your provided video footage at any time by contacting us at contact@ai4schools.org. 

<strong>8. Changes to Privacy Policy: </strong>

We may update this Privacy Policy from time to time to reflect changes in our practices. We will post any revisions on this page and, if the changes are significant, provide a prominent notice on our website. 

<strong>9. Contact Us: </strong>

If you have any questions, concerns, or requests regarding this Privacy Policy or the use of your provided personal information or the video footage, please contact us at contact@ai4schools.org.
`,
  };

  return (
    <div>
      <Helmet>
        <title>PrivacyPolicy</title>
        <meta name="description" content="Description of PrivacyPolicy" />
      </Helmet>

      <div style={{ padding: '40px' }}>
        {privacyPolicyContent && (
          <CustomCard title="Privacy Policy">
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                fontFamily: 'inherit',
                textAlign: 'justify',
              }}
            >
              {parse(privacyPolicyContent.content.replace(/<new_line>/g, '\n'))}
            </pre>
          </CustomCard>
        )}
      </div>

      <Footer />
    </div>
  );
}

PrivacyPolicy.propTypes = {};

export default memo(PrivacyPolicy);
