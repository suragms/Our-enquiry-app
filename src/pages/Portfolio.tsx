import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Linkedin, User } from 'lucide-react';

interface TeamMember {
    id: string;
    name: string;
    role?: string;
    linkedIn?: string;
    profileUrl?: string;
}

interface Media {
    id: string;
    type: 'IMAGE' | 'VIDEO';
    url: string;
}

interface Portfolio {
    id: string;
    title: string;
    description: string;
    techStack?: string;
    projectUrl?: string;
    featured: boolean;
    media: Media[];
    teamMembers: TeamMember[];
}

export default function PortfolioShowcasePage() {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'featured'>('all');

    useEffect(() => {
        fetchPortfolios();
    }, [filter]);

    const fetchPortfolios = async () => {
        try {
            setLoading(true);
            const url = filter === 'featured' ? '/api/portfolio?featured=true' : '/api/portfolio';
            const res = await fetch(url);
            const data = await res.json();
            setPortfolios(data.portfolios || []);
        } catch (error) {
            console.error('Failed to fetch portfolios:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-8">
                    <h1 className="text-5xl font-bold mb-4">Our Portfolio</h1>
                    <p className="text-xl text-green-50">
                        Showcasing our best work and innovative solutions
                    </p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="max-w-7xl mx-auto px-8 py-8">
                <div className="flex gap-4 mb-8">
                    <Button
                        onClick={() => setFilter('all')}
                        variant={filter === 'all' ? 'default' : 'outline'}
                        className={filter === 'all' ? 'bg-green-600 hover:bg-green-700' : 'border-green-300 hover:bg-green-50'}
                    >
                        All Projects
                    </Button>
                    <Button
                        onClick={() => setFilter('featured')}
                        variant={filter === 'featured' ? 'default' : 'outline'}
                        className={filter === 'featured' ? 'bg-green-600 hover:bg-green-700' : 'border-green-300 hover:bg-green-50'}
                    >
                        Featured
                    </Button>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                        <p className="mt-4 text-gray-600">Loading portfolios...</p>
                    </div>
                )}

                {/* Portfolio Grid */}
                {!loading && portfolios.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {portfolios.map((portfolio) => (
                            <Card
                                key={portfolio.id}
                                className="overflow-hidden border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Media Section */}
                                {portfolio.media.length > 0 && (
                                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                                        {portfolio.media[0].type === 'IMAGE' ? (
                                            <img
                                                src={portfolio.media[0].url}
                                                alt={portfolio.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <video
                                                src={portfolio.media[0].url}
                                                className="w-full h-full object-cover"
                                                controls
                                            />
                                        )}
                                        {portfolio.featured && (
                                            <div className="absolute top-3 right-3">
                                                <Badge className="bg-green-600 text-white">Featured</Badge>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <CardContent className="p-6">
                                    {/* Title & Description */}
                                    <h3 className="text-2xl font-bold text-green-800 mb-3">{portfolio.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{portfolio.description}</p>

                                    {/* Tech Stack */}
                                    {portfolio.techStack && (
                                        <div className="mb-4">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">Tech Stack:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {portfolio.techStack.split(',').map((tech, idx) => (
                                                    <Badge
                                                        key={idx}
                                                        variant="outline"
                                                        className="border-green-300 text-green-700"
                                                    >
                                                        {tech.trim()}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Team Members */}
                                    {portfolio.teamMembers.length > 0 && (
                                        <div className="mb-4">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">Team:</p>
                                            <div className="space-y-2">
                                                {portfolio.teamMembers.map((member) => (
                                                    <div
                                                        key={member.id}
                                                        className="flex items-center justify-between bg-green-50 p-2 rounded"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <User className="w-4 h-4 text-green-600" />
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-800">{member.name}</p>
                                                                {member.role && (
                                                                    <p className="text-xs text-gray-500">{member.role}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-1">
                                                            {member.linkedIn && (
                                                                <a
                                                                    href={member.linkedIn}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 hover:text-blue-700"
                                                                >
                                                                    <Linkedin className="w-4 h-4" />
                                                                </a>
                                                            )}
                                                            {member.profileUrl && (
                                                                <a
                                                                    href={member.profileUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-green-600 hover:text-green-700"
                                                                >
                                                                    <ExternalLink className="w-4 h-4" />
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Project Link */}
                                    {portfolio.projectUrl && (
                                        <a
                                            href={portfolio.projectUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                                        >
                                            View Project <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}

                                    {/* Additional Media */}
                                    {portfolio.media.length > 1 && (
                                        <div className="mt-4 pt-4 border-t border-green-100">
                                            <p className="text-xs text-gray-500">
                                                +{portfolio.media.length - 1} more media
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && portfolios.length === 0 && (
                    <Card className="border-dashed border-2 border-green-200">
                        <CardContent className="py-16 text-center">
                            <div className="text-gray-400 mb-4">
                                <svg
                                    className="mx-auto h-24 w-24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Projects Yet</h3>
                            <p className="text-gray-500">
                                {filter === 'featured'
                                    ? 'No featured projects available at the moment.'
                                    : 'Check back soon for our latest projects!'}
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
