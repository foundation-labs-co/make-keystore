# Make Keystore

### Make private key with a specific wallet address
```sh
yarn makeKey
```

```
Usage: yarn makeKey [options]
Example: yarn makeKey --prefix 00 --postfix ff --write.env
Options:
   --prefix value      Find wallet address start with specific. Example: --prefix 111
   --postfix value     Find wallet address end with specific. Example: --postfix 111
   --write.env         This option is copy example.env as .env and write private key into .env
                       If not use this option, the private key will show result on screen.
                       (default: false)
```

### Encrypt private key to keystore with password
```sh
yarn encryptKey
```

```
Usage: yarn encryptKey [private key file] 'password' [keystore output]
Example: yarn encryptKey .key 'my-password-123456!' .keystore
```

### Decrypt keystore with password to private key
```sh
yarn decryptKey
```

```
Usage: yarn decryptpKey [keystore file] [password file] [export private key file]
Example: yarn decryptKey ./node/keystore/keystore-file ./password.txt .key
```