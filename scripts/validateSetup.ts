/* eslint-disable no-console */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Firestore'... Remove this comment to see the full error message
const Firestore = require('../utils/firestore.js')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'config'.
const config = require('config')

// check whether github credentials are not falsy
if (
  config.githubOauth.clientId === '<clientId>' ||
  config.githubOauth.clientSecret === '<clientSecret>'
) {
  throw new Error('❌ Github credentials are not set. ❌')
} else {
  // @ts-expect-error ts-migrate(2584) FIXME: Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
  console.info('✅ GitHub credentials are properly set.')
}

let firestoreConfig
// throw an error if unable to read file
try {
  firestoreConfig = JSON.parse(config.firestore)
  // @ts-expect-error ts-migrate(2584) FIXME: Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
  console.info('✅ Firestore config is correct.')
} catch (error) {
  throw new Error('⚠️ Please make sure firestore config exists as a String (not an object) and is correctly set up. ⚠️')
}

// check whether firestoreConfig is empty, null, and  undefined
if (!firestoreConfig) {
  throw new Error('⚠️ Please make sure firestore config is not empty ⚠️')
} else {
  // @ts-expect-error ts-migrate(2584) FIXME: Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
  console.info('✅ Firestore config is not empty.')
}

// check local development have permission to read and write in firestore or not
(async () => {
  const docRef = await Firestore.collection('dummy').doc('users')
  await docRef.set({
    user: 'dummy'
  })
  const resp = await docRef.get('user')
  if (resp.data().user !== 'dummy') {
    throw new Error('⛔️ Problem with permission of read and write.\nPlease check your firestore permissions.')
  } else {
    // @ts-expect-error ts-migrate(2584) FIXME: Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.info('✅ Local development has permission to read and write in firestore.')
  }
  await docRef.delete()

  // @ts-expect-error ts-migrate(2584) FIXME: Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
  console.info('\n🎉🎉🎉🎉🎉🎉 Success! The backend was successfully set up 👍. 🎉🎉🎉🎉🎉')
})()