import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const { handlers, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Firebase',
      credentials: {
        token: { label: 'Firebase Token', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.token) return null;

        const { token } = credentials;
        
        try {
          // Validar token usando endpoint
          const validateResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/validate-token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });

          if (!validateResponse.ok) {
            return null;
          }

          const { uid } = await validateResponse.json();

          // Buscar usuario usando endpoint
          const findUserResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/find-user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid }),
          });

          if (!findUserResponse.ok) {
            return null;
          }

          const user = await findUserResponse.json();
          return user;
        } catch (error) {
          console.error('Error in authorize:', error);
          return null;
        }
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub || '';
      session.user.role = token.role as string;
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        token.role = session.role as string;
      }
      if (user) {
        token.role = user.role as string;
      }
      return token;
    }
  }
}); 