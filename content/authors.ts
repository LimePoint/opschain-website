export interface Author {
  name: string
  email: string
  role: string
  bio: string
  avatarUrl: string
  links?: {
    linkedin?: string
    github?: string
    website?: string
  }
}

const authors: Record<string, Author> = {
  'Goran Stankovski': {
    name: 'Goran Stankovski',
    email: 'goran@limepoint.com',
    role: 'Founder & CEO, LimePoint',
    bio: 'Goran is the founder of LimePoint and the creator of OpsChain. He is passionate about helping enterprises automate and govern their operations at scale.',
    avatarUrl:
      'https://gravatar.com/avatar/77522f96705dd177f0e5159abf68f45471e52361f1749fa1c1132ab40f78e9b1?size=256&d=mp',
    links: {
      linkedin: 'https://www.linkedin.com/in/goranstankovski/',
      github: 'https://github.com/gstankovski',
    },
  },
}

export default authors
