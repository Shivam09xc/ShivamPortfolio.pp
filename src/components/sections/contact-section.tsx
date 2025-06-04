"use client";

import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { generateThankYouMessage, type GenerateThankYouInput } from '@/ai/flows/generate-thank-you';
import SectionWrapper from '@/components/shared/section-wrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { Send, Loader2 } from 'lucide-react';

const formSchema = z.object({
  userName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  userEmail: z.string().email({ message: "Please enter a valid email address." }),
  userMessage: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      userEmail: "",
      userMessage: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setAiResponse(null);
    try {
      const aiInput: GenerateThankYouInput = {
        ...data,
        portfolioOwnerName: siteConfig.portfolioOwnerName,
      };
      const result = await generateThankYouMessage(aiInput);
      setAiResponse(result.thankYouMessage);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. The AI has crafted a special response for you below!",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      console.error("Error sending message or generating AI response:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionWrapper id="contact" title="Get In Touch">
      <Card className="glassmorphism-darker max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl text-primary text-center">Contact Me</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Have a project in mind or just want to say hi? Fill out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-accent">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} className="bg-background/50 border-primary/30 focus:border-primary focus:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-accent">Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} className="bg-background/50 border-primary/30 focus:border-primary focus:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-accent">Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your message here..." {...field} rows={5} className="bg-background/50 border-primary/30 focus:border-primary focus:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full bg-primary text-primary-foreground hover:bg-primary/80 neon-glow-primary">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Send Message
              </Button>
            </form>
          </Form>

          {aiResponse && (
            <div className="mt-8 p-6 border border-accent rounded-lg bg-accent/10">
              <h3 className="text-xl font-semibold text-accent mb-2">A Special Thank You from My AI Assistant:</h3>
              <p className="text-foreground/90 whitespace-pre-line">{aiResponse}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </SectionWrapper>
  );
}
