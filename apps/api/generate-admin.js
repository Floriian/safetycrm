const argon2 = require('argon2');

async function gen() {
  const hash = await argon2.hash('asdasd123');
  console.log(hash);
}

gen();
