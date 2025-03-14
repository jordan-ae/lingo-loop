import { MapPin, Phone, FileVideo, BookOpen, CheckCircle, Users, Mail } from 'lucide-react';

interface TutorProfile {
  country: string;
  phone: string;
  videoLink: string;
  bio: string;
  languages: { name?: string; proficiency: string }[];
  certificationExams: string[];
  teachingLanguage: string;
  catchPhrase: string
}

interface TutorProfileViewProps {
  tutorProfile: TutorProfile;
  firstName: string;
  lastName: string;
  email: string;
}

const TutorProfileView = ({ tutorProfile, firstName, lastName, email }: TutorProfileViewProps) => {
  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-white rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Users size={18} className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium text-gray-900">{firstName} {lastName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900 break-all">{email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Country</p>
              <p className="font-medium text-gray-900">{tutorProfile.country}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium text-gray-900">{tutorProfile.phone}</p>
            </div>
          </div>
        </div>
      </div>


       {/* Bio */}
       <div className="bg-white">
        <h3 className="text-lg font-semibold mb-4">About Me</h3>
        <p className="text-gray-700 whitespace-pre-line">{tutorProfile.bio}</p>
      </div>

      <div className="bg-white">
        <h3 className="text-lg font-semibold mb-4">Catch Phrase</h3>
        <p className="text-gray-700 whitespace-pre-line">{tutorProfile.catchPhrase}</p>
      </div>

      {/* Teaching Information */}
      <div className="bg-white">
        <h3 className="text-lg font-semibold mb-4">Teaching Information</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen size={18} className="text-gray-500" />
            <span className="text-gray-700">Teaching Language: {tutorProfile.teachingLanguage}</span>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {tutorProfile.languages.map((lang, index) => (
                <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {lang.name} ({lang.proficiency})
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">Certification Exams</h4>
            <div className="flex flex-wrap gap-2">
              {tutorProfile.certificationExams.map((exam, index) => (
                <div key={index} className="bg-green-100 px-3 py-1 rounded-full text-sm text-green-700">
                  <CheckCircle size={14} className="inline mr-1" />
                  {exam}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Introduction */}
      <div className="bg-white">
        <h3 className="text-lg font-semibold mb-4">Video Introduction</h3>
        <div className="flex items-center gap-2 mb-4">
          <FileVideo size={18} className="text-gray-500" />
          <a 
            href={tutorProfile.videoLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            Watch Introduction Video
          </a>
        </div>
        <div className="aspect-video">
          <iframe
            src={tutorProfile.videoLink.replace('watch?v=', 'embed/')}
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default TutorProfileView; 