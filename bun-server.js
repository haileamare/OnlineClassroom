import { serve } from "bun";

serve({
  port: 3000,
  fetch(req) {
    if (req.url.startsWith("/api")) {
      // Proxy API requests to the backend server
      return fetch(`http://localhost:5000${req.url}`);
    }
    // Serve the static files from the public directory
    return new Response(Bun.file("./public/index.html"));
  },
});
console.log('haile')