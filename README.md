This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Imp file env.local 
Code needs some secrets and all that is in .env.local file in the local stoarage pc
that is in Web folder backendtemplate_login_signup_providers


## Routes login/signup

/user/signin -> credentials, providers

/user/signup  --- email -> otp-> password set

/user/password  -reset password once logged in

/dashboard --- signout button


## Steps and Resources
1- Tookup my own backend login/signup template from my own github repository

2- Extended the functionalities to make autheentication return id too(some additional info to session)

3- Started production to resolve production errors beside development

4- Stuck with a major error of mongoose that was running on edge on auth.ts file took so large to configure how to fix(2 days approx) ,

learnings- Proper database connection  with two sites-
https://dev.to/thatanjan/2-ways-to-set-up-nextjs-with-mongodb-and-mongoose-4afo
https://medium.com/@aniruddh622003/setting-up-mongodb-with-mongoose-and-nextjs-13-3a598609c5d1

Major error to fix -
shift the database work of auth.ts file to api route and making fetch request resolved from
https://stackoverflow.com/questions/78407469/the-error-was-caused-by-importing-mongoose-dist-browser-umd-js-in-src-model

5- Performed Imp changes for production from backendtemplate readme file

6- Added socket in a client component called in root layout to let the socket work in every location througout the web app, (once the socket is being loaded it is asssigned to a state socket via setSocket function of use State)

7- 


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
