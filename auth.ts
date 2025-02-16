import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      async profile(profile) {

        const res = await fetch(process.env.DOMAIN_URL_BASE+"api/provideruser", {
          method: "POST",
          body: JSON.stringify({ email: profile.email ,name:profile.name,image:profile.picture}),
        });
        const json = await res.json();
        if (json.success) {
          profile._id = json.user._id;
          return profile;
        }
      },
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      async profile(profile):Promise<any> {
        
        console.log(profile)
        const res = await fetch(process.env.DOMAIN_URL_BASE+"api/provideruser", {
          method: "POST",
          body: JSON.stringify({ email: profile.email,name:profile.name,image:profile.avatar_url }),
        });
        const json = await res.json();
        if (json.success) {
          profile._id = json.user._id;
          return profile;
        }
        else{
            throw new Error("Error using Github")
        }
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await fetch(process.env.DOMAIN_URL_BASE+"api/verifyuser", {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });
        const json = await res.json();
        if (json.success) {
          console.log("cred",json.user)
          return json.user;
        } else {
          throw new Error("Invalid Username or Password");
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = (user as {_id?:string})._id;
      }
      return token;
    },
    session({ session, token }) {
        session.user = {
          
            ...(session.user || {}),
            id: token.id as string, // Add `id` with a type assertion
          };
          return session;
    },
  },
});
