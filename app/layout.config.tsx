import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";
import { CalendarCheck, Gift, Heart, Layout, Server } from "lucide-react";
import { Book, ComponentIcon, Pencil } from "lucide-react";

export const linkItems: LinkItemType[] = [
  {
    type: "icon",
    url: "https://github.com/Quorafind/obsidian-task-genius",
    text: "Github",
    icon: (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    external: true,
  },
  {
    text: "Sponsors",
    url: "/sponsors",
    icon: <Heart />,
  },
];

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.331 7.93279C15.2313 6.8069 13.695 6.10773 11.9951 6.10773C8.65147 6.10773 5.94092 8.81264 5.94092 12.1493C5.94092 14.815 7.67093 17.0775 10.0716 17.8796C10.196 17.9212 10.3222 17.9588 10.45 17.9924M18.0259 12.6843C17.8033 15.216 16.016 17.2997 13.6348 17.9667"
            stroke="currentColor"
            strokeWidth="0.667678"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.40963 13.1184L11.4491 17.2246C11.6993 17.3197 11.8831 17.3247 12.1501 17.258C12.4172 17.1912 22.399 6.97572 22.399 6.97572C22.5392 6.64347 22.5013 6.43731 22.2655 6.04097C21.8936 5.61573 21.6568 5.4963 21.1972 5.44006C20.953 5.4862 20.8398 5.69441 20.4961 6.00759L16.1228 10.3475L11.8497 14.6206L8.74498 11.6495C8.37776 11.5827 8.22474 11.6566 7.97715 11.8498L7.44301 12.3171C7.20094 12.8037 7.27609 12.9181 7.40963 13.1184Z"
            fill="white"
            stroke="currentColor"
            strokeWidth="0.667678"
          />
          <path
            d="M20.2959 4.739C20.342 4.62123 20.3702 4.64684 20.3293 4.50531L18.4932 2.8695C18.2894 2.70021 18.0999 2.67359 17.9256 2.83612C17.7514 2.99864 16.5569 4.07132 16.5569 4.07132L16.3566 4.20486C15.4886 3.67071 14.9545 3.47041 14.0531 3.27011L13.8528 2.20182L13.7193 1.36722C13.5777 1.15491 13.4712 1.08145 13.2519 1H10.8149C10.5425 1.04462 10.4209 1.16993 10.3141 1.30046L9.94689 3.30349C9.00829 3.52115 8.51945 3.77222 7.71017 4.20486L6.10774 2.8695C5.87888 2.74691 5.75552 2.7622 5.54021 2.8695L3.63733 4.63885C3.43476 4.84409 3.4886 5.08038 3.53718 5.23976L4.17147 6.14112L4.739 6.90895C3.95251 8.19178 3.71159 8.79098 3.43703 10.3141L2.40212 10.5478L1.43399 10.7815C1.17759 10.8886 1.0671 10.9675 1 11.1821V13.953C1.10704 14.2047 1.1944 14.304 1.43399 14.3536L3.30349 14.5539C3.69681 15.6803 4.03143 16.2495 4.67223 17.2246L3.60395 18.827C3.4709 19.0616 3.46386 19.1998 3.60395 19.4613L5.60698 21.2307C5.79668 21.3061 5.94411 21.3177 6.17451 21.2307L7.67678 19.8953C8.49119 20.3691 8.99599 20.5658 9.98027 20.7967L10.2807 22.6995C10.347 22.9646 10.467 23.0274 10.7147 23.1002H13.2519C13.5198 23.0011 13.633 22.8227 13.7527 22.6328L14.0531 20.7633C15.0107 20.5068 15.4665 20.3477 16.3566 19.8619L17.9256 21.2307C18.1212 21.3412 18.2308 21.3204 18.4264 21.2307L20.4294 19.3612C20.5446 19.199 20.579 19.0897 20.4628 18.8604L19.2944 17.1912C20.0027 16.2196 20.3714 15.6916 20.7633 14.5539L22.4992 14.2868C22.7801 14.2189 22.9212 14.0814 23 13.8528V11.1487C22.9038 10.9115 22.8115 10.8384 22.5994 10.7815L20.7633 10.4476C20.6673 10.3268 20.7299 10.4143 20.6631 10.2473"
            stroke="currentColor"
            strokeWidth="0.667678"
            strokeLinecap="round"
          />
        </svg>
        Task Genius
      </>
    ),
  },
  links: [
    {
      type: "menu",
      text: "Documentation",
      url: "/docs",
      items: [
        {
          icon: <Book />,
          text: "Getting Started",
          description: "Learn to use Task Genius.",
          url: "/docs/getting-started",
          menu: {
            className: "lg:col-start-1",
          },
        },
        {
          icon: <ComponentIcon />,
          text: "Progress Bars",
          description: "See customisable progress bars.",
          url: "/docs/progress-bars",
          menu: {
            className: "lg:col-start-2",
          },
        },
        {
          icon: <Server />,
          text: "Task View",
          description: "View your tasks via Task Genius.",
          url: "/docs/task-view",
          menu: {
            className: "lg:col-start-1 lg:col-span-1",
          },
        },
        {
          icon: <CalendarCheck />,
          text: "Habit",
          description: "Learn to use Habit.",
          url: "/docs/habit",
          menu: {
            className: "lg:col-start-3 lg:row-start-1",
          },
        },
        {
          icon: <Layout />,
          text: "Statuses",
          description: "See the available statues.",
          url: "/docs/task-status",
          menu: {
            className: "lg:col-start-2",
          },
        },
        {
          icon: <Gift />,
          text: "Reward",
          description: "Learn to use reward system of Task Genius.",
          url: "/docs/reward",
          menu: {
            className: "lg:col-start-3",
          },
        },
      ],
    },
    ...linkItems,
  ],
};
