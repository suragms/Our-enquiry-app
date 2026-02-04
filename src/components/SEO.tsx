import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
    ogType?: string;
    noindex?: boolean;
    schema?: object; // Add schema support
}

export default function SEO({ title, description, keywords, ogImage, ogType = 'website', noindex = false, schema }: SEOProps) {
    useEffect(() => {
        // Update title
        document.title = title;

        // Update Schema.org (JSON-LD)
        if (schema) {
            let script = document.querySelector('script[type="application/ld+json"]');
            if (!script) {
                script = document.createElement('script');
                script.setAttribute('type', 'application/ld+json');
                document.head.appendChild(script);
            }
            script.innerHTML = JSON.stringify(schema);
        }

        // Update robots
        let metaRobots = document.querySelector('meta[name="robots"]');
        if (noindex) {
            if (!metaRobots) {
                metaRobots = document.createElement('meta');
                metaRobots.setAttribute('name', 'robots');
                document.head.appendChild(metaRobots);
            }
            metaRobots.setAttribute('content', 'noindex, nofollow');
        } else if (metaRobots) {
            metaRobots.setAttribute('content', 'index, follow');
        }

        // Update description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        } else {
            const descriptionElement = document.createElement('meta');
            descriptionElement.name = 'description';
            descriptionElement.content = description;
            document.head.appendChild(descriptionElement);
        }

        // Update keywords
        if (keywords) {
            const metaKeywords = document.querySelector('meta[name="keywords"]');
            if (metaKeywords) {
                metaKeywords.setAttribute('content', keywords);
            } else {
                const keywordsElement = document.createElement('meta');
                keywordsElement.name = 'keywords';
                keywordsElement.content = keywords;
                document.head.appendChild(keywordsElement);
            }
        }

        // Update OG tags
        const updateOgTag = (property: string, content: string) => {
            const tag = document.querySelector(`meta[property="${property}"]`);
            if (tag) {
                tag.setAttribute('content', content);
            } else {
                const element = document.createElement('meta');
                element.setAttribute('property', property);
                element.content = content;
                document.head.appendChild(element);
            }
        };

        updateOgTag('og:title', title);
        updateOgTag('og:description', description);
        updateOgTag('og:type', ogType);
        if (ogImage) {
            updateOgTag('og:image', ogImage);
        }

    }, [title, description, keywords, ogImage, ogType]);

    return null;
}
