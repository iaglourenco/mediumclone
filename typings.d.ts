export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  slug: {
    current: string;
  };
  body: [object];
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  comments: Comment[];
  author: {
    name: string;
    image: string;
    slug: {
      current: string;
    };
  };
}

export interface Comment {
  _id: string;
  _createdAt: string;
  comment: string;
  name: string;
  email: string;
}
