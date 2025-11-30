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
    mediaTypes: ['IMAGE'] as ('IMAGE' | 'VIDEO')[],
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
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-12 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Portfolio Management</h1>
            <p className="text-slate-500 mt-1">Manage your showcase projects</p>
          </div>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="btn-primary-gradient font-bold shadow-lg shadow-blue-500/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Portfolio
          </Button>
        </div>

        {isFormOpen && (
          <Card className="mb-8 border-none shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
              <CardTitle className="text-slate-900">{editingId ? 'Edit Portfolio' : 'Create New Portfolio'}</CardTitle>
              <CardDescription className="text-slate-500">Fill in the details for your portfolio project</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-slate-700">Project Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="bg-white border-slate-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectUrl" className="text-slate-700">Project URL</Label>
                    <Input
                      id="projectUrl"
                      type="url"
                      value={formData.projectUrl}
                      onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                      placeholder="https://example.com"
                      className="bg-white border-slate-200 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-700">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    className="bg-white border-slate-200 focus:border-blue-500 min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="techStack" className="text-slate-700">Tech Stack</Label>
                  <Input
                    id="techStack"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    placeholder="React, Node.js, MongoDB"
                    className="bg-white border-slate-200 focus:border-blue-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, featured: checked })
                      }
                      className="data-[state=checked]:bg-blue-600"
                    />
                    <Label htmlFor="featured" className="text-slate-700 font-medium cursor-pointer">Featured Project</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="displayOrder" className="text-slate-700">Display Order</Label>
                    <Input
                      id="displayOrder"
                      type="number"
                      value={formData.displayOrder}
                      onChange={(e) =>
                        setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })
                      }
                      className="bg-white border-slate-200 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-3 border border-slate-200 rounded-xl p-6 bg-slate-50/50">
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-slate-900 font-bold">Media (Images/Videos)</Label>
                    <Button type="button" onClick={addMediaField} size="sm" variant="outline" className="bg-white text-blue-600 border-slate-200 hover:bg-blue-50">
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
                        className="border rounded-md px-3 py-2 border-slate-200 bg-white text-sm focus:border-blue-500 focus:outline-none"
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
                        className="flex-1 bg-white border-slate-200 focus:border-blue-500"
                      />
                      {formData.mediaUrls.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeMediaField(index)}
                          variant="destructive"
                          size="icon"
                          className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 shadow-none"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border border-slate-200 rounded-xl p-6 bg-slate-50/50">
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-slate-900 font-bold">Team Members (Optional)</Label>
                    <Button type="button" onClick={addTeamMember} size="sm" variant="outline" className="bg-white text-blue-600 border-slate-200 hover:bg-blue-50">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Member
                    </Button>
                  </div>
                  {formData.teamMembers.map((member, index) => (
                    <Card key={index} className="mb-3 border-slate-200 shadow-sm">
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
                            className="bg-white border-slate-200 focus:border-blue-500"
                          />
                          <Input
                            value={member.role}
                            onChange={(e) => {
                              const newMembers = [...formData.teamMembers];
                              newMembers[index].role = e.target.value;
                              setFormData({ ...formData, teamMembers: newMembers });
                            }}
                            placeholder="Role (e.g., Frontend Developer)"
                            className="bg-white border-slate-200 focus:border-blue-500"
                          />
                          <Input
                            value={member.linkedIn}
                            onChange={(e) => {
                              const newMembers = [...formData.teamMembers];
                              newMembers[index].linkedIn = e.target.value;
                              setFormData({ ...formData, teamMembers: newMembers });
                            }}
                            placeholder="LinkedIn URL"
                            className="bg-white border-slate-200 focus:border-blue-500"
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
                              className="flex-1 bg-white border-slate-200 focus:border-blue-500"
                            />
                            {formData.teamMembers.length > 1 && (
                              <Button
                                type="button"
                                onClick={() => removeTeamMember(index)}
                                variant="destructive"
                                size="icon"
                                className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 shadow-none"
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

                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <Button type="submit" disabled={loading} className="btn-primary-gradient font-bold px-8 shadow-lg shadow-blue-500/20">
                    {loading ? 'Saving...' : editingId ? 'Update Portfolio' : 'Create Portfolio'}
                  </Button>
                  <Button type="button" onClick={resetForm} variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6">
          {portfolios.map((portfolio) => (
            <Card key={portfolio.id} className="border-none shadow-sm hover:shadow-lg transition-all duration-300 bg-white group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{portfolio.title}</h3>
                      {portfolio.featured && (
                        <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded-full border border-blue-100">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 mb-4 leading-relaxed">{portfolio.description}</p>
                    {portfolio.techStack && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {portfolio.techStack.split(',').map((tech, i) => (
                          <span key={i} className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-4 items-center">
                      {portfolio.projectUrl && (
                        <a
                          href={portfolio.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 hover:underline"
                        >
                          View Project <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      {portfolio.media.length > 0 && (
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          {portfolio.media.length} Media Item(s)
                        </span>
                      )}
                    </div>

                    {portfolio.teamMembers.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Team</p>
                        <div className="flex flex-wrap gap-2">
                          {portfolio.teamMembers.map((member, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 bg-slate-50 text-slate-700 text-xs px-3 py-1.5 rounded-full border border-slate-100"
                            >
                              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[10px]">
                                {member.name.charAt(0)}
                              </span>
                              <span className="font-medium">{member.name}</span>
                              {member.role && <span className="text-slate-400 border-l border-slate-200 pl-2 ml-1">{member.role}</span>}
                            </div>
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
                      className="border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(portfolio.id)}
                      size="sm"
                      variant="destructive"
                      className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 shadow-none"
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
          <Card className="border-dashed border-2 border-slate-200 bg-slate-50/50">
            <CardContent className="py-16 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">No portfolios yet</h3>
              <p className="text-slate-500 mb-6">Create your first portfolio item to showcase your work</p>
              <Button onClick={() => setIsFormOpen(true)} className="btn-primary-gradient font-bold shadow-lg shadow-blue-500/20">
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
