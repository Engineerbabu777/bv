// Importing necessary modules
import { createServer } from "http"; // Importing Node.js's HTTP module to create a server
import express from "express"; // Importing Express.js for handling HTTP requests
import next, { NextApiHandler } from "next"; // Importing Next.js for server-side rendering
import { Server } from "socket.io";
// Defining the port the server will listen on, using environment variable PORT if available, otherwise defaulting to 3000
const port = parseInt(process.env.PORT || "3000", 10);

// Checking if the environment is development
const dev = process.env.NODE_ENV != "production";

// Initializing a Next.js application instance
const nextApp = next({ dev });

// Defining a Next.js API handler
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

// Starting the Next.js application
nextApp.prepare().then(() => {
    // Initializing an Express.js application
    const app = express();

    // Creating an HTTP server instance using Express.js app
    const server = createServer(app);

    const io = new Server<ClientToServerEvents,ServerToClientEvents>(server);

    io.on("connection", (socket) => {
        console.log("connection!");

        socket.on("draw", (moves,options)=>{ 
         console.log("drawing...");
         socket.broadcast.emit("socket_draw", moves,options);
        })

        socket.on("disconnect",() => {
            console.log("client disconnect!")
        })
    })

    // Route all incoming requests through Next.js API handler
    app.all("*", (req: any, res: any) => 
        nextHandler(req, res)
    );

    // Start listening on the specified port
    server.listen(port, () => {
        console.log("Server is listening on port " + port);
    });
});


/*
Explanation:
The code initializes an Express.js application (app) and a Next.js application (nextApp).
It then creates an HTTP server using Node.js's http.createServer() method, passing the Express.js application (app) as its argument.
The Next.js getRequestHandler() method returns a request handler for Next.js pages. This handler is used to handle all incoming requests in 
Express.js and pass them to Next.js for server-side rendering.
The app.all("*", ...) method is used to define a middleware that handles all HTTP methods and all routes. It forwards all incoming requests 
to the Next.js API handler (nextHandler).
Finally, the server listens on the specified port (3000 by default, or specified by the PORT environment variable). Once the server is started,
 a message is logged to the console indicating that the server is listening on the specified port.
*/