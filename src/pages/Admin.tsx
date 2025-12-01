import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  ExternalLink,
  Mail,
  Trash,
  Smartphone,
  LayoutDashboard,
  Upload,
  AlertCircle
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

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  requirement: string;
  isRead: boolean;
  isStarred: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [companySettings, setCompanySettings] = useState<CompanySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('inbox');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

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
      navigate('/admin/login');
      return;
    }

    setUser(JSON.parse(userData));
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, feedbacksRes, usersRes, settingsRes, messagesRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/feedback?includeAll=true'),
        fetch('/api/users'),
        fetch('/api/settings'),
        fetch('/api/contact')
      ]);

      const projectsData = await projectsRes.json();
      const feedbacksData = await feedbacksRes.json();
      const usersData = await usersRes.json();
      const settingsData = await settingsRes.json();
      const messagesData = await messagesRes.json();

      setProjects(projectsData);
      setFeedbacks(feedbacksData);
      setUsers(usersData);
      setCompanySettings(settingsData);
      setMessages(messagesData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
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

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchData();
      } else {
        alert('Failed to delete project');
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('Failed to delete project');
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

  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessages(messages.filter(m => m.id !== messageId));
        if (selectedMessage?.id === messageId) setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await fetch(`/api/contact/${messageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      });
      setMessages(messages.map(m => m.id === messageId ? { ...m, isRead: true } : m));
    } catch (error) {
      console.error('Failed to mark message as read:', error);
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex w-full">
        {/* Sidebar */}
        <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border hidden md:flex flex-col fixed h-full z-10">
          <div className="p-6 border-b flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-sidebar-foreground">Admin Panel</h1>
          </div>

          <div className="p-4 flex-1 overflow-y-auto">
            <div className="flex items-center gap-3 p-3 bg-sidebar-accent rounded-lg mb-6">
              <div className="w-10 h-10 rounded-full bg-sidebar-primary/20 flex items-center justify-center text-sidebar-primary-foreground font-bold">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
                <p className="text-xs text-sidebar-foreground/70 truncate">{user?.email}</p>
              </div>
            </div>

            <TabsList className="flex flex-col h-auto bg-transparent space-y-1 p-0 w-full">
              <TabsTrigger
                value="inbox"
                className="w-full justify-start px-4 py-3 h-auto text-sidebar-foreground/70 data-[state=active]:bg-sidebar-accent data-[state=active]:text-sidebar-foreground data-[state=active]:shadow-none rounded-md transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              >
                <Mail className="w-4 h-4 mr-3" />
                Inbox
                {messages.filter(m => !m.isRead).length > 0 && (
                  <Badge className="ml-auto bg-blue-600 hover:bg-blue-700">{messages.filter(m => !m.isRead).length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="w-full justify-start px-4 py-3 h-auto text-sidebar-foreground/70 data-[state=active]:bg-sidebar-accent data-[state=active]:text-sidebar-foreground data-[state=active]:shadow-none rounded-md transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              >
                <Briefcase className="w-4 h-4 mr-3" /> Projects
              </TabsTrigger>
              <TabsTrigger
                value="portfolio"
                className="w-full justify-start px-4 py-3 h-auto text-sidebar-foreground/70 data-[state=active]:bg-sidebar-accent data-[state=active]:text-sidebar-foreground data-[state=active]:shadow-none rounded-md transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              >
                <ExternalLink className="w-4 h-4 mr-3" /> Portfolio
              </TabsTrigger>
              <TabsTrigger
                value="feedbacks"
                className="w-full justify-start px-4 py-3 h-auto text-sidebar-foreground/70 data-[state=active]:bg-sidebar-accent data-[state=active]:text-sidebar-foreground data-[state=active]:shadow-none rounded-md transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              >
                <MessageSquare className="w-4 h-4 mr-3" /> Feedbacks
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="w-full justify-start px-4 py-3 h-auto text-sidebar-foreground/70 data-[state=active]:bg-sidebar-accent data-[state=active]:text-sidebar-foreground data-[state=active]:shadow-none rounded-md transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              >
                <Users className="w-4 h-4 mr-3" /> Team
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="w-full justify-start px-4 py-3 h-auto text-sidebar-foreground/70 data-[state=active]:bg-sidebar-accent data-[state=active]:text-sidebar-foreground data-[state=active]:shadow-none rounded-md transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              >
                <Settings className="w-4 h-4 mr-3" /> Settings
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-4 border-t border-sidebar-border bg-sidebar">
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-8 overflow-y-auto h-screen bg-background/50">
          {/* Mobile Header */}
          <div className="md:hidden mb-6 flex justify-between items-center bg-card p-4 rounded-lg shadow-sm">
            <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
          </div>

          {/* Stats Grid - Always visible at top */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-none shadow-sm bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium mb-1">Total Projects</p>
                    <p className="text-3xl font-bold">{projects.length}</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium mb-1">Total Feedbacks</p>
                    <p className="text-3xl font-bold">{feedbacks.length}</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium mb-1">Pending Approval</p>
                    <p className="text-3xl font-bold">{feedbacks.filter(f => !f.isApproved).length}</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium mb-1">Team Members</p>
                    <p className="text-3xl font-bold">{users.length}</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <TabsContent value="inbox" className="space-y-6 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
              <div className="md:col-span-1 bg-card rounded-lg border shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b bg-muted/50">
                  <h3 className="font-semibold text-foreground">Messages</h3>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {messages.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      No messages
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        onClick={() => {
                          setSelectedMessage(message);
                          if (!message.isRead) handleMarkAsRead(message.id);
                        }}
                        className={`p-4 border-b cursor-pointer hover:bg-accent transition-colors ${selectedMessage?.id === message.id ? 'bg-accent' : ''
                          } ${!message.isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`font-medium truncate ${!message.isRead ? 'text-blue-600 dark:text-blue-400' : 'text-foreground'}`}>
                            {message.name}
                          </h4>
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                            {new Date(message.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{message.requirement}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="md:col-span-2 bg-card rounded-lg border shadow-sm overflow-hidden flex flex-col">
                {selectedMessage ? (
                  <>
                    <div className="p-6 border-b flex justify-between items-start bg-muted/50">
                      <div>
                        <h2 className="text-xl font-bold text-foreground mb-1">Contact Inquiry</h2>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{selectedMessage.name}</span>
                          <span>&lt;{selectedMessage.email}&gt;</span>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteMessage(selectedMessage.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                    <div className="p-6 flex-1 overflow-y-auto">
                      <div className="prose dark:prose-invert max-w-none">
                        <p className="whitespace-pre-wrap text-foreground">{selectedMessage.requirement}</p>
                      </div>
                    </div>
                    <div className="p-4 border-t bg-muted/50 flex justify-end">
                      <Button variant="outline" onClick={() => window.location.href = `mailto:${selectedMessage.email}`}>
                        <Mail className="w-4 h-4 mr-2" />
                        Reply via Email
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
                    <Mail className="w-12 h-12 mb-4 opacity-20" />
                    <p>Select a message to view details</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="projects" className="space-y-6 mt-0">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Projects</h2>
              <Button onClick={() => {
                setEditingProject(null);
                setProjectForm({ name: '', overview: '', techStack: '', status: 'IN_PROGRESS', media: [] });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>
                <Plus className="w-4 h-4 mr-2" /> Add Project
              </Button>
            </div>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</CardTitle>
                <CardDescription>Fill in the details to {editingProject ? 'update' : 'create'} a project</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitProject} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Project Name</label>
                        <Input
                          value={projectForm.name}
                          onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                          placeholder="e.g., E-commerce Platform"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Tech Stack</label>
                        <Input
                          value={projectForm.techStack}
                          onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                          placeholder="e.g., React, Node.js, MongoDB"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Status</label>
                        <select
                          value={projectForm.status}
                          onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value as 'IN_PROGRESS' | 'COMPLETED' })}
                          className="w-full p-2 border border-border rounded-md bg-background"
                        >
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="COMPLETED">Completed</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">Overview</label>
                      <Textarea
                        value={projectForm.overview}
                        onChange={(e) => setProjectForm({ ...projectForm, overview: e.target.value })}
                        placeholder="Project description..."
                        className="h-[200px]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-medium text-muted-foreground">Media (Images/Videos)</label>
                      <Button type="button" variant="outline" size="sm" onClick={handleAddMediaField}>
                        <Plus className="w-4 h-4 mr-2" /> Add Media URL
                      </Button>
                    </div>
                    {projectForm.media.map((media, index) => (
                      <div key={index} className="flex gap-4 items-start p-4 border rounded-lg bg-muted/30">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <select
                              value={media.type}
                              onChange={(e) => handleMediaChange(index, 'type', e.target.value)}
                              className="w-full p-2 border border-border rounded-md bg-background"
                            >
                              <option value="IMAGE">Image</option>
                              <option value="VIDEO">Video</option>
                            </select>
                          </div>
                          <div className="flex gap-2">
                            <Input
                              value={media.url}
                              onChange={(e) => handleMediaChange(index, 'url', e.target.value)}
                              placeholder="Media URL"
                              className="flex-1"
                            />
                            <div className="relative">
                              <input
                                type="file"
                                id={`file-${index}`}
                                className="hidden"
                                accept="image/*,video/*"
                                onChange={(e) => handleUploadMediaFile(index, e.target.files)}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => document.getElementById(`file-${index}`)?.click()}
                                disabled={media.uploading}
                              >
                                {media.uploading ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                ) : (
                                  <Upload className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive/90"
                          onClick={() => handleRemoveMediaField(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-4">
                    {editingProject && (
                      <Button type="button" variant="outline" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    )}
                    <Button type="submit" size="lg">
                      {editingProject ? 'Update Project' : 'Create Project'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                  <div className="relative h-48 bg-muted">
                    {project.media && project.media.length > 0 ? (
                      project.media[0].type === 'VIDEO' ? (
                        <video
                          src={project.media[0].url}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={project.media[0].url}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Briefcase className="w-12 h-12 opacity-20" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 bg-white/90 hover:bg-white"
                        onClick={() => handleEditProject(project)}
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 bg-white/90 hover:bg-white"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <Badge variant={project.status === 'COMPLETED' ? 'default' : 'secondary'} className="shadow-sm">
                        {project.status === 'COMPLETED' ? 'Completed' : 'In Progress'}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{project.name}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{project.overview}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack?.split(',').map((tech, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tech.trim()}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6 mt-0">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Portfolio Management</h2>
            </div>
            <Card className="border-none shadow-sm bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Portfolio Management
                    </h3>
                    <p className="text-green-100 mb-4">
                      Showcase your best projects with images, videos, and team details
                    </p>
                    <div className="flex gap-4">
                      <Button
                        onClick={() => navigate('/admin/portfolio')}
                        className="bg-white text-green-600 hover:bg-green-50"
                        size="lg"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Manage Portfolio
                      </Button>
                      <Button
                        onClick={() => window.open('/portfolio', '_blank')}
                        variant="outline"
                        className="border-green-400 text-white hover:bg-green-50"
                        size="lg"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Public Page
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                    <Briefcase className="w-12 h-12 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedbacks" className="space-y-6 mt-0">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Client Feedbacks</h2>
            </div>

            <div className="grid gap-4">
              {feedbacks.map((feedback) => (
                <Card key={feedback.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{feedback.name}</h3>
                          {feedback.company && (
                            <Badge variant="outline">{feedback.company}</Badge>
                          )}
                          <div className="flex gap-1">
                            {renderStars(feedback.rating)}
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-2">{feedback.content}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
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

          <TabsContent value="users" className="space-y-6 mt-0">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Team Members</h2>
            </div>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Add New User</CardTitle>
                <CardDescription>Create a new user account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
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
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
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
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
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
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Role
                      </label>
                      <select
                        value={userForm.role}
                        onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                        className="w-full p-2 border border-border rounded-md"
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
                <Card key={user.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{user.name}</h3>
                        <p className="text-muted-foreground">{user.email}</p>
                      </div>
                      <Badge variant="outline">{user.role}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 mt-0">
            <h2 className="text-2xl font-bold text-foreground">Company Settings</h2>

            <Card className="border-none shadow-sm">
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
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Company Name</label>
                        <Input value={companySettings.companyName || ''} onChange={(e) => setCompanySettings({ ...companySettings, companyName: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Primary Email</label>
                        <Input type="email" value={companySettings.primaryEmail || ''} onChange={(e) => setCompanySettings({ ...companySettings, primaryEmail: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Primary WhatsApp</label>
                        <Input value={companySettings.primaryWhatsApp || ''} onChange={(e) => setCompanySettings({ ...companySettings, primaryWhatsApp: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Secondary WhatsApp</label>
                        <Input value={companySettings.secondaryWhatsApp || ''} onChange={(e) => setCompanySettings({ ...companySettings, secondaryWhatsApp: e.target.value })} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Lead 1: {companySettings.leadName1}</label>
                        <Input value={companySettings.leadWhatsApp1 || ''} onChange={(e) => setCompanySettings({ ...companySettings, leadWhatsApp1: e.target.value })} placeholder="WhatsApp" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">Lead 2: {companySettings.leadName2}</label>
                        <Input value={companySettings.leadWhatsApp2 || ''} onChange={(e) => setCompanySettings({ ...companySettings, leadWhatsApp2: e.target.value })} placeholder="WhatsApp" />
                      </div>
                    </div>
                    <Button type="submit" size="lg">Save Settings</Button>
                  </form>
                ) : (
                  <p className="text-muted-foreground">Loading settings...</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </main>
      </Tabs>
    </div>
  );
}