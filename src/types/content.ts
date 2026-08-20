export interface PageFrontmatter {
  title: string;
  description?: string;
  links?: Record<string, string>;
  tags?: string;
  image?: string;
  lastModified?: string | Date;
}

export interface Heading {
  level: number;
  text: string;
  id: string;
}

export interface ExternalLink {
  id: string;
  text: string;
}
