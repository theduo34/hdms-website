import type {MetadataRoute} from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.hdm.edu.gh";
    const lastModified = new Date();

    return [
        {url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1.0},
        {url: `${baseUrl}/about-us`, lastModified, changeFrequency: "monthly", priority: 0.9},
        {url: `${baseUrl}/programmes`, lastModified, changeFrequency: "monthly", priority: 0.8},
        {url: `${baseUrl}/admissions/apply`, lastModified, changeFrequency: "weekly", priority: 0.9},
        {url: `${baseUrl}/admissions/tuition`, lastModified, changeFrequency: "monthly", priority: 0.7},
        {url: `${baseUrl}/admissions/visit-campus`, lastModified, changeFrequency: "monthly", priority: 0.7},
        {url: `${baseUrl}/news-&-announcements`, lastModified, changeFrequency: "daily", priority: 0.8},
        {url: `${baseUrl}/events`, lastModified, changeFrequency: "weekly", priority: 0.7},
        {url: `${baseUrl}/gallery`, lastModified, changeFrequency: "weekly", priority: 0.7},
        {url: `${baseUrl}/calender`, lastModified, changeFrequency: "weekly", priority: 0.6},
        {url: `${baseUrl}/campus-life/school-day`, lastModified, changeFrequency: "monthly", priority: 0.7},
        {url: `${baseUrl}/campus-life/sports-and-clubs`, lastModified, changeFrequency: "monthly", priority: 0.7},
        {url: `${baseUrl}/campus-life/facilities`, lastModified, changeFrequency: "monthly", priority: 0.6},
        {url: `${baseUrl}/campus-life/wellbeing`, lastModified, changeFrequency: "monthly", priority: 0.6},
        {url: `${baseUrl}/community/house-system`, lastModified, changeFrequency: "monthly", priority: 0.7},
        {url: `${baseUrl}/community/parents`, lastModified, changeFrequency: "monthly", priority: 0.7},
        {url: `${baseUrl}/community/service`, lastModified, changeFrequency: "monthly", priority: 0.6},
        {url: `${baseUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.6},
        {url: `${baseUrl}/careers`, lastModified, changeFrequency: "monthly", priority: 0.5},
        {url: `${baseUrl}/privacy-policy`, lastModified, changeFrequency: "yearly", priority: 0.3},
        {url: `${baseUrl}/terms-of-service`, lastModified, changeFrequency: "yearly", priority: 0.3},
    ];
}