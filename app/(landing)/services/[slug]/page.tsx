"use client";

import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { getContentBySlug } from "@/content/index";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { useLenisScroll } from "@/components/landing/motion";
import Link from "next/link";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const content = getContentBySlug(slug);
  
  if (!content) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-cream overflow-x-hidden">
      <Navbar />
      <main>
        <article className="px-6 lg:px-10 pt-40 pb-16">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 text-ink/60 hover:text-ink transition-colors mb-8"
            >
              <ArrowRight className="size-4 rotate-180" />
              Back to Services
            </Link>

            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-hot-pink prose-a:no-underline hover:prose-a:underline prose-strong:text-ink prose-ul:list-disc prose-ul:pl-6 prose-li:text-ink/80">
              <h1 className="font-display font-extrabold text-4xl md:text-5xl text-ink leading-[0.95]">
                {content.metadata.title_tag || content.slug}
              </h1>
              
              {content.metadata.meta_description && (
                <p className="text-xl text-ink/65 mt-4">
                  {content.metadata.meta_description}
                </p>
              )}

              <div className="mt-8">
                <ReactMarkdown 
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-display font-bold mt-12 mb-4 text-ink">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-display font-bold mt-10 mb-4 text-ink">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-display font-bold mt-8 mb-3 text-ink">{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-ink/80 leading-relaxed mb-4">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-6 space-y-2 mb-4">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-6 space-y-2 mb-4">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-ink/80">{children}</li>
                    ),
                    a: ({ href, children }) => (
                      <a href={href} className="text-hot-pink underline underline-offset-2 hover:opacity-80 transition-opacity">
                        {children}
                      </a>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-hot-pink pl-4 italic my-4">
                        {children}
                      </blockquote>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto my-6">
                        <table className="min-w-full border border-ink/10">
                          {children}
                        </table>
                      </div>
                    ),
                    th: ({ children }) => (
                      <th className="border border-ink/10 px-4 py-2 text-left bg-ink/5 font-semibold">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-ink/10 px-4 py-2">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {content.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}