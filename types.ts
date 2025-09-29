
// Fix: Import `ReactNode` to provide the correct type for React components, resolving the "Cannot find namespace 'JSX'" error.
import type { ReactNode } from 'react';

export interface Service {
    icon: ReactNode;
    title: string;
    description: string;
    caseStudyLink: string;
}

export interface Testimonial {
    quote: string;
    author: string;
    role: string;
    avatarUrl: string;
    kpi: {
        value: number;
        label: string;
        suffix: string;
    };
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
