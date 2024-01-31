import { decryptKeystore } from "./lib/helper";
import fs from "fs";
import path from "path";

async function main() {
  // ---------------------------
  // command arguments
  // ---------------------------
  const help =
    `Usage: yarn decryptpKey [keystore file] [password file] [export private key file]\n` +
    `Example: yarn decryptKey ./node/keystore/keystore-file ./password.txt .key`;

  var args = process.argv.slice(2);
  if (args.length != 3) {
    console.log(help);
    return;
  }

  const path1 =
    args[0].charAt(0) == "/" ? args[0] : path.join(__dirname, "..", args[0]);
  const path2 =
    args[1].charAt(0) == "/" ? args[1] : path.join(__dirname, "..", args[1]);
  const path3 =
    args[2].charAt(0) == "/" ? args[2] : path.join(__dirname, "..", args[2]);

  const keystore = JSON.parse(await fs.promises.readFile(path1, "utf8"));
  const password = (await fs.promises.readFile(path2, "utf8")).trim();

  const wallet = await decryptKeystore([keystore], password);
  const privateKey = wallet[0].privateKey.substring(2);
  console.log(`public address: ${wallet[0].address}`);

  await fs.promises.writeFile(path3, privateKey, {
    encoding: "utf8",
    flag: "w",
  });
}

main();
