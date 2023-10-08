/**
 *
 * TermsOfService
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Footer from 'components/Footer';
import CustomCard from 'components/CustomCard';
import parse from 'html-react-parser';

export function TermsOfService() {
  const termsOfServiceContent = {
    content: `<strong>1. Grant of License:  </strong>

By providing your video footage to the website, you grant the website a non-exclusive, worldwide, royalty-free, and transferable license to use, reproduce, distribute, modify, create derivative works, and publicly display the footage for research purposes. This license allows the website to use the footage solely for academic, scientific, or research-related activities. 

<strong>2. Ownership and Copyright:  </strong>

You will retain ownership of the video footage provided. However, you represent and warrant that you have the necessary rights, permissions, and authority to grant the license specified in Section 1 above, and that the footage does not infringe upon the intellectual property rights or violate the rights of any third party. 

<strong>3. Consent for Use:  </strong>

You affirm that any individuals appearing in the footage have provided their consent for their image and likeness to be used and displayed by the website solely for research purposes. You further confirm that you have obtained any necessary parental or guardian consent for minors appearing in the footage. 

<strong>4. Permitted Uses:  </strong>

The website may use your provided footage solely for research purposes, including, but not limited to:  

Conducting academic, scientific, or research-related studies and investigations such as analyzing the user engagement. 

Displaying and presenting the footage in research publications, presentations, or conferences. 

Storing and archiving the footage for future reference in research projects. 

<strong>5. Prohibited Uses: </strong>

By providing your footage, you expressly agree not to: 

Provide footage that contains any unlawful, harmful, defamatory, obscene, or otherwise objectionable content. 

Provide footage that infringes upon the intellectual property rights or violates the rights of any third party. 

Provide footage that includes sensitive personal information of individuals without their explicit consent. 

<strong>6. User Obligations: </strong>

By providing your footage to the website for research purposes, you agree to: 

Ensure that the footage provided complies with all applicable laws and regulations. 

Indemnify and hold harmless the website and researchers from any claims, damages, or liabilities arising out of the use of the provided footage for research purposes. 

<strong>7. Modification and Removal: </strong>

You acknowledge that the website may edit, modify, or remove your footage as necessary for research purposes. However, any modifications will be made with consideration for preserving the integrity and context of the footage for research use. 

<strong>8. No Compensation: </strong>

You understand and agree that you will not receive any financial compensation or remuneration for providing your footage to the website for research purposes. 

<strong>9. Privacy Policy: </strong>

Your provision of footage to the website for research purposes is subject to the website's Privacy Policy, which outlines how your data will be collected, used, and protected. 

<strong>10. Governing Law: </strong>

These Terms of Service shall be governed by and construed in accordance with the laws of India, without regard to its conflicts of law principles. 

By providing your footage to the website for research purposes, you signify your acceptance of these Terms of Service. If you do not agree to these terms, please refrain from providing your footage. If you have any questions or concerns regarding these Terms of Service, please contact the website at contact@ai4schools.org.
`,
  };

  return (
    <div>
      <Helmet>
        <title>TermsOfService</title>
        <meta name="description" content="Description of TermsOfService" />
      </Helmet>

      <div style={{ padding: '40px' }}>
        {termsOfServiceContent && (
          <CustomCard title="Terms Of Service">
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                fontFamily: 'inherit',
                textAlign: 'justify',
              }}
            >
              {parse(
                termsOfServiceContent.content.replace(/<new_line>/g, '\n'),
              )}
            </pre>
          </CustomCard>
        )}
      </div>

      <Footer />
    </div>
  );
}

TermsOfService.PropTypes = {};

export default memo(TermsOfService);
