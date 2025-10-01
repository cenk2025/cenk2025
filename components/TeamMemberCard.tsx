import React from 'react';
import { motion } from 'framer-motion';

const LinkedInIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" fill="currentColor"/></svg>;
const TwitterIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085a4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" fill="currentColor"/></svg>;

const TeamMemberCard = ({ member }) => {
    return (
        <div className="group relative bg-light-card dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-gray-800 text-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="relative mb-4">
                <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-200 dark:border-gray-700" />
                <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-teal"><LinkedInIcon /></a>
                        <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-teal"><TwitterIcon /></a>
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-brand-teal font-semibold mb-3">{member.title}</p>
            <p className="text-sm text-light-text/70 dark:text-gray-400">{member.bio}</p>
        </div>
    );
};

export default TeamMemberCard;