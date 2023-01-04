import { User } from "models/user";
import { Auth } from "models/auth";
import { sgMail } from "lib/sendgrid";
import addMinutes from "date-fns/addMinutes";
import gen from "random-seed";

var seed = "asssss";
var random = gen.create(seed);

export async function findOrCreateAuth(email: string) {
  const cleanEmail = email.trim().toLowerCase();
  const auth = await Auth.findByEmail(cleanEmail);
  if (auth) {
    return auth;
  } else {
    const newUser = await User.createNewUser({
      email: cleanEmail,
    });
    const newAuth = await Auth.createNewAuth({
      email: cleanEmail,
      userId: newUser.id,
      code: "",
      expires: new Date(),
    });
    return newAuth;
  }
}

export async function sendCode(email: string) {
  const auth = (await findOrCreateAuth(email)) as any;
  const code = random.intBetween(10000, 99999);
  const now = new Date();
  const twentyMinFromNow = addMinutes(now, 20);
  auth.data.code = code;
  auth.data.expires = twentyMinFromNow;
  await auth.push();

  const msg = {
    to: email,
    from: "benjahenley@hotmail.com",
    subject: "Verification code from sendgrid",
    text: `your code is ${code}`,
  };

  await sgMail.send(msg);

  return auth;
}
