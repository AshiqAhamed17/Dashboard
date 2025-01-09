import { User, Mail, Phone, Book, MapPin } from 'lucide-react';

export default function Profile() {
  const profileData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    major: 'Computer Science',
    location: 'New York, USA',
    education: {
      university: 'Tech University',
      graduationYear: '2025',
      gpa: '3.8'
    },
    skills: ['React', 'Node.js', 'Python', 'Data Structures', 'Algorithms']
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-6">
          <div className="h-24 w-24 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-white">
              {profileData.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{profileData.name}</h1>
            <p className="text-gray-400">{profileData.education.university}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="text-blue-500" />
              <span>{profileData.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-blue-500" />
              <span>{profileData.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Book className="text-blue-500" />
              <span>{profileData.major}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-blue-500" />
              <span>{profileData.location}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Education</h3>
            <div className="space-y-2">
              <p>University: {profileData.education.university}</p>
              <p>Expected Graduation: {profileData.education.graduationYear}</p>
              <p>GPA: {profileData.education.gpa}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profileData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
