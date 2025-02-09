"use server";
import { User, Userunverified } from "@/models/models";
import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import z from "zod";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt-edge";
const userValidation = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(3, { message: "Password length should be greater than 3" }),
});
export type ResponseType = {
  errors?: {
    email?: string[];
    password?: string[];
  } ;
  message?: string | null;
  success?: boolean;
};

export async function userEmailOtp(
  prevResponse: ResponseType | undefined,
  formData: FormData
) {
  //validate email
  const validatedemail = z
    .object({
      email: z.string().email({ message: "Invalid Emaill" }),
    })
    .safeParse({ email: formData.get("email") });
  if (!validatedemail.success) {
    return {
      errors: validatedemail.error.flatten().fieldErrors,
      message: "Invalid Email",
      success: false,
    };
  }
  //check user registered
  const userregistered = await User.findOne({
    email: validatedemail.data.email,
  });
  if (userregistered) {
    redirect("/user/signin");
  }

  //creating user and otp for the user to verify email
  let otp = "";
  for (let index = 0; index < 4; index++) {
    let rand = Math.round(Math.random() * 10) % 10;
    otp += rand;
  }
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "arif7862016a@gmail.com",
      pass: "jyxu cfbi ecyb lapu",
    },
  });
  const userunverified = await Userunverified.findOne({
    email: validatedemail.data.email,
  });
  if (userunverified) {
    const userupdated = await Userunverified.findOneAndUpdate(
      { email: validatedemail.data.email },
      {
        otp: otp,
        validdate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      }
    );
  } else {
    const usercreated = await Userunverified.create({
      email: validatedemail.data.email,
      otp: otp,
      validdate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    });
  }
  //sending the otp to users email
  try {
    const info = await transporter.sendMail({
      from: "arif7862016a@gmail.com", // sender address
      to: validatedemail.data.email, // list of receivers
      subject: "Your Otp  for eChat", // Subject line
      text: `Thanks for registering to eChat 
  Your Otp is ${otp}`, // plain text body
      // html: "<b>Hello world??</b>", // htm?l body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
    return {
      message: "Error sending mail",
      success: false,
    };
  }
  return {
    message: "Otp sent",
    success: true,
  };
}
//set----------bcrypt
export async function userRegistered(email: string) {
  const userregistered = await User.findOne({ email: email });
  if (userregistered) {
    return true;
  } else {
    return false;
  }
}

export async function userSetPassword(
  prevResponse: ResponseType | undefined,
  formData: FormData
): Promise<ResponseType | undefined> {
  const validateduser = userValidation.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validateduser.success) {
    return {
      message: "Password  length should be greater than 3",
      errors: validateduser.error.flatten().fieldErrors,
      success: false,
    };
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(validateduser.data.password, salt);
  const usercreated = await User.create({
    email: validateduser.data.email,
    password: hash,
  });
  await signIn("credentials", {
    redirect: false,
    email: validateduser.data.email,
    password: validateduser.data.password,
  });
  redirect("/user/details");
}

export async function userResetPassword(
  prevResponse: ResponseType | undefined,
  formData: FormData
): Promise<ResponseType | undefined> {
  const session= await auth();
  const email=session?.user?.email;
  const passwordSchema= z.string().min(3, { message: "Password length should be greater than 3" });
  const validateduser = passwordSchema.safeParse(formData.get("password"));
  if (!validateduser.success) {
    return {
      message: "Password  length should be greater than 3",
      success: false,
    };
  }
  const userregistered = await User.findOne({
    email: email,
  });

  const value = formData.get("currentpassword");
  const currentpassword = value ? value.toString() : "";
  // const currentpassword=formData.get('currentpassword')?.toString()==null || formData.get('currentpassword')?.toString()==undefined ?formData.get('currentpassword')?.toString():"na"
  if (bcrypt.compareSync(currentpassword, userregistered.password)) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(validateduser.data, salt);
    const usercreated = await User.findByIdAndUpdate(userregistered.id, {
      password: hash,
    });
    return {
      success:true,
      message:"Updated successfully"
    }
  } else {
    return {
      message: "password didn't matched",
      success: false,
    };
  }
}
//set----------bcrypt
export async function userVerifyOtp(
  prevResponse: ResponseType | undefined,
  formData: FormData
): Promise<ResponseType | undefined> {
  console.log("reaching");
  const email = formData.get("email")?.toString();
  const otp = formData.get("otp");
  const userunverified = await Userunverified.findOne({ email: email });
  if (userunverified) {
    const d = new Date();
    if (d < userunverified.validdate && otp == userunverified.otp) {
      return {
        message: "Otp verified",
        success: true,
      };
    } else {
      return {
        message: "Otp didn't matched or invalid",
        success: false,
      };
    }
  } else {
    console.log("nonverified");
    redirect("/user/signup");
  }
}

export const userDetails = async (
  prevResponse: ResponseType | undefined,
  formData: FormData
): Promise<ResponseType | undefined> => {
    const session= await auth();
    const id=session?.user?.id;
    try{
      await User.findByIdAndUpdate(id,{name:formData.get("name"),description:formData.get("description")})
      return {
        success:true,
        message:"Information updated successfully"
      }
    }catch (error){
        return {
          success:false,
          message:"error updating information"
        }
    }
};

export const userSignIn = async (
  prevResponse: ResponseType | undefined,
  formData: FormData
): Promise<ResponseType | undefined> => {
  const validateduser = userValidation.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateduser.success) {
    return {
      errors: validateduser.error.flatten().fieldErrors,
      message: "Invalid email or password",
      success: false,
    };
  }

  const { email, password } = validateduser.data;
  try {
    const usersignedin = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  } catch (error) {
    return {
      message: "Invalid email or password",
      success: false,
    };
  }
  redirect("/chat");
};

export async function userSignInGoogle() {
  await signIn("google");
}
export async function userSignInGithub() {
  await signIn("github");
}

export async function userSignOut() {
  await signOut({
    redirect: false,
  });
  redirect("/");
}

export async function userLoggedIn() {
  const session = await auth();
  if (session) {
    return true;
  } else {
    return false;
  }
}
