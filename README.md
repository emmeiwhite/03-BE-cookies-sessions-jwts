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

## secure, httpOnly, and sameSite

1. `httpOnly: true`

Means JavaScript in the browser can’t access the cookie (`document.cookie`). Prevents XSS attacks.

2. `secure: true`

Cookie is only sent over HTTPS.
🔒 Use this only in production, otherwise local dev (HTTP) will break the cookie.

3. `sameSite`

Controls cross-origin cookie behavior.

- `strict`: Only sent to same-origin (most secure)
- `lax`: Sent on top-level navigations (default)
- `none`: Needed if your frontend/backend are on different domains (must set secure: true too)

## 🧠 Now: Let’s Move to Sessions

Time to tackle:

- Server-side persistance
- express-session magic
- Session IDs
- Cookies pointing to server memory

## 🔁 ASCII DIAGRAM — SESSION FLOW (WITH COOKIE + SESSION ID)

           ┌──────────────┐                          ┌────────────┐
           │   Browser    │                          │   Server   │
           └──────┬───────┘                          └─────┬──────┘
                  │                                        │
        1. GET /session-login                             │
        ────────────────────────────────────────────────▶│
                  │                                        │
                  │ 2. Server generates session + ID       │
                  │    Stores { id123: { user: 'Imran' } } │
                  │                                        │
                  │ 3. Sends Set-Cookie: sessionId=id123   │
                  ◀───────────────────────────────────────┤
                  │                                        │
     Cookie now stored in browser as sessionId=id123       │
                  │                                        │
        4. GET /session-check                              │
        ────────────────────────────────────────────────▶│
                  │  Cookie: sessionId=id123               │
                  │                                        │
                  │  Server fetches user from session store│
                  ◀───────────────────────────────────────┤
                  │  Responds with "Welcome back Imran"    │

## 🧪 HOW TO TEST IT

- 🔁 Visit /session-login → browser gets Set-Cookie with sessionId

- ✅ Visit /session-check → server checks session store and responds

- 🧼 Visit /logout → session destroyed from server
