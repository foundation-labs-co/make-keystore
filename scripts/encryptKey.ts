import { encryptKeystore } from "./lib/helper";
import fs from "fs";
import path from "path";

async function main() {
  // ---------------------------
  // command arguments
  // ---------------------------
  const help =
    `Usage: yarn encryptKey [private key file] 'password' [keystore output]\n` +
    `Example: yarn encryptKey .key 'my-password-123456!' .keystore`;

  var args = process.argv.slice(2);
  if (args.length != 3) {
    console.log(help);
    return;
  }

  const path1 =
    args[0].charAt(0) == "/" ? args[0] : path.join(__dirname, "..", args[0]);
  const path2 =
    args[2].charAt(0) == "/" ? args[2] : path.join(__dirname, "..", args[2]);

  const privateKey = await fs.promises.readFile(path1, "utf8");
  const password = args[1];
  if (password.length < 9) {
    console.log("Password length must be greater than 8 characters!");
    return;
  }

  const keystore = await encryptKeystore(privateKey, password);
  await fs.promises.writeFile(path2, JSON.stringify(keystore), {
    encoding: "utf8",
    flag: "w",
  });
}

main();
