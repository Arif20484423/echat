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
          // profile.name=json.user.name;
          // profile.image=json.user.image;
          // profile.description=json.user.description
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
          // profile.name=json.user.name;
          // profile.image=json.user.image;
          // profile.description=json.user.description
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
        // console.log("jwt",user)
        // token.name = (user as {name?:string}).name;
        token.id = (user as {_id?:string})._id;
        // token.image = (user as {image?:string}).image;
        // token.description = (user as {description?:string}).description;
      }
      return token;
    },
    session({ session, token }) {
      // console.log("session",token)
        session.user = {
          
            ...(session.user || {}),
            id: token.id as string, // Add `id` with a type assertion
            // name: token.name as string, 
            // image:token.image as string,
            // description:token.description as string,
          };
          return session;
    },
  },
});
