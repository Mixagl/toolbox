import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://toolbox-wheat-psi.vercel.app";

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/tools/color-converter`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/char-counter`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/password-generator`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/json-formatter`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ];

  return [...staticRoutes];
}
