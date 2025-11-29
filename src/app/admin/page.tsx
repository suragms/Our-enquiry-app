'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut,
  Eye,
  EyeOff,
  Check,
  X,
  Briefcase,
  ExternalLink
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface CompanySettings {
  id: string;
  companyName: string;
  primaryEmail: string;
  primaryWhatsApp: string;
  secondaryWhatsApp: string | null;
  leadName1: string;
  leadEmail1: string;
  leadWhatsApp1: string;
  leadName2: string;
  leadWhatsApp2: string;
  address: string | null;
  tagline: string | null;
  description: string | null;
}

interface Project {
  id: string;
  name: string;
  overview: string;
  techStack: string;
  status: string;
  createdAt: string;
  media: {
    id: string;
    type: 'IMAGE' | 'VIDEO';
    url: string;
  }[];
  feedbacks: any[];
}

interface ProjectMediaInput {
  type: 'IMAGE' | 'VIDEO';
  url: string;
  uploading?: boolean;
}

interface ProjectForm {
  name: string;
  overview: string;
  techStack: string;
  status: string;
  media: ProjectMediaInput[];
}

interface Feedback {
  id: string;
  name: string;
  company: string;
  content: string;
  rating: number;
  isPublic: boolean;
  isApproved: boolean;
  linkToken: string;
  createdAt: string;
  project: {
    name: string;
  };
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [companySettings, setCompanySettings] = useState<CompanySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form states
  const [projectForm, setProjectForm] = useState<ProjectForm>({
    name: '',
    overview: '',
    techStack: '',
    status: 'IN_PROGRESS',
    media: [],
  });

  const [userForm, setUserForm] = useState({
    email: '',
    name: '',
    password: '',
    role: 'STAFF'
  });

  const isMediaUploading = projectForm.media.some((media) => media.uploading);
  const isEditingProject = Boolean(editingProject);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      window.location.href = '/admin/login';
      return;
    }

    setUser(JSON.parse(userData));
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, feedbacksRes, usersRes, settingsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/feedback?includeAll=true'),
        fetch('/api/users'),
        fetch('/api/settings')
      ]);

      const projectsData = await projectsRes.json();
      const feedbacksData = await feedbacksRes.json();
      const usersData = await usersRes.json();
      const settingsData = await settingsRes.json();

      setProjects(projectsData);
      setFeedbacks(feedbacksData);
      setUsers(usersData);
      setCompanySettings(settingsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/admin/login';
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isEditing = Boolean(editingProject);
      const endpoint = isEditing ? `/api/projects/${editingProject?.id}` : '/api/projects';
      const method = isEditing ? 'PATCH' : 'POST';

      const payload: any = {
        name: projectForm.name,
        overview: projectForm.overview,
        techStack: projectForm.techStack,
        status: projectForm.status,
        media: projectForm.media
          .filter((item) => item.url.trim())
          .map((item) => ({
            type: item.type,
            url: item.url.trim(),
          })),
      };

      if (!isEditing) {
        payload.createdById = user?.id;
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save project');
      }

      setProjectForm({ name: '', overview: '', techStack: '', status: 'IN_PROGRESS', media: [] });
      setEditingProject(null);
      fetchData();
    } catch (error) {
      console.error('Failed to save project:', error);
      alert('Failed to save project. Please try again.');
    }
  };

  const handleAddMediaField = () => {
    setProjectForm((prev) => ({
      ...prev,
      media: [...prev.media, { type: 'IMAGE', url: '' }],
    }));
  };

  const handleMediaChange = (index: number, field: keyof ProjectMediaInput, value: string) => {
    setProjectForm((prev) => ({
      ...prev,
      media: prev.media.map((media, i) =>
        i === index
          ? {
              ...media,
              [field]: field === 'type' ? (value === 'VIDEO' ? 'VIDEO' : 'IMAGE') : value,
            }
          : media
      ),
    }));
  };

  const handleRemoveMediaField = (index: number) => {
    setProjectForm((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index),
    }));
  };

  const handleUploadMediaFile = async (index: number, files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const mediaType = file.type.startsWith('video') ? 'VIDEO' : 'IMAGE';

    setProjectForm((prev) => ({
      ...prev,
      media: prev.media.map((media, i) =>
        i === index ? { ...media, uploading: true, type: mediaType } : media
      ),
    }));

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();

      setProjectForm((prev) => ({
        ...prev,
        media: prev.media.map((media, i) =>
          i === index ? { ...media, url: data.url, uploading: false } : media
        ),
      }));
    } catch (error) {
      console.error('Failed to upload media:', error);
      alert('Failed to upload media. Please try again.');
      setProjectForm((prev) => ({
        ...prev,
        media: prev.media.map((media, i) =>
          i === index ? { ...media, uploading: false } : media
        ),
      }));
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      name: project.name,
      overview: project.overview,
      techStack: project.techStack || '',
      status: project.status,
      media: project.media?.map((item) => ({
        type: item.type,
        url: item.url,
      })) || [],
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setProjectForm({ name: '', overview: '', techStack: '', status: 'IN_PROGRESS', media: [] });
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userForm),
      });

      if (response.ok) {
        setUserForm({ email: '', name: '', password: '', role: 'STAFF' });
        fetchData();
      }
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const handleApproveFeedback = async (feedbackId: string, isApproved: boolean) => {
    try {
      const response = await fetch(`/api/feedback/manage/${feedbackId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isApproved }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Failed to update feedback:', error);
    }
  };

  const handleTogglePublicFeedback = async (feedbackId: string, isPublic: boolean) => {
    try {
      const response = await fetch(`/api/feedback/manage/${feedbackId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPublic }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Failed to update feedback:', error);
    }
  };

  const handleDeleteFeedback = async (feedbackId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this feedback? This action cannot be undone.');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/feedback/manage/${feedbackId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchData();
      } else {
        alert('Failed to delete feedback. Please try again.');
      }
    } catch (error) {
      console.error('Failed to delete feedback:', error);
      alert('Failed to delete feedback. Please try again.');
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.name}
              </span>
              <Badge variant="outline">{user?.role}</Badge>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Feedbacks</p>
                  <p className="text-2xl font-bold text-gray-900">{feedbacks.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {feedbacks.filter(f => !f.isApproved).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Team Members</p>
                  <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="feedbacks">Feedbacks</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-green-100 rounded-full">
                    <Briefcase className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-800 mb-2">
                      Portfolio Management
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Showcase your best projects with images, videos, and team details
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => window.location.href = '/admin/portfolio'}
                      className="bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Manage Portfolio
                    </Button>
                    <Button
                      onClick={() => window.open('/portfolio', '_blank')}
                      variant="outline"
                      className="border-green-300 hover:bg-green-50"
                      size="lg"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Public Page
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            <div className="grid gap-6">
              {/* Add Project Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Add New Project</CardTitle>
                  <CardDescription>Create a new project for your portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  {editingProject && (
                    <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-900">
                          Editing project: {editingProject.name}
                        </p>
                        <p className="text-xs text-blue-700">Save your changes or cancel to create a new project.</p>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={handleCancelEdit}>
                        Cancel Edit
                      </Button>
                    </div>
                  )}
                  <form onSubmit={handleSubmitProject} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Name
                        </label>
                        <Input
                          value={projectForm.name}
                          onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                          placeholder="Project name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <select
                          value={projectForm.status}
                          onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="COMPLETED">Completed</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Overview
                      </label>
                      <Textarea
                        value={projectForm.overview}
                        onChange={(e) => setProjectForm({ ...projectForm, overview: e.target.value })}
                        placeholder="Project overview"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tech Stack
                      </label>
                      <Input
                        value={projectForm.techStack}
                        onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Project Media (optional)</p>
                          <p className="text-xs text-gray-500">
                            Add image or video links to showcase the project.
                          </p>
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={handleAddMediaField}>
                          <Plus className="w-4 h-4 mr-1" />
                          Add Media
                        </Button>
                      </div>
                      {projectForm.media.length === 0 && (
                        <p className="text-sm text-gray-500">No media added yet.</p>
                      )}
                      {projectForm.media.map((media, index) => (
                        <div key={index} className="border rounded-md p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Media Type
                              </label>
                              <select
                                value={media.type}
                                onChange={(e) => handleMediaChange(index, 'type', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                              >
                                <option value="IMAGE">Image</option>
                                <option value="VIDEO">Video</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Media URL (optional)
                              </label>
                              <Input
                                value={media.url}
                                onChange={(e) => handleMediaChange(index, 'url', e.target.value)}
                                placeholder="https://example.com/media.jpg"
                                type="text"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Upload File
                            </label>
                            <Input
                              type="file"
                              accept="image/*,video/*"
                              onChange={(e) => handleUploadMediaFile(index, e.target.files)}
                              disabled={media.uploading}
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              Uploading a file will automatically fill the media URL field.
                            </p>
                            {media.uploading && (
                              <p className="text-xs text-blue-600 mt-1">Uploading file...</p>
                            )}
                          </div>
                          <div className="flex justify-end">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                              onClick={() => handleRemoveMediaField(index)}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button type="submit" disabled={isMediaUploading}>
                      {isMediaUploading
                        ? 'Uploading media...'
                        : isEditingProject
                          ? 'Save Changes'
                          : 'Create Project'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Projects List */}
              <div className="grid gap-4">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                            <Badge variant={project.status === 'DELIVERED' ? 'default' : 'secondary'}>
                              {project.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-2">{project.overview}</p>
                          {project.techStack && (
                            <p className="text-sm text-gray-500">Tech: {project.techStack}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditProject(project)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Feedbacks Tab */}
          <TabsContent value="feedbacks" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Client Feedbacks</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Feedback Link
              </Button>
            </div>

            <div className="grid gap-4">
              {feedbacks.map((feedback) => (
                <Card key={feedback.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{feedback.name}</h3>
                          {feedback.company && (
                            <Badge variant="outline">{feedback.company}</Badge>
                          )}
                          <div className="flex gap-1">
                            {renderStars(feedback.rating)}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{feedback.content}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Project: {feedback.project.name}</span>
                          <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <Button
                            variant={feedback.isApproved ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleApproveFeedback(feedback.id, !feedback.isApproved)}
                          >
                            {feedback.isApproved ? (
                              <><Check className="w-4 h-4 mr-1" /> Approved</>
                            ) : (
                              <><X className="w-4 h-4 mr-1" /> Approve</>
                            )}
                          </Button>
                          <Button
                            variant={feedback.isPublic ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleTogglePublicFeedback(feedback.id, !feedback.isPublic)}
                          >
                            {feedback.isPublic ? (
                              <><Eye className="w-4 h-4 mr-1" /> Public</>
                            ) : (
                              <><EyeOff className="w-4 h-4 mr-1" /> Private</>
                            )}
                          </Button>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteFeedback(feedback.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Add New User</CardTitle>
                <CardDescription>Create a new user account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <Input
                        value={userForm.name}
                        onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={userForm.email}
                        onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <Input
                        type="password"
                        value={userForm.password}
                        onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <select
                        value={userForm.role}
                        onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="STAFF">Staff</option>
                        <option value="ADMIN">Admin</option>
                        <option value="SUPER_ADMIN">Super Admin</option>
                      </select>
                    </div>
                  </div>
                  <Button type="submit">Create User</Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {users.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-gray-600">{user.email}</p>
                      </div>
                      <Badge variant="outline">{user.role}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Company Settings</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Manage company details and contact information</CardDescription>
              </CardHeader>
              <CardContent>
                {companySettings ? (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      try {
                        const response = await fetch('/api/settings', {
                          method: 'PATCH',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(companySettings),
                        });
                        if (response.ok) {
                          alert('Settings updated successfully!');
                          fetchData();
                        }
                      } catch (error) {
                        console.error('Failed to update settings:', error);
                        alert('Failed to update settings');
                      }
                    }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                        <Input value={companySettings.companyName || ''} onChange={(e) => setCompanySettings({ ...companySettings, companyName: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Primary Email</label>
                        <Input type="email" value={companySettings.primaryEmail || ''} onChange={(e) => setCompanySettings({ ...companySettings, primaryEmail: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Primary WhatsApp</label>
                        <Input value={companySettings.primaryWhatsApp || ''} onChange={(e) => setCompanySettings({ ...companySettings, primaryWhatsApp: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Secondary WhatsApp</label>
                        <Input value={companySettings.secondaryWhatsApp || ''} onChange={(e) => setCompanySettings({ ...companySettings, secondaryWhatsApp: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Lead 1: {companySettings.leadName1}</label>
                        <Input value={companySettings.leadWhatsApp1 || ''} onChange={(e) => setCompanySettings({ ...companySettings, leadWhatsApp1: e.target.value })} placeholder="WhatsApp" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Lead 2: {companySettings.leadName2}</label>
                        <Input value={companySettings.leadWhatsApp2 || ''} onChange={(e) => setCompanySettings({ ...companySettings, leadWhatsApp2: e.target.value })} placeholder="WhatsApp" />
                      </div>
                    </div>
                    <Button type="submit" size="lg">Save Settings</Button>
                  </form>
                ) : (
                  <p className="text-gray-600">Loading settings...</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}