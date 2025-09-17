module.exports = {
  admins: [
    {
      yearsOfExperience: 10,
      happyCustomers: 500,
      contactPhone: "1234567890",
      contactEmail: 'admin@salone.com',
      address: '123 Salon Street, City',
      aboutUsText: 'Welcome to our premium salon, where beauty meets excellence.',
      discountOfferPercentage: 20,
      discountOfferText: '20% off on all services this month!',
      footerAboutText: 'Your beauty is our passion.'
    }
  ],

  blogs: [
    {
      title: 'Top 5 Hair Trends in 2025',
      publicationDate: new Date('2025-01-10'),
      category: 'Hair',
      contentSnippet: 'Explore the latest hairstyles trending in 2025 for men and women.',
      imageUrl: 'https://example.com/blog1.jpg'
    },
    {
      title: 'Facial Care Tips',
      publicationDate: new Date('2025-02-15'),
      category: 'Skin',
      contentSnippet: 'Learn how to keep your skin glowing all year round.',
      imageUrl: 'https://example.com/blog2.jpg'
    }
  ],

  galleries: [
    { imageUrl: 'https://example.com/gallery1.jpg', caption: 'Bridal Makeover' },
    { imageUrl: 'https://example.com/gallery2.jpg', caption: 'Haircut Styles' },
    { imageUrl: 'https://example.com/gallery3.jpg', caption: 'Facial Treatments' }
  ],

  services: [
    { name: 'Haircut', description: 'Professional haircut for men and women', imageUrl: '', price: 500, duration: '45 min', category: 'Hair' },
    { name: 'Facial', description: 'Relaxing facial treatment', imageUrl: '', price: 800, duration: '1 hr', category: 'Skin' },
    { name: 'Hair Coloring', description: 'Trendy hair coloring services', imageUrl: '', price: 1500, duration: '2 hr', category: 'Hair' }
  ],

  staffs: [
    { name: 'John Doe', specialization: 'Hair Stylist', imageUrl: 'https://example.com/staff1.jpg' },
    { name: 'Jane Smith', specialization: 'Skin Specialist', imageUrl: 'https://example.com/staff2.jpg' },
    { name: 'Mike Johnson', specialization: 'Color Specialist', imageUrl: 'https://example.com/staff3.jpg' }
  ],

  customers: [
    { name: 'Alice', email: 'alice@example.com', phone: '+911112223334', totalVisits: 5 },
    { name: 'Bob', email: 'bob@example.com', phone: '+919998887776', totalVisits: 3 },
    { name: 'Charlie', email: 'charlie@example.com', phone: '+919887766554', totalVisits: 2 }
  ],

  bookings: [
    { customerName: 'Alice', serviceName: 'Haircut', date: new Date('2025-09-15'), time: '10:00 AM', notes: 'Regular haircut' },
    { customerName: 'Bob', serviceName: 'Facial', date: new Date('2025-09-16'), time: '11:30 AM', notes: 'First time facial' },
    { customerName: 'Charlie', serviceName: 'Hair Coloring', date: new Date('2025-09-17'), time: '02:00 PM', notes: 'Color touchup' }
  ],

  images: [
    { title: 'Salon Interior', description: 'Our beautiful salon interior', imageUrl: 'https://example.com/image1.jpg' },
    { title: 'Hair Styling', description: 'Professional hair styling by our staff', imageUrl: 'https://example.com/image2.jpg' },
    { title: 'Facial Session', description: 'Relaxing facial session', imageUrl: 'https://example.com/image3.jpg' }
  ],

  reviews: [
    { customerName: 'Alice', rating: 5, reviewText: 'Amazing service and staff!' },
    { customerName: 'Bob', rating: 4, reviewText: 'Loved the ambiance and services!' },
    { customerName: 'Charlie', rating: 5, reviewText: 'Highly professional and friendly staff.' }
  ]
};
