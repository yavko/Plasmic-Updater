const fs = require('fs')
const https = require('https')

function getVersionFromGist() {
  return new Promise((resolve, reject) => {
    https.get('https://gist.githubusercontent.com/yavko/ea8371eba005e45f2469d46d1824b2d1/raw/gistversion.txt', (res) => {
      let buffer = []
      res.on('data', (chunk) => {
        buffer.push(chunk)
      })
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode <= 299) {
          resolve(buffer.toString())
        } else {
          reject(new Error('HTTP status: ' + res.statusCode))
        }
      })
    }).on('error', (err) => {
      reject(err)
    }).end()
  })
}

function getVersionFromFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('version.txt', (err, data) => {
      if (err) {
	reject(err)
      } else {
	resolve(data.toString())
      }
    })
  })
}

async function main() {
  let latestVersion = await getVersionFromGist().catch((err) => { console.error(err) })
  let installedVersion = await getVersionFromFile().catch((err) => { console.error(err) })
  if (latestVersion && installedVersion) {
    console.log(
      "Latest Version: " + latestVersion + "; " +
      "Installed Version: " + installedVersion
    )
  }
}

main()