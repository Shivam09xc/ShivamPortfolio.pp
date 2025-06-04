'use server';

/**
 * @fileOverview A thank-you message generator AI agent.
 *
 * - generateThankYouMessage - A function that handles the thank you message generation process.
 * - GenerateThankYouInput - The input type for the generateThankYouMessage function.
 * - GenerateThankYouOutput - The return type for the generateThankYouMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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

  // 2. Send the AI-generated message via email (Placeholder)
  // The following is a placeholder to illustrate where email sending logic would go.
  // To implement actual email sending:
  //    a. Choose an email service provider (e.g., Resend, SendGrid, AWS SES).
  //    b. Install their SDK (e.g., `npm install resend`).
  //    c. Configure API keys/credentials securely (e.g., in .env).
  //    d. Implement the email sending logic using the chosen service.

  const { userEmail, userName, portfolioOwnerName } = input;
  const { thankYouMessage } = flowResult;

  /*
  // --- Conceptual Example using a hypothetical email service ---
  try {
    // Import your email client/SDK at the top of the file
    // e.g., import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: `${portfolioOwnerName} <your-verified-sending-email@example.com>`, // Replace with your sending email
      to: [userEmail],
      subject: `Thank you for your message, ${userName}!`,
      html: `<p>Hi ${userName},</p>${thankYouMessage.replace(/\n/g, '<br>')}<p>Best regards,<br/>${portfolioOwnerName}'s AI Assistant</p>`,
      // text: `Hi ${userName},\n\n${thankYouMessage}\n\nBest regards,\n${portfolioOwnerName}'s AI Assistant` // Optional text version
    });
    console.log(`AI-generated thank you email successfully sent to ${userEmail}`);
  } catch (error) {
    console.error('Failed to send AI-generated thank you email:', error);
    // Decide how to handle email sending errors.
    // The user on the website will still see the AI message.
    // You might want to log this error for monitoring.
  }
  // --- End of conceptual email sending example ---
  */

  // For now, we'll just log that an email would be sent.
  // Remove this console.log when you implement actual email sending.
  console.log(`[Placeholder] Email to: ${userEmail}`);
  console.log(`[Placeholder] Subject: Thank you for your message, ${userName}!`);
  console.log(`[Placeholder] Body: ${thankYouMessage}`);

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
