'use server'

import { cookies } from 'next/headers';
import { Lucia } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import prisma from './prisma';
const adapter = new PrismaAdapter(prisma.session, prisma.user);

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
});

export async function createAuthSession(userId:string) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  const cookieStore = await cookies();
  cookieStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}

export async function verifyAuth() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(lucia.sessionCookieName)
  if(!sessionCookie) {
    return {
      user: null,
      session: null
    }
  }

  const sessionId = sessionCookie.value
  if(!sessionId) {
    return {
      user: null,
      session: null
    }
  }
  const result = lucia.validateSession(sessionId)
  try {
    const validatedResult = await result; 
    if(validatedResult.session && validatedResult.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(validatedResult.session.id);
        const cookieStore = await cookies();
        cookieStore.set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
    }
    if(!validatedResult.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        const cookieStore = await cookies();
        cookieStore.set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
    }
  } catch {}
  return result

}

export async function destroySession() {
  const {session} = await verifyAuth()
  if(!session) {
    return {
      error: 'Unauthorized'
    }
  }
  await lucia.invalidateSession(session.id)
  const sessionCookie = lucia.createBlankSessionCookie();
  const cookieStore = await cookies();
  cookieStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

}