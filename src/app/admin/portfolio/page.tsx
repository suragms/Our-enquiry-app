'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Edit2, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeamMember {
  name: string;
  role?: string;
  linkedIn?: string;
  profileUrl?: string;
}

interface Media {
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
  displayOrder: number;
  media: Media[];
  teamMembers: TeamMember[];
}

export default function PortfolioManagementPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    projectUrl: '',
    featured: false,
    displayOrder: 0,
    mediaUrls: [''],
    mediaTypes: ['IMAGE' as const],
    teamMembers: [{ name: '', role: '', linkedIn: '', profileUrl: '' }],
  });

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const res = await fetch('/api/portfolio');
      const data = await res.json();
      setPortfolios(data.portfolios || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch portfolios',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const media = formData.mediaUrls
        .filter((url) => url.trim())
        .map((url, index) => ({
          type: formData.mediaTypes[index] || 'IMAGE',
          url: url.trim(),
        }));

      const teamMembers = formData.teamMembers.filter((member) => member.name.trim());

      const payload = {
        title: formData.title,
        description: formData.description,
        techStack: formData.techStack || null,
        projectUrl: formData.projectUrl || null,
        featured: formData.featured,
        displayOrder: formData.displayOrder,
        media,
        teamMembers,
      };

      const url = editingId ? `/api/portfolio/${editingId}` : '/api/portfolio';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast({
          title: 'Success',
          description: editingId ? 'Portfolio updated successfully' : 'Portfolio created successfully',
        });
        resetForm();
        fetchPortfolios();
      } else {
        throw new Error('Failed to save portfolio');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save portfolio',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (portfolio: Portfolio) => {
    setEditingId(portfolio.id);
    setFormData({
      title: portfolio.title,
      description: portfolio.description,
      techStack: portfolio.techStack || '',
      projectUrl: portfolio.projectUrl || '',
      featured: portfolio.featured,
      displayOrder: portfolio.displayOrder,
      mediaUrls: portfolio.media.length ? portfolio.media.map((m) => m.url) : [''],
      mediaTypes: portfolio.media.length ? portfolio.media.map((m) => m.type) : ['IMAGE'],
      teamMembers: portfolio.teamMembers.length
        ? portfolio.teamMembers.map((tm) => ({
            name: tm.name,
            role: tm.role || '',
            linkedIn: tm.linkedIn || '',
            profileUrl: tm.profileUrl || '',
          }))
        : [{ name: '', role: '', linkedIn: '', profileUrl: '' }],
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio?')) return;

    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast({ title: 'Success', description: 'Portfolio deleted successfully' });
        fetchPortfolios();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete portfolio',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      techStack: '',
      projectUrl: '',
      featured: false,
      displayOrder: 0,
      mediaUrls: [''],
      mediaTypes: ['IMAGE'],
      teamMembers: [{ name: '', role: '', linkedIn: '', profileUrl: '' }],
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const addMediaField = () => {
    setFormData({
      ...formData,
      mediaUrls: [...formData.mediaUrls, ''],
      mediaTypes: [...formData.mediaTypes, 'IMAGE'],
    });
  };

  const removeMediaField = (index: number) => {
    setFormData({
      ...formData,
      mediaUrls: formData.mediaUrls.filter((_, i) => i !== index),
      mediaTypes: formData.mediaTypes.filter((_, i) => i !== index),
    });
  };

  const addTeamMember = () => {
    setFormData({
      ...formData,
      teamMembers: [...formData.teamMembers, { name: '', role: '', linkedIn: '', profileUrl: '' }],
    });
  };

  const removeTeamMember = (index: number) => {
    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-800">Portfolio Management</h1>
            <p className="text-gray-600 mt-2">Manage your showcase projects</p>
          </div>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Portfolio
          </Button>
        </div>

        {isFormOpen && (
          <Card className="mb-8 border-green-200">
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Portfolio' : 'Create New Portfolio'}</CardTitle>
              <CardDescription>Fill in the details for your portfolio project</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="border-green-200 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectUrl">Project URL</Label>
                    <Input
                      id="projectUrl"
                      type="url"
                      value={formData.projectUrl}
                      onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                      placeholder="https://example.com"
                      className="border-green-200 focus:border-green-500"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    className="border-green-200 focus:border-green-500"
                  />
                </div>

                <div>
                  <Label htmlFor="techStack">Tech Stack</Label>
                  <Input
                    id="techStack"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    placeholder="React, Node.js, MongoDB"
                    className="border-green-200 focus:border-green-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, featured: checked })
                      }
                    />
                    <Label htmlFor="featured">Featured Project</Label>
                  </div>
                  <div>
                    <Label htmlFor="displayOrder">Display Order</Label>
                    <Input
                      id="displayOrder"
                      type="number"
                      value={formData.displayOrder}
                      onChange={(e) =>
                        setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })
                      }
                      className="border-green-200 focus:border-green-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Media (Images/Videos)</Label>
                    <Button type="button" onClick={addMediaField} size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Media
                    </Button>
                  </div>
                  {formData.mediaUrls.map((url, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <select
                        value={formData.mediaTypes[index]}
                        onChange={(e) => {
                          const newTypes = [...formData.mediaTypes];
                          newTypes[index] = e.target.value as 'IMAGE' | 'VIDEO';
                          setFormData({ ...formData, mediaTypes: newTypes });
                        }}
                        className="border rounded px-3 py-2 border-green-200"
                      >
                        <option value="IMAGE">Image</option>
                        <option value="VIDEO">Video</option>
                      </select>
                      <Input
                        value={url}
                        onChange={(e) => {
                          const newUrls = [...formData.mediaUrls];
                          newUrls[index] = e.target.value;
                          setFormData({ ...formData, mediaUrls: newUrls });
                        }}
                        placeholder="Enter media URL"
                        className="flex-1 border-green-200 focus:border-green-500"
                      />
                      {formData.mediaUrls.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeMediaField(index)}
                          variant="destructive"
                          size="icon"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Team Members (Optional)</Label>
                    <Button type="button" onClick={addTeamMember} size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Member
                    </Button>
                  </div>
                  {formData.teamMembers.map((member, index) => (
                    <Card key={index} className="mb-3 border-green-100">
                      <CardContent className="pt-4">
                        <div className="grid md:grid-cols-2 gap-3">
                          <Input
                            value={member.name}
                            onChange={(e) => {
                              const newMembers = [...formData.teamMembers];
                              newMembers[index].name = e.target.value;
                              setFormData({ ...formData, teamMembers: newMembers });
                            }}
                            placeholder="Member Name"
                            className="border-green-200 focus:border-green-500"
                          />
                          <Input
                            value={member.role}
                            onChange={(e) => {
                              const newMembers = [...formData.teamMembers];
                              newMembers[index].role = e.target.value;
                              setFormData({ ...formData, teamMembers: newMembers });
                            }}
                            placeholder="Role (e.g., Frontend Developer)"
                            className="border-green-200 focus:border-green-500"
                          />
                          <Input
                            value={member.linkedIn}
                            onChange={(e) => {
                              const newMembers = [...formData.teamMembers];
                              newMembers[index].linkedIn = e.target.value;
                              setFormData({ ...formData, teamMembers: newMembers });
                            }}
                            placeholder="LinkedIn URL"
                            className="border-green-200 focus:border-green-500"
                          />
                          <div className="flex gap-2">
                            <Input
                              value={member.profileUrl}
                              onChange={(e) => {
                                const newMembers = [...formData.teamMembers];
                                newMembers[index].profileUrl = e.target.value;
                                setFormData({ ...formData, teamMembers: newMembers });
                              }}
                              placeholder="Profile URL"
                              className="flex-1 border-green-200 focus:border-green-500"
                            />
                            {formData.teamMembers.length > 1 && (
                              <Button
                                type="button"
                                onClick={() => removeTeamMember(index)}
                                variant="destructive"
                                size="icon"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
                    {loading ? 'Saving...' : editingId ? 'Update Portfolio' : 'Create Portfolio'}
                  </Button>
                  <Button type="button" onClick={resetForm} variant="outline">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6">
          {portfolios.map((portfolio) => (
            <Card key={portfolio.id} className="border-green-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-green-800">{portfolio.title}</h3>
                      {portfolio.featured && (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{portfolio.description}</p>
                    {portfolio.techStack && (
                      <p className="text-sm text-gray-500 mb-2">
                        <strong>Tech:</strong> {portfolio.techStack}
                      </p>
                    )}
                    {portfolio.projectUrl && (
                      <a
                        href={portfolio.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 text-sm flex items-center gap-1"
                      >
                        View Project <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {portfolio.media.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                          Media: {portfolio.media.length} item(s)
                        </p>
                      </div>
                    )}
                    {portfolio.teamMembers.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-semibold text-gray-700 mb-1">Team Members:</p>
                        <div className="flex flex-wrap gap-2">
                          {portfolio.teamMembers.map((member, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                            >
                              {member.name} {member.role && `- ${member.role}`}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(portfolio)}
                      size="sm"
                      variant="outline"
                      className="border-green-300 hover:bg-green-50"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(portfolio.id)}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {portfolios.length === 0 && !isFormOpen && (
          <Card className="border-dashed border-2 border-green-200">
            <CardContent className="py-12 text-center">
              <p className="text-gray-500 mb-4">No portfolios yet. Create your first one!</p>
              <Button onClick={() => setIsFormOpen(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Portfolio
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
