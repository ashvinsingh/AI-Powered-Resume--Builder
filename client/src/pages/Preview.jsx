import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import api from "../configs/api";

const Preview = () => {
  const { resumeId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const loadResume = async () => {
      try {
        const { data } = await api.get("/api/resumes/public/" + resumeId);
        setResumeData(data.resume || null);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadResume();
  }, [resumeId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-slate-500 w-10 h-10" />
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-center text-4xl md:text-6xl text-slate-400">
          Resume not found
        </p>
        <Link
          to="/"
          className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 ring-offset-1 ring-green-400 flex items-center transition-colors"
        >
          <ArrowLeftIcon className="mr-2 w-4 h-4" />
          Go to Home Page
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white"
        />
      </div>
    </div>
  );
};

export default Preview;
