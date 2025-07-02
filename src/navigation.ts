import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    // {
    //   text: 'About',
    //   href: getPermalink('/about'),
    // },
    {
      text: 'Action Program',
      href: getPermalink('/action_program'),
    },
    {
      text: 'Blueprint',
      href: getPermalink('/blueprint'),
    },
    // {
    //   text: 'Products',
    //   href: getPermalink('/digital_products'),
    // },
    // {
    //   text: 'Programs',
    //   links: [
    //     { text: 'Breakthrough 👊 Blueprint', href: getPermalink('/blueprint') },
    //     { text: 'Breakthrough 🤜 Sprint', href: getPermalink('/sprint') },
    //     { text: 'Momentum🎢 Club', href: getPermalink('/momentum_club') },
    //   ],
    // },
    // {
    //   text: 'Resources',
    //   href: getPermalink('/resources'),
    // },
    {
      text: 'Journal',
      href: getBlogPermalink(),
    },
    {
      text: 'Start',
      href: getPermalink('/start'),
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Programs',
      links: [
        { text: 'Call for Action Program', href: getPermalink('/action_program') },
        { text: 'Breakthrough 👊 Blueprint', href: getPermalink('/blueprint') },
        // { text: 'Breakthrough 🤜 Sprint', href: getPermalink('/sprint') },
        // { text: 'Momentum🎢 Club', href: getPermalink('/momentum_club') },
        // { text: 'Digital Products', href: getPermalink('/digital_products') },
      ],
    },
    {
      title: 'Information',
      links: [
        {
          text: 'Journal',
          href: getBlogPermalink(),
        },
        {
          text: 'About',
          href: getPermalink('/about'),
        },
        {
          text: 'Mission and Values',
          href: getPermalink('/mission'),
        },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
    { text: 'Disclaimer', href: getPermalink('/disclaimer') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/CompleteJake' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/completionistacademy/' },
    {
      ariaLabel: 'Facebook',
      icon: 'tabler:brand-facebook',
      href: 'https://www.facebook.com/profile.php?id=61562284494087',
    },
    {
      ariaLabel: 'LinkedIn',
      icon: 'tabler:brand-linkedin',
      href: 'https://www.linkedin.com/in/jake-dakich-327523319/',
    },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    Made by <a class="text-blue-600 underline dark:text-muted" href="https://dakic.com/"> Dakic OnLine LLC</a> &copy; 2024 · All rights reserved.
  `,
};
