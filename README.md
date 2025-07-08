# eChat (Chat and Storage) 

#### (Email based Application as like Whatspp is phone number based)

This is a full stack Next and express (for socket) based project and combination of a chat appplication and a file manager.


## Reason to build this 
```bash
We always use whatsapp or any other chat application for both of our work and also professional work and while doing that all the professionally received files are mixed up with other unnecessary pictures and files.

Thats why i came up with this idea to merge the chat ap and file storage in one piece of application so that 
first - It can be used professionally 
second - All the professional talks and thoughts at one place
third - All the professional files remain at one place 
fourth - All the files can be managed easily by foldering, deleting, renaming and further file related operations

```

## Target Customers 
```bash
All the Remote workers
SDE
School Staffs
Company Staff
Freelancers
Lawyers
All the persons who need to separate their work from other unnecessary stuffs 
```

## Why this is a competetor of other similar aplication  
```bash
The Reason is- 
The Simple UI
Similar to other chatapps
Similar to File manager
That let it be easily accessible 
We can provide the easiest user interface to be a competetor for other similar Applications

```


## About the application

## Ways to Register
```bash
Google signup
Github signup
Email signup

```

## Ways to Login
```bash
Google signin
Github signin
Email and Password based signin

```

## Chat functionalities
```bash
Add a friend
Create a Group 
Send text message (with emojis)
Send Images, Videos, files, etc.
Forward messages
Delete messages
Delete messages for everyone
Select messages (to delete/foward multiple messages in once)
View other users profile (with their information and the media shared between you and the other user you are chatting)
Time denoted for all messages

```

## Storage functionalities
```bash
View all files and folders
View Photos separately
View Videos separately
View Documents separately
Create folder
Upload files
Delete files and folders
Rename files and folders
Send files (from storage location to chats directly)
Select files (to delete/send multile files in one step )

```





## Journey Throughout

Figma design - https://www.figma.com/design/kwJA70CWswiRDP4yCWVBXu/echat?node-id=0-1&p=f&t=YUC3nB5TUUeyq0jZ-0


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

7- Designed a database model for our chat application , er diagram link https://app.diagrams.net/#G15HfFKoVb7JMASQf8YkSKYo6MRhmcwnuY#%7B%22pageId%22%3A%22dWDINIOhN6ajU6t8rEm0%22%7D

8-Implemented models accordingly via mongoose schema

9-Implemented server actions and api route to handle the creation of connection, group connection, messsage transfer, message delete 

10- For media storage used supabase storage bucket 

11- Implemented upload functionalities for uploading to supabase storage 

12- Updated database models for storing files and also folder management.  

13- Also the major functions for uploading, sending and managing files are completed , remaining will be completed parallely with frontend development.

14- Started with the frontend part and completed all the UI part and the connections between frontend and backend

15- The site was completed but still there was a problem i came up with like, some bugs, and also slow speed for doing any of the task .

16 - And then i decided to make changes to my structure databases and apis to make my app efficient.

17 - 


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
