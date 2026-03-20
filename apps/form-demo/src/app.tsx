import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Select } from "./components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { contactSchema } from "./schemas/contact";
import type { ContactFormValues } from "./schemas/contact";

export function App() {
  const [submitted, setSubmitted] = useState<ContactFormValues | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      category: "general",
      message: "",
    },
  });

  function onSubmit(values: ContactFormValues) {
    setSubmitted(values);
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="mx-auto max-w-lg">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Contact Form</h1>
        <p className="mb-8 text-muted-foreground">
          Built with react-hook-form + zod + shadcn/ui on Vite+
        </p>

        <div className="rounded-lg border border-border p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>Your full name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormDescription>We&apos;ll never share your email.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <option value="general">General Inquiry</option>
                        <option value="support">Support</option>
                        <option value="feedback">Feedback</option>
                        <option value="bug">Bug Report</option>
                      </Select>
                    </FormControl>
                    <FormDescription>Select the topic of your message.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us what's on your mind..." rows={4} {...field} />
                    </FormControl>
                    <FormDescription>{field.value.length}/500 characters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3">
                <Button type="submit">Submit</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    setSubmitted(null);
                  }}
                >
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {submitted && (
          <div className="mt-6 rounded-lg border border-border bg-secondary/50 p-6">
            <h2 className="mb-3 text-lg font-semibold">Submitted Data</h2>
            <pre className="overflow-auto rounded bg-background p-4 text-sm">
              {JSON.stringify(submitted, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
