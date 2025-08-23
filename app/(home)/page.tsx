import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  Github,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import LatestVersion from "@/components/LatestVersion";
import AnimatedFeatureList from "@/components/AnimatedFeatureList";

export default function HomePage() {
  return (
    <main className="container md:mx-auto max-w-6xl md:px-4 py-12 md:py-20 ">
      <section className="-mt-20 border border-fd-border border-b-0 grid-background-small p-12 px-12 relative">
        <div className="absolute bottom-0 right-0 p-2 py-1 hover:text-fd-primary">
          <LatestVersion />
        </div>
      </section>
      <section className="text-left border border-fd-border border-b-0 p-6 bg-fd-background backdrop-blur-sm bg-opacity-50">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-fd-foreground sm:text-5xl">
          Task Genius
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-fd-muted-foreground">
          A comprehensive plugin for Task Management in Obsidian.
        </p>
        <div className="mb-10 flex">
          <Link
            href="/docs/getting-started"
            className="inline-flex items-center justify-center text-sm font-medium ring-offset-fd-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring disabled:pointer-events-none disabled:opacity-50 text-fd-primary border border-fd-border shadow-fd-background/20 h-11 px-6"
          >
            Full Documentation <ArrowRightIcon className="ml-2 size-4" />
          </Link>
        </div>
      </section>

      <section className="border border-fd-border border-t-0 border-b-0 md:border-b  p-6 px-12  bg-fd-background backdrop-blur-sm bg-opacity-50">
        {/* Assume image is in public/media */}
        <Image
          src="/media/task-genius-preview.png"
          alt="Task Genius Feature Showcase"
          width={1920}
          height={1080}
          className="rounded-lg p-0 scale-110"
          priority
        />
      </section>

      <section className="absolute inset-0 -z-10 border-t border-b border-fd-border grid-background  max-h-1/2 top-1/3 border-b md:block hidden"></section>
      <section className="border border-fd-border border-t-0 border-b-0 p-0 md:p-6 px-12 zimbra-background"></section>
      <section className="border border-fd-border border-b-0 md:border-b pt-12 pb-12 px-6 md:px-12 relative">
        <div className="border-r border-b border-fd-border text-sm text-fd-muted-foreground absolute top-0 left-0 px-2 py-2 bg-fd-background backdrop-blur-sm">
          <span className="text-fd-primary font-sans font-bold">01</span>{" "}
          Features
        </div>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
          {[
            "Visual Task Progress Bars",
            "Advanced Task Statuses & Cycling",
            "Date & Priority Management",
            "In-Editor Task Filtering",
            "Task Mover for Archiving",
            "Quick Capture Panel & Commands",
            "Customizable Workflows",
            "Dedicated Cross-Vault Task View",
            "Extensive Customization Options",
            "Rewards for Completing Tasks",
          ].map((feature) => (
            <li key={feature} className="flex items-center text-sm md:pl-20">
              <CheckCircleIcon className="mr-2 size-5 flex-shrink-0 text-fd-primary" />
              <span className="text-fd-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="border border-fd-border border-t-0 border-b-0 p-0 md:p-6 px-12 zimbra-background"></section>
      <section className="border border-fd-border border-b-0 md:border-b pt-8 px-6 md:px-12 pb-6 relative">
        <div className="border-r border-b border-fd-border text-sm text-fd-muted-foreground absolute top-0 left-0 px-2 py-2 bg-fd-background backdrop-blur-sm">
          <span className="text-fd-primary font-sans font-bold">02</span>{" "}
          Installation
        </div>
        <Tabs
          items={["Community", "Manual"]}
          className="rounded-none bg-transparent"
        >
          <Tab value="Community" className="rounded-none bg-transparent">
            <div className="prose prose-fd max-w-none text-fd-foreground text-sm">
              <ol>
                <li>
                  Open <strong>Settings</strong> -&gt;{" "}
                  <strong>Community</strong>.
                </li>
                <li>
                  Make sure <strong>Restricted mode</strong> is{" "}
                  <strong>off</strong>.
                </li>
                <li>
                  Click <strong>Browse</strong> community plugins.
                </li>
                <li>
                  Search for <strong>&quot;Task Genius&quot;</strong>.
                </li>
                <li>
                  Click <strong>Install</strong>.
                </li>
                <li>
                  Once installed, <strong>Enable</strong> the plugin.
                </li>
              </ol>
            </div>
          </Tab>
          <Tab value="Manual" className="rounded-none bg-transparent">
            <div className="prose prose-fd max-w-none bg-transparent text-fd-foreground text-sm [&_code]:p-1">
              <ol>
                <li>
                  Download the latest release (<strong>main.js</strong>,{" "}
                  <strong>manifest.json</strong>, <strong>styles.css</strong>)
                  from the{" "}
                  <Link
                    href="https://github.com/Quorafind/Obsidian-Task-Genius/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fd-primary hover:underline"
                  >
                    Releases page
                  </Link>
                  .
                </li>
                <li>
                  Navigate to your Obsidian vault&apos;s plugins folder:
                  <strong>YourVault/.obsidian/plugins/</strong>.
                </li>
                <li>
                  Create a new folder named <strong>task-genius</strong>.
                </li>
                <li>
                  Copy the downloaded <strong>main.js</strong>,{" "}
                  <strong>manifest.json</strong>, and{" "}
                  <strong>styles.css</strong> files into the{" "}
                  <strong>task-genius</strong> folder.
                </li>
                <li>Reload Obsidian (or disable and re-enable the plugin).</li>
                <li>
                  Enable the plugin in <strong>Settings</strong> -&gt;{" "}
                  <strong>Community plugins</strong>.
                </li>
              </ol>
            </div>
          </Tab>
        </Tabs>
      </section>
      <section className="border border-fd-border border-t-0 border-b-0 p-0 md:p-6 px-12 zimbra-background"></section>
      <section className="border border-fd-border border-b-0 md:border-b pt-12 px-6 md:px-12 pb-6 relative">
        <div className="border-r border-b border-fd-border text-sm text-fd-muted-foreground absolute top-0 left-0 px-2 py-2 bg-fd-background backdrop-blur-sm">
          <span className="text-fd-primary font-sans font-bold">03</span>{" "}
          Support
        </div>
        <div className="prose prose-fd max-w-none">
          If you like the plugin, please consider leaving a review on the{" "}
          <Link
            href="https://github.com/Quorafind/Obsidian-Task-Genius/issues"
            className="text-fd-primary hover:underline"
          >
            GitHub issues
          </Link>
          .
        </div>
      </section>
      <section className="border border-fd-border border-t-0 border-b-0 p-0 md:p-6 px-12 zimbra-background"></section>
      <section className="border border-fd-border border-b-0 md:border-b pt-12 px-6 md:px-12 pb-6 relative">
        <div className="border-r border-b border-fd-border text-sm text-fd-muted-foreground absolute top-0 left-0 px-2 py-2 bg-fd-background backdrop-blur-sm">
          <span className="text-fd-primary font-sans font-bold">04</span>{" "}
          Community
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:max-w-xl mx-auto">
          <Link
            href="https://discord.gg/ARR2rHHX6b"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-4 border border-fd-border hover:bg-fd-muted/50 transition-colors group"
          >
            <MessageCircle className="mr-3 size-5 text-fd-primary group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="font-medium text-fd-foreground">Discord</div>
            </div>
          </Link>

          <Link
            href="https://github.com/Quorafind/Obsidian-Task-Genius/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center p-4 border border-fd-border hover:bg-fd-muted/50 transition-colors group"
          >
            <Github className="mr-3 size-5 text-fd-primary group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="font-medium text-fd-foreground">
                GitHub Discussions
              </div>
            </div>
          </Link>
        </div>
      </section>
      <section className="border border-fd-border border-t-0 border-b-0 p-0 md:p-6 px-12 zimbra-background"></section>
      <section className="border border-fd-border -mb-20 pt-12 px-6 md:px-12 pb-6 relative text-right">
        <div className="border-r border-b border-fd-border text-sm text-fd-muted-foreground absolute top-0 left-0 px-2 py-2 bg-fd-background backdrop-blur-sm">
          <span className="text-fd-primary font-sans font-bold">05</span>{" "}
          Copyright
        </div>
        <div className="prose prose-fd max-w-none">
          <Link
            href="https://boninall.com"
            className="text-fd-muted-foreground hover:text-fd-primary no-underline"
          >
            © {new Date().getFullYear()} Boninall(Quorafind)
          </Link>{" "}
        </div>
      </section>
    </main>
  );
}
