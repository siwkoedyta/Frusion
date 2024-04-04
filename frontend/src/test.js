console.log('test')


test2().then(i => console.log('end'))

async function test() {
    try {
  const res = await fetch('http://localhost:8081/fruits')
  const body = await res.json()
  console.log(body)
    } catch (error) {
        console.log("error")
    }
}

async function test2() {
    return fetch('http://localhost:8081/fruits')
    .then(res => res.json())
    .then(body => console.log(body))
    .catch(err => console.log("error"))
}