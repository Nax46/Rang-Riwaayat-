import { NextRequest, NextResponse } from 'next/server';
import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db/connect';

const subscribeSchema = z.object({
  email: z.string().trim().toLowerCase().email('Please enter a valid email address.'),
  locale: z.enum(['en', 'hi', 'gu']).optional().default('en'),
});

interface SubscriberRecord {
  email: string;
  locale: 'en' | 'hi' | 'gu';
  subscribedAt: string;
}

declare global {
  // eslint-disable-next-line no-var
  var __rrNewsletterSubscribers: Map<string, SubscriberRecord> | undefined;
}

const memoryStore: Map<string, SubscriberRecord> =
  global.__rrNewsletterSubscribers || new Map<string, SubscriberRecord>();
if (!global.__rrNewsletterSubscribers) {
  global.__rrNewsletterSubscribers = memoryStore;
}

const NewsletterSubscriberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    locale: { type: String, enum: ['en', 'hi', 'gu'], default: 'en' },
    subscribedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

function getSubscriberModel() {
  return (
    mongoose.models.NewsletterSubscriber ||
    mongoose.model('NewsletterSubscriber', NewsletterSubscriberSchema)
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request payload.' },
      { status: 400 }
    );
  }

  const parsed = subscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Please enter a valid email address.' },
      { status: 400 }
    );
  }

  const { email, locale } = parsed.data;
  const conn = await connectToDatabase();

  if (conn) {
    try {
      const Subscriber = getSubscriberModel();
      const existing = await Subscriber.findOne({ email }).lean();
      if (existing) {
        return NextResponse.json(
          {
            status: 'already_subscribed',
            email,
            storage: 'mongodb',
          },
          { status: 200 }
        );
      }

      await Subscriber.create({ email, locale, subscribedAt: new Date() });
      return NextResponse.json(
        {
          status: 'subscribed',
          email,
          storage: 'mongodb',
        },
        { status: 201 }
      );
    } catch (err) {
      console.warn('Newsletter MongoDB write fallback triggered:', err);
    }
  }

  if (memoryStore.has(email)) {
    return NextResponse.json(
      {
        status: 'already_subscribed',
        email,
        storage: 'memory',
      },
      { status: 200 }
    );
  }

  memoryStore.set(email, {
    email,
    locale,
    subscribedAt: new Date().toISOString(),
  });

  return NextResponse.json(
    {
      status: 'subscribed',
      email,
      storage: 'memory',
    },
    { status: 201 }
  );
}

