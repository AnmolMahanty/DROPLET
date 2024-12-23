import React, { useState } from 'react';
import { PencilIcon, TrashIcon, PlusIcon, XIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const isAdmin = () => {
  return true; // True=admin; false=user
};

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Urban Water Conservation: Practical Strategies for Everyday Life',
      content: 'Discover innovative ways to reduce water consumption in urban settings. From smart home technologies to simple lifestyle changes, learn how city dwellers can make a significant impact on water conservation. Explore techniques like installing low-flow fixtures, collecting rainwater, and optimizing household water use.',
      author: 'Droplet Research Team',
      date: '2024-02-15',
      image: 'https://www.livpuresmart.com/blog/wp-content/uploads/2023/11/Water-Conservation-Methods-Ways-to-Save-Water-1.jpg',
    },
    {
      id: 2,
      title: 'Sustainable Agriculture: Precision Irrigation Techniques',
      content: 'Modern farming faces the challenge of maximizing crop yield while minimizing water usage. This comprehensive guide explores cutting-edge irrigation technologies, including sensor-based monitoring, drought-resistant crop selection, and advanced soil moisture management. Learn how farmers can reduce water consumption by up to 40% without compromising agricultural productivity.',
      author: 'Dr. Emma Waterston',
      date: '2024-03-01',
      image: 'https://farmonaut.com/wp-content/uploads/2024/10/Revolutionizing-Agriculture-How-Precision-Irrigation-Systems-Are-Shaping-Sustainable-Farming-in-2024_2.jpg',
    },
    {
      id: 3,
      title: 'The Hidden Water Footprint of Your Daily Diet',
      content: 'Did you know that your daily meals have a significant water impact? This eye-opening article breaks down the water consumption behind different food choices. From meat production to plant-based alternatives, understand how your dietary decisions affect global water resources. Discover sustainable eating habits that can dramatically reduce your water footprint.',
      author: 'Alex Rivers',
      date: '2024-03-20',
      image:'https://farmonaut.com/wp-content/uploads/2024/10/Revolutionizing-Agriculture-How-Precision-Irrigation-Systems-Are-Shaping-Sustainable-Farming-in-2024_2.jpg',
    },
    {
      id: 4,
      title: 'The Role of Technology in Water Conservation',
      content: 'Technology plays a pivotal role in addressing water scarcity issues. This article delves into solutions like smart irrigation systems, AI-driven water monitoring tools, and advanced desalination techniques. Learn how these innovations are helping communities worldwide conserve and optimize water usage.',
      author: 'John Green',
      date: '2024-03-25',
      image:'https://farmonaut.com/wp-content/uploads/2024/10/Revolutionizing-Agriculture-How-Precision-Irrigation-Systems-Are-Shaping-Sustainable-Farming-in-2024_2.jpg',
    },
    {
      id: 5,
      title: 'Water Scarcity in Urban Areas: Challenges and Solutions',
      content: 'Urban areas face unique challenges in managing water scarcity. From outdated infrastructure to growing populations, this article explores strategies to overcome these challenges, including water recycling, urban greening, and policy reform. Discover how cities can create sustainable water ecosystems.',
      author: 'Urban Water Council',
      date: '2024-04-01',
      image: 'https://farmonaut.com/wp-content/uploads/2024/10/Revolutionizing-Agriculture-How-Precision-Irrigation-Systems-Are-Shaping-Sustainable-Farming-in-2024_2.jpg',
    },
    {
      id: 6,
      title: 'The Future of Global Water Security',
      content: 'As the global population continues to grow, ensuring water security is more critical than ever. This article examines the potential of international collaborations, sustainable practices, and emerging technologies to secure water for future generations.',
      author: 'Global Water Initiative',
      date: '2024-04-10',
      image: '/api/placeholder/400/250',
    },
  ]);

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({
    id: null,
    title: '',
    content: '',
    author: '',
    date: '',
    image: '',
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
      image: '',
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

  const getLatestBlogs = () => {
    return [...blogs]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl md:text-4xl font-bold text-blue-700">Droplet  Blog Section</h1>
        {isAdmin() && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white w-full md:w-auto"
                onClick={() => {
                  setCurrentBlog({
                    id: null,
                    title: '',
                    content: '',
                    author: '',
                    date: '',
                    image: '',
                  });
                }}
              >
                <PlusIcon className="mr-2" /> Add New Blog
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] w-full">
              <DialogHeader>
                <DialogTitle>{currentBlog.id ? 'Edit Blog' : 'Add New Blog'}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                  <label htmlFor="title" className="text-right md:col-span-1">
                    Title
                  </label>
                  <Input
                    id="title"
                    value={currentBlog.title}
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, title: e.target.value })
                    }
                    className="md:col-span-3"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                  <label htmlFor="image" className="text-right md:col-span-1">
                    Image URL
                  </label>
                  <Input
                    id="image"
                    value={currentBlog.image}
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, image: e.target.value })
                    }
                    className="md:col-span-3"
                    placeholder="Enter image URL"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                  <label htmlFor="author" className="text-right md:col-span-1">
                    Author
                  </label>
                  <Input
                    id="author"
                    value={currentBlog.author}
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, author: e.target.value })
                    }
                    className="md:col-span-3"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                  <label htmlFor="content" className="text-right md:col-span-1">
                    Content
                  </label>
                  <Textarea
                    id="content"
                    value={currentBlog.content}
                    onChange={(e) =>
                      setCurrentBlog({ ...currentBlog, content: e.target.value })
                    }
                    className="md:col-span-3 min-h-[200px]"
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

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              className="hover:shadow-lg transition-shadow duration-300 border-2 border-blue-50 cursor-pointer"
              onClick={() => setSelectedBlog(blog)}
            >
              <CardHeader>
                <img
                  src={blog.image || "/api/placeholder/400/250"}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t mb-4"
                />
                <CardTitle className="flex justify-between items-center">
                  <span className="text-xl text-blue-800 break-words">
                    {blog.title}
                  </span>
                  {isAdmin() && (
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-500 hover:text-blue-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditBlog(blog);
                        }}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBlog(blog.id);
                        }}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2 italic text-sm sm:text-base">
                  By {blog.author} | {blog.date}
                </p>
                <p className="text-gray-800 text-sm sm:text-base">
                  {blog.content.slice(0, 100)}...
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:w-1/4">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-xl text-blue-700">Latest Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getLatestBlogs().map((blog) => (
                  <div
                    key={blog.id}
                    className="cursor-pointer hover:bg-gray-50 p-2 rounded"
                    onClick={() => setSelectedBlog(blog)}
                  >
                    <h3 className="font-medium text-blue-600">{blog.title}</h3>
                    <p className="text-sm text-gray-500">{blog.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Blog Detail Popup */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-blue-700">{selectedBlog.title}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedBlog(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XIcon className="h-6 w-6" />
                </Button>
              </div>
              <img
                src={selectedBlog.image || "/api/placeholder/400/250"}
                alt={selectedBlog.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <p className="text-gray-600 italic mb-4">
                By {selectedBlog.author} | {selectedBlog.date}
              </p>
              <p className="text-gray-800 whitespace-pre-wrap">{selectedBlog.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;