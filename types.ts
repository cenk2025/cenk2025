

export interface Service {
    icon: React.ReactNode;
    title: string;
    description: string;
    caseStudyLink: string;
}

export interface CaseStudy {
    id: number;
    title: string;
    category: string;
    imageUrl: string;
    excerpt: string;
    metrics: {
        label: string;
        value: string;
    }[];
}

export interface BlogPost {
    id: number;
    title:string;
    category: 'Some' | 'Kampanjat' | 'Strategia';
    imageUrl: string;
    excerpt: string;
    publishDate: string;
    content: string;
}

export interface ProcessStep {
    step: number;
    title: string;
    description: string;
}

export enum ChatRole {
    USER = 'user',
    MODEL = 'model',
}

export interface ChatMessage {
    role: ChatRole;
    text: string;
}

export interface User {
    email: string;
}