
'use server';

/**
 * @fileOverview A thank-you message generator AI agent with email sending capability.
 *
 * - generateThankYouMessage - A function that handles the thank you message generation and emailing process.
 * - GenerateThankYouInput - The input type for the generateThankYouMessage function.
 * - GenerateThankYouOutput - The return type for the generateThankYouMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { Resend } from 'resend';

const GenerateThankYouInputSchema = z.object({
  userName: z.string().describe('The name of the user submitting the form.'),
  userEmail: z.string().describe('The email of the user submitting the form.'),
  userMessage: z.string().describe('The message the user sent.'),
  portfolioOwnerName: z.string().describe('The name of the portfolio owner.'),
});
export type GenerateThankYouInput = z.infer<typeof GenerateThankYouInputSchema>;

const GenerateThankYouOutputSchema = z.object({
  thankYouMessage: z.string().describe('A personalized thank you message.'),
});
export type GenerateThankYouOutput = z.infer<typeof GenerateThankYouOutputSchema>;

export async function generateThankYouMessage(
  input: GenerateThankYouInput
): Promise<GenerateThankYouOutput> {
  // 1. Generate the AI-powered thank you message
  const flowResult = await generateThankYouMessageFlow(input);

  // 2. Send the AI-generated message via email
  const { userEmail, userName, portfolioOwnerName } = input;
  const { thankYouMessage } = flowResult;

  // IMPORTANT: For email sending to work:
  // 1. Set your RESEND_API_KEY in your .env file.
  // 2. Replace 'noreply@yourverifieddomain.com' with an email address from a domain you have verified with Resend.
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = `${portfolioOwnerName}'s AI Assistant <noreply@yourverifieddomain.com>`; // REPLACE with your verified sending email

  if (resendApiKey) {
    const resend = new Resend(resendApiKey);
    try {
      await resend.emails.send({
        from: fromEmail,
        to: [userEmail],
        subject: `Thank you for your message, ${userName}!`,
        html: `<p>Hi ${userName},</p><p>${thankYouMessage.replace(/\n/g, '<br>')}</p><p>Best regards,<br/>${portfolioOwnerName}'s AI Assistant</p>`,
        text: `Hi ${userName},\n\n${thankYouMessage}\n\nBest regards,\n${portfolioOwnerName}'s AI Assistant`
      });
      console.log(`AI-generated thank you email successfully sent to ${userEmail}`);
    } catch (error) {
      console.error('Failed to send AI-generated thank you email via Resend:', error);
      // Log the email details if sending failed, so you can manually follow up or debug.
      console.log(`[Email Fallback] To: ${userEmail}`);
      console.log(`[Email Fallback] Subject: Thank you for your message, ${userName}!`);
      console.log(`[Email Fallback] Body: ${thankYouMessage}`);
      console.log('[Email Fallback] Hint: Check RESEND_API_KEY and verified domain in Resend.');
    }
  } else {
    console.warn('RESEND_API_KEY is not set. Email not sent.');
    // Log the email details if API key is missing
    console.log(`[No API Key - Email Not Sent] To: ${userEmail}`);
    console.log(`[No API Key - Email Not Sent] Subject: Thank you for your message, ${userName}!`);
    console.log(`[No API Key - Email Not Sent] Body: ${thankYouMessage}`);
  }

  // 3. Return the generated message for display on the webpage
  return flowResult;
}

const prompt = ai.definePrompt({
  name: 'generateThankYouMessagePrompt',
  input: {schema: GenerateThankYouInputSchema},
  output: {schema: GenerateThankYouOutputSchema},
  prompt: `You are a futuristic AI assistant helping {{portfolioOwnerName}} to generate personalized thank you messages for users who have submitted the contact form on their portfolio website.

  Create a unique and personalized thank-you message using the information provided. The message should be friendly, appreciative, and reflect a modern, tech-savvy tone.

  User Name: {{{userName}}}
  User Email: {{{userEmail}}}
  User Message: {{{userMessage}}}
  Portfolio Owner Name: {{{portfolioOwnerName}}}

  Thank you message:`,
});

const generateThankYouMessageFlow = ai.defineFlow(
  {
    name: 'generateThankYouMessageFlow',
    inputSchema: GenerateThankYouInputSchema,
    outputSchema: GenerateThankYouOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
