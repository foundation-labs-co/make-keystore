import { ethers } from "ethers";
import crypto from "crypto";
import fs from "fs";
import path from "path";

async function writeEnvTemplate(privateKey: any) {
  // path
  const templatePath = path.join(__dirname, "..", `example.env`);
  const filePath = path.join(__dirname, "..", `.env`);

  // read template
  var data = await fs.promises.readFile(templatePath, "utf8");

  // write private key
  data = data.replace("${PRIVATE_KEY}", privateKey);

  // write .env file
  await fs.promises.writeFile(filePath, data, { encoding: "utf8", flag: "w" });
}

function makeKey(prefix: string, postfix: string) {
  var privateKey;
  const findPrefix = `0x${prefix}`.toLowerCase();
  const findPostfix = postfix.toLowerCase();
  var i = 0;
  while (true) {
    privateKey = crypto.randomBytes(32).toString("hex");
    const wallet = new ethers.Wallet(privateKey);

    i++;
    console.log(i, wallet.address);

    if (
      (prefix == "" ||
        wallet.address.substring(0, findPrefix.length).toLowerCase() ==
          findPrefix) &&
      (postfix == "" ||
        wallet.address.slice(-1 * findPostfix.length).toLowerCase() ==
          findPostfix)
    ) {
      break;
    }
  }

  console.log("make key done!\n");
  return privateKey;
}

async function main() {
  // ---------------------------
  // command arguments
  // ---------------------------
  const help =
    `Usage: yarn makeKey [options]\n` +
    `Example: yarn makeKey --prefix 00 --postfix ff --write.env\n` +
    `Options:\n` +
    `   --prefix value      Find wallet address start with specific. Example: --prefix 111\n` +
    `   --postfix value     Find wallet address end with specific. Example: --postfix 111\n` +
    `   --write.env         This option is copy example.env as .env and write private key into .env\n` +
    `                       If not use this option, the private key will show result on screen.\n` +
    `                       (default: false)`;

  var args = process.argv.slice(2);
  if (args.length == 0) {
    console.log(help);
    return;
  }

  // parse args options
  var prefix = "";
  var postfix = "";
  var writeEnv = false;
  for (let i = 0; i < args.length; i++) {
    if (args[i] == "--prefix") {
      prefix = args[i + 1];
      i++;
    } else if (args[i] == "--postfix") {
      postfix = args[i + 1];
      i++;
    } else if (args[i] == "--write.env") {
      writeEnv = true;
    } else if (args[i] == "--help") {
      console.log(help);
      return;
    } else {
      console.log(`option error: ${args[i]} not found!\n`);
      console.log(help);
      return;
    }
  }

  // ---------------------------
  // makeKey
  // ---------------------------
  const privateKey = makeKey(prefix, postfix);

  if (writeEnv) {
    await writeEnvTemplate(privateKey);
    console.log("Already written private key to .env");
  } else {
    console.log("[DO NOT SHARE THIS]");
    console.log("Private key:", privateKey);
  }

  const wallet = new ethers.Wallet(privateKey);
  console.log("Public Address: " + wallet.address);
}

main();
