import React, { useState } from "react";
import { ExternalLink, Award, CheckCircle, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CertificateLink = () => {
  const navigate = useNavigate();
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const certificates = [
    {
      name: "CGWA (Central Ground Water Authority)",
      tagline: "Regulating groundwater extraction",
      link: "https://cgwa-noc.gov.in/Sub/CheckEligibility/CheckEligibility.aspx",
      icon: <ShieldCheck className="text-blue-500" />,
      details:
        "Ensures sustainable groundwater management and regulatory compliance for industries.",
    },
    {
      name: "ZED (Zero Defect Zero Effect)",
      tagline: "Promoting quality and sustainability",
      link: "https://zed.msme.gov.in/",
      icon: <Award className="text-green-500" />,
      details:
        "A comprehensive assessment methodology for manufacturing enterprises focusing on quality, efficiency, and environmental sustainability.",
    },
    {
      name: "PARIVESH",
      tagline: "Environmental single-window hub",
      link: "https://parivesh.nic.in/",
      icon: <CheckCircle className="text-teal-500" />,
      details:
        "Streamlined clearance system for environment, forest, wildlife, and coastal zone projects.",
    },
    {
      name: "FSSC 22000",
      tagline: "Food safety system certification",
      link: "https://www.fssc.com/schemes/fssc-22000/become-fssc-22000-certified/",
      icon: <ShieldCheck className="text-purple-500" />,
      details:
        "Globally recognized food safety management system certification ensuring highest food safety standards.",
    },
    {
      name: "FoSCoS",
      tagline: "Food safety compliance system",
      link: "https://foscos.fssai.gov.in/apply-for-lic-and-reg",
      icon: <CheckCircle className="text-orange-500" />,
      details:
        "Food Safety and Standards Authority of India's comprehensive licensing and registration platform.",
    },
    {
      name: "BIS Certification for Packaged Drinking Water",
      tagline: "Bureau of Indian Standards certification",
      link: "https://www.bis.gov.in/",
      icon: <Award className="text-indigo-500" />,
      details:
        "Mandatory certification ensuring quality and safety of packaged drinking water in India.",
    },
    {
      name: "IS 14543: Bottled Drinking Water Certification",
      tagline: "Indian Standard for bottled water",
      link: "https://www.bis.gov.in/",
      icon: <ShieldCheck className="text-red-500" />,
      details:
        "Specific Indian Standard defining quality parameters for bottled drinking water production.",
    },
    {
      name: "Certificate of Recognition for Beverages",
      tagline: "Custom certification for beverage industry",
      icon: <Award className="text-yellow-500" />,
      details:
        "A specialized certification recognizing excellence in beverage production and sustainability practices.",
      specialAction: true, // Add this property to indicate special navigation
    },
  ];

  const openModal = (cert) => {
    if (cert.name === "Certificate of Recognition for Beverages") {
      navigate("/industryform"); // Navigate to home page for this specific certificate
      return;
    }
    setSelectedCertificate(cert);
  };

  const closeModal = () => {
    setSelectedCertificate(null);
  };

  const handleSubmit = () => {
    navigate("industryform");
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center flex items-center justify-center gap-4">
          Certifications & Recognitions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-100 cursor-pointer ${
                cert.name === "Certificate of Recognition for Beverages"
                  ? "border-yellow-500 border-2"
                  : ""
              }`}
              onClick={() => openModal(cert)}
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    {cert.icon}
                    <h3 className="text-xl font-semibold text-gray-800">
                      {cert.name}
                    </h3>
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
                <p className="text-gray-600 mb-4 flex-grow">{cert.tagline}</p>
                {cert.name === "Certificate of Recognition for Beverages" && (
                  <div className="text-yellow-600 font-semibold">
                    Click to go Bevarage Certificate
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedCertificate && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                onClick={closeModal}
              >
                ×
              </button>
              <div className="flex items-center mb-6">
                {selectedCertificate.icon}
                <h3 className="text-2xl font-bold ml-3 text-gray-800">
                  {selectedCertificate.name}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                {selectedCertificate.tagline}
              </p>
              <p className="text-gray-700">{selectedCertificate.details}</p>
              {selectedCertificate.link && (
                <div
                  href={selectedCertificate.link}
                  onClick={handlequestionaireClick}
                  className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Visit Official Website{" "}
                  <ExternalLink className="ml-2" size={16} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateLink;
