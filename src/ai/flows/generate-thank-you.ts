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
  return generateThankYouMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateThankYouMessagePrompt',
  input: {schema: GenerateThankYouInputSchema},
  output: {schema: GenerateThankYouOutputSchema},
  prompt: `You are a futuristic AI assistant helping {{portfolioOwnerName}} to generate personalized thank you messages for users who have submitted the contact form on their portfolio website.

  Create a unique and personalized thank-you message using the information provided.

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
