# 🍪 1. The Origin of Cookies — Explained for Lifetime Retention

## 🔹 Background: Why do cookies exist?

HTTP is a **stateless** protocol.

Every time your browser sends a request to a server, the server doesn't know if it's you, your friend, or someone new. It doesn't remember you between requests.

## 🔹 Enter Cookies: Tiny pieces of data stored in the browser, sent with every request to the same domain.

They were originally invented for:

- Session management (e.g., "stay logged in")
- Personalization (e.g., dark mode)
- Tracking (e.g., analytics, ads)

🧠 A cookie is like a name tag. When the browser returns to the server, it says: `"Hey, I’m Imran – here's my tag!"`

## 🧩 2. What Does cookie-parser Do?

The **cookie-parser** middleware:

- **Parses** the `Cookie` header sent by the browser. Analogy, What does `express.json()` do? Parses the `req.body({})`.
- **Attaches** the parsed cookie object to `req.cookies` so you can access it like: `req.cookies.token` or `req.cookies.theme`.

It **doesn't** create cookies. You still set them using `res.cookie()`.

```js
app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'Imran', {
    httpOnly: true,
    maxAge: 1000 * 60 * 5 // 5 minutes
  })
  res.send('Cookie has been set!')
})

app.get('/get-cookie', (req, res) => {
  console.log(req.cookies)
  res.send('Cookies fetched! Check console.')
})
```
