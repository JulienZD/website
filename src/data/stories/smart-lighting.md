---
title: "Smart lighting dashboard"
description: "A dashboard to control my IKEA smart lamps directly from a web browser."
summary: "IKEA limited the ability to control their smart devices to their [mobile app](https://play.google.com/store/apps/details?id=com.ikea.tradfri.lighting) and physical remotes. Since grabbing my phone each time became tedious, I built a minimal dashboard in which anyone on my local network can control the lamps via their browser. Through the use of server-sent events, updates to the lamps are displayed in real-time on each device. The communication with the IKEA hub is achieved with the [node-tradfri-client](https://github.com/AlCalzone/node-tradfri-client) library."
image: "/images/smart-lighting.png"
onHomepage: true
order: 1
repository: https://github.com/JulienZD/tradfri-dashboard
stack: [Svelte, TailwindCSS, Node.js, Express, TypeScript]
---
The application was designed to be as minimal as possible, so the smart devices still have to be configured through IKEA's mobile app. The app displays all the configured rooms along with  their associated lamps, with controls for each of them.  
The app listens to the server-sent events inside a Svelte store, this is also where the state of the lamps is kept. Each lamp listens to changes to the store, and updates accordingly.  
This was my first time working with Svelte, I must say that I quite like working with it! I Initially created the front-end components in React, as that was all I knew at the time. Quite soon after I decided that this project might be the perfect way to get to know Svelte. I quickly followed the [official tutorial](https://svelte.dev/tutorial/) and began converting the project. This went quite smooth, as at the time the components weren't _as_ fleshed out yet.  
The main takeaway from this project is that I really like working with Svelte. Developing in it is much faster than React since there's less code to write. While I like the way `useState` handles state, I find it much more intuitive to simply declare and assign a new value to a variable to set its state.  
