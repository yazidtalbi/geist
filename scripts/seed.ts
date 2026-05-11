import { createClient } from '@supabase/supabase-js';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const SAAS_URLS = [
  'https://stripe.com',
  'https://linear.app',
  'https://framer.com',
  'https://vercel.com',
  'https://raycast.com',
  'https://cal.com',
  'https://resend.com',
  'https://supabase.com',
  'https://clerk.com',
  'https://convex.dev',
  'https://planetscale.com',
  'https://posthog.com',
  'https://metalab.com',
  'https://ueno.co',
  'https://work.co',
  'https://instrument.com'
];

const PRODUCT_REVIEWS: Record<string, any> = {
  'stripe.com': {
    reviews: [
      {
        role: 'SaaS Founder',
        metrics: { usability: 9.2, performance: 9.8, value: 9.5, trust: 9.9 },
        feedback: {
          usability: "The dashboard remains the industry benchmark for financial control planes. While the sheer surface area of the product suite—spanning Connect, Issuing, and Treasury—has introduced inevitable density in the sidebar navigation, the information hierarchy is maintained through consistent iconography and a stellar command-K interface. It’s a masterclass in managing extreme complexity without sacrificing the developer experience that built the brand. However, as they move further into the enterprise, some of the deeply nested settings for tax and compliance can lead to 'breadcrumb fatigue' for non-technical administrators.",
          performance: "API response times are world-class, consistently hitting sub-100ms latencies even for complex, multi-entity transactions. The reliability of their global Edge network is effectively a utility at this point—you don't notice it because it never fails. Their use of optimistic UI in the dashboard makes heavy financial data management feel as responsive as a local spreadsheet, which is no small feat given the regulatory and consistency checks happening in the background.",
          value: "While the 2.9% + 30c baseline is a premium compared to legacy processors, the 'hidden' value in saved engineering hours and global tax compliance (Stripe Tax) is unmatched. For a founder, Stripe isn't just a payment gateway; it's a outsourced finance and legal department. The ability to flip a switch and be compliant in 40+ countries is a competitive advantage that far outweighs the transactional cost.",
          trust: "The documentation is so comprehensive it has practically become a cultural artifact in the engineering world. It builds massive confidence because it doesn't just tell you how to use the API; it teaches you how global finance works. Their transparency around uptime, security audits (PCI Level 1), and their 'Climate' initiative further solidifies them as the most trusted partner in the stack."
        },
        first_impression: "Upon landing, it was clear that it was a high-end product. The hero section is striking, but I did find the sheer amount of product options a bit overwhelming at first glance. It feels like stepping into a financial cockpit where every switch is precision-engineered.",
        strategic_outlook: "Stripe is becoming the 'financial OS'. They need to be careful not to lose their developer-first simplicity as they chase the enterprise. Their move into 'embedded finance' is a massive land grab that will likely define the next decade of fintech.",
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
          usability: "The checkout experience (Stripe Elements) is the absolute gold standard for the web. Every detail, from real-time card brand detection to the buttery smooth error state transitions, has been polished to perfection. From an implementation standpoint, the 'Payment Element' reduces months of work to a few lines of code, handling regional methods like iDEAL or Apple Pay automatically. The only friction point is the occasional complexity in overriding their default CSS variables to match highly custom brand identities.",
          performance: "The SDKs are remarkably lightweight and tree-shakable. The 'Stripe Shell' and the integrated API playground are a joy to use, allowing for rapid prototyping without leaving the browser. Everything feels 'instant'—from the moment you trigger a test payment to the webhook hitting your local dev server via the Stripe CLI. It’s a workflow that respects the developer’s time.",
          value: "For a solo developer or a small team, the pricing is a significant line item, but it’s effectively an insurance policy against technical debt. Building a custom PCI-compliant vault and multi-currency logic from scratch would cost $100k+ in senior engineering time. Stripe gives you that for a small cut of your success.",
          trust: "Seeing the Stripe logo on a checkout page is an instant 'trust' signal for me as a consumer, and as a developer, their 'System Status' page is one of the few in the industry that I actually believe. Their commitment to backward compatibility in their API versioning is legendary—you can run code from 2011 today without it breaking."
        },
        first_impression: "The first thing I noticed was the buttery smooth scroll animations and the perfect layout balance. It just feels like a team that cares about the pixels. The site itself is a portfolio of their engineering prowess.",
        strategic_outlook: "Their focus on 'embedded finance' is the right move. They are becoming the invisible plumbing of the internet, which is the ultimate goal for infrastructure. By owning the checkout, they own the internet's conversion rate.",
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
          usability: "Information density is extremely high, which is great for power users but can be a significant barrier for early-stage founders. The vocabulary used—terms like 'Connect', 'Issuing', 'Treasury', and 'Billing'—requires a level of financial literacy that isn't always present. However, the onboarding flow for each specific product is tailored beautifully, using progressive disclosure to hide complexity until it's absolutely necessary.",
          performance: "Even with massive datasets, the dashboard transitions are seamless. We tested the search functionality across 10,000+ test transactions and the result rendering was instantaneous. The use of skeleton loaders and micro-animations during data fetching provides a great sense of 'perceived performance' that keeps the user engaged.",
          value: "The ecosystem is their primary value proposition. Being able to plug into 100s of third-party apps (HubSpot, Slack, NetSuite) via their App Store makes Stripe more of a platform than a utility. The data portability and export tools also ensure that you aren't 'locked in' in a way that would be detrimental to a growing business.",
          trust: "Their transparency around uptime and security incidents is a benchmark for the industry. The 'Stripe Climate' initiative is also a brilliant trust-building exercise—it allows companies to feel good about their processor choice while adding a layer of ethical alignment that competitors lack."
        },
        first_impression: "I was immediately struck by the brand's evolution. It's moved from 'simple API' to 'global finance brand' without losing that minimalist edge. The site feels like it was designed for the next generation of billion-dollar companies.",
        strategic_outlook: "They are perfectly positioned for the 'low-code' future with tools like Payment Links, but they need to ensure their manual configuration tools stay robust enough for the hardcore engineers who put them on the map.",
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
          usability: "Linear has redefined the professional software experience. The reliance on keyboard shortcuts for everything creates a flow state that is addictive. Once you learn the 'Linear way'—using the command palette (Cmd+K) as your primary navigation—every other tool feels like it's moving through molasses. The UI is opinionated in the best way possible: it doesn't give you 100 ways to do something; it gives you the fastest way. The only learning curve is the terminology around 'Cycles' and 'Triage', which can feel a bit rigid for teams used to more fluid Kanban boards.",
          performance: "Instant sync is the core of the Linear experience. The optimistic UI implementation is the best I've ever used in a collaborative tool; you never see a loading spinner. Whether you're moving an issue, adding a label, or assigning a teammate, the change happens locally first and syncs in the background. It makes the app feel like a native C++ application rather than a web tool. This level of responsiveness is what every SaaS should aim for.",
          value: "The value proposition for engineering-led teams is undeniable. It's not just a tracker; it's a methodology for building better products. By enforcing a specific workflow, it reduces 'process debt' and keeps teams focused on shipping rather than managing tickets. The ROI in saved meeting time and reduced developer frustration is massive.",
          trust: "Solid, though as a newer player compared to Jira, I'd love to see more long-term transparency around their data portability features. However, their frequent 'changelog' posts and open communication about their design philosophy build a lot of 'brand trust' that traditional enterprise tools completely lack."
        },
        first_impression: "The moment I logged in, I felt a sense of calm. The UI is so focused and deliberate. No unnecessary shadows, no clutter, just pure utility wrapped in a high-end, dark-mode aesthetic. It feels like a pro tool for pros.",
        strategic_outlook: "Linear is setting the pace for the 'craft' movement in software. Its influence on UI design is pervasive—everyone is trying to copy their 'Command + K' and their sleek, minimalist aesthetics.",
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
          usability: "Linear forces you to work the right way. It's not just a tool; it's a methodology for building better products. The 'Triage' feature is a stroke of genius for founders, allowing us to shield the dev team from noisy requests until they are actually ready for work. The UI is so clean that I actually enjoy doing project management, which is a sentence I never thought I'd say. The only downside is that for non-technical founders, the Git integration and technical focus can be a bit intimidating at first.",
          performance: "The desktop app (built with Electron, but you wouldn't know it) is so fast it feels native. I've never seen a web-based tool handle thousands of issues this well. The way it handles offline mode is also a lifesaver—you can keep working on a plane and everything just resolves perfectly when you land. No merge conflicts, no lost data. It’s magic.",
          value: "Cheaper than Jira and 10x better. For a small startup, the ROI in saved meetings alone is massive. It eliminates the need for a full-time project manager in the early days because the tool itself enforces the process. It's the best hire I've ever made.",
          trust: "The team is very responsive and clearly 'lives' in the product. You can tell every feature was built to solve a real problem they faced themselves. Their focus on privacy and security (SOC2) for a relatively young company is also very encouraging for a founder looking for a long-term partner."
        },
        first_impression: "I was immediately struck by the speed. I hit 'C' to create an issue and it was there before my finger left the key. That kind of performance is rare in a world of bloated enterprise software. It feels expensive but is surprisingly affordable.",
        strategic_outlook: "They are winning by being the 'anti-Jira'. As they grow, the challenge will be staying 'minimal' while adding enterprise features. If they can avoid the feature creep that killed their predecessors, they will own the developer tools market.",
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
          usability: "The command menu (Cmd+K) is so intuitive I rarely touch the mouse anymore. It's the standard for pro tools. The Git integration is deep—creating a branch directly from a ticket and having the status update automatically when the PR is merged is a game-changer for my workflow. The markdown editor is also excellent, handling code snippets and images with zero friction. The only minor gripe is the lack of custom fields, but their 'Labels' system is powerful enough that I rarely miss them.",
          performance: "The local-first architecture is the future of the web. Being able to work with zero latency, regardless of my internet connection, is incredible. The app feels incredibly lightweight on system resources, which is a welcome change from the memory-hogging competitors. The initial sync is fast, and incremental updates are practically invisible.",
          value: "It saves me at least 30 minutes a day just by being fast and reducing context switching. Over a month, that's a whole work day saved for the company. The 'Cycle' reporting also gives me a great sense of my own velocity without feeling like 'big brother' is watching.",
          trust: "Excellent security features like SAML and SCIM for bigger teams. They take infrastructure seriously and their uptime has been near-perfect in my experience. The fact that they have a well-documented API for custom integrations also builds a lot of trust for a developer."
        },
        first_impression: "Landing on the home page, I was impressed by the 'Brutalist Luxury' aesthetic. It's bold, dark, and feels like a tool for serious builders. It doesn't look like a typical corporate tool, and that's why we love it.",
        strategic_outlook: "They've successfully created a brand that people actually *want* to use, which is unheard of in project management. By winning the hearts of the engineers, they've made themselves un-fireable.",
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
          usability: "The Git-to-Deployment flow is practically seamless. The Vercel Toolbar for preview deployments is a genuine game-changer for team collaboration—being able to leave comments and feedback directly on the UI during a review cycle saves hours of back-and-forth. The dashboard is clean and informative, providing exactly what you need (logs, analytics, domains) without the clutter of traditional AWS/GCP consoles. The only slight friction is managing environment variables across multiple preview branches, which can still feel a bit manual.",
          performance: "Global Edge Network performance is unmatched. Their focus on the 'Edge' means that even complex server-side rendered pages feel like static sites. Cold starts on serverless functions have been optimized to the point where they are increasingly negligible for 99% of use cases. The automatic image optimization (next/image) is also a massive performance win that works out of the box, ensuring we aren't shipping unoptimized assets to mobile users.",
          value: "The pro plan is a bit of a price jump for hobbyists, but for enterprise teams, the DX gains and reduced DevOps overhead easily justify the cost. You aren't just paying for hosting; you're paying for a deployment pipeline that would take a full-time engineer months to build and maintain on raw infrastructure. It’s a value play for developer velocity.",
          trust: "Very high. They are the primary maintainers of Next.js, which gives us immense confidence in the long-term stability of their infrastructure. Their transparency regarding outages and their proactive security features (DDoS protection, WAF) make them an easy choice for production workloads."
        },
        first_impression: "Honestly, the moment I landed here, the typography hit me first. It feels expensive. The deployment flow is so fast it feels like magic. It’s the first hosting company that feels like it actually likes developers.",
        strategic_outlook: "Vercel is building the 'OS for the Web'. Their vertical integration—owning the framework (Next.js), the infrastructure, and the analytics—is their greatest competitive advantage. They are moving into the 'AI' space aggressively, positioning themselves as the primary choice for the next generation of web apps.",
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
          usability: "I can ship a global site in 30 seconds. For a founder, that speed-to-market is the only metric that matters. The onboarding is so well-designed that I was able to set up our entire production infrastructure without ever needing to hire a DevOps engineer. The 'Speed Insights' and 'Web Vitals' dashboards give me a high-level view of our product quality that is easy to understand and act upon. The only downside is that as we scale, the 'usage-based' pricing can become a bit unpredictable if we have a sudden traffic spike.",
          performance: "Our site feels like a native app because of their sophisticated caching layer and Edge middleware. The 'Edge Runtime' is a significant technical edge that allows us to run logic close to our users, reducing latency to practically zero. We’ve seen a direct correlation between the performance gains on Vercel and our customer conversion rates—speed really is a feature.",
          value: "It replaces a whole DevOps team. For a 5-person startup, Vercel is the best hire you'll ever make. The peace of mind knowing that our site won't go down during a Product Hunt launch is worth the premium. It allows us to focus 100% on building our product features rather than worrying about server maintenance or scaling issues.",
          trust: "They are the industry standard for a reason. Everyone else in the hosting space is just trying to catch up to their deployment experience. Their commitment to open-source via Next.js also builds a lot of long-term trust—we know that even if we wanted to leave Vercel (which we don't), our codebase isn't locked into a proprietary system."
        },
        first_impression: "Upon landing, I was struck by the clarity of their value prop. 'Develop. Preview. Ship.' They aren't just selling hosting; they're selling velocity. The site itself is a testament to the high-performance experiences they enable.",
        strategic_outlook: "By owning the frontend framework and the infrastructure, they've created an incredibly sticky ecosystem. Their move into 'Storage' (KV, Postgres, Blob) is a brilliant way to capture more of the backend stack, making them a true full-stack platform.",
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
          usability: "The 'Preview Deployments' feature is quite simply the best feedback tool I've ever used. I can leave comments directly on specific UI elements, which eliminates any ambiguity during the design review process. The dashboard’s hierarchy is very clear, making it easy for non-technical stakeholders to view analytics and speed scores. The only area for improvement would be the documentation for some of the more advanced edge features, which can be a bit dense for researchers to parse.",
          performance: "Image optimization (next/image) is a silent hero. It works flawlessly out of the box, ensuring that our visual-heavy marketing pages load instantly on all devices. We’ve monitored our LCP (Largest Contentful Paint) scores since moving to Vercel, and the improvement has been dramatic across all global regions. The 'perceived performance' during deployments is also excellent—the progress bars actually mean something.",
          value: "It’s a bit pricey for high-bandwidth sites, but the developer happiness, reduced friction, and faster shipping cycles it provides are invaluable. For a research-led team, the ability to rapidly iterate on previews and get stakeholder feedback in a real-world environment is a massive force multiplier. It turns deployment into a communication tool.",
          trust: "Very high. Their focus on security and 'Zero Trust' architecture (like Vercel Authentication) makes it an easy sell to our enterprise clients who are nervous about cloud infrastructure. Their community outreach and clear, consistent branding also contribute to a sense of long-term reliability and market leadership."
        },
        first_impression: "I was immediately impressed by the 'Vercel Ship' aesthetic. It's clean, high-contrast, and feels like a tool for the next generation of builders. It feels like a platform that respects the user's intelligence.",
        strategic_outlook: "They are moving into the 'Edge' and 'AI' space with incredible momentum. They are no longer just 'hosting for Next.js'; they are the infrastructure for the modern, intelligent web. Their focus on the 'DX' (Developer Experience) is their primary moat.",
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
          usability: "The transition from a design canvas to a live, production-grade website is nothing short of magical. Framer has bridged the gap between 'prototype' and 'product' more effectively than any tool in history. However, from a research perspective, the CMS interface can still feel a bit unintuitive for non-design stakeholders who are used to more traditional, structured environments like WordPress or Contentful. The 'free-form' nature of the editor is a double-edged sword: it provides ultimate creative freedom, but it can also lead to accidental layout breaks if permissions aren't managed carefully.",
          performance: "Sites built on Framer are surprisingly fast, benefiting from a highly optimized rendering engine and automatic image compression. We performed a Lighthouse audit on several Framer-hosted marketing sites and consistently saw 90+ scores for performance. However, it's worth noting that the editor itself can start to lag significantly when dealing with very large, asset-heavy projects (e.g., sites with 50+ high-res video backgrounds). The pre-loading logic for assets is well-handled, but there's still room for improvement in the authoring experience for complex sites.",
          value: "Framer represents the fastest way to go from a high-fidelity idea to a global marketing presence. By eliminating the 'handover' phase between design and development for marketing sites, it effectively saves companies weeks of senior engineering time. For a startup, the ability to iterate on a landing page in minutes rather than days is a massive competitive advantage. It's the ultimate 'velocity' tool for creative teams.",
          trust: "Hosting is remarkably reliable, and their transition to a full-blown site builder has been handled with great technical transparency. While the lock-in to the Framer platform is a consideration for long-term enterprise projects that might eventually need a custom backend, their recent additions of 'Custom Code' and 'Plugins' have significantly mitigated these concerns. The community is vibrant, and the constant stream of high-quality templates builds a lot of confidence in the platform's longevity."
        },
        first_impression: "Landing on the Framer site, I was immediately struck by the sheer beauty of the motion. It's the first 'no-code' tool that doesn't feel like a compromise—it feels like an upgrade. The brand itself exudes a level of craft that is rare in the SaaS world.",
        strategic_outlook: "As Framer continues to eat into the WordPress and Webflow market, its focus on 'Designers who can't code' is a winning strategy. They are positioning themselves as the primary tool for the 'Visual Developer', a niche that is growing rapidly as AI handles more of the boilerplate logic.",
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
          usability: "Coming from Figma, the learning curve is practically zero. The 'Sticks' and 'Stacks' layout system is much more logical than CSS Flexbox for designers, providing a visual way to handle complex responsiveness without touching a line of code. The addition of 'Effects' and 'Transitions' as first-class citizens makes it possible to build truly immersive experiences that would be difficult to describe in a traditional hand-off document. The component logic is powerful, though it can sometimes become a bit of a 'nodes' labyrinth for extremely complex interactive elements.",
          performance: "The sites Framer produces are incredibly optimized right out of the box. I've seen 100/100 Lighthouse scores on complex landing pages that would have taken a senior frontend engineer days to fine-tune manually. The automatic CDN distribution and image optimization mean that as a designer, I don't have to worry about the technical 'tail' of my creative decisions. It allows me to focus purely on the user experience.",
          value: "For a designer, Framer is the ultimate power-up. I can now bill for full-stack development work without writing a single line of code, which has completely changed the economics of my agency. It allows me to deliver a finished product that is pixel-perfect to my original vision, rather than a 'close approximation' interpreted by a developer. The ROI for my clients is also clear: they get a better site, faster.",
          trust: "The community around Framer is massive and incredibly supportive. There's always a template, a custom component, or a tutorial available for whatever niche requirement you might have. Their 'Made in Framer' showcase is a constant source of inspiration and proof that the tool is capable of world-class work. The brand feels alive and deeply connected to the design community."
        },
        first_impression: "Upon landing, I was blown away by the 'Design to Dev' promise. The site itself is a portfolio of what the tool can do—and it's impressive. It feels like the tool Figma should have been from the start.",
        strategic_outlook: "They are winning the 'creative' market. Their next big challenge is proving they can handle complex, logic-heavy web apps with as much grace as they handle marketing sites. If they can solve the 'logic' problem, they will be unstoppable.",
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
          usability: "The 'Custom Code' and 'Code Components' features are literal lifesavers. Being able to inject React components directly into a Framer site allows us to handle the complex logic (like custom auth or data fetching) that the visual editor isn't built for. The API is clean, though the build process for custom components can sometimes be a bit opaque when things go wrong. It’s a great 'middle ground' tool for teams that want high-end design without losing the ability to drop into code when necessary.",
          performance: "The server-side rendering implementation is solid. It's significantly faster and more SEO-friendly than older site builders like Wix or Squarespace. The way they handle hydrations and asset loading is technically impressive, though you do have to be careful with third-party scripts as they can easily tank your performance scores if not managed via Framer’s native tools. The global CDN performance is a major plus.",
          value: "Framer is great for quick-turnaround landing pages and marketing sites, but I wouldn't build a complex, data-heavy dashboard in it just yet. It's a marketing tool first and foremost. For that specific use case, it’s a massive time-saver. It allows the engineering team to focus on the 'hard' product problems while the designers own the 'soft' marketing surfaces.",
          trust: "The infrastructure is rock solid. They've clearly invested heavily in their global CDN and caching strategy to ensure that Framer sites can handle 'Reddit-hug' levels of traffic without breaking a sweat. The security features are also up to standard for most mid-market companies. The transparency of their roadmap and their frequent updates build a lot of confidence."
        },
        first_impression: "I was struck by how far Framer has come from its original 'prototyping' roots. It's now a serious contender for the modern web. It’s no longer just for designers; it’s a tool that engineers can actually respect.",
        strategic_outlook: "By targeting the 'frontend-adjacent' designer, they've found a massive niche that Webflow is starting to lose due to its increasing complexity and aging UI. If they can maintain their 'designer-first' focus while expanding their technical capabilities, they will dominate the market.",
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
          usability: "Incredibly intuitive and remarkably fast. The extension store is a masterclass in community-driven utility, allowing users to tailor the experience to their specific workflow. The command-based interface feels like a natural extension of the OS, making tasks like window management, clipboard history, and snippet expansion practically invisible. The only minor friction point is that some of the deeper settings for advanced extensions can feel a bit hidden in the secondary menus, but for 99% of use cases, it's perfect.",
          performance: "It's significantly faster than macOS Spotlight and doesn't hog system resources. The app feels like it's part of the operating system rather than a third-party utility. There is zero lag when triggering the search bar, and the result indexing is near-instant even on machines with massive file systems. The use of native Swift for the core app was a brilliant decision that pays off every time you hit the keyboard.",
          value: "The free tier is incredibly generous, and the 'Pro' features—particularly the integrated AI and cross-device sync—are handled so well they quickly become essential to your daily routine. It has replaced at least 5 other standalone utilities for me (Magnet, Paste, Alfred, etc.), making it a very cost-effective and clutter-reducing choice. For a power user, it's easily the best $10/mo in the budget.",
          trust: "They've built a very strong brand around being a privacy-first, developer-centric utility. The fact that extensions are open-source and easy to audit builds a lot of trust. Their communication is clear, and the team seems genuinely obsessed with the quality of the 'Mac' experience. It’s one of the few apps that I feel safe giving full system permissions to."
        },
        first_impression: "Raycast is the power-user's dream for macOS. The landing page is as fast and clean as the app itself. It’s rare to see a product that so perfectly matches its marketing promise. It feels like a tool for the future of productivity.",
        strategic_outlook: "By winning the 'Command + Space' shortcut, Raycast has become the primary entry point for all digital productivity. Their biggest risk is Apple sherlocking their features, but their community-driven extension moat is already getting very deep and will be hard to replicate.",
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
          usability: "The dashboard is an excellent piece of engineering for managing complex Postgres instances. Features like Auth, Storage, and Realtime are remarkably easy to set up, though the transition to Edge Functions can be a bit of a learning curve for teams used to traditional server-side logic. The SQL editor with AI assistance is a brilliant touch for founders who might be a bit rusty on their complex joins. The only area for improvement is the 'Project Settings' menu, which has grown a bit dense as they've added more enterprise features.",
          performance: "Postgres performance is exactly what you'd expect from a well-managed instance—solid and dependable. The real-time engine is particularly impressive, handling thousands of concurrent connections with very low latency. We’ve used Supabase for high-traffic launches and it didn't blink. The automatic connection pooling (via Supavisor) is a lifesaver for serverless applications that might otherwise overwhelm a database.",
          value: "The value proposition is incredible, especially for early-stage startups. The free tier is more than enough for a robust MVP, and the paid tiers are predictable and scale linearly with your usage. By providing a unified platform for DB, Auth, and Storage, it effectively replaces several other paid services, simplifying both the billing and the technical architecture. It's a huge force multiplier for small teams.",
          trust: "Open source and built on top of industry-standard tools like Postgres and GoTrue—it's hard to get more trustworthy than that. The 'no vendor lock-in' promise is something they take seriously, and the ability to self-host is the ultimate insurance policy. Their community is one of the most helpful in the industry, and their transparency around security and uptime is exemplary."
        },
        first_impression: "Landing here, I was immediately struck by the 'Built for Founders' vibe. They speak our language. No corporate fluff, just 'Postgres + Auth + Storage'. It feels like a tool that actually wants to help you ship.",
        strategic_outlook: "Supabase is the legitimate successor to Firebase. By staying close to the SQL standard and the open-source community, they have created a much more sustainable and scalable ecosystem. They are winning by being the 'adult in the room' for serverless backends.",
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
  },
  'cal.com': {
    reviews: [
      {
        role: 'SaaS Founder',
        metrics: { usability: 8.8, performance: 8.5, value: 9.5, trust: 9.8 },
        feedback: {
          usability: "Cal.com offers incredible customization and a level of control that is unmatched in the scheduling space. The ability to build custom workflows and the API-first architecture make it a dream for developers, but for non-technical founders, the settings menu can feel like a bit of a labyrinth compared to the simpler (but more limited) Calendly. The onboarding is thorough, but it could be streamlined for users who just want a simple booking link without the advanced routing logic.",
          performance: "We’ve noticed that the booking page can occasionally be slow to load on mobile devices, which is a critical friction point for potential leads. However, their recent infrastructure updates seem to be addressing this, and the overall reliability of the scheduling engine is solid. The real-time sync across multiple calendar providers is impressive and has been near-perfect in our experience.",
          value: "The open-source nature and the extremely fair pricing model make it an incredible value for startups and agencies. The fact that you can self-host if needed is a huge plus for compliance-heavy industries. It’s a tool that grows with you, from a simple individual link to a complex team routing system, without the massive price jumps typical of the category.",
          trust: "High trust. Being open-source allows for constant security audits and a level of transparency that build massive confidence for enterprise clients. The founders are very active in the community and their commitment to the 'open-source' ethos is clearly part of the company's DNA. It’s one of the few tools in our stack that we feel truly aligned with."
        },
        first_impression: "Landing on the Cal.com site, I was immediately struck by the 'Minimalist' aesthetic. It feels much more professional and less 'corporate' than its competitors. It’s clear they are targeting the next generation of digital-native companies.",
        strategic_outlook: "Cal.com is winning by being the 'infrastructure' layer of scheduling, not just a simple booking link. By owning the 'time' primitive, they are positioning themselves to be a critical part of the modern business stack.",
        suggestions: [
          "Streamline the initial onboarding flow|Setting up your first event type involves too many configuration steps that could be simplified.|High|High",
          "Improve mobile dashboard responsiveness|Managing your schedule on the go is currently difficult due to a non-optimized mobile web view.|Medium|Medium",
          "Add more robust 'Round Robin' logic|The current team scheduling logic lacks some of the edge-case handling needed for large sales teams.|Medium|High"
        ]
      }
    ]
  },
  'resend.com': {
    reviews: [
      {
        role: 'Frontend Engineer',
        metrics: { usability: 9.9, performance: 10, value: 9.4, trust: 9.6 },
        feedback: {
          usability: "Resend is quite simply the cleanest and most efficient email API I've ever worked with. The integration with React Email is a total game-changer, allowing us to build, test, and preview our templates in a local dev environment with all the power of React. The dashboard is minimalist and focused, giving us exactly the data we need (deliverability, opens, clicks) without the bloat of traditional ESPs. The only minor improvement would be a more robust way to manage audience segments natively in the UI.",
          performance: "Delivery times are lightning fast, and the dashboard updates in real-time with near-zero latency. We’ve sent millions of emails through Resend and haven't seen a single significant delay or ingestion issue. Their infrastructure is clearly optimized for the 'developer speed' that modern applications require. The API response times are also remarkably consistent, which makes our backend logic much more predictable.",
          value: "Resend saves us hours of frustration every week that used to be spent wrestling with buggy HTML templates and opaque testing tools. For a developer, the time saved on building and maintaining email infrastructure is worth every penny. It allows us to ship better emails, faster, and with more confidence. It's one of those rare tools that you actually enjoy paying for because it just works.",
          trust: "Strong. They are focusing solely on the developer experience of email, and that clarity of mission builds a lot of trust. Their documentation is excellent, and their proactive approach to security and deliverability (DKIM, SPF setup) is handled with a level of polish that is rare in the space. They feel like a company that is building for the long term."
        },
        first_impression: "Finally, an email platform that feels like it was built in this decade. The site is a masterclass in 'Developer Aesthetic'—minimal, fast, and high-contrast. It’s clear they understand their audience perfectly.",
        strategic_outlook: "Resend is the 'Stripe for Email'. They are winning by simply having the best developer experience in a category that has been stagnant for a decade. By owning the 'developer' and 'React' niche, they are creating a very strong moat.",
        suggestions: [
          "Expand the 'Analytics' dashboard|I'd love to see more deep-dive metrics on click-through rates and bounce reasons natively.|Medium|High",
          "Add more pre-built React Email templates|While the library is growing, more variety in the base templates would speed up prototyping even further.|Low|Medium",
          "Simplify the domain verification UI|The DNS setup is clear, but a more automated 'Check Status' button would reduce onboarding friction.|Low|Low"
        ]
      }
    ]
  },
  'clerk.com': {
    reviews: [
      {
        role: 'Frontend Engineer',
        metrics: { usability: 9.8, performance: 9.2, value: 9.0, trust: 9.4 },
        feedback: {
          usability: "The pre-built components (Clerk Components) are truly beautiful and have saved our team weeks of custom frontend work. The middleware integration for Next.js is top-notch, handling session management and protected routes with just a few lines of code. The 'Organization' features are also very well-implemented, making it easy to build B2B SaaS without worrying about complex multi-tenancy logic. The only friction point is that the components can sometimes be difficult to style for highly unique brand identities without dropping into their more complex 'headless' hooks.",
          performance: "Generally fast and very reliable. However, for performance-critical sites, the initial script load of the Clerk library can be a bit heavy. They've made strides in optimizing this, but it's something to keep an eye on for your Core Web Vitals. Once loaded, the interactions are snappy and the session hydration is handled very efficiently. The global latency for their auth endpoints is consistently low.",
          value: "It can get expensive as you scale to thousands of monthly active users, but the security and features (like MFA, social logins, and account linking) you get out of the box are easily worth the cost for most startups. It allows us to outsource one of the most critical and high-risk parts of our application to experts, which is a massive value play for engineering peace of mind.",
          trust: "By focusing solely on the 'Authentication and User Management' problem, Clerk has built a lot of credibility in the security space. Their documentation is thorough and their support for modern frameworks is excellent. We feel very confident that our user data is handled with the highest standards of security and privacy."
        },
        first_impression: "Authentication that doesn't make you want to quit your job. The landing page is clean, informative, and perfectly highlights their 'Developer First' philosophy. It feels like a tool that actually understands the pain points of building auth.",
        strategic_outlook: "Clerk is winning the 'developer-first auth' battle by providing the best pre-built UI in the game. They are effectively becoming the 'Stripe for Identity', and their deep integration with the Next.js ecosystem is a brilliant strategic move.",
        suggestions: [
          "Provide more flexible 'headless' UI options|The pre-built components are great but can be difficult to style for brand-heavy applications.|High|High",
          "Improve the documentation for custom session claims|The current guides for advanced session management are slightly fragmented.|Medium|Medium",
          "Add better support for non-React frameworks|While they are expanding, the DX for Vue and Svelte users is still trailing behind React.|Low|High"
        ]
      }
    ]
  },
  'convex.dev': {
    reviews: [
      {
        role: 'SaaS Founder',
        metrics: { usability: 9.5, performance: 9.7, value: 9.3, trust: 8.9 },
        feedback: {
          usability: "The reactive database model is quite simply mind-blowing. No more worrying about cache invalidation, WebSockets, or manual state management—you just write your functions and the UI updates automatically across all clients. It’s a complete paradigm shift for full-stack development. The dashboard is also very clean and informative, making it easy to browse data and debug functions. The only learning curve is getting used to the 'Convex way' of writing schema and functions, which is a bit different from traditional SQL or NoSQL.",
          performance: "End-to-end latency is incredibly low. Because the database is fundamentally 'live' and reactive, the app feels native even on poor connections. We’ve seen significant performance improvements in our collaborative features since moving to Convex. The automatic indexing and query optimization mean we don't have to spend time on DB tuning, which is a huge win for a small team. The cold start times for functions are also impressively low.",
          value: "Convex massively reduces the need for complex state management on the frontend (like Redux or TanStack Query), which is a massive time-saver for our engineering team. By moving the 'reactive' logic to the database, we’ve deleted thousands of lines of boilerplate code. The ROI in terms of developer velocity and reduced technical debt is enormous. It allows us to build features that would be difficult or impossible with a traditional stack.",
          trust: "It’s a newer paradigm, so there’s an inevitable learning curve and some 'new tech' anxiety, but the team is clearly world-class and their documentation is some of the best I've seen. They are very active in their community and their transparency around their architecture builds a lot of confidence. We feel like we are building on the future of the backend stack."
        },
        first_impression: "The first database that actually feels like it's built for modern TypeScript and reactive UIs. The site is fast, technical, and immediately clarifies why this is a better way to build. It feels like a tool for the next generation of full-stack developers.",
        strategic_outlook: "Convex is moving the industry toward a more unified, reactive full-stack model. By owning the 'reactive' layer, they are creating a very sticky and powerful platform that could eventually displace traditional databases for many use cases.",
        suggestions: [
          "Expand the ecosystem of third-party integrations|Currently, connecting to external services requires more boilerplate than other serverless platforms.|Medium|High",
          "Improve the dashboard's data visualization|The current data browser is functional but lacks the advanced filtering and charting of more mature DBs.|Low|Medium",
          "Add more robust support for offline-first workflows|While it's reactive, better native handling for intermittent connectivity would be a plus.|Medium|Medium"
        ]
      }
    ]
  },
  'planetscale.com': {
    reviews: [
      {
        role: 'Frontend Engineer',
        metrics: { usability: 9.2, performance: 9.8, value: 8.5, trust: 9.6 },
        feedback: {
          usability: "The 'branching' workflow for database schemas is the single most significant innovation in database management since the relational model itself. It allows our team to treat database changes exactly like code—creating a branch, applying migrations, and then merging via a deploy request that includes automated safety checks. The UI for resolving schema conflicts is exceptionally well-designed, providing clear diffs that even non-DBAs can understand. The only learning curve is getting used to the Vitess-specific nuances around foreign keys and unique constraints.",
          performance: "Built on Vitess, PlanetScale handles massive scale without breaking a sweat. We’ve monitored our query latencies during peak traffic and they remain remarkably consistent, thanks to their sophisticated connection pooling (which is entirely transparent to the developer) and their optimized query routing. It eliminates the 'connection limit' anxiety that plagues traditional MySQL or Postgres setups. The 'Insights' tab provides deep, per-query performance data that makes it easy to identify and kill slow-running transactions before they impact users.",
          value: "The removal of the free tier was a blow to the hobbyist community, but for production workloads, the reliability and the developer velocity gains are well worth the price. By automating the most painful parts of database administration—scaling, backups, and zero-downtime migrations—PlanetScale effectively replaces the need for a dedicated Database Engineer in the early stages. For a growing company, that’s a massive ROI.",
          trust: "Used by some of the biggest and most technical companies in the world (like GitHub and Slack), PlanetScale has an extremely high level of dependability. Their transparency regarding outages and their deep expertise in the Vitess ecosystem build a lot of confidence. We trust them with our most critical data because their infrastructure is built on the same foundations that power the world's largest web applications."
        },
        first_impression: "Databases with the workflow of Git. The site is technical, focused, and immediately proves that the team understands the pain of modern DB management. It’s a tool built by engineers, for engineers.",
        strategic_outlook: "PlanetScale is the choice for teams that plan to scale to millions of users from day one without the traditional database headaches. They are successfully moving into the 'serverless' space by making the database as flexible as the frontend.",
        suggestions: [
          "Reintroduce a more accessible entry-level tier|The current pricing jump from hobby to pro is too steep for many early-stage projects.|High|Medium",
          "Improve the 'Insights' dashboard clarity|Query performance metrics are deep but could be presented with more actionable suggestions for optimization.|Medium|High",
          "Expand support for non-MySQL dialects|While they are Vitess-based, a Postgres-compatible layer would open up a massive new market.|Low|High"
        ]
      }
    ]
  },
  'posthog.com': {
    reviews: [
      {
        role: 'Product Designer',
        metrics: { usability: 8.2, performance: 8.8, value: 9.9, trust: 9.5 },
        feedback: {
          usability: "PostHog is a lot to take in at first. It's truly a Swiss Army knife of product tools, which means the UI can occasionally feel cluttered and overwhelming. The information architecture is complex, and finding specific features (like advanced group analytics or custom dashboards) often requires a trip to the search bar. However, for a power user, the level of control and the ability to link session replays directly to specific funnel drop-offs is incredibly powerful. They’ve done a great job of making a very complex tool relatively accessible.",
          performance: "Event ingestion is remarkably fast, even at scale. The session replays are smooth and include high-fidelity technical logs, though we have found that on asset-heavy frontends, the PostHog script can occasionally impact 'Long Task' metrics if not configured correctly. The dashboard itself is responsive, though loading very complex 'Trends' charts with millions of data points can sometimes take a few seconds. Their focus on the 'ClickHouse' backend is clearly paying off for query speed.",
          value: "Insane value for money. By bundling analytics, session replays, feature flags, and A/B testing into a single tool, PostHog allows startups to delete at least 3-4 other expensive subscriptions. Their pricing model is transparent and generous, and the 'open source' core means you aren't stuck with a proprietary data silo. For a growth-stage company, the ROI on PostHog is one of the highest in the entire stack.",
          trust: "Open source and built in public—the 'PostHog way' is a masterclass in transparency. Their public roadmap, their willingness to admit mistakes, and their deep engagement with the community build a level of trust that traditional enterprise companies (like Mixpanel or Amplitude) simply cannot match. We feel like we are part of their journey, not just a customer."
        },
        first_impression: "Every tool your startup needs in one single, slightly chaotic but incredibly powerful dashboard. The site is bold, weird, and technical—just like the product. It’s a refreshing change from the sanitized world of corporate SaaS.",
        strategic_outlook: "PostHog is the 'all-in-one' disruptor that is making specialized analytics tools look overpriced and disconnected. By owning the full data lifecycle, they are creating a platform that is much greater than the sum of its parts.",
        suggestions: [
          "Simplify the primary navigation|The sidebar has grown so large that finding specific features often requires using the search bar.|High|Medium",
          "Improve the 'Feature Flag' setup UI|The current flow for creating multi-variant flags is a bit clunky and prone to configuration errors.|Medium|High",
          "Enhance the documentation for data export|Exporting large datasets for external BI tools could be more streamlined and better documented.|Low|Medium"
        ]
      }
    ]
  },
  'metalab.com': {
    reviews: [
      {
        role: 'Design Lead',
        metrics: { usability: 9.0, performance: 9.5, value: 8.8, trust: 9.7 },
        feedback: {
          usability: "The MetaLab site is a masterclass in minimalist agency design. The navigation is subtle but highly effective, using a very clean information hierarchy to guide users through their extensive (and impressive) portfolio. The use of whitespace and typography is near-perfect, creating a high-end feel that matches their premium positioning. The only minor critique is that some of the case study pages can be quite long and would benefit from a persistent table of contents for easier jumping between sections.",
          performance: "High-resolution assets, including high-bitrate video backgrounds and large image galleries, load surprisingly quickly. The page transitions are buttery smooth, using a custom pjax-style loading system that maintains the 'premium' feel throughout the journey. We monitored the site on various devices and found that it remains remarkably performant even on mid-range hardware, which is a testament to their technical optimization of a visual-heavy site.",
          value: "As an agency, MetaLab is a premium choice, and their site reflects that 'top 1%' positioning perfectly. For a prospective client, the value is clear: you are hiring the team that defined the look and feel of modern software (Slack, Uber, etc.). The site does an excellent job of communicating the strategic depth of their work, moving beyond just 'pretty pictures' to real-world business impact.",
          trust: "Their client list speaks for itself, but the brand authority is further solidified by the consistency and quality of their own digital presence. MetaLab exudes a level of confidence and craft that makes them the safe, yet ambitious, choice for category-defining work. Their transparency about their process and their focus on 'long-term partnerships' over 'one-off projects' builds a lot of trust for enterprise decision-makers."
        },
        first_impression: "This is what design-led software looks like. The moment you land, you know you are in the presence of masters. It’s clean, expensive, and authoritative without being loud.",
        strategic_outlook: "MetaLab remains the gold standard for agencies that want to define a category. By staying focused on high-end product design rather than broad marketing, they have maintained a level of purity and prestige that is rare in the agency world.",
        suggestions: [
          "Add more technical deep-dives to case studies|The visuals are stunning, but more detail on the engineering challenges would appeal to CTOs.|Medium|Medium",
          "Improve accessibility for high-contrast users|Some of the subtle grey-on-white text doesn't meet WCAG standards, which is a miss for a top agency.|High|High",
          "Update the 'Careers' section UI|The job listings feel a bit disconnected from the high-fidelity aesthetic of the rest of the site.|Low|Medium"
        ]
      }
    ]
  },
  'ueno.co': {
    reviews: [
      {
        role: 'Product Designer',
        metrics: { usability: 8.0, performance: 9.0, value: 7.5, trust: 8.5 },
        feedback: {
          usability: "Ueno’s site is famously experimental. It’s incredibly beautiful to look at and filled with 'wow' moments, but from a purely functional standpoint, it can occasionally be difficult to navigate. The scroll-jacking and non-standard layout patterns mean you’re not always sure where the content ends or where to click next. However, as an agency site, that’s almost the point—it’s a showcase of creative possibility, not a bank dashboard. It successfully pushes the boundaries of what’s possible in a browser.",
          performance: "The site is very heavy on JavaScript and complex CSS animations. It’s a high-fidelity experience that really shines on high-end hardware with a fast connection, but it can be taxing on older devices or slower networks. We’ve noticed some stuttering in the more complex 3D transitions on mobile. That said, the pre-loading and asset-priority logic are well-handled to ensure the first impression is always impactful.",
          value: "As a 'museum' of what was possible in the peak of the 2010s agency design world, this site is priceless inspiration. For a client, the value was in Ueno's ability to create a cultural moment around a product launch. Even years later, designers still reference the 'Ueno style'—a blend of whimsy, technical excellence, and bold branding. The ROI was in the prestige and the 'talkability' of the work.",
          trust: "Historical trust in the Ueno brand remains very high, though as an acquired entity (by Twitter), its current relevance as a standalone partner is purely aesthetic. The site remains a testament to a team that was unafraid to break the rules. Their transparency about their 'culture' and their slightly irreverent tone built a lot of trust with creative founders who wanted something different from the corporate norm."
        },
        first_impression: "A legendary portfolio that still sets the bar for 'cool' on the web. It feels like stepping into a design studio in the future. It’s bold, playful, and technically ambitious.",
        strategic_outlook: "The 'Ueno style' has been absorbed into the broader design world, but this site remains its original temple. Their strategy of 'Design as Entertainment' was ahead of its time and continues to influence the next generation of creative agencies.",
        suggestions: [
          "Optimize for mobile performance|The heavy 3D and scroll-jacking effects are still quite buggy on mid-range Android devices.|High|Medium",
          "Add a legacy/archive header|Clearly stating that this is an archival site would help clarify the brand's current status to new visitors.|Medium|Low",
          "Improve discoverability of older case studies|Some of their best work is buried deep in a non-intuitive 'Work' grid.|Low|Medium"
        ]
      }
    ]
  },
  'work.co': {
    reviews: [
      {
        role: 'Design Lead',
        metrics: { usability: 9.5, performance: 9.8, value: 9.0, trust: 9.6 },
        feedback: {
          usability: "The Work.co site is brutalist, efficient, and incredibly clear. They practice what they preach about 'utility first', using a stripped-back interface that puts the work at the center. The navigation is incredibly fast and the information architecture is perfectly logical. It’s a site designed for busy executives who want to see results, not for designers looking for eye candy. The typography is bold and high-contrast, ensuring that their message is always the most important thing on the page.",
          performance: "Blazingly fast. There is zero fluff on this site—no unnecessary video backgrounds, no heavy JS libraries, just optimized content and incredibly fast transitions. It’s a masterclass in 'performance as a feature'. The site loads instantly even on poor connections, and the interaction latency is effectively zero. It’s the most responsive agency site we’ve ever audited, which perfectly reflects their product-centric approach.",
          value: "Work.co solves 'big' digital problems for 'big' global brands (IKEA, Apple, Google), and their site's focus on data and conversion reflects that value proposition perfectly. They aren't just selling 'design'; they are selling digital transformation and measurable business growth. For a prospective client, the ROI is communicated through their track record of category-defining product launches.",
          trust: "The 'gray' minimalist aesthetic and bold, authoritative typography communicate a level of seriousness and technical competence that is very effective. Work.co doesn't need to shout to be heard. Their client list and the longevity of their partnerships build an immense amount of trust. They feel like the agency you hire when you absolutely cannot afford to fail."
        },
        first_impression: "The most professional, no-nonsense agency site on the internet. It feels like a tool for serious business. No fluff, no distractions, just high-fidelity results. It’s the benchmark for 'Product Agency' branding.",
        strategic_outlook: "Work.co is the agency for founders and executives who value speed, conversion, and utility over 'decoration'. Their strategy of building long-term, product-focused teams for their clients has made them one of the most successful and respected agencies in the world.",
        suggestions: [
          "Improve the readability of long-form articles|The line length on some of their insight pages is too wide for optimal reading comfort.|Medium|High",
          "Add more interactive prototypes to the portfolio|Showing more 'live' interaction examples would better demonstrate their product prowess.|Medium|Medium",
          "Refine the contact form UX|The current 'minimal' form lacks clear success states, leaving users wondering if their message sent.|High|High"
        ]
      }
    ]
  },
  'instrument.com': {
    reviews: [
      {
        role: 'Product Designer',
        metrics: { usability: 8.7, performance: 9.3, value: 8.9, trust: 9.5 },
        feedback: {
          usability: "The Instrument site is immersive, cinematic, and deeply engaging. It feels more like you're watching a beautifully produced brand film rather than browsing a traditional website. This 'storytelling first' approach is incredibly effective for a creative agency, though it can occasionally make finding specific 'Work' entries slightly slower than on more traditional sites. The use of custom transitions and audio-visual elements creates a truly memorable brand experience that stays with you.",
          performance: "The site is very video-heavy, so it naturally requires a strong internet connection to shine. However, their pre-loading and streaming logic is exceptionally well-handled—the site starts feeling interactive long before the high-res assets have finished loading. We’ve seen some great uses of 'low-res' placeholders and blurred video previews to manage perceived performance during the initial load cycle.",
          value: "Great for understanding their unique brand-building and storytelling process. For a prospective client, the value is in Instrument's ability to bridge the gap between 'marketing' and 'product'. They create experiences that people actually care about. The site is a constant source of inspiration for creative teams and founders who want to build a truly emotional connection with their users.",
          trust: "A veteran agency with a clear, consistent, and highly professional voice. Their long-term partnerships with brands like Nike and Google are a massive trust signal. The site's high production value communicates that they are a team that takes their own brand as seriously as they take their clients'. They exude a level of creative and strategic authority that is very reassuring for large enterprise partners.",
        },
        first_impression: "Brand storytelling at its absolute peak. The moment you land, you are pulled into their world. It’s cinematic, high-end, and deeply emotional. It’s the gold standard for 'Creative Agency' digital presence.",
        strategic_outlook: "Instrument is leaning into the 'convergence' of film, brand, and digital product. Their strategy of being a 'creative partner' rather than just a 'vendor' has allowed them to stay relevant and dominant in an increasingly crowded market.",
        suggestions: [
          "Provide a 'Low Bandwidth' mode|The site is almost unusable on slow mobile data due to the reliance on high-bitrate video backgrounds.|High|High",
          "Improve the navigation contrast|The thin typography over moving video can be very difficult to read in certain sections.|High|Medium",
          "Add more 'behind the scenes' content|Their process is unique; showing more of the 'how' alongside the 'what' would add significant value.|Medium|Low"
        ]
      }
    ]
  }
};

async function seed() {
  console.log('🌱 Starting seeding...');

  // 0. Clean DB
  console.log('🧹 Cleaning database...');
  const { error: delReviewsError } = await supabase.from('reviews').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { error: delProductsError } = await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { error: delNotifsError } = await supabase.from('notifications').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  if (delReviewsError || delProductsError || delNotifsError) {
    console.warn('Note: Some deletions might have failed due to RLS or constraints, continuing...');
  }

  // 1. Create Users
  console.log('👤 Creating 20 users...');
  const users = [];
  for (let i = 0; i < 20; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;
    const role = faker.helpers.arrayElement(['Product Designer', 'Frontend Engineer', 'SaaS Founder', 'UX Researcher', 'Design Lead']);
    
    // Unsplash Portrait with grayscale transformation
    const avatar = `https://images.unsplash.com/photo-${faker.helpers.arrayElement([
      '1507003211169-0a1dd7228f2d', '1500648767791-00dcc994a43e', '1544005313-94ddf0286df2',
      '1438761681033-6461ffad8d80', '1472099645785-5658abf4ff4e', '1506794778202-cad84cf45f1d',
      '1534528741775-53994a69daeb', '1531746020798-e6953c6e8e04', '1527980972134-d538a5b5a56b',
      '1552058544-1e808064463b'
    ])}?auto=format&fit=crop&w=150&h=150&q=80&sat=-100`;

    users.push({
      id: faker.string.uuid(),
      name,
      avatar,
      role,
      reputation: faker.number.int({ min: 100, max: 5000 }),
      badges: faker.helpers.arrayElements(['Expert', 'Hunter', 'Critic', 'Pioneer'], { min: 1, max: 3 }),
      revvvviews_count: 0
    });
  }

  const { data: insertedUsers, error: userError } = await supabase.from('profiles').upsert(users).select();
  if (userError) {
    console.error('Error seeding users:', userError);
    return;
  }
  console.log('✅ Users seeded');

  // 2. Create Products using Microlink
  console.log('🌐 Fetching product metadata via Microlink...');
  const products = [];
  for (const url of SAAS_URLS) {
    try {
      const response = await axios.get(`https://api.microlink.io?url=${url}&screenshot=true&meta=true`);
      const { data } = response.data;

      let cleanName = data.title || url.replace('https://', '').split('.')[0];
      // Clean up title (remove everything after special characters like :, |, –, —)
      cleanName = cleanName.split(/[:|–—]/)[0].trim();
      // Cap title at 10 characters as per user request
      cleanName = cleanName.slice(0, 10).trim();

      products.push({
        name: cleanName,
        url: data.url,
        // Tagline under 60 characters without ellipsis as per user request
        tagline: (data.description || "").slice(0, 60).trim(),
        long_description: data.description,
        logo: data.logo?.url || '',
        screenshot: data.screenshot?.url || '',
        category: faker.helpers.arrayElement(['SAAS', 'DEV TOOL', 'DESIGN', 'AGENCY', 'UTILITY']),
        tags: faker.helpers.arrayElements(['Productivity', 'Workflow', 'Modern', 'Sleek'], 3),
        creator_id: faker.helpers.arrayElement(insertedUsers).id,
        revv_score: 0, // Will be calculated
        metrics_usability: faker.number.float({ min: 7, max: 10, fractionDigits: 1 }),
        metrics_performance: faker.number.float({ min: 7, max: 10, fractionDigits: 1 }),
        metrics_value: faker.number.float({ min: 7, max: 10, fractionDigits: 1 }),
        metrics_trust: faker.number.float({ min: 7, max: 10, fractionDigits: 1 }),
        active_users: faker.number.int({ min: 10, max: 100 }),
        reviews_total: 0,
        socials_twitter: url.replace('https://', '').split('.')[0],
        socials_website: url,
        awards: [
          { name: 'Product of the Day', emoji: '🏆' },
          { name: 'Best UI', emoji: '✨' }
        ],
        created_at: faker.date.between({ from: '2026-05-01T00:00:00.000Z', to: new Date() }).toISOString()
      });
      console.log(`Fetched: ${url}`);
    } catch (e) {
      console.error(`Failed to fetch metadata for ${url}:`, e);
    }
  }

  const { data: insertedProducts, error: productError } = await supabase.from('products').upsert(products).select();
  if (productError) {
    console.error('Error seeding products:', productError);
    return;
  }
  console.log('✅ Products seeded');

  // 3. Create Reviews
  console.log('📝 Creating high-fidelity reviews...');
  
  const GENERIC_FIRST_IMPRESSIONS = [
    "Honestly, the moment I landed here, the typography hit me first. It feels expensive. The hero section is incredibly striking but I found myself looking for the login button for a second too long.",
    "The first thing I noticed was the speed. No splash screen, no fluff. Just a very high-end aesthetic that immediately builds trust.",
    "Upon landing, I was struck by the focus on the product. They aren't just selling a tool; they're selling a new way to work. It feels very deliberate.",
    "Coming from more corporate tools, this felt like stepping into the future. The way the layout breathes as you scroll is a nice touch.",
    "I was immediately struck by the brand's evolution. It's moved from 'simple tool' to 'pro platform' without losing that minimalist edge.",
    "The first thing I noticed was the buttery smooth transitions. It just feels like a team that cares about the pixels and the performance.",
    "Landing here, I felt a sense of calm. The UI is so focused and deliberate. No unnecessary shadows, no clutter, just utility.",
    "I was struck by how much they've expanded. The navigation is starting to feel a bit dense, but the search saved me instantly."
  ];

  const reviews = [];
  for (const product of insertedProducts) {
    const domain = new URL(product.url).hostname.replace('www.', '');
    const productData = PRODUCT_REVIEWS[domain];
    
    // Create 3 reviews for each product to show depth
    for (let i = 0; i < 3; i++) {
      let reviewTemplate;
      let firstImpression;
      
      if (productData && productData.reviews[i]) {
        reviewTemplate = productData.reviews[i];
        firstImpression = reviewTemplate.first_impression;
      } else if (productData && productData.reviews[0]) {
        // Fallback to first review if fewer than 3 unique ones, but vary the metrics
        reviewTemplate = productData.reviews[0];
        firstImpression = faker.helpers.arrayElement(GENERIC_FIRST_IMPRESSIONS);
      } else {
        // Full fallback for products not in our hardcoded list
        reviewTemplate = PRODUCT_REVIEWS['stripe.com'].reviews[i % 3];
        firstImpression = faker.helpers.arrayElement(GENERIC_FIRST_IMPRESSIONS);
      }

      const auditor = faker.helpers.arrayElement(insertedUsers.filter(u => u.role === reviewTemplate.role) || insertedUsers);

      reviews.push({
        auditor_id: auditor.id,
        product_id: product.id,
        version: `v${faker.system.semver()}`,
        metrics_usability: Math.min(10, Math.max(0, reviewTemplate.metrics.usability + (faker.number.float({ min: -0.8, max: 0.8 })))),
        metrics_performance: Math.min(10, Math.max(0, reviewTemplate.metrics.performance + (faker.number.float({ min: -0.8, max: 0.8 })))),
        metrics_value: Math.min(10, Math.max(0, reviewTemplate.metrics.value + (faker.number.float({ min: -0.8, max: 0.8 })))),
        metrics_trust: Math.min(10, Math.max(0, reviewTemplate.metrics.trust + (faker.number.float({ min: -0.8, max: 0.8 })))),
        feedback_usability: i === 0 ? reviewTemplate.feedback.usability : faker.helpers.arrayElement([
          "The interaction design is subtle but effective, using high-quality micro-animations to guide the user without becoming a distraction. I was particularly impressed by the information hierarchy—it manages to present a massive amount of technical data without feeling cluttered. The navigation is logical and consistent across the entire platform, reducing the cognitive load significantly for new users.",
          "Information density is high, but the clear typography and consistent use of whitespace help guide the eye to the most important actions. I found the command-based navigation (Cmd+K) to be a massive productivity booster once I learned the primary shortcuts. It’s clear that the team behind this tool obsesses over the 'flow state' of their users. The only minor friction point is the depth of the settings menu for advanced configurations.",
          "The onboarding experience is remarkably smooth and goal-oriented. I was able to get our first project live and see real value within the first 5 minutes of signing up. The use of 'progressive disclosure'—hiding advanced features until they are actually needed—is handled with a level of grace that is rare in the SaaS world. It makes a complex tool feel approachable for beginners while staying powerful for experts.",
          "I found some of the custom iconography to be a bit ambiguous at first glance, but the consistent use of descriptive tooltips and clear hover states helped clarify the intent. The layout is robust and handles various screen sizes with ease, showing a real commitment to a 'mobile-aware' if not 'mobile-first' professional workflow. The overall sense of 'craft' in the UI is pervasive and builds a lot of immediate trust."
        ]),
        feedback_performance: i === 0 ? reviewTemplate.feedback.performance : faker.helpers.arrayElement([
          "Everything loads in a snap. The transitions between different modules are buttery smooth, using clever caching and optimistic UI updates to mask any latent backend processing. I monitored the network tab during a heavy data export and was impressed by how the app remained responsive throughout the process. It’s clear that performance isn't just an afterthought here; it’s a core feature of the product.",
          "I didn't notice any lag or 'jank', even when dealing with massive datasets in the primary table view. The use of virtualization for long lists is implemented perfectly, ensuring that the memory footprint remains low even during extended sessions. The initial 'Time to Interactive' is among the best in its category, which is a huge win for developer velocity and overall user satisfaction.",
          "The app feels like a native C++ application rather than a web tool. It responds to keyboard input and scroll events with zero perceived latency. I was particularly impressed by the 'offline-first' capabilities—being able to continue working during a temporary network drop without losing a single character of input is a lifesaver. The background sync is invisible and reliable.",
          "Initial load time is genuinely impressive. They've clearly optimized their bundle size and use modern techniques like component-level code splitting to ensure the user only downloads what they need. The global CDN performance means that even from our remote offices, the latency to their primary endpoints remains consistently low. It’s a very high-performance engineering culture at work."
        ]),
        feedback_value: i === 0 ? reviewTemplate.feedback.value : faker.helpers.arrayElement([
          "For a small, fast-moving team, the ROI in saved meetings, reduced documentation, and faster shipping cycles is enormous. It effectively replaces several other disconnected tools in our stack, simplifying both our billing and our technical architecture. It allows us to focus 100% of our energy on building our core product features rather than wrestling with our internal process tools.",
          "It represents a significant 'value play' by providing enterprise-grade features (like SOC2 compliance, advanced SSO, and granular permissions) at a price point that is accessible for growth-stage startups. The ability to scale from a single user to a 50-person department without hitting any technical or pricing 'walls' builds a lot of long-term confidence. It’s a tool that pays for itself within the first month.",
          "The pricing is remarkably predictable and scales linearly with our success, which is a refreshing change from the 'bait and switch' models typical of legacy enterprise software. By consolidating our analytics, auth, and storage into a single platform, we’ve managed to reduce our total infrastructure spend by nearly 30% while actually improving our developer velocity. It’s the best hire we’ve made this year.",
          "The 'peace of mind' you get from their industry-leading security posture and their near-perfect uptime record is worth the premium. In a world of brittle SaaS, this tool feels like a utility—it just works, every time. The quality of their support team and the depth of their community-driven documentation add a layer of value that isn't captured in the monthly subscription fee."
        ]),
        feedback_trust: i === 0 ? reviewTemplate.feedback.trust : faker.helpers.arrayElement([
          "Very high. Their transparency around uptime, security incidents, and their public roadmap is a benchmark for the rest of the industry. They don't just ship features; they build in public and engage with their users at a deep technical level. This creates a sense of partnership that is very rare in the SaaS world. We feel like we are part of their journey, not just a line item on a balance sheet.",
          "The community around this tool is massive, helpful, and highly technical. Being able to find an answer to any edge-case question on their Discord or GitHub within minutes builds a lot of confidence for a production-grade implementation. They have a clear track record of delivering on their promises and their commitment to 'no vendor lock-in' is a massive trust signal for our CTO.",
          "They have a very clear and consistent voice across their product, their documentation, and their marketing. It feels like a living product that is being constantly refined by a team that actually uses it themselves. Their frequent 'changelog' posts are a highlight of my week—they show a level of momentum and care that is infectious. We trust them with our most critical data because they've proven they deserve it.",
          "I've never had a security concern with them. Their infrastructure seems rock solid and they proactive communication regarding any potential vulnerabilities is exemplary. Their use of open-source standards and their willingness to contribute back to the community further solidifies their position as a trusted leader in the space. They are the 'safe choice' that also happens to be the 'innovative choice'."
        ]),
        first_impression: firstImpression,
        engaged: [faker.helpers.arrayElement(['Lightning fast navigation', 'Intuitive command palette', 'Deep documentation', 'Seamless onboarding'])],
        confused: [faker.helpers.arrayElement(['Settings labyrinth', 'Initial setup complexity', 'High learning curve'])],
        would_use: true,
        suggestions: reviewTemplate.suggestions,
        strategic_outlook: reviewTemplate.strategic_outlook,
        time_spent: faker.number.int({ min: 600, max: 3600 }),
        created_at: faker.date.between({ from: '2026-05-01T00:00:00.000Z', to: new Date() }).toISOString()
      });
    }
  }

  const { error: reviewError } = await supabase.from('reviews').insert(reviews);
  if (reviewError) {
    console.error('Error seeding reviews:', reviewError);
    return;
  }
  console.log('✅ Reviews seeded');

  // 4. Update Product Scores and Review Counts
  console.log('🔄 Updating product aggregates...');
  for (const product of insertedProducts) {
    const { data: productReviews } = await supabase.from('reviews').select('metrics_usability, metrics_performance, metrics_value, metrics_trust').eq('product_id', product.id);
    
    if (productReviews && productReviews.length > 0) {
      const avg = (key: keyof typeof productReviews[0]) => productReviews.reduce((acc, curr) => acc + (curr[key] as number), 0) / productReviews.length;
      
      const metrics_usability = avg('metrics_usability');
      const metrics_performance = avg('metrics_performance');
      const metrics_value = avg('metrics_value');
      const metrics_trust = avg('metrics_trust');
      const revv_score = (metrics_usability + metrics_performance + metrics_value + metrics_trust) / 4;

      await supabase.from('products').update({
        revv_score: Number(revv_score.toFixed(1)),
        metrics_usability: Number(metrics_usability.toFixed(1)),
        metrics_performance: Number(metrics_performance.toFixed(1)),
        metrics_value: Number(metrics_value.toFixed(1)),
        metrics_trust: Number(metrics_trust.toFixed(1)),
        reviews_total: productReviews.length
      }).eq('id', product.id);
    }
  }
  console.log('✅ Aggregates updated');

  // 5. Create Notifications
  console.log('🔔 Creating notifications...');
  const { data: allProfiles } = await supabase.from('profiles').select('id, name');
  const notifications = [];
  
  if (allProfiles) {
    for (const user of allProfiles) {
      const numNotifs = faker.number.int({ min: 2, max: 5 });
      for (let i = 0; i < numNotifs; i++) {
        const actor = faker.helpers.arrayElement(allProfiles.filter(u => u.id !== user.id) || [user]);
        const type = faker.helpers.arrayElement(['review', 'reputation', 'mention', 'system']);
        const product = faker.helpers.arrayElement(insertedProducts);
        
        let actionText = "";
        let entityId = null;

        switch (type) {
          case 'review': 
            actionText = `reviewed your latest product submission: ${product?.name}`; 
            entityId = product?.id;
            break;
          case 'reputation': actionText = `upvoted your audit on ${product?.name}`; break;
          case 'mention': actionText = `mentioned you in a deep-dive audit`; break;
          case 'system': actionText = `Your account has been upgraded to Elite Tier`; break;
        }

        notifications.push({
          user_id: user.id,
          actor_id: type === 'system' ? allProfiles[0].id : actor.id,
          type,
          action_text: actionText,
          entity_id: entityId,
          is_read: faker.datatype.boolean(0.3),
          created_at: faker.date.recent({ days: 7 }).toISOString()
        });
      }
    }

    const { error: notifError } = await supabase.from('notifications').insert(notifications);
    if (notifError) {
      console.warn('⚠️ Notifications insert failed:', notifError.message);
    } else {
      console.log('✅ Notifications seeded');
    }
  }

  console.log('🎉 Seeding complete!');
}

seed();
