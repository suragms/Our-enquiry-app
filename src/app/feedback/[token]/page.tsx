'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star, Upload, CheckCircle, AlertCircle } from 'lucide-react';

export default function FeedbackPage() {
  const params = useParams();
  const [feedbackData, setFeedbackData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    content: '',
    rating: 5
  });

  useEffect(() => {
    if (params.token) {
      fetchFeedbackData();
    }
  }, [params.token]);

  const fetchFeedbackData = async () => {
    try {
      const response = await fetch(`/api/feedback/${params.token}`);
      if (response.ok) {
        const data = await response.json();
        setFeedbackData(data);
      } else {
        setFeedbackData(null);
      }
    } catch (error) {
      console.error('Failed to fetch feedback data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/feedback/${params.token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-6 h-6 cursor-pointer transition-colors ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
        onClick={() => interactive && setFormData({ ...formData, rating: i + 1 })}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading feedback form...</p>
        </div>
      </div>
    );
  }

  if (!feedbackData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Invalid Feedback Link</h2>
            <p className="text-gray-600">This feedback link is not valid or has expired.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-4">Your feedback has been submitted successfully.</p>
            <p className="text-sm text-gray-500">We appreciate your time and valuable input.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Feedback</h1>
          <p className="text-lg text-gray-600">We value your feedback on our recent project</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Project Information */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{feedbackData.project.name}</CardTitle>
                <CardDescription>{feedbackData.project.overview}</CardDescription>
              </CardHeader>
              <CardContent>
                {feedbackData.project.techStack && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Tech Stack:</h4>
                    <p className="text-sm text-gray-600">{feedbackData.project.techStack}</p>
                  </div>
                )}
                
                {feedbackData.project.media && feedbackData.project.media.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Project Media:</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {feedbackData.project.media.map((media: any) => (
                        <div key={media.id} className="border rounded-lg p-2">
                          {media.type === 'IMAGE' ? (
                            <img
                              src={media.url}
                              alt="Project screenshot"
                              className="w-full h-32 object-cover rounded"
                            />
                          ) : (
                            <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center">
                              <p className="text-sm text-gray-600">Video</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Feedback Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Share Your Feedback</CardTitle>
                <CardDescription>
                  Please take a moment to share your thoughts about this project.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Inc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating *
                    </label>
                    <div className="flex gap-1">
                      {renderStars(formData.rating, true)}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Feedback *
                    </label>
                    <Textarea
                      id="content"
                      required
                      rows={6}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Please share your detailed feedback about the project..."
                    />
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Upload additional screenshots or videos (optional)
                    </p>
                    <Button type="button" variant="outline" size="sm">
                      Choose Files
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Feedback'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}