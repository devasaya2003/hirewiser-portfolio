import { 
  FaGithub, FaLinkedin, FaBehance, FaDribbble, 
  FaPinterest, FaTelegramPlane, FaYoutube, FaGlobe, FaExternalLinkAlt 
} from "react-icons/fa";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

export const BLUR_FADE_DELAY = 0.04;

// Icon mapping function for links
export const getLinkIcon = (linkTitle?: string) => {
  if (!linkTitle) return <FaExternalLinkAlt className="size-3" />;
  
  const title = linkTitle.toLowerCase();
  if (title.includes('github')) return <FaGithub className="size-3" />;
  if (title.includes('linkedin')) return <FaLinkedin className="size-3" />;
  if (title.includes('instagram')) return <FaInstagram className="size-3" />;
  if (title.includes('twitter') || title.includes('x')) return <FaXTwitter className="size-3" />;
  if (title.includes('behance')) return <FaBehance className="size-3" />;
  if (title.includes('dribbble')) return <FaDribbble className="size-3" />;
  if (title.includes('pinterest')) return <FaPinterest className="size-3" />;
  if (title.includes('telegram')) return <FaTelegramPlane className="size-3" />;
  if (title.includes('youtube')) return <FaYoutube className="size-3" />;
  if (title.includes('website') || title.includes('web')) return <FaGlobe className="size-3" />;
  
  return <FaExternalLinkAlt className="size-3" />;
};

export const portfolioQuotes = [
  "Your portfolio is your professional story - make it compelling.",
  "Great portfolios don't just show work, they show thinking.",
  "A portfolio without context is just a gallery.",
  "Every project in your portfolio should solve a problem.",
  "Quality over quantity - curate, don't just collect.",
  "Your portfolio is your first impression and your lasting legacy.",
  "Design is not just what it looks like - design is how it works.",
  "A portfolio is a conversation starter, not a conversation ender.",
  "Show the journey, not just the destination.",
  "The best portfolios tell stories that resonate with real people."
];