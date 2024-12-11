import React, { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Mock authentication - replace with actual auth logic
const isAdmin = () => {
  return true; // Placeholder for admin check
};

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Urban Water Conservation: Practical Strategies for Everyday Life',
      content: 'Discover innovative ways to reduce water consumption in urban settings. From smart home technologies to simple lifestyle changes, learn how city dwellers can make a significant impact on water conservation. Explore techniques like installing low-flow fixtures, collecting rainwater, and optimizing household water use.',
      author: 'Droplet Research Team',
      date: '2024-02-15',
    },
    {
      id: 2,
      title: 'Sustainable Agriculture: Precision Irrigation Techniques',
      content: 'Modern farming faces the challenge of maximizing crop yield while minimizing water usage. This comprehensive guide explores cutting-edge irrigation technologies, including sensor-based monitoring, drought-resistant crop selection, and advanced soil moisture management. Learn how farmers can reduce water consumption by up to 40% without compromising agricultural productivity.',
      author: 'Dr. Emma Waterston',
      date: '2024-03-01',
    },
    {
      id: 3,
      title: 'The Hidden Water Footprint of Your Daily Diet',
      content: 'Did you know that your daily meals have a significant water impact? This eye-opening article breaks down the water consumption behind different food choices. From meat production to plant-based alternatives, understand how your dietary decisions affect global water resources. Discover sustainable eating habits that can dramatically reduce your water footprint.',
      author: 'Alex Rivers',
      date: '2024-03-20',
    },
    {
      id: 4,
      title: 'The Role of Technology in Water Conservation',
      content: 'Technology plays a pivotal role in addressing water scarcity issues. This article delves into solutions like smart irrigation systems, AI-driven water monitoring tools, and advanced desalination techniques. Learn how these innovations are helping communities worldwide conserve and optimize water usage.',
      author: 'John Green',
      date: '2024-03-25',
    },
    {
      id: 5,
      title: 'Water Scarcity in Urban Areas: Challenges and Solutions',
      content: 'Urban areas face unique challenges in managing water scarcity. From outdated infrastructure to growing populations, this article explores strategies to overcome these challenges, including water recycling, urban greening, and policy reform. Discover how cities can create sustainable water ecosystems.',
      author: 'Urban Water Council',
      date: '2024-04-01',
    },
    {
      id: 6,
      title: 'The Future of Global Water Security',
      content: 'As the global population continues to grow, ensuring water security is more critical than ever. This article examines the potential of international collaborations, sustainable practices, and emerging technologies to secure water for future generations.',
      author: 'Global Water Initiative',
      date: '2024-04-10',
    },
  ]);

  const [expandedBlogId, setExpandedBlogId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({
    id: null,
    title: '',
    content: '',
    author: '',
    date: '',
  });

  const handleAddBlog = () => {
    if (!isAdmin()) {
      alert('You do not have permission to add blogs');
      return;
    }

    const newBlog = {
      ...currentBlog,
      id: blogs.length + 1,
      date: new Date().toISOString().split('T')[0],
    };

    setBlogs([...blogs, newBlog]);
    setIsModalOpen(false);
    setCurrentBlog({
      id: null,
      title: '',
      content: '',
      author: '',
      date: '',
    });
  };

  const handleEditBlog = (blog) => {
    if (!isAdmin()) {
      alert('You do not have permission to edit blogs');
      return;
    }

    setCurrentBlog(blog);
    setIsModalOpen(true);
  };

  const handleDeleteBlog = (blogId) => {
    if (!isAdmin()) {
      alert('You do not have permission to delete blogs');
      return;
    }

    setBlogs(blogs.filter((blog) => blog.id !== blogId));
  };

  const toggleExpand = (id) => {
    setExpandedBlogId(expandedBlogId === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-blue-700">Droplet Water Conservation Blog</h1>
        {isAdmin() && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => {
                  setCurrentBlog({
                    id: null,
                    title: '',
                    content: '',
                    author: '',
                    date: '',
                  });
                }}
              >
                <PlusIcon className="mr-2" /> Add New Blog
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{currentBlog.id ? 'Edit Blog' : 'Add New Blog'}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="title" className="text-right">
                    Title
                  </label>
                  <Input
                    id="title"
                    value={currentBlog.title}
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, title: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="author" className="text-right">
                    Author
                  </label>
                  <Input
                    id="author"
                    value={currentBlog.author}
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, author: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="content" className="text-right">
                    Content
                  </label>
                  <Textarea
                    id="content"
                    value={currentBlog.content}
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, content: e.target.value })
                    }
                    className="col-span-3 min-h-[200px]"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddBlog}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  {currentBlog.id ? 'Update' : 'Add'} Blog
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            className="hover:shadow-lg transition-shadow duration-300 border-2 border-blue-50"
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="text-xl text-blue-800">{blog.title}</span>
                {isAdmin() && (
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEditBlog(blog)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteBlog(blog.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2 italic">
                By {blog.author} | {blog.date}
              </p>
              <p className="text-gray-800">
                {expandedBlogId === blog.id
                  ? blog.content
                  : `${blog.content.slice(0, 100)}...`}
              </p>
              <Button
                variant="link"
                className="pl-0 text-blue-600 hover:text-blue-800"
                onClick={() => toggleExpand(blog.id)}
              >
                {expandedBlogId === blog.id ? 'Show Less' : 'Read More'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogManagement;