import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { TrainingTemplate } from "@/components/training/TrainingTemplate";
import { AUDIENCES, getAudience } from "@/data/training";

/**
 * /training/students, /job-switchers, /business-owners, /housewives.
 *
 * Prerendered, then regenerated hourly: the next batch dates are computed
 * from the start rule at render time, so a page built in late September
 * would otherwise keep advertising an October batch into November.
 */
export const revalidate = 3600;

export function generateStaticParams() {
  return AUDIENCES.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const audience = getAudience(slug);
  if (!audience) return {};
  return pageMeta({ path: audience.path, title: audience.title, description: audience.description });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const audience = getAudience(slug);
  if (!audience) notFound();
  return <TrainingTemplate audience={audience} />;
}
