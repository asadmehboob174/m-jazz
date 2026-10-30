import type { MetadataRoute } from "next";
import { catHref, departments, deptHref } from "@/lib/catalog";
import { company, products, projects } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/", "/shop", "/services", "/projects", "/contact",
    ...departments.flatMap((d) => [deptHref(d), ...d.categories.map((c) => catHref(d, c))]),
    ...products.map((p) => `/product/${p.slug}`),
    ...projects.map((p) => `/projects/${p.slug}`),
  ];
  return paths.map((p) => ({ url: company.site + p }));
}
