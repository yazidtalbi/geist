const PRODUCT_CONTENT = {
  'stripe.com': {
    reviews: [
      {
        role: 'SaaS Founder',
        metrics: { usability: 9.2, performance: 9.8, value: 9.5, trust: 9.9 },
        feedback: {
          usability: "The dashboard is incredibly powerful, though the increasing number of products makes the sidebar navigation feel a bit crowded.",
          performance: "API response times are world-class. The latency is negligible even for complex transactions.",
          value: "It's a premium price, but the 'peace of mind' value on global tax compliance is unmatched.",
          trust: "The docs are so good they almost feel like a product themselves. It builds massive confidence."
        },
        first_impression: "Upon landing, it was clear that it was a high-end product. The hero section is striking, but I did find the sheer amount of product options a bit overwhelming at first glance.",
        strategic_outlook: "Stripe is becoming the 'financial OS'. They need to be careful not to lose their developer-first simplicity as they chase the enterprise.",
        suggestions: [
          "Simplify the navigation for 'Connect' accounts|Finding specific sub-account transactions requires too many clicks through the primary dashboard.|Medium|High",
          "Implement more granular API key permissions|The current secret key system lacks the fine-grained 'scoped' permissions found in newer competitors.|High|Critical",
          "Improve tax report generation speed|Generating large annual reports often results in timeouts, which is stressful during audit season.|Low|Medium"
        ]
      },
      {
        role: 'Frontend Engineer',
        metrics: { usability: 9.5, performance: 9.9, value: 9.0, trust: 9.8 },
        feedback: {
          usability: "The checkout experience is the gold standard. Every detail, from card validation to error handling, is polished.",
          performance: "The SDKs are lightweight and the playground is a joy to use. Everything feels 'instant'.",
          value: "For a solo dev, the 2.9% + 30c is steep, but the time saved on building auth/payments manually is huge.",
          trust: "Seeing the Stripe logo on a checkout page is an instant 'trust' signal for me as a consumer."
        },
        first_impression: "The first thing I noticed was the buttery smooth scroll animations and the perfect layout balance. It just feels like a team that cares about the pixels.",
        strategic_outlook: "Their focus on 'embedded finance' is the right move. They are becoming invisible, which is the ultimate goal for infrastructure.",
        suggestions: [
          "Improve the error message clarity in the API|Some edge case errors can be a bit cryptic, requiring a deep dive into the docs to decipher.|Medium|Medium",
          "Add a native 'Dark Mode' to the dashboard|As a dev who works late, the bright white dashboard can be a bit of a strain after a few hours.|Low|Low",
          "Streamline the webhook testing UI|The current CLI is great, but a better web-based 'replay' UI would be a nice quality-of-life upgrade.|Medium|High"
        ]
      },
      {
        role: 'UX Researcher',
        metrics: { usability: 8.8, performance: 9.5, value: 9.2, trust: 9.7 },
        feedback: {
          usability: "Information density is high. For a new founder, the vocabulary around 'Connect', 'Issuing', and 'Treasury' can be a barrier.",
          performance: "Everything loads in a snap. The transitions between different dashboard modules are very well-handled.",
          value: "The ecosystem is their biggest value. Being able to plug in 100s of other tools makes it worth the cost.",
          trust: "Very high. Their transparency around uptime and security incidents is a benchmark for the industry."
        },
        first_impression: "I was immediately struck by the brand's evolution. It's moved from 'simple API' to 'global finance brand' without losing that minimalist edge.",
        strategic_outlook: "They are perfectly positioned for the 'low-code' future, but they need to ensure their manual configuration tools stay robust.",
        suggestions: [
          "Add an 'Onboarding Wizard' for specific use cases|Instead of a generic dashboard, ask me what I'm building and hide irrelevant modules.|High|Medium",
          "Improve the searchability of the documentation|Sometimes the search returns too many legacy API versions, making it hard to find the current 'standard'.|Medium|High",
          "Refine the mobile app navigation|The mobile dashboard is great for checking stats but difficult for actual account management tasks.|Medium|Medium"
        ]
      }
    ]
  },
  'linear.app': {
    reviews: [
      {
        role: 'Product Designer',
        metrics: { usability: 9.9, performance: 10, value: 9.6, trust: 9.2 },
        feedback: {
          usability: "Keyboard shortcuts for everything. Once you learn the 'Linear way', every other tool feels like it's moving through molasses.",
          performance: "Instant sync. The optimistic UI implementation is the best I've ever used in a collaborative tool.",
          value: "High value for engineering-led teams. It's an opinionated workflow that actually improves your process.",
          trust: "Solid, though I'd love more transparency around their long-term data export and portability features."
        },
        first_impression: "The moment I logged in, I felt a sense of calm. The UI is so focused and deliberate. No unnecessary shadows, no clutter.",
        strategic_outlook: "Linear is setting the pace for the 'craft' movement in software. Its influence on UI design is pervasive.",
        suggestions: [
          "Add better support for non-linear workflows|The current strict 'cycles' structure is great for dev but can be restrictive for research phases.|Medium|Medium",
          "Expand cross-team visibility for large organizations|It's difficult to get a 'bird's eye view' across multiple disconnected workspaces.|High|High",
          "Implement native time-tracking for agencies|Many users are agency-side and need native billable hour tracking without leaving the issue view.|Low|Medium"
        ]
      },
      {
        role: 'SaaS Founder',
        metrics: { usability: 9.5, performance: 9.9, value: 9.8, trust: 9.0 },
        feedback: {
          usability: "It forces you to work the right way. It's not just a tool; it's a methodology for building better products.",
          performance: "The desktop app is so fast it feels native. I've never seen a web-based tool handle thousands of issues this well.",
          value: "Cheaper than Jira and 10x better. For a small team, the ROI in saved meetings alone is massive.",
          trust: "The team is very responsive. You can tell they use the product themselves, which builds a lot of trust."
        },
        first_impression: "I was immediately struck by the speed. I hit 'C' to create an issue and it was there before my finger left the key. That kind of performance is rare.",
        strategic_outlook: "They are winning by being the 'anti-Jira'. As they grow, the challenge will be staying 'minimal' while adding enterprise features.",
        suggestions: [
          "Improve the 'Public Roadmap' feature|The current public view is a bit too limited and doesn't allow for much customization or branding.|Medium|Medium",
          "Add better integration with CRM tools|Connecting product issues directly to customer deals in HubSpot/Salesforce would be a huge win for founders.|High|High",
          "Streamline the 'GitHub' integration setup|While powerful, the initial sync can sometimes get stuck on large repos with complex branch structures.|Medium|Low"
        ]
      },
      {
        role: 'Frontend Engineer',
        metrics: { usability: 9.8, performance: 10, value: 9.4, trust: 9.1 },
        feedback: {
          usability: "The command menu (Cmd+K) is so intuitive I rarely touch the mouse anymore. It's the standard for pro tools.",
          performance: "The local-first architecture means I can work offline on a plane and everything just syncs when I land. Zero friction.",
          value: "It saves me at least 30 minutes a day just by being fast. Over a month, that's a whole work day saved.",
          trust: "Excellent security features like SAML and SCIM for bigger teams. They take infrastructure seriously."
        },
        first_impression: "Landing on the home page, I was impressed by the 'Brutalist Luxury' aesthetic. It's bold, dark, and feels like a tool for serious builders.",
        strategic_outlook: "They've successfully created a brand that people actually *want* to use, which is unheard of in project management.",
        suggestions: [
          "Expand the API for custom 'Automations'|The current workflow triggers are good, but I'd love to write custom TS scripts to handle complex issue logic.|High|Medium",
          "Add a native 'Burndown' chart for cycles|The current stats are a bit too high-level; sometimes I need to see the daily velocity more clearly.|Medium|Medium",
          "Improve the 'Comment' editing experience|The markdown editor can sometimes be a bit finicky with nested lists and images.|Low|Low"
        ]
      }
    ]
  },
  'vercel.com': {
    reviews: [
      {
        role: 'Frontend Engineer',
        metrics: { usability: 9.7, performance: 9.8, value: 9.4, trust: 9.6 },
        feedback: {
          usability: "The Git-to-Deployment flow is seamless. The Vercel Toolbar for previews is a game-changer for collaboration.",
          performance: "Global Edge Network performance is unmatched. Cold starts on serverless functions are increasingly negligible.",
          value: "The pro plan is a bit of a jump for hobbyists, but for enterprise teams, the DX gains are easily justifiable.",
          trust: "Strong. They are the primary maintainers of Next.js, giving a high degree of confidence in their infrastructure."
        },
        first_impression: "Honestly, the moment I landed here, the typography hit me first. It feels expensive. The deployment flow is so fast it feels like magic.",
        strategic_outlook: "Vercel is building the 'OS for the Web'. Their vertical integration is their greatest competitive advantage.",
        suggestions: [
          "Simplify project environment variable management|Currently, adding variables across multiple environments requires repetitive manual entry.|High|Critical",
          "Enhance cost monitoring and alerts|Serverless usage can spike unpredictably; more granular, real-time alerts would build more trust.|High|High",
          "Expand Edge Middleware debugging tools|Logging for edge logic can be opaque, making it difficult to trace complex rewrites.|Medium|High"
        ]
      },
      {
        role: 'SaaS Founder',
        metrics: { usability: 9.5, performance: 9.7, value: 9.8, trust: 9.4 },
        feedback: {
          usability: "I can ship a global site in 30 seconds. For a founder, that speed-to-market is the only metric that matters.",
          performance: "Our site feels like a native app because of their caching layer. The 'Edge Runtime' is a significant technical edge.",
          value: "It replaces a whole DevOps team. For a 5-person startup, Vercel is the best hire you'll ever make.",
          trust: "They are the standard. Everyone else is just trying to catch up to their deployment experience."
        },
        first_impression: "Upon landing, I was struck by the clarity of their value prop. 'Develop. Preview. Ship.' They aren't just selling hosting; they're selling velocity.",
        strategic_outlook: "By owning the frontend framework (Next.js) and the infrastructure, they've created an incredibly sticky ecosystem.",
        suggestions: [
          "Add more 'No-Code' configuration for common tasks|Things like setting up redirects or basic Auth should be possible via the UI, not just code.|Medium|Medium",
          "Improve the 'Analytics' dashboard depth|The current speed insights are great, but I want more deep-dive user journey data natively.|Medium|High",
          "Streamline the domain transfer process|The current UI for migrating domains from other registrars can be a bit nerve-wracking and slow.|Low|Medium"
        ]
      },
      {
        role: 'UX Researcher',
        metrics: { usability: 9.2, performance: 9.6, value: 9.0, trust: 9.5 },
        feedback: {
          usability: "The 'Preview Deployments' feature is the best feedback tool I've ever used. I can leave comments directly on the UI.",
          performance: "Image optimization (next/image) works out of the box. It's one less thing for us to worry about for mobile users.",
          value: "A bit pricey for high-bandwidth sites, but the developer happiness and retention it provides is worth a lot.",
          trust: "Very high. Their focus on security and 'Zero Trust' architecture makes it an easy sell to our enterprise clients."
        },
        first_impression: "I was immediately impressed by the 'Vercel Ship' aesthetic. It's clean, high-contrast, and feels like a tool for the next generation of builders.",
        strategic_outlook: "They are moving into the 'Edge' and 'AI' space aggressively. They are no longer just 'hosting for Next.js'.",
        suggestions: [
          "Improve the 'Collaborator' permission tiers|The current 'Member' vs 'Owner' system is too binary for larger design and marketing teams.|High|Medium",
          "Add native 'A/B Testing' tools to the edge|Running experiments should be a first-class citizen in the Vercel dashboard, not a third-party script.|Medium|High",
          "Refine the 'Logs' search interface|Searching through large volumes of runtime logs is currently a bit sluggish and needs better filtering.|Low|Medium"
        ]
      }
    ]
  },
  'framer.com': {
    reviews: [
      {
        role: 'UX Researcher',
        metrics: { usability: 8.5, performance: 9.2, value: 9.7, trust: 9.0 },
        feedback: {
          usability: "The transition from design to live site is magical. However, the CMS UI can be a bit unintuitive for non-designers.",
          performance: "Sites built on Framer are surprisingly fast, but the editor itself can lag with very large, asset-heavy projects.",
          value: "The fastest way to go from idea to a high-fidelity marketing site. Replaces a whole dev cycle.",
          trust: "Hosting is reliable, though the lock-in to the Framer platform is a consideration for long-term projects."
        },
        first_impression: "Landing on the Framer site, I was immediately struck by the sheer beauty of the motion. It's the first 'no-code' tool that doesn't feel like a compromise.",
        strategic_outlook: "As Framer eats into the WordPress and Webflow market, its focus on 'Designers who can't code' is a winning strategy.",
        suggestions: [
          "Refine the CMS interface for clients|The current editing experience is too similar to the canvas, making it easy for non-technical clients to break the layout.|High|High",
          "Improve breakpoint management for complex layouts|The inheritance logic for styles across breakpoints can sometimes lead to 'layout drift'.|Medium|High",
          "Add native support for complex forms|Current form capabilities are basic, forcing users to rely on third-party embeds.|Medium|Medium"
        ]
      },
      {
        role: 'Product Designer',
        metrics: { usability: 9.0, performance: 9.5, value: 9.2, trust: 9.3 },
        feedback: {
          usability: "Coming from Figma, the learning curve is zero. The 'Sticks' and 'Stacks' layout system is much more logical than CSS Flexbox for designers.",
          performance: "The sites it produces are incredibly optimized. I've seen 100/100 Lighthouse scores on complex landing pages.",
          value: "For a designer, it's the ultimate power-up. I can now bill for development work without writing a single line of code.",
          trust: "The community around Framer is huge. There's always a template or a component available for whatever you need."
        },
        first_impression: "Upon landing, I was blown away by the 'Design to Dev' promise. The site itself is a portfolio of what the tool can do—and it's impressive.",
        strategic_outlook: "They are winning the 'creative' market. Their next big challenge is proving they can handle complex, logic-heavy web apps.",
        suggestions: [
          "Simplify the 'Components' logic|Creating interactive components in Framer still feels a bit more complex than it needs to be compared to Figma.|Medium|Medium",
          "Add better SEO management tools|While it's getting better, managing metadata for hundreds of CMS pages still feels a bit clunky.|High|Medium",
          "Improve the 'Site Search' native integration|The current search results UI is difficult to customize and often feels disconnected from the site design.|Low|High"
        ]
      },
      {
        role: 'Frontend Engineer',
        metrics: { usability: 8.2, performance: 9.0, value: 8.8, trust: 9.1 },
        feedback: {
          usability: "The 'Custom Code' feature is a lifesaver. Being able to inject React components directly into a Framer site is huge.",
          performance: "The server-side rendering is solid. It's much faster than older site builders like Wix or Squarespace.",
          value: "Great for quick landing pages, but I wouldn't build a complex dashboard in it just yet. It's a marketing tool first.",
          trust: "The infrastructure is solid. They've clearly invested a lot in their global CDN and caching strategy."
        },
        first_impression: "I was struck by how far Framer has come from its original 'prototyping' roots. It's now a serious contender for the modern web.",
        strategic_outlook: "By targeting the 'frontend-adjacent' designer, they've found a massive niche that Webflow is starting to lose.",
        suggestions: [
          "Improve the documentation for 'Code Components'|The API for custom code is powerful but the documentation is a bit sparse for complex integrations.|High|Medium",
          "Add a native 'Version Control' system|Being able to branch and merge site changes would make it much more viable for large teams.|Medium|High",
          "Refine the 'Image' asset manager|The current interface for managing hundreds of high-res images can be slow and needs better folder management.|Low|Medium"
        ]
      }
    ]
  },
  'raycast.com': {
    reviews: [
      {
        role: 'Product Designer',
        metrics: { usability: 9.8, performance: 10, value: 9.9, trust: 9.5 },
        feedback: {
          usability: "Incredibly intuitive. The extension store is a masterclass in community-driven utility.",
          performance: "It's faster than Spotlight and doesn't hog resources. The app feels like it's part of the OS.",
          value: "The free tier is generous, and the 'Pro' features (like AI) are integrated so well they become essential.",
          trust: "They've built a strong brand around being a privacy-first utility. Very trustworthy."
        },
        first_impression: "Raycast is the power-user's dream for macOS. The landing page is as fast and clean as the app itself.",
        strategic_outlook: "By winning the 'Command + Space' shortcut, Raycast has become the primary entry point for productivity.",
        suggestions: [
          "Improve extension discovery within the app|The store is great, but suggesting relevant extensions based on my installed apps would be a huge win.|Medium|High",
          "Add native window management presets|While there are extensions, a native window management feature would compete directly with tools like Magnet.|Low|Medium",
          "Implement cross-device sync for snippets|Syncing my developer snippets between work and home machines is currently slightly friction-heavy.|Medium|High"
        ]
      },
      {
        role: 'Frontend Engineer',
        metrics: { usability: 9.7, performance: 10, value: 9.8, trust: 9.6 },
        feedback: {
          usability: "The API for building extensions is incredible. I built a custom JIRA integration in an hour.",
          performance: "It's written in Swift, and you can feel it. Zero lag, zero beachballs. It's the most responsive app on my Mac.",
          value: "It replaced about 10 other small apps for me. Calculator, Window Manager, Clipboard history—all in one.",
          trust: "Open source extensions and clear data policies. As a dev, I really appreciate the transparency."
        },
        first_impression: "Upon landing, I was struck by the focus on 'Developer Experience'. They aren't just selling an app; they're selling a new way to interact with your OS.",
        strategic_outlook: "They are perfectly positioned to be the 'AI layer' for macOS. Their integration of LLMs is the best I've seen.",
        suggestions: [
          "Simplify the extension publishing workflow|The current manual PR process for the store is a bit of a bottleneck for rapid community growth.|High|Medium",
          "Add better support for 'Custom Scripts'|Sometimes I just want to run a quick bash script without building a full extension.|Medium|High",
          "Improve the 'Search' relevance for deep files|The file search is fast but sometimes it misses deep system files that Spotlight finds instantly.|Low|Medium"
        ]
      },
      {
        role: 'SaaS Founder',
        metrics: { usability: 9.5, performance: 10, value: 10, trust: 9.4 },
        feedback: {
          usability: "It just works. No onboarding needed, it's just instantly intuitive. It makes me feel 20% faster every day.",
          performance: "I've never had it crash. It's the most stable piece of software in my stack. It's invisible in the best way.",
          value: "It's the best $10/mo I spend. The 'Raycast AI' saves me hours of context switching every week.",
          trust: "They are a small team that clearly obsesses over quality. I'm much more likely to trust them than a giant like Apple."
        },
        first_impression: "I was immediately struck by the 'Utility' aesthetic. It's not trying to be flashy; it's trying to be useful. That's a refreshing change.",
        strategic_outlook: "Their biggest risk is Apple sherlocking their features, but their community/extension moat is getting very deep.",
        suggestions: [
          "Implement a 'Team' snippet library|Sharing common shortcuts and snippets with my whole team would be an incredible productivity boost.|High|High",
          "Add a native 'Meeting' tracker|A better way to see my upcoming calendar events directly in the command bar would save a lot of clicks.|Medium|Medium",
          "Expand the 'Floating Notes' feature|The current notes are a bit too basic; I'd love more markdown support and organization options.|Low|Medium"
        ]
      }
    ]
  },
  'supabase.com': {
    reviews: [
      {
        role: 'SaaS Founder',
        metrics: { usability: 9.0, performance: 9.3, value: 9.8, trust: 9.4 },
        feedback: {
          usability: "The dashboard is excellent for managing Postgres. Auth and Storage are easy to set up, though Edge Functions can be tricky.",
          performance: "Postgres performance is as good as you'd expect. The real-time engine is solid and scalable.",
          value: "Incredible value. The free tier is more than enough for MVP, and the paid tiers are predictable.",
          trust: "Open source and built on Postgres—hard to get more trustworthy than that."
        },
        first_impression: "Landing here, I was immediately struck by the 'Built for Founders' vibe. They speak our language. No corporate fluff, just 'Postgres + Auth + Storage'.",
        strategic_outlook: "Supabase is the legitimate successor to Firebase. By staying close to the SQL standard, they avoid vendor lock-in.",
        suggestions: [
          "Improve the local development experience|The Supabase CLI is powerful but can be brittle and difficult to configure for complex environments.|High|High",
          "Add native support for full-text search UI|While Postgres supports it, a better dashboard UI for managing indexes would be great.|Medium|Medium",
          "Expand the library of Auth providers|Adding more niche OAuth providers would help with internationalization.|Low|Medium"
        ]
      },
      {
        role: 'Frontend Engineer',
        metrics: { usability: 9.4, performance: 9.5, value: 9.6, trust: 9.5 },
        feedback: {
          usability: "The client library (supabase-js) is a joy to use. Type safety with generated types from my DB schema is a life saver.",
          performance: "The 'Realtime' feature is incredibly low-latency. It makes building collaborative apps feel like a breeze.",
          value: "It's so much cheaper than managed RDS or Firebase as you scale. The 'Pay as you go' model is very fair.",
          trust: "Being able to self-host if I ever want to leave the platform is the ultimate 'trust' signal."
        },
        first_impression: "The first thing I noticed was the dark mode—which is gorgeous. But more importantly, the speed of getting a DB live is mind-blowing.",
        strategic_outlook: "They are winning by being the 'Open Source' choice. As long as they keep the developer experience high, they are untouchable.",
        suggestions: [
          "Simplify the 'Row Level Security' UI|Setting up complex RLS policies in the dashboard can be error-prone; more visual tools would help.|High|Medium",
          "Add better support for 'Edge Functions' debugging|The local testing for edge functions still feels a bit disconnected from the live environment.|Medium|High",
          "Improve the 'Database' table browser|Managing hundreds of tables and views could use better organization and search within the dashboard UI.|Low|Medium"
        ]
      },
      {
        role: 'UX Researcher',
        metrics: { usability: 8.5, performance: 9.0, value: 9.2, trust: 9.3 },
        feedback: {
          usability: "The dashboard is powerful but can be a bit overwhelming for someone who isn't a SQL expert. It needs better 'beginner' paths.",
          performance: "Loading large datasets in the table browser is fast, but the initial dashboard load can sometimes hang for a few seconds.",
          value: "For a research-heavy project, the ease of exporting data and running custom queries is a massive plus.",
          trust: "The community around Supabase is incredibly helpful. Their Discord and GitHub are very active and transparent."
        },
        first_impression: "I was struck by how much they've grown. It used to be just 'Firebase alternative', but now it feels like a full-stack platform in its own right.",
        strategic_outlook: "They are successfully moving 'upmarket' while keeping their indie-dev roots. That's a hard balance to strike.",
        suggestions: [
          "Add more 'Pre-built Templates'|Instead of a blank DB, give me a 'SaaS Starter' or 'Blog' template with schema and RLS already set up.|High|High",
          "Improve the documentation for 'Advanced Postgres'|Sometimes the guides stop right where things get complicated (e.g., complex window functions).|Medium|Medium",
          "Add a native 'Data Visualization' tool|Being able to create quick charts from my tables directly in the dashboard would be amazing.|Low|High"
        ]
      }
    ]
  }
};
