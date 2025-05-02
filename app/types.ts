export interface RawUser {
    id: number;
    name: string;
    title: string;
    article: string;
    avatarImageLink: string;
    stories: Story[];
  }
  
  export interface Story {
    id: number;
    src: string;
    alt: string;
  }

  export interface User extends RawUser {
    completedStories: number;
  }
