import { Dock, DockIcon } from "@/components/magicui/dock";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { 
  FaInstagram, FaLinkedin, FaGithub, FaBehance, FaDribbble, 
  FaPinterest, FaTelegramPlane, FaYoutube 
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HomeIcon } from "lucide-react";

const platformIcons: Record<string, any> = {
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  github: FaGithub,
  x: FaXTwitter,
  behance: FaBehance,
  dribbble: FaDribbble,
  pinterest: FaPinterest,
  telegram: FaTelegramPlane,
  youtube: FaYoutube,
};

interface NavbarProps {
  portfolioData?: any;
}

export default function Navbar({ portfolioData = DATA }: NavbarProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
        {/* Always show Home icon */}
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12"
                )}
              >
                <HomeIcon className="size-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
        
        {/* Show any additional navbar items from portfolio data */}
        {portfolioData.navbar && portfolioData.navbar.length > 0 && portfolioData.navbar.map((item: any) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12"
                  )}
                >
                  <item.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full" />
        {Object.entries(portfolioData.contact.social || {})
          .filter(([_, social]: [string, any]) => social?.navbar && social?.url)
          .map(([name, social]: [string, any]) => {
            const IconComponent = platformIcons[name.toLowerCase()];
            if (!IconComponent) return null;
            
            return (
              <DockIcon key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={social.url}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-12"
                      )}
                    >
                      <IconComponent className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{social.name || name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            );
          })}
        <Separator orientation="vertical" className="h-full py-2" />
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <AnimatedThemeToggler className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-12"
              )} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}
